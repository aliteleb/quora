import React, {forwardRef, useEffect, useState} from 'react'
import DefaultUserIcon from "@/Core/DefaultUserIcon.jsx";
import {RxDotsHorizontal} from "react-icons/rx";
import {PiArrowFatDown, PiArrowFatDownFill, PiArrowFatUp, PiArrowFatUpFill} from "react-icons/pi";

const Comment = forwardRef(({comment, customStyles, isReply, user}, ref) => {

    const [replies, setReplies] = useState([]);
    const [showReplies, setShowReplies] = useState(false);


    const storeReplies = (replies) => {
        const allReplies = []
        replies?.map(reply => {
            if (reply.replies.length === 0) {
                allReplies.push(reply)
            } else {
                allReplies.push(reply)
                storeReplies(reply.replies)
            }
        })

        if (allReplies.length !== 0) {
            setReplies(prevState => ([
                ...prevState,
                ...allReplies
            ]))
        }
    }
    useEffect(() => {
        storeReplies(comment.replies)
    }, []);

    const show_replies = replies.map(reply => (
        <Comment comment={reply} customStyles={`!ps-20`} isReply={true} user={reply.user}/>
    ))

    const toggleShowReplies = () => {
        setShowReplies(!showReplies)
    }

    return (
        <>
            <div ref={ref} className={`px-5 pt-3 flex gap-x-3 ${customStyles ? customStyles : ''}`}>
                <div>
                    <DefaultUserIcon/>
                </div>
                <div className={`flex flex-col gap-y-2 w-full`}>
                    <div className={`flex justify-between`}>
                        <div>
                            <div className={`font-bold cursor-pointer w-fit`}>{user?.name}<span className={`font-medium cursor-auto`}>· {comment.created_at}</span></div>
                            <div className={`mt-3`}>{comment.body}</div>
                        </div>

                        <div className={`hover:bg-[--theme-nav-bg-color-hover] rounded-full p-2 h-fit cursor-pointer`}>
                            <RxDotsHorizontal className={`size-5`} />
                        </div>
                    </div>
                    <div className={`flex items-center gap-x-1`}>
                        <div className={`w-fit flex items-center bg-[--theme-nav-bg-color-hover] border border-[--theme-secondary-bg-color-hover] rounded-full`}>
                            <div className={`flex items-center gap-x-1 px-4 py-1 border-e border-[--theme-secondary-bg-color-hover] hover:bg-[--theme-secondary-bg-color-hover] rounded-r-full cursor-pointer`}>
                                <div className={`flex items-center gap-x-1`}>
                                    <PiArrowFatUpFill className={`text-[--theme-button-border-color] size-5`}/>
                                    <span>أويد ·</span>
                                </div>
                                <span>55</span>
                            </div>
                            <div className={`flex items-center h-full gap-x-2 px-4 py-1 rounded-l-full hover:bg-[--theme-secondary-bg-color-hover] cursor-pointer`}>
                                <PiArrowFatDown className={`size-5`}/>
                                <span>0</span>
                            </div>
                        </div>
                        <button className={`hover:bg-[--theme-nav-bg-color-hover] rounded-full w-[40px] h-[40px] cursor-pointer`}>رد</button>
                        {comment.replies?.length !== 0 && !isReply &&
                            <button
                                onClick={toggleShowReplies}
                                className={`hover:bg-[--theme-nav-bg-color-hover] rounded-full px-4 py-2 cursor-pointer`}>
                                {showReplies ? 'إخفاء الردود' : 'عرض الردود'}</button>}
                    </div>
                </div>
            </div>
            {/*  عرض الردود  */}
            {(showReplies) && show_replies}
        </>
    )
})

export default Comment;
