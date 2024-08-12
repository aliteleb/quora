import React, {forwardRef, useEffect, useRef, useState} from 'react'
import DefaultUserIcon from "@/Core/DefaultUserIcon.jsx";
import {RxDotsHorizontal} from "react-icons/rx";
import {PiArrowFatDown, PiArrowFatDownFill, PiArrowFatUp, PiArrowFatUpFill} from "react-icons/pi";
import {router, useForm} from "@inertiajs/react";
import AddComment from "@/Components/AddComment.jsx";
import CommentDropdownMenu from "@/Components/CommentDropdownMenu.jsx";

const Comment = forwardRef(({comment, customStyles, isReply, user, thread_id, setComments, comments, getComments, commentsCount, setCommentsCount}, ref) => {

    const [replies, setReplies] = useState([]);
    const [showReplies, setShowReplies] = useState(false);
    const [isVoted, setIsVoted] = useState(null);
    const [voteUpCount, setVoteUpCount] = useState(comment.up_votes);
    const [voteDownCount, setVoteDownCount] = useState(comment.down_votes);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);


    const { data, setData, post, errors, reset } = useForm({
        body: '',
        image: null,
        video: null,
        comment_id: comment.id,
        thread_id: thread_id,
    });

    useEffect(() => {
        setReplies(comment.replies)
        setIsVoted(comment.vote)
    }, [comment]);

    const show_replies = replies?.map((reply, index) => (
        <Comment
            key={index}
            comment={reply}
            isReply={true}
            user={reply.user}
            thread_id={thread_id}
            getComments={getComments}
            comments={comments}
            commentsCount={commentsCount}
            setCommentsCount={setCommentsCount}
        />
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
        })
    }

    const voteUp = () => {
        vote('up')
    }

    const voteDown = () => {
        vote('down')
    }

    const replyTextAreaRef = useRef(null);

    useEffect(() => {
        if (replyTextAreaRef.current) {
            replyTextAreaRef.current.style.height = 'auto';
            replyTextAreaRef.current.style.height = `${replyTextAreaRef.current.scrollHeight}px`;
        }
    }, [data.body]);

    const handleReplyChange = (e) => {
        setData((formData) => ({
            ...formData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFileChange = (e) => {
            console.log('comment image uploaded')
        if (e.target.files[0].type.startsWith('image')) {
            setData('image', e.target.files[0])
        } else {
            setData('video', e.target.files[0])
        }
        e.target.value = null;
    }

    const removeUploadedFile = () => {
        setData({
            ...data,
            image: null,
            video: null,
        });
    };

    const addReply = () => {
        post('/add-comment', {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (res) => {
                reset()
                setCommentsCount(commentsCount + 1)
                setShowReplyInput(false)
                getComments()
            },
            onError: () => {
                setShowReplyInput(false)
            }
        })
    }

    const toggleShowReplyInput = () => {
        setShowReplyInput(!showReplyInput)
    }

    return (
        <>
            <div ref={ref} className={`pt-3 flex flex-col gap-x-3 ${customStyles ? customStyles : ''}`}>
                <div className={`${isReply ? 'ps-20 pe-5' : 'px-5'} flex items-center justify-between gap-x-3`}>
                    <div className={`flex items-center gap-x-3`}>
                        <DefaultUserIcon/>
                        <div className={`font-bold cursor-pointer w-fit`}>{user?.name}<span className={`font-medium cursor-auto text-[--theme-secondary-text-color]`}> · {comment.created_at}</span></div>
                    </div>

                    <div className={`relative`}>
                        <div id={`commentDropdownMenu`} onClick={() => setIsCommentModalOpen(!isCommentModalOpen)} className={`hover:bg-[--theme-nav-bg-color-hover] rounded-full p-2 h-fit cursor-pointer`}>
                            <RxDotsHorizontal className={`size-5`}/>
                        </div>
                        {isCommentModalOpen &&
                            <CommentDropdownMenu
                                isCommentModalOpen={isCommentModalOpen}
                                setIsCommentModalOpen={setIsCommentModalOpen}
                                commentUserId={comment.user.id}
                                commentId={comment.id}
                                setComments={setComments}
                                comments={comments}
                                setCommentsCount={setCommentsCount}
                                commentsCount={commentsCount}
                                comment={comment}
                                replies={replies}
                                setReplies={setReplies}
                            />
                        }
                    </div>
                </div>
                <div className={`flex flex-col gap-y-2 w-full ${isReply ? 'ps-20' : 'px-5'}`}>
                    <div className={`flex flex-col justify-between px-12 gap-y-2`}>
                        <div className={`mt-3 w-full break-words`}>{comment.body}</div>

                        {comment.media?.image &&
                            <img className={`w-full max-h-[20rem] rounded object-cover`}
                              src={comment.media?.image}
                              alt="post-img"
                            />
                        }
                        {comment.media?.video &&
                            <video className={`w-full max-h-[20rem] rounded object-cover`}
                                 src={comment.media?.video}
                            />
                        }

                    </div>
                    <div className={`flex items-center gap-x-1 px-12`}>
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
                        <button onClick={toggleShowReplyInput} className={`hover:bg-[--theme-nav-bg-color-hover] rounded-full w-[40px] h-[40px] cursor-pointer`}>رد</button>
                        {comment.replies?.length !== 0 && !isReply &&
                            <button
                                onClick={toggleShowReplies}
                                className={`hover:bg-[--theme-nav-bg-color-hover] text-[--theme-secondary-text-color] rounded-full px-4 py-2 cursor-pointer`}>
                                {showReplies ? 'إخفاء الردود' : 'عرض الردود'}
                            </button>
                        }
                    </div>
                {/*  أضف رد  */}
                </div>

                {showReplyInput &&
                    <AddComment
                        ref={replyTextAreaRef}
                        handleCommentChange={handleReplyChange}
                        handleFileChange={handleFileChange}
                        removeUploadedFile={removeUploadedFile}
                        data={data}
                        addComment={addReply}
                        customStyles={`!ps-20`}
                        placeholder={'أضف رد...'}
                        submitBtnText={'أضف رد'}
                        replyTo={comment.user.name}
                        comment_id={comment.id}
                        thread_id={thread_id}
                        getComments={getComments}
                    />
                }

            </div>
            {/*  عرض الردود  */}
            {(showReplies) &&
                <div className={`pb-3`}>
                    {show_replies}
                </div>
            }
        </>
    )
})

export default Comment;
