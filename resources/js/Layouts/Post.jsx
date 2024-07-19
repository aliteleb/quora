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

const Post = forwardRef(({ thread }, ref) => {
    const { user } = useApp();
    const [isVoted, setIsVoted] = useState(null);
    const [voteUpCount, setVoteUpCount] = useState(thread.up_votes);
    const [voteDownCount, setVoteDownCount] = useState(thread.down_votes);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const { data, setData, post, errors, reset } = useForm({
        body: '',
        image: null,
        video: null,
        thread_id: thread.id
    });

    const addComment = () => {
        post('/add-comment', {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                reset()
            },
            onError: () => {

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
                        <div onClick={toggleComments} className={`flex items-center gap-x-1 hover:bg-[--theme-nav-bg-color-hover] rounded-full px-2 cursor-pointer`}>
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
            {isCommentsOpen &&
                <div className={``}>
                    <div className={`flex items-center gap-x-1 flex-grow px-5 py-3 bg-[#202020]`}>
                        <DefaultUserIcon />
                        <div className={`relative flex-grow flex flex-col items-center`}>
                            <textarea
                                className={`w-full h-[45px] ${data.body.length < 67 ? '!h-[45px]' : ''} pl-[38px] rounded resize-none bg-[--theme-body-bg] border-[--theme-secondary-bg-color-hover]`}
                                maxLength={600}
                                placeholder={'أضف تعليق...'}
                                ref={commentTextAreaRef}
                                name="body"
                                value={data.body}
                                onChange={handleCommentChange}
                            />
                            <label htmlFor="upload_comment_img" className={`block w-fit absolute left-3 ${!data.image && !data.video ? 'top-1/2 -translate-y-1/2' : 'top-[11px]'} `}>
                                <Input type={'file'} id={'upload_comment_img'} visibility={'hidden'} onChange={handleFileChange} />
                                <FaCloudUploadAlt className={`size-6 text-[--theme-secondary-text-color] cursor-pointer ${(data.image && !data.video) || (data.video && !data.image) ? 'pointer-events-none opacity-40' : ''}`} />
                            </label>
                            {/* Preview uploaded image */}
                            {(data.image && !data.video) &&
                                <div
                                    className={`${!data.image ? 'invisible' : 'visible w-full pb-3 border-zinc-700/70 relative'} mt-3`}>
                                    <div onClick={removeUploadedFile}
                                         className="absolute right-2 top-2 p-1 cursor-pointer hover:bg-neutral-700 bg-neutral-600/30 flex justify-center items-center rounded-full transition">
                                        <HiMiniXMark className={`size-6`} />
                                    </div>
                                    <img className={`w-full max-h-[20rem] rounded object-cover`}
                                         src={data?.image ? URL.createObjectURL(data?.image) : ''}
                                         alt="post-img" />
                                </div>
                            }

                            {/* Preview uploaded video */}
                            {(data.video && !data.image) &&
                                <div
                                    className={`${!data.video ? 'invisible' : 'visible w-full pb-3 relative'} mt-3`}>
                                    <div onClick={removeUploadedFile}
                                         className="absolute z-50 right-2 top-2 p-1 cursor-pointer hover:bg-neutral-700 bg-neutral-600/30 flex justify-center items-center rounded-full transition">
                                        <HiMiniXMark className={`size-6`} />
                                    </div>
                                    <video
                                        src={URL.createObjectURL(data.video)}
                                        className={`w-full max-h-[20rem] rounded`}
                                        controls
                                    />
                                </div>
                            }
                        </div>

                        <div onClick={addComment}>
                            <button className={`xs:block hidden rounded-full px-4 py-1 bg-[--theme-button-border-color]`}>أضف تعليق</button>
                            <button className={`block xs:hidden rounded-full px-4 py-1 bg-[--theme-button-border-color]`}>أضف</button>
                        </div>
                    </div>

                    {/* عرض التعليقات */}
                    <div>
                        <Comment customStyles={`border-b border-[--theme-secondary-bg-color-hover] pb-6`} />
                        <Comment customStyles={`border-b border-[--theme-secondary-bg-color-hover] pb-6`} />
                        <Comment customStyles={`border-b border-[--theme-secondary-bg-color-hover] pb-6`} />
                        <Comment />
                    </div>

                </div>}
        </div>
    );
});

export default Post;
