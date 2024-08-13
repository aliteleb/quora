import React, {useEffect, useRef} from 'react'
import {Transition, TransitionChild} from "@headlessui/react";
import {FaRegEdit} from "react-icons/fa";
import {GoTrash} from "react-icons/go";
import {useApp} from "@/AppContext/AppContext.jsx";
import {TbMessageReport} from "react-icons/tb";
import {router} from "@inertiajs/react";

export default function CommentDropdownMenu({comment, isCommentModalOpen, setIsCommentModalOpen, commentUserId, commentId, setComments, comments, setCommentsCount, commentsCount, setReplies}) {

    const { user } = useApp()

    const commentDropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!commentDropdownRef.current?.contains(e.target) && e.target.id !== 'commentDropdownMenu' && e.target.tagName !== 'path') {
                setIsCommentModalOpen(false);
            }
        };

        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const updateCommentsAfterDelete = () => {
        const updatedComments = comments.filter(comment => comment.id !== commentId)
        setComments(updatedComments)
    }

    const updateRepliesAfterDelete = () => {
        const mainComment = comments?.filter(iterate_comment => iterate_comment.id === comment.comment_id)
        const updatedReplies = mainComment[0].replies?.filter(reply => reply.id !== commentId)
        setReplies(updatedReplies)
    }
    const deleteComment = () => {
        router.delete(`delete-comment/${commentId}`, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                if (!comment.comment_id) {
                    updateCommentsAfterDelete()
                } else {
                    updateRepliesAfterDelete()
                }
                setCommentsCount(commentsCount - 1)
            },
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
                className={`dropdown-clip-path-responsive 2xl:commentDropdown-clip-path absolute left-1/2 top-10 2xl:-translate-x-1/2 border border-[--theme-default-border-color] rounded bg-[--theme-main-bg-color] ${commentUserId !== user.id ? 'pt-0' : 'pt-1'} z-50`}
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
                                    className={`flex items-center gap-x-3 hover:bg-[--theme-nav-bg-color-hover] cursor-pointer py-3 px-3 pe-7 w-full border-b border-[--theme-default-border-color]`}>
                                    <GoTrash className={`size-5`}/>
                                    <span>حذف</span>
                                </div>
                                <div className={`flex items-center gap-x-3 hover:bg-[--theme-nav-bg-color-hover] cursor-pointer py-3 px-3 pe-7 w-full`}>
                                    <FaRegEdit className={`size-5`}/>
                                    <span>تعديل</span>
                                </div>
                            </>
                        }
                        { commentUserId !== user.id &&
                            <>
                                <div
                                    className={`flex items-center gap-x-3 hover:bg-[--theme-nav-bg-color-hover] cursor-pointer py-3 px-3 pe-7 w-full border-b border-[--theme-default-border-color]`}>
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
