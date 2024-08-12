import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { PiArrowFatDown, PiArrowFatDownFill, PiArrowFatUp, PiArrowFatUpFill } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { RxDotsHorizontal } from "react-icons/rx";
import {Link, router, useForm} from "@inertiajs/react";
import DefaultUserIcon from "@/Core/DefaultUserIcon.jsx";
import Comment from "@/Components/Comment.jsx";
import AddComment from "@/Components/AddComment.jsx";
import PostDropdown from "@/Components/PostDropdown.jsx";
import {useApp} from "@/AppContext/AppContext.jsx";

const Post = forwardRef(({ thread, customStyles, setThreads, threads }, ref) => {

    const { user } = useApp()

    const [isVoted, setIsVoted] = useState();
    const [voteUpCount, setVoteUpCount] = useState();
    const [voteDownCount, setVoteDownCount] = useState();
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentsCount, setCommentsCount] = useState(thread.comments_count);
    const [sharesCount, setSharesCount] = useState(thread.all_shares_count);
    const [fetched, setFetched] = useState(false); // This state for controlling making requests when toggle the comment button
    const [isFetching, setIsFetching] = useState(false);
    const [nextPageUrl, setNextPageUrl] = useState('');
    const [showMoreCommentsLoading, setShowMoreCommentsLoading] = useState(false);
    const [openCommentsLoading, setOpenCommentsLoading] = useState(true);
    const [isPostDropdownOpen, setIsPostDropdownOpen] = useState(false);

    const { data, setData, post, reset } = useForm({
        body: '',
        image: null,
        video: null,
        thread_id: thread.id
    });

    useEffect(() => {
        setIsVoted(thread.vote)
    }, [thread.vote]);

    useEffect(() => {
        setVoteUpCount(thread.up_votes)
        setVoteDownCount(thread.down_votes)
    }, [thread.up_votes, thread.down_votes]);

    const loadMoreComments = (pageUrl) => {
        if (pageUrl && !isFetching) {
            setShowMoreCommentsLoading(true)
            setIsFetching(true);
            router.get(pageUrl, { thread_id: thread.id }, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (page) => {
                    setComments(prevState => ([...prevState, ...page.props.comments.data]));
                    setNextPageUrl(page.props.next_page_url);
                    setIsFetching(false);
                    setShowMoreCommentsLoading(false)
                    window.history.replaceState({}, ``, `/`)
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
        router.get('/get-comments', {thread_id: thread.id}, {
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
            thread_id={thread.id}
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
            onSuccess: () => {
                reset()
                setCommentsCount(commentsCount + 1)
                getComments()
            },
        })
    }

    useEffect(() => {
        setIsVoted(thread.vote)
    }, []);

    const vote = (voteType) => {
        router.post('/vote', { thread_id: thread.id, vote_type: voteType }, {
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
        vote('up')
    }

    const voteDown = () => {
        vote('down')
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

    return (
        <div ref={ref} className={`bg-[--theme-main-bg-color] w-full text-[--theme-primary-text-color] rounded ${!isCommentsOpen ? 'py-3' : 'pt-3'} ${customStyles} flex flex-col gap-y-4`}>
            <header className={`flex justify-between px-5`}>
                <div className={`flex gap-x-3`}>
                    <Link href={`/profile/${thread.user?.username}`}>
                        {thread.user?.avatar && <img src={``} className={`md:size-9 size-7 rounded-full cursor-pointer`} />}
                        {(!thread.user?.avatar && thread.user) && <DefaultUserIcon />}
                    </Link>
                    <div>
                        <div className={`font-bold`}>
                            <Link href={`/profile/${thread.user?.username}`} className={`cursor-pointer`}>{thread.user?.name} · </Link>
                            <span className={`text-[--theme-button-border-color] cursor-pointer hover:underline`}>متابعة</span>
                        </div>
                        <span>{thread.created_at}</span>
                    </div>
                </div>
                <div onClick={() => setIsPostDropdownOpen(!isPostDropdownOpen)} className={`relative h-fit cursor-pointer`}>
                    <div id={`postDropdownID`} className={`hover:bg-[--theme-nav-bg-color-hover] p-2 rounded-full`}>
                        <RxDotsHorizontal className={`size-5`} />
                    </div>
                    {isPostDropdownOpen &&
                        <PostDropdown
                            isPostDropdownOpen={isPostDropdownOpen}
                            setIsPostDropdownOpen={setIsPostDropdownOpen}
                            id={thread.id}
                            setThreads={setThreads}
                            threads={threads}
                            thread={thread}
                        />
                    }
                </div>
            </header>
            <main className={`flex flex-col gap-y-3`}>
                <div className={`px-5`}>{thread.title}</div>
                {thread.image &&
                    <img
                    src={thread.image}
                    alt="post-img"
                    className={`w-full object-cover max-h-[30rem]`}
                    />
                }
            </main>
            <footer className={`flex flex-col gap-y-2 text-[--theme-secondary-text-color] px-5`}>
                <div>
                    <span className={`hover:underline cursor-pointer`}> {voteUpCount} تأييد · </span>
                    <span className={`hover:underline cursor-pointer`}> {thread.all_shares_count} مشاركة</span>
                </div>
                <div className={`flex justify-between text-[--theme-body-color]`}>
                    <div className={`flex gap-x-1`}>
                        <div className={`flex items-center bg-[--theme-nav-bg-color-hover] border border-[--theme-secondary-bg-color-hover] rounded-full`}>
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
                        <div onClick={() => {
                            (!isCommentsOpen && !fetched) && getComments()
                            toggleComments()
                        }} className={`flex items-center justify-center gap-x-1 hover:bg-[--theme-nav-bg-color-hover] rounded-full px-2 cursor-pointer`}>
                            <FaRegComment />
                            <span>{commentsCount}</span>
                        </div>
                        <div className={`flex items-center justify-center gap-x-1 hover:bg-[--theme-nav-bg-color-hover] rounded-full px-2 cursor-pointer`}>
                            <CiShare2 />
                            <span>{sharesCount}</span>
                        </div>
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
                            placeholder={thread.type === 'post' ? 'أضف تعليق...' : 'أضف إجابة...'}
                            submitBtnText={thread.type === 'post' ? 'أضف تعليق' : 'أضف إجابة'}
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
                        </div>}
                    {/* عرض التعليقات */}
                    <div className={`bg-[--theme-input-bg-color] ${nextPageUrl ? 'pb-3' : ''}`}>
                        {show_comments}
                        {nextPageUrl && <button onClick={() => loadMoreComments(nextPageUrl)} className={`bg-[--theme-main-bg-color] w-full py-3 mt-3`}>
                            {showMoreCommentsLoading ? 'جارٍ التحميل...' : 'عرض المزيد'}
                        </button>}
                    </div>

                </div>}
        </div>
    );
});

export default Post;
