import React, {useEffect, useRef} from 'react'
import {Transition, TransitionChild} from "@headlessui/react";
import {router} from "@inertiajs/react";

export default function PostDropdown({isPostDropdownOpen, setIsPostDropdownOpen, id, setThreads, threads}) {

    const postsDropDownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            console.log(e.target.tagName)
            if (!postsDropDownRef.current?.contains(e.target) && e.target.id !== "userDropdown" && e.target.tagName !== 'DIV' && e.target.tagName !== 'path' && e.target.tagName !== 'svg') {
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

            onSuccess: (res) => {
                console.log(res.props)
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
                className={`postsDropdown absolute left-1/2 -translate-x-1/2 top-9 border border-[--theme-default-border-color] rounded bg-[--theme-input-bg-color] pt-3 `}
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
                        <button onClick={deletePost} className="w-40 hover:bg-[--theme-nav-bg-color-hover] h-10">
                            Delete
                        </button>
                    </main>

                </TransitionChild>
            </div>
        </Transition>
    )
}
