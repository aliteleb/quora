import React, {forwardRef, useEffect, useState} from 'react'
import DefaultUserIcon from "@/Core/DefaultUserIcon.jsx";
import {RxDotsHorizontal} from "react-icons/rx";
import {PiArrowFatDown, PiArrowFatDownFill, PiArrowFatUp, PiArrowFatUpFill} from "react-icons/pi";
import {router} from "@inertiajs/react";

const Comment = forwardRef(({comment, customStyles, isReply, user}, ref) => {

    const [replies, setReplies] = useState([]);
    const [showReplies, setShowReplies] = useState(false);
    const [isVoted, setIsVoted] = useState(null);
    const [voteUpCount, setVoteUpCount] = useState(comment.up_votes);
    const [voteDownCount, setVoteDownCount] = useState(comment.down_votes);

    useEffect(() => {
        setReplies(comment.replies)
        setIsVoted(comment.vote)
    }, []);

    const show_replies = replies?.map(reply => (
        <Comment comment={reply} customStyles={`!ps-20`} isReply={true} user={reply.user}/>
    ))

    const toggleShowReplies = () => {
        setShowReplies(!showReplies)
    }

    const vote = (voteType) => {
        router.post('/vote-comment', { comment_id: comment.id, vote_type: voteType }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (res) => {
                !res.props.vote ? setIsVoted(null) : setIsVoted(res.props.vote.vote_type)
                setVoteUpCount(res.props.vote_count.all_up_votes_count)
                setVoteDownCount(res.props.vote_count.all_down_votes_count)
            },
            onError: (err) => {
                console.log(err)
            }
        })
    }

    const voteUp = () => {
        vote('up')
    }

    const voteDown = () => {
        vote('down')
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
                            <div className={`font-bold cursor-pointer w-fit`}>{user?.name}<span className={`font-medium cursor-auto text-[--theme-secondary-text-color]`}> · {comment.created_at}</span></div>
                            <div className={`mt-3`}>{comment.body}</div>
                        </div>

                        <div className={`hover:bg-[--theme-nav-bg-color-hover] rounded-full p-2 h-fit cursor-pointer`}>
                            <RxDotsHorizontal className={`size-5`} />
                        </div>
                    </div>
                    <div className={`flex items-center gap-x-1`}>
                        <div className={`w-fit flex items-center bg-[--theme-nav-bg-color-hover] border border-[--theme-secondary-bg-color-hover] rounded-full`}>
                            <div onClick={voteUp} className={`flex items-center gap-x-1 px-4 py-1 border-e border-[--theme-secondary-bg-color-hover] hover:bg-[--theme-secondary-bg-color-hover] rounded-r-full cursor-pointer`}>
                                <div className={`flex items-center gap-x-1`}>
                                    {(isVoted === null || isVoted === 'down') && <PiArrowFatUp className={`text-[--theme-button-border-color] size-5`} />}
                                    {isVoted === 'up' && <PiArrowFatUpFill className={`text-[--theme-button-border-color] size-5`} />}
                                    <span>أويد ·</span>
                                </div>
                                <span>{voteUpCount}</span>
                            </div>
                            <div onClick={voteDown} className={`flex items-center h-full gap-x-2 px-4 py-1 rounded-l-full hover:bg-[--theme-secondary-bg-color-hover] cursor-pointer`}>
                                {(isVoted === null || isVoted === 'up') && <PiArrowFatDown className={`size-5`} />}
                                {isVoted === 'down' && <PiArrowFatDownFill className={`size-5 text-[--theme-primary-button-color]`} />}
                                <span>{voteDownCount}</span>
                            </div>
                        </div>
                        <button className={`hover:bg-[--theme-nav-bg-color-hover] rounded-full w-[40px] h-[40px] cursor-pointer`}>رد</button>
                        {comment.replies?.length !== 0 && !isReply &&
                            <button
                                onClick={toggleShowReplies}
                                className={`hover:bg-[--theme-nav-bg-color-hover] text-[--theme-secondary-text-color] rounded-full px-4 py-2 cursor-pointer`}>
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
