import React, {useEffect, useRef} from 'react'
import {Transition, TransitionChild} from "@headlessui/react";
import {Link, router} from "@inertiajs/react";
import {useApp} from "@/AppContext/AppContext.jsx";
import {GoTrash} from "react-icons/go";
import {TbMessageReport} from "react-icons/tb";
import {BiHide} from "react-icons/bi";
import {MdNotInterested} from "react-icons/md";
import {IoSaveOutline} from "react-icons/io5";

export default function PostDropdown({isPostDropdownOpen, setIsPostDropdownOpen, setThreads, threads, thread, isProfilePage = false}) {

    const { user } = useApp()

    const postsDropDownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!postsDropDownRef.current?.contains(e.target) && e.target.id !== "postDropdownID") {
                setIsPostDropdownOpen(false)
            }
        }

        window.addEventListener('mousedown', handleClickOutside)
        return () => {
            window.removeEventListener('mousedown', handleClickOutside)
        }
    }, []);
    const deletePost = () => {
        router.delete(`/threads/${thread.id}`, {
            preserveScroll: true,
            preserveState: true,

            onSuccess: () => {
                const filtered_threads = threads.filter(iterator_thread => iterator_thread.id !== thread.id);
                setThreads(filtered_threads)
            }
        })
    }

    const hideThread = () => {
        router.post(`/threads/${thread.id}/hide`, {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                const filtered_threads = threads.filter(iterator_thread => iterator_thread.id !== thread.id);
                setThreads(filtered_threads)
            }
        })
    }
    const saveThread = () => {
        router.post(`/threads/${thread.id}/save`, {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {

            }
        })
    }

    return (
        <Transition
            enter="duration-500 transition"
            show={isPostDropdownOpen}
            leave="duration-200"
        >
            <div
                ref={postsDropDownRef}
                className={`${thread?.user_id === user?.id ? `${isProfilePage ? 'postsDropdownResponsive md:postsDropdownOwner' : 'postsDropdownResponsive lg:postsDropdownOwner'} ` : ` ${isProfilePage ? 'postsDropdownResponsive md:postsDropdownNotOwner' : 'postsDropdownResponsive lg:postsDropdownNotOwner'}`} absolute left-1/2 ${isProfilePage ? 'md:-translate-x-1/2' : 'lg:-translate-x-1/2'} top-9 border border-[--theme-default-border-color] rounded bg-[--theme-input-bg-color] pt-2 z-50`}
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
                    <main id="drop">
                        {thread?.user_id === user?.id &&
                            <button onClick={deletePost} className="flex justify-center items-center gap-x-2 w-fit px-10 hover:bg-[--theme-nav-bg-color-hover] h-10">
                                <GoTrash className={`size-5 text-[--theme-placeholder-color]`}/>
                                <span>حذف</span>
                            </button>
                        }
                        {thread?.user_id !== user?.id &&
                            <>
                                {!user &&
                                    <div className={`pt-1`}>
                                        <Link
                                            href={'account'}
                                            className="flex justify-center items-center gap-x-2 w-full px-10 hover:bg-[--theme-nav-bg-color-hover] h-10"
                                        >
                                            <TbMessageReport className={`size-5 text-[--theme-placeholder-color]`}/>
                                            <span>إبلاغ</span>
                                        </Link>
                                        <Link
                                            href={'account'}
                                            className="flex justify-center items-center gap-x-2 w-full px-10 hover:bg-[--theme-nav-bg-color-hover] h-10"
                                        >
                                            <BiHide className={`size-5 text-[--theme-placeholder-color]`}/>
                                            <span>إخفاء</span>
                                        </Link>
                                        <Link
                                            href={'account'}
                                            className="flex justify-center items-center gap-x-2 w-max px-10 hover:bg-[--theme-nav-bg-color-hover] h-10"
                                        >
                                            <MdNotInterested className={`size-5 text-[--theme-placeholder-color]`}/>
                                            <span>غير مهتم</span>
                                        </Link>
                                    </div>
                                }
                                {user &&
                                    <ul className={`pt-2`}>
                                        <li className="flex justify-center items-center gap-x-2 w-full px-10 hover:bg-[--theme-nav-bg-color-hover] h-10">
                                            <TbMessageReport className={`size-5 text-[--theme-placeholder-color]`}/>
                                            <span>إبلاغ</span>
                                        </li>
                                        <li
                                            onClick={hideThread}
                                            className="flex justify-center items-center gap-x-2 w-full px-10 hover:bg-[--theme-nav-bg-color-hover] h-10">
                                            <BiHide className={`size-5 text-[--theme-placeholder-color]`}/>
                                            <span>إخفاء</span>
                                        </li>
                                        <li className="flex justify-center items-center gap-x-2 w-max px-10 hover:bg-[--theme-nav-bg-color-hover] h-10 cursor-not-allowed pointer-events-none">
                                            <MdNotInterested className={`size-5 text-[--theme-placeholder-color]`}/>
                                            <span>غير مهتم</span>
                                        </li>
                                        <li
                                            onClick={saveThread}
                                            className="flex justify-center items-center gap-x-2 w-full px-10 hover:bg-[--theme-nav-bg-color-hover] h-10">
                                            <IoSaveOutline className={`size-5 text-[--theme-placeholder-color]`}/>
                                            <span>حفظ</span>
                                        </li>
                                    </ul>
                                }
                            </>
                        }
                    </main>

                </TransitionChild>
            </div>
        </Transition>
    )
}
