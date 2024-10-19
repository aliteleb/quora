import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {PiArrowFatDown, PiArrowFatDownFill, PiArrowFatUp, PiArrowFatUpFill} from "react-icons/pi";
import {FaRegComment} from "react-icons/fa";
import {CiShare2} from "react-icons/ci";
import {RxDotsHorizontal} from "react-icons/rx";
import {Link, router, useForm, usePage} from "@inertiajs/react";
import DefaultUserIcon from "@/Core/DefaultUserIcon.jsx";
import Comment from "@/Components/Comment.jsx";
import AddComment from "@/Components/AddComment.jsx";
import PostDropdown from "@/Components/PostDropdown.jsx";
import {useApp} from "@/AppContext/AppContext.jsx";
import {followUser} from "@/Utilities/followUser.js";

const Thread = forwardRef(({passed_thread, customStyles, setThreads, threads, isAnswer, userInfo, isProfilePage, canShare = true}, ref) => {
    const {user, returnToLoginPage} = useApp()

    const [thread, setThread] = useState(null);
    const [mainThread, setMainThread] = useState(passed_thread);
    const [isVoted, setIsVoted] = useState(null);
    const [voteUpCount, setVoteUpCount] = useState();
    const [voteDownCount, setVoteDownCount] = useState();
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentsCount, setCommentsCount] = useState();
    const [sharesCount, setSharesCount] = useState(mainThread?.shares_count);
    const [fetched, setFetched] = useState(false); // This state for controlling making requests when toggle the comment button
    const [isFetching, setIsFetching] = useState(false);
    const [nextPageUrl, setNextPageUrl] = useState('');
    const [showMoreCommentsLoading, setShowMoreCommentsLoading] = useState(false);
    const [openCommentsLoading, setOpenCommentsLoading] = useState(true);
    const [isPostDropdownOpen, setIsPostDropdownOpen] = useState(false);
    const [isFollowed, setIsFollowed] = useState(mainThread?.is_followed);
    const [isFollowBtnDisabled, setIsFollowBtnDisabled] = useState(false);
    const [isShared, setIsShard] = useState(false);

    const {data, setData, post, reset} = useForm({
        body: '',
        image: null,
        video: null,
        thread_id: mainThread?.id
    });

    useEffect(() => {
        if (passed_thread?.share) {
            setThread(passed_thread.share)
            setIsShard(true)
        } else {
            setThread(passed_thread)
        }
    }, []);

    useEffect(() => {
        setCommentsCount(mainThread?.comments_count)
    }, [mainThread?.comments_count]);

    useEffect(() => {
        setSharesCount(mainThread?.shares_count)
    }, [mainThread?.shares_count]);


    useEffect(() => {
        if (mainThread?.vote) {
            if (isAnswer && mainThread?.vote.vote_type) {
                setIsVoted(mainThread?.vote.vote_type)
            } else {
                setIsVoted(mainThread?.vote)
            }
        }
    }, [mainThread?.vote]);

    useEffect(() => {
        setVoteUpCount(mainThread?.up_votes)
        setVoteDownCount(mainThread?.down_votes)
    }, [mainThread?.up_votes, mainThread?.down_votes]);

    const loadMoreComments = (pageUrl) => {
        if (pageUrl && !isFetching) {
            setShowMoreCommentsLoading(true)
            setIsFetching(true);
            router.get(pageUrl, {thread_id: mainThread?.id}, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (page) => {
                    setComments(prevState => ([...prevState, ...page.props.comments.data]));
                    setNextPageUrl(page.props.next_page_url);
                    setIsFetching(false);
                    setShowMoreCommentsLoading(false)
                },
                onError: () => {
                    setIsFetching(false);
                    setShowMoreCommentsLoading(false)
                }
            });
        }
    };

    const getComments = () => {
        setOpenCommentsLoading(false)
        setFetched(true)
        router.get('/get-comments', {thread_id: mainThread?.id}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (res) => {
                setOpenCommentsLoading(true)
                setComments(res.props.comments.data)
                setNextPageUrl(res.props.next_page_url)
            },
            onError: () => {
                setOpenCommentsLoading(true)
            }
        })
    }

    const lastCommentRef = useRef(null);
    const show_comments = comments.map((comment, index) => (
        <Comment
            key={comment.id}
            comment={comment}
            ref={index === comments.length - 1 ? lastCommentRef : null}
            user={comment.user}
            thread_id={mainThread?.id}
            isReply={false}
            setComments={setComments}
            comments={comments}
            customStyles={index === comments.length - 1 ? 'pb-3' : ''}
            getComments={getComments}
            commentsCount={commentsCount}
            setCommentsCount={setCommentsCount}
        />
    ));

    const addComment = () => {
        post('/add-comment', {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (res) => {
                reset()
                setCommentsCount(commentsCount + 1)
                setComments(prevState => ([
                    res.props.comment.data,
                    ...prevState
                ]))
            },
            onError: () => {

            }
        })
    }

    const vote = (voteType, isAnswer = false) => {
        router.post('/vote', {thread_id: mainThread?.id, vote_type: voteType, isAnswer}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (res) => {
                console.log(res.props)
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
        if (!user){
            returnToLoginPage();
        }else {
            if (isAnswer) {
                vote('up', true)
            } else {
                vote('up', false)
            }
        }
    }

    const voteDown = () => {
        if (!user) {
            returnToLoginPage();
        }else {
            if (isAnswer) {
                vote('down', true)
            } else {
                vote('down', false)
            }
        }
    }

    const toggleComments = () => {
        setIsCommentsOpen(!isCommentsOpen)
    }

    const commentTextAreaRef = useRef(null);

    useEffect(() => {
        if (commentTextAreaRef.current) {
            commentTextAreaRef.current.style.height = 'auto';
            commentTextAreaRef.current.style.height = `${commentTextAreaRef.current.scrollHeight}px`;
        }
    }, [data.body]);

    const handleFileChange = (e) => {
        if (e.target.files[0].type.startsWith('image')) {
            setData('image', e.target.files[0])
        } else {
            setData('video', e.target.files[0])
        }
        e.target.value = null;
    }

    const handleCommentChange = (e) => {
        setData((formData) => ({
            ...formData,
            [e.target.name]: e.target.value,
        }));
    };

    const removeUploadedFile = () => {
        setData({
            ...data,
            image: null,
            video: null,
        });
    };

    const shareThread = () => {
        if (!user) {
            returnToLoginPage();
        }else {
            router.post(`/threads/${mainThread?.id}/${isShared ? 'un_share' : 'share'}`, {}, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (res) => {
                    setMainThread(res.props.thread?.data)
                    setIsShard(res.props.thread?.data.is_shared)
                }
            })
        }
    }

    return (
        <div ref={ref}
             className={`bg-[--theme-main-bg-color] w-full text-[--theme-primary-text-color] rounded ${!isCommentsOpen ? 'py-3' : 'pt-3'} ${customStyles} flex flex-col `}>
            <header className={`flex justify-between px-5`}>
                <div className={`flex gap-x-3`}>
                    {!isAnswer &&
                        <Link href={`/profile/${mainThread?.user?.username}`}>
                            {mainThread?.user?.avatar &&
                                <img src={mainThread?.user?.avatar} className={`size-9 rounded-full cursor-pointer`} alt={`avatar`}/>}
                            {(!mainThread?.user?.avatar && mainThread?.user) && <DefaultUserIcon/>}
                        </Link>
                    }
                    {isAnswer &&
                        <Link href={`/profile/${userInfo?.username}`}>
                            {userInfo?.avatar &&
                                <img src={userInfo?.avatar} className={`size-9 rounded-full cursor-pointer`} alt={`avatar`}/>}
                            {(!userInfo?.avatar && userInfo) && <DefaultUserIcon/>}
                        </Link>
                    }
                    <div>
                        <div className={`font-bold`}>
                            <Link href={`/profile/${isAnswer ? userInfo?.username : mainThread?.user?.username}`}
                                  className={`cursor-pointer`}>{isAnswer ? userInfo?.name : mainThread?.user?.name} {user?.id !== thread?.user?.id && `· `}
                            </Link>
                            {user?.id !== thread?.user?.id &&
                                <button
                                    disabled={isFollowBtnDisabled}
                                    onClick={() => followUser(mainThread?.user.id, setIsFollowed, isFollowed, setIsFollowBtnDisabled)}
                                    className={`${isFollowed ? 'text-[--theme-secondary-text-color]' : 'text-[--theme-button-border-color]'} cursor-pointer hover:underline`}
                                >
                                {isFollowed ? 'تمت المتابعة' : 'متابعة'}
                                </button>
                            }
                        </div>
                        <span>{mainThread?.created_at}</span>
                    </div>
                </div>
                {!isAnswer &&
                    <div onClick={() => {
                        setIsPostDropdownOpen(!isPostDropdownOpen)
                    }}
                         className={`relative h-fit cursor-pointer`}>
                        <div id={`postDropdownID`} className={`hover:bg-[--theme-nav-bg-color-hover] p-2 rounded-full`}>
                            <RxDotsHorizontal className={`size-5 pointer-events-none`}/>
                        </div>
                        {isPostDropdownOpen &&
                            <PostDropdown
                                isPostDropdownOpen={isPostDropdownOpen}
                                setIsPostDropdownOpen={setIsPostDropdownOpen}
                                setThreads={setThreads}
                                threads={threads}
                                thread={mainThread}
                                isProfilePage={isProfilePage}
                            />
                        }
                    </div>
                }
            </header>
            <main className={`flex flex-col gap-y-3`}>
                <div className={`${mainThread.share && 'my-6 px-0 mx-8 pt-4 pb-0 border border-[--theme-secondary-bg-color-hover] shadow rounded bg-[--theme-main-bg-color]'}`}>
                    {mainThread.share && (
                        <header className={`flex justify-between px-5`}>
                            <div className={`flex gap-x-3`}>
                                {!isAnswer &&
                                    <Link href={`/profile/${thread?.user?.username}`}>
                                        {thread?.user?.avatar &&
                                            <img src={thread?.user?.avatar} className={`size-9 rounded-full cursor-pointer`} alt={`avatar`}/>}
                                        {(!thread?.user?.avatar && thread?.user) && <DefaultUserIcon/>}
                                    </Link>
                                }
                                {isAnswer &&
                                    <Link href={`/profile/${userInfo?.username}`}>
                                        {userInfo?.avatar &&
                                            <img src={userInfo?.avatar} className={`size-9 rounded-full cursor-pointer`} alt={`avatar`}/>}
                                        {(!userInfo?.avatar && userInfo) && <DefaultUserIcon/>}
                                    </Link>
                                }
                                <div>
                                    <div className={`font-bold`}>
                                        <Link href={`/profile/${isAnswer ? userInfo?.username : thread?.user?.username}`}
                                              className={`cursor-pointer`}>{isAnswer ? userInfo?.name : thread?.user?.name}
                                        </Link>
                                    </div>
                                    <span>{thread?.created_at}</span>
                                </div>
                            </div>
                        </header>
                    )}


                    <div>
                        <div className={`px-5 my-2`}>{thread?.title ? thread?.title : thread?.thread?.title}</div>
                        {(!isAnswer && thread?.image) &&
                            <img
                                src={thread?.image}
                                alt="post-img"
                                className={`w-full max-h-[30rem]`}
                            />
                        }
                        {(isAnswer && thread?.thread?.media) &&
                            <img
                                src={thread?.thread?.media}
                                alt="post-img"
                                className={`w-full max-h-[30rem]`}
                            />
                        }
                        {/*  الإجابة على السؤال  */}
                        {isAnswer &&
                            <div className={`px-5 mt-3`}>
                                <div className={`font-bold`}>الإجابة:</div>
                                <div>{thread?.body}</div>
                                {thread?.media?.image &&
                                    <img
                                        src={thread?.media.image}
                                        alt="answer-img"
                                        className={`w-full max-h-[20rem] rounded`}
                                    />
                                }
                            </div>
                        }
                    </div>
                </div>
            </main>

            <footer className={`flex flex-col gap-y-2 text-[--theme-secondary-text-color] px-5 mt-2`}>
                {!isAnswer &&
                    <div>
                        <span className={`hover:underline cursor-pointer`}> {voteUpCount} تأييد · </span>
                        <span className={`hover:underline cursor-pointer`}> {sharesCount} مشاركة</span>
                    </div>
                }
                <div className={`flex justify-between text-[--theme-primary-text-color]`}>
                    <div className={`flex gap-x-1`}>
                        <div className={`flex items-center bg-[--theme-nav-bg-color-hover] border border-[--theme-secondary-bg-color-hover] rounded-full`}>
                            <div onClick={voteUp}
                                 className={`flex items-center gap-x-1 px-4 py-1 border-e border-[--theme-secondary-bg-color-hover] hover:bg-[--theme-secondary-bg-color-hover] rounded-r-full cursor-pointer`}>
                                <div className={`flex items-center gap-x-1`}>
                                    {(isVoted === null || isVoted === 'down') && <PiArrowFatUp className={`text-[--theme-button-border-color] size-5`}/>}
                                    {isVoted === 'up' && <PiArrowFatUpFill className={`text-[--theme-button-border-color] size-5`}/>}
                                    <span>أويد ·</span>
                                </div>
                                <span>{voteUpCount}</span>
                            </div>

                            <div onClick={voteDown}
                                 className={`flex items-center h-full gap-x-2 px-4 py-1 rounded-l-full hover:bg-[--theme-secondary-bg-color-hover] cursor-pointer`}>
                                {(isVoted === null || isVoted === 'up') && <PiArrowFatDown className={`size-5`}/>}
                                {isVoted === 'down' && <PiArrowFatDownFill className={`size-5 text-[--theme-primary-button-color]`}/>}
                                <span>{voteDownCount}</span>
                            </div>

                        </div>
                        {!isAnswer &&
                            <>
                                <div
                                    className={`flex items-center justify-center gap-x-1 hover:bg-[--theme-nav-bg-color-hover] rounded-full px-2 cursor-pointer`}
                                    onClick={() => {
                                        (!isCommentsOpen && !fetched) &&
                                        getComments()
                                        toggleComments()
                                    }}
                                >
                                    <FaRegComment/>
                                    <span>{commentsCount}</span>
                                </div>
                                {canShare &&
                                    <button
                                        onClick={shareThread}
                                        className={`flex items-center justify-center gap-x-1  hover:bg-[--theme-nav-bg-color-hover] rounded-full px-3 cursor-pointer`}>
                                        <CiShare2/>
                                        <span>{sharesCount}</span>
                                    </button>
                                }

                            </>
                        }
                    </div>
                </div>
            </footer>
            {isCommentsOpen &&
                <div>
                    {openCommentsLoading &&
                        <AddComment
                            ref={commentTextAreaRef}
                            handleCommentChange={handleCommentChange}
                            handleFileChange={handleFileChange}
                            removeUploadedFile={removeUploadedFile}
                            data={data}
                            addComment={addComment}
                            placeholder={mainThread?.type === 'post' ? 'أضف تعليق...' : 'أضف إجابة...'}
                            submitBtnText={mainThread?.type === 'post' ? 'أضف تعليق' : 'أضف إجابة'}
                        />
                    }
                    {openCommentsLoading ||
                        <div className={`flex justify-center py-5 bg-[--theme-input-bg-color]`}>
                            <div className='flex space-x-2 justify-center items-center'>
                                <span className='sr-only'>Loading...</span>
                                <div
                                    className='h-2 w-2 bg-[--theme-secondary-text-color] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                <div
                                    className='h-2 w-2 bg-[--theme-secondary-text-color]  rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                <div className='h-2 w-2 bg-[--theme-secondary-text-color]  rounded-full animate-bounce'></div>
                            </div>
                        </div>
                    }
                    {/* عرض التعليقات */}
                    <div className={`bg-[--theme-input-bg-color] ${nextPageUrl ? 'pb-3' : ''}`}>
                        {show_comments}
                        {nextPageUrl &&
                            <button
                                onClick={() => loadMoreComments(nextPageUrl)}
                                className={`bg-[--theme-main-bg-color] w-full py-3 mt-3`}
                            >
                                {showMoreCommentsLoading ? 'جارٍ التحميل...' : 'عرض المزيد'}
                            </button>
                        }
                    </div>

                </div>}
        </div>
    );
});

export default Thread;
