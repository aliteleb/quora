import React, {useEffect, useRef} from 'react'
import {Transition, TransitionChild} from "@headlessui/react";
import {BsQuestionSquare} from "react-icons/bs";
import {BiCommentEdit} from "react-icons/bi";
import {FaEdit, FaRegEdit, FaUsers} from "react-icons/fa";
import {GoTrash} from "react-icons/go";
import {useApp} from "@/AppContext/AppContext.jsx";
import {TbMessageReport} from "react-icons/tb";
import {router} from "@inertiajs/react";

export default function CommentDropdownMenu({isCommentModalOpen, setIsCommentModalOpen, commentUserId, commentId}) {

    const { user } = useApp()

    const commentDropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!commentDropdownRef.current?.contains(e.target) && e.target.id !== 'commentDropdownMenu') {
                setIsCommentModalOpen(false);
            }
        };

        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const deleteComment = () => {
        router.delete(`delete-comment/${commentId}`, {
            onSuccess: () => {
                window.history.replaceState({}, '', '/');
            },
            onError: () => {
                window.history.replaceState({}, '', '/');
            }
        })
    }

    return (
        <Transition
            enter="duration-500 transition"
            show={isCommentModalOpen}
            leave="duration-200"
        >
            <div
                ref={commentDropdownRef}
                className={`dropdown-clip-path-responsive 2xl:dropdown-clip-path absolute left-1/2 top-10 2xl:-translate-x-1/2 border border-[--theme-default-border-color] rounded bg-[#202020] ${commentUserId !== user.id ? 'pt-0' : 'pt-3'} z-50`}
            >
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    as="div"
                >
                    <main>
                        { commentUserId === user.id &&
                            <>
                                <div
                                    onClick={deleteComment}
                                    className={`flex items-center gap-x-3 hover:bg-[--theme-nav-bg-color-hover] cursor-pointer py-3 px-3 w-40 border-b border-[--theme-default-border-color]`}>
                                    <GoTrash className={`size-6`}/>
                                    <span>حذف</span>
                                </div>
                                <div className={`flex items-center gap-x-3 hover:bg-[--theme-nav-bg-color-hover] cursor-pointer py-3 px-3 w-40 border-b border-[--theme-default-border-color]`}>
                                    <FaRegEdit className={`size-6`}/>
                                    <span>تعديل</span>
                                </div>
                            </>
                        }
                        { commentUserId !== user.id &&
                            <>
                                <div
                                    className={`flex items-center gap-x-3 hover:bg-[--theme-nav-bg-color-hover] cursor-pointer py-3 px-3 w-40 border-b border-[--theme-default-border-color]`}>
                                    <TbMessageReport className={`size-6`}/>
                                    <span>إبلاغ</span>
                                </div>
                            </>
                        }
                    </main>
                </TransitionChild>
            </div>
        </Transition>
    )
}
