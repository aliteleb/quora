import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { PiArrowFatDown, PiArrowFatDownFill, PiArrowFatUp, PiArrowFatUpFill } from "react-icons/pi";
import { FaCloudUploadAlt, FaRegComment } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { RxDotsHorizontal } from "react-icons/rx";
import { useApp } from "@/AppContext/AppContext.jsx";
import { router, useForm, usePage } from "@inertiajs/react";
import DefaultUserIcon from "@/Core/DefaultUserIcon.jsx";
import Input from "@/Core/Input.jsx";
import { RiImageAddLine } from "react-icons/ri";
import Comment from "@/Components/Comment.jsx";
import { HiMiniXMark } from "react-icons/hi2";
import AddComment from "@/Components/AddComment.jsx";

const Post = forwardRef(({ thread }, ref) => {
    const { user } = useApp();
    const [isVoted, setIsVoted] = useState(null);
    const [voteUpCount, setVoteUpCount] = useState(thread.up_votes);
    const [voteDownCount, setVoteDownCount] = useState(thread.down_votes);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [fetched, setFetched] = useState(false); // This state for controlling making requests when toggle the comment button
    const [isFetching, setIsFetching] = useState(false); // Flag to track fetch status in pagination
    const [nextPageUrl, setNextPageUrl] = useState('');
    const [showMoreCommentsLoading, setShowMoreCommentsLoading] = useState(false);
    const [openCommentsLoading, setOpenCommentsLoading] = useState(true);


    const { data, setData, post, errors, reset } = useForm({
        body: '',
        image: null,
        video: null,
        thread_id: thread.id
    });

    const loadMoreComments = (pageUrl) => {
        if (pageUrl && !isFetching) {
            setShowMoreCommentsLoading(true)
            setIsFetching(true);
            router.get(pageUrl, { thread_id: thread.id }, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (page) => {
                    // Combine new comments with the existing ones
                    setComments(prevState => [...prevState, ...page.props.comments.data]);
                    setNextPageUrl(page.props.next_page_url);
                    setIsFetching(false); // Set fetch status to false after fetch completes
                    setShowMoreCommentsLoading(false)
                    window.history.replaceState({}, '', '/');
                },
                onError: () => {
                    setIsFetching(false); // Set fetch status to false if an error occurs
                    setShowMoreCommentsLoading(false)
                }
            });
        }
    };

    const lastCommentRef = useRef(null);
    const show_comments = comments.map((comment, index) => (
        <Comment key={comment.id} comment={comment} ref={index === comments.length - 1 ? lastCommentRef : null} user={comment.user} thread_id={thread.id}/>
    ));

    const addComment = () => {
        post('/add-comment', {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                reset()
                window.history.replaceState({}, '', '/');
            },
            onError: () => {
                window.history.replaceState({}, '', '/');
            }
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

    useEffect(() => {
        console.log(data)
    }, [data]);

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
                window.history.replaceState({}, '', '/');
            },
            onError: () => {
                window.history.replaceState({}, '', '/');
                setOpenCommentsLoading(true)
            }
        })
    }

    return (
        <div ref={ref} className={`bg-[--theme-main-bg-color] w-full text-[--theme-primary-text-color] rounded py-3 flex flex-col gap-y-4`}>
            <header className={`flex justify-between px-5`}>
                <div className={`flex gap-x-3`}>
                    <div>
                        {thread.user?.avatar && <img src={``} className={`md:size-9 size-7 rounded-full cursor-pointer`} />}
                        {(!thread.user?.avatar && thread.user) && <DefaultUserIcon />}
                    </div>
                    <div>
                        <div className={`font-bold`}>
                            <span className={`cursor-pointer`}>{thread.user.name} · </span>
                            <span className={`text-[--theme-button-border-color] cursor-pointer hover:underline`}>متابعة</span>
                        </div>
                        <span>15 أبريل</span>
                    </div>
                </div>
                <div className={`hover:bg-[--theme-nav-bg-color-hover] rounded-full p-2 h-fit cursor-pointer`}>
                    <RxDotsHorizontal className={`size-5`} />
                </div>
            </header>
            <main className={`flex flex-col gap-y-3`}>
                <div className={`px-5`}>{thread.title}</div>
                <img
                    src={thread.image}
                    alt="post-img"
                    className={`w-full object-cover max-h-[30rem]`}
                />
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
                            <span>{thread.comments_count}</span>
                        </div>
                        <div className={`flex items-center justify-center gap-x-1 hover:bg-[--theme-nav-bg-color-hover] rounded-full px-2 cursor-pointer`}>
                            <CiShare2 />
                            <span>{thread.all_shares_count}</span>
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
                            placeholder={'أضف تعليق...'}
                            submitBtnText={`أضف تعليق`}
                        />
                    }
                    {openCommentsLoading ||
                        <div className={`flex justify-center py-5 bg-[#202020]`}>
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
                    <div>
                        {show_comments}
                        {nextPageUrl && <button onClick={() => loadMoreComments(nextPageUrl)} className={`bg-[#202020] w-full py-3 mt-3`}>
                            {showMoreCommentsLoading ? 'جارٍ التحميل...' : 'عرض المزيد'}
                        </button>}
                    </div>

                </div>}
        </div>
    );
});

export default Post;
