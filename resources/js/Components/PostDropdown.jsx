import React, {useEffect, useRef} from 'react'
import {Transition, TransitionChild} from "@headlessui/react";
import {router} from "@inertiajs/react";
import {useApp} from "@/AppContext/AppContext.jsx";
import {GoTrash} from "react-icons/go";
import {TbMessageReport} from "react-icons/tb";

export default function PostDropdown({isPostDropdownOpen, setIsPostDropdownOpen, id, setThreads, threads, thread}) {

    const { user } = useApp()

    const postsDropDownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            console.log(e.target.tagName)
            if (!postsDropDownRef.current?.contains(e.target) && e.target.id !== "postDropdownID" && e.target.tagName !== 'svg' && e.target.tagName !== 'path') {
                setIsPostDropdownOpen(false)
            }
        }

        window.addEventListener('mousedown', handleClickOutside)
        return () => {
            window.removeEventListener('mousedown', handleClickOutside)
        }
    }, []);
    const deletePost = () => {
        router.delete(`/posts/${id}`, {
            preserveScroll: true,
            preserveState: true,

            onSuccess: () => {
                const filtered_threads = threads.filter(thread => thread.id !== id);
                setThreads(filtered_threads)
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
                className={`postsDropdown absolute left-1/2 -translate-x-1/2 top-9 border border-[--theme-default-border-color] rounded bg-[--theme-input-bg-color] pt-2 `}
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
                        {thread.user_id === user.id &&
                            <button onClick={deletePost} className="flex justify-center items-center gap-x-2 w-fit px-10 hover:bg-[--theme-nav-bg-color-hover] h-10">
                                <GoTrash className={`size-5`}/>
                                <span>حذف</span>
                            </button>
                        }
                        {thread.user_id !== user.id &&
                            <button onClick={deletePost} className="flex justify-center items-center gap-x-2 w-fit px-10 hover:bg-[--theme-nav-bg-color-hover] h-10">
                                <TbMessageReport className={`size-5`}/>
                                <span>إبلاغ</span>
                            </button>
                        }
                    </main>

                </TransitionChild>
            </div>
        </Transition>
    )
}
