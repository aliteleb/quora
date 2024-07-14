import React from 'react'
import {HiMiniXMark} from "react-icons/hi2";
import {FaRegCircleUser} from "react-icons/fa6";
import {useApp} from "@/AppContext/AppContext.jsx";
import {PiArrowFatDown, PiArrowFatUp} from "react-icons/pi";
import {FaRegComment} from "react-icons/fa";
import {CiShare2} from "react-icons/ci";
import {RxDotsHorizontal} from "react-icons/rx";

export default function Post({thread}) {

    const {user} = useApp()

    console.log(thread)

    return (
        <div className={`bg-[--theme-main-bg-color] w-full text-[--theme-primary-text-color] rounded py-3 flex flex-col gap-y-4`}>
            <header className={`flex justify-between px-3`}>
                <div className={`flex gap-x-3`}>
                    <div>
                        {thread.user?.avatar && <img src={``} className={`md:size-9 size-7 rounded-full cursor-pointer`}/>}
                        {(!thread.user?.avatar && thread.user) && <FaRegCircleUser className={`md:size-9 size-7 cursor-pointer text-[--theme-placeholder-color]`}/>}
                    </div>

                    <div>
                        <div className={`font-bold`}>
                            <span className={`cursor-pointer`}>{thread.user.name} . </span>
                            <span className={`text-[--theme-button-border-color] cursor-pointer hover:underline`}>متابعة</span>
                        </div>
                        <span>15 أبريل</span>
                    </div>
                </div>
                <div className={`hover:bg-[--theme-nav-bg-color-hover] rounded-full p-2 h-fit cursor-pointer`}>
                    <RxDotsHorizontal className={`size-5`}/>
                </div>
            </header>
            <main className={`flex flex-col gap-y-3`}>
                <div className={`px-3`}>{thread.title}</div>
                <img
                    src={thread.image}
                    alt="post-img"
                    className={`w-full object-cover max-h-[30rem]`}
                />
            </main>
            <footer className={`flex flex-col gap-y-2 text-[--theme-secondary-text-color] px-3`}>
                <div>
                    <span className={`hover:underline cursor-pointer`}>عرض {thread.all_up_votes_count} تأييد . </span>
                    <span className={`hover:underline cursor-pointer`}>عرض {thread.all_shares_count} مشاركة</span>
                </div>
                <div className={`flex justify-between text-[--theme-body-color]`}>
                    <div className={`flex gap-x-1`}>
                        <div className={`flex items-center bg-[--theme-nav-bg-color-hover] border border-[--theme-secondary-bg-color-hover] rounded-full`}>
                            <div className={`flex items-center gap-x-1 px-4 py-1 border-e border-[--theme-secondary-bg-color-hover] hover:bg-[--theme-secondary-bg-color-hover] rounded-r-full cursor-pointer`}>
                                <div className={`flex items-center gap-x-1`}>
                                    <PiArrowFatUp className={`text-[--theme-button-border-color] size-5`}/>
                                    <span>أويد .</span>
                                </div>
                                <span>{thread.all_up_votes_count}</span>
                            </div>
                            <div className={`flex items-center h-full gap-x-2 px-4 py-1 rounded-l-full hover:bg-[--theme-secondary-bg-color-hover] cursor-pointer`}>
                                <PiArrowFatDown className={`size-5`}/>
                                <span>{thread.all_down_votes_count}</span>
                            </div>

                        </div>

                        <div className={`flex items-center gap-x-1 hover:bg-[--theme-nav-bg-color-hover] rounded-full px-2 cursor-pointer`}>
                            <FaRegComment />
                            <span>{thread.all_comments_count}</span>
                        </div>
                        <div className={`flex items-center gap-x-1 hover:bg-[--theme-nav-bg-color-hover] rounded-full px-2 cursor-pointer`}>
                            <CiShare2 />
                            <span>{thread.all_shares_count}</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
