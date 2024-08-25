import React from 'react'
import {useApp} from "@/AppContext/AppContext.jsx";
import {RiQuestionAnswerLine} from "react-icons/ri";
import {BsQuestionSquare} from "react-icons/bs";
import {BiCommentEdit} from "react-icons/bi";
import DefaultUserIcon from "@/Core/DefaultUserIcon.jsx";
import {Link} from "@inertiajs/react";

export default function CreateThread() {

    const {setIsCreatThreadModalOpen, setIsPostActive, user } = useApp();

    const handleAskButtonClick = () => {
        setIsCreatThreadModalOpen(true)
        setIsPostActive(false)
    }

    return (
        <div className={`z-10 bg-[--theme-main-bg-color] w-full text-[--theme-primary-text-color] h-fit p-5 rounded flex flex-col gap-y-5`}>
                <div className={`${user ? 'grid' : ''}  grid-cols-[0.5fr_6fr] items-center`}>
                    {user?.avatar &&
                        <Link href={`/profile/${user?.username}`}>
                            <img
                                src={user?.avatar}
                                className={`size-9 rounded-full cursor-pointer`}
                                alt={`user-avatar`}
                            />
                        </Link>
                    }
                    {(!user?.avatar && user) &&
                        <Link href={`/profile/${user?.username}`}>
                            <DefaultUserIcon/>
                        </Link>
                    }
                    {!user &&
                        <Link
                            href={'account'}
                            onClick={() => user && setIsCreatThreadModalOpen(true)}
                            className={`cursor-pointer`}
                        >
                            <input
                                type="text"
                                className={`w-full rounded-full bg-[--theme-input-bg-color] placeholder:text-[--theme-placeholder-color] border-[--theme-default-border-color] pointer-events-none`}
                                placeholder={`ماذا تريد أن تسأل أو تشارك؟`}
                            />
                        </Link>
                    }
                    {user &&
                        <button
                            onClick={() => user && setIsCreatThreadModalOpen(true)}
                            className={`cursor-pointer`}
                        >
                            <input
                                type="text"
                                className={`w-full rounded-full bg-[--theme-input-bg-color] placeholder:text-[--theme-placeholder-color] border-[--theme-default-border-color] pointer-events-none`}
                                placeholder={`ماذا تريد أن تسأل أو تشارك؟`}
                            />
                        </button>
                    }
                </div>

                <div className={`grid grid-cols-3`}>
                    {!user &&
                        <Link
                            href={'account'}
                            className={`cursor-pointer flex items-center gap-x-3`}
                        >
                            <div
                                className={`w-full text-lg flex items-center gap-x-3 justify-center hover:bg-[--theme-nav-bg-color-hover] py-2 rounded`}>
                                <BsQuestionSquare className={`size-5 text-[--theme-placeholder-color]`}/>
                                <span>اسأل</span>
                            </div>
                            <div className={`w-[1px] h-5 ms-1 bg-[--theme-placeholder-color]`}></div>
                        </Link>
                    }
                    {user &&
                        <button
                            className={`cursor-pointer flex items-center gap-x-3`}
                            onClick={handleAskButtonClick}
                        >
                            <div className={`w-full text-lg flex items-center gap-x-3 justify-center hover:bg-[--theme-nav-bg-color-hover] py-2 rounded`}>
                                <BsQuestionSquare className={`size-5 text-[--theme-placeholder-color]`}/>
                                <span>اسأل</span>
                            </div>
                            <div className={`w-[1px] h-5 ms-1 bg-[--theme-placeholder-color]`}></div>
                        </button>
                    }

                    <div className={`cursor-pointer flex items-center gap-x-3 ms-3`}>
                        {!user &&
                            <Link
                                href={'account'}
                                className={`ms-1 w-full text-lg flex items-center gap-x-3 justify-center hover:bg-[--theme-nav-bg-color-hover] py-2 rounded`}
                            >
                                <RiQuestionAnswerLine className={`size-6 text-[--theme-placeholder-color]`}/>
                                أجب
                            </Link>
                        }
                        {user &&
                            <button
                                className={`ms-1 w-full text-lg flex items-center gap-x-3 justify-center hover:bg-[--theme-nav-bg-color-hover] py-2 rounded`}>
                                <RiQuestionAnswerLine className={`size-6 text-[--theme-placeholder-color]`}/>
                                أجب
                            </button>
                        }
                        <div className={`w-[1px] h-5 ms-1 bg-[--theme-placeholder-color]`}></div>
                    </div>

                    {!user &&
                        <Link
                            href={'account'}
                            className={`cursor-pointer text-lg flex items-center gap-x-3 ms-3 justify-center hover:bg-[--theme-nav-bg-color-hover] py-2 rounded`}
                            onClick={() => {
                                if (user) {
                                    setIsCreatThreadModalOpen(true)
                                    setIsPostActive(true)
                                }
                            }}
                        >
                            <BiCommentEdit className={`size-6 text-[--theme-placeholder-color]`}/>
                            نشر
                        </Link>
                    }
                    {user &&
                        <button
                            className={`cursor-pointer text-lg flex items-center gap-x-3 ms-3 justify-center hover:bg-[--theme-nav-bg-color-hover] py-2 rounded`}
                            onClick={() => {
                                if (user) {
                                    setIsCreatThreadModalOpen(true)
                                    setIsPostActive(true)
                                }
                            }}
                        >
                            <BiCommentEdit className={`size-6 text-[--theme-placeholder-color]`}/>
                            نشر
                        </button>
                    }
                </div>
            </div>
    )
}
