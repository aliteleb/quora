import React, {useEffect, useRef, useState} from 'react'
import Master from "@/Layouts/Master.jsx";
import {Head, router, usePage} from "@inertiajs/react";
import {useApp} from "@/AppContext/AppContext.jsx";
import {IoIosTrendingUp, IoMdAddCircleOutline} from "react-icons/io";
import SpaceAbout from "@/Pages/Spaces/Partials/SpaceAbout.jsx";
import SpacePosts from "@/Pages/Spaces/Partials/SpacePosts.jsx";
import {IoPersonAddOutline} from "react-icons/io5";
import {MdDone} from "react-icons/md";
import SpaceQuestions from "@/Pages/Spaces/Partials/SpaceQuestions.jsx";
import RecommendedSpace from "@/Pages/Spaces/Components/RecommendedSpace.jsx";

export default function ShowSpace() {

    const { user } = useApp()
    const {props} = usePage()

    const [isActive, setIsActive] = useState({
        about: false,
        posts: true,
        questions: false,
    });
    const [isFollowed, setIsFollowed] = useState(props.data?.space?.data.is_followed);
    const [posts, setPosts] = useState([]);
    const [postsNextPageUrl, setPostsNextPageUrl] = useState('');
    const [questions, setQuestions] = useState([]);
    const [questionsNextPageUrl, setQuestionsNextPageUrl] = useState('');
    const [isPostsFetching, setIsPostsFetching] = useState(false);
    const [isQuestionsFetching, setIsQuestionsFetching] = useState(false);
    const [recommendedSpaces, setRecommendedSpaces] = useState([]);
    const [space] = useState(props.data?.space?.data);


    useEffect(() => {
        setPosts(props.data.posts?.data)
        setPostsNextPageUrl(props.data.posts.links.next)

        setQuestions(props.data.questions.data)
        setQuestionsNextPageUrl(props.data.questions.links.next)

        setRecommendedSpaces(props.data.recommended_spaces.data)
    }, []);
    const handleClickOnAboutButton = (e) => {
        const button = e.target.id
        if (!isActive.button) {
            setIsActive({
                about: false,
                posts: false,
                questions: false,
                [button]: true,
            })
        }
    }
    const checkIfUserIsOwner = user?.id === space?.user.id
    const followSpace = () => {
        if (!isFollowed) {
            router.post(`/follow-space/${space?.id}`, {}, {
                preserveScroll: true,
                onSuccess: (res) => {
                    setIsFollowed(res.props.data.space?.data.is_followed)
                }
            })
        } else {
            router.post(`/unfollow-space/${space?.id}`, {}, {
                preserveScroll: true,
                onSuccess: (res) => {
                    setIsFollowed(res.props.data.space?.data.is_followed)
                }
            })
        }
    }

    const loadNextPosts = (pageUrl) => {
        if (pageUrl && !isPostsFetching) {
            setIsPostsFetching(true)
            router.get(pageUrl, {}, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (res) => {
                    setPosts(prevState => ([
                        ...prevState,
                        ...res.props.data.posts.data,
                    ]))
                    setPostsNextPageUrl(res.props.data.posts.links.next)
                    setIsPostsFetching(false)
                }
            })
        }
    }

    const lastPostRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && isActive.posts && !isPostsFetching) {
                loadNextPosts(postsNextPageUrl);
            }
        }, {
            threshold: 0.5 // Trigger when 50% of the last thread is visible
        });

        // Watch the last thread
        if (lastPostRef.current) {
            observer.observe(lastPostRef.current);
        }

        // Cleanup
        return () => {
            if (lastPostRef.current) {
                observer.unobserve(lastPostRef.current);
            }
        };
    }, [postsNextPageUrl, isActive.posts, isPostsFetching]);


    const loadNextQuestions = (pageUrl) => {
        if (pageUrl && !isQuestionsFetching) {
            setIsQuestionsFetching(true)
            router.get(pageUrl, {}, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (res) => {
                    setQuestions(prevState => ([
                        ...prevState,
                        ...res.props.data.questions.data,
                    ]))
                    setQuestionsNextPageUrl(res.props.data.questions.links.next)
                    setIsQuestionsFetching(false)
                }
            })
        }
    }

    const lastQuestionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && isActive.questions && !isQuestionsFetching) {
                loadNextQuestions(questionsNextPageUrl);
            }
        }, {
            threshold: 0.5 // Trigger when 50% of the last thread is visible
        });

        // Watch the last thread
        if (lastQuestionRef.current) {
            observer.observe(lastQuestionRef.current);
        }

        // Cleanup
        return () => {
            if (lastQuestionRef.current) {
                observer.unobserve(lastQuestionRef.current);
            }
        };
    }, [questionsNextPageUrl, isActive.questions, isQuestionsFetching]);

    const display_recommended_spaces = recommendedSpaces.map(space => (
        <RecommendedSpace key={space.id} space={space} checkIfUserIsOwner={checkIfUserIsOwner}/>
    ))

    return (
        <Master>
            <Head title={space?.name}/>
            <img
                src={space?.media?.cover ? space?.media?.cover : '/spaces/space_cover_default_image_space_page.webp'}
                alt="space-blur-cover"
                className={`h-[27rem] w-full blur-lg absolute`}
            />
            <div className={`flex flex-col container max-w-screen-xl mx-auto rounded z-10 relative`}>
                <div className={`relative`}>
                    <img
                        src={space?.media?.cover ? space?.media?.cover : '/spaces/space_cover_default_image_space_page.webp'}
                        alt="space-cover"
                        className={`h-[14rem] w-full rounded-b-xl`}
                    />
                    <img
                        src={space?.media?.poster ? space?.media?.poster : '/spaces/space_default_image.webp'}
                        alt="space-poster"
                        className={`w-36 h-36 absolute right-8 sm:right-16 top-1/2 rounded-3xl`}
                    />
                </div>
                <header className={`mt-12 flex flex-col gap-y-2 px-2`}>
                    <h1 className={`text-2xl font-extrabold`}>{space?.name}</h1>
                    <div>{space?.description}</div>
                    <div className={`flex justify-between items-center`}>
                        <div className={`flex gap-x-1`}>
                            <button className={`hover:underline underline-offset-2`}>
                                <span className={`font-bold`}>{`${space?.followers_count} `}</span>
                                متابعين
                            </button>
                            <span>· </span>
                            <span className={`flex`}>
                                <span className={`flex font-bold`}>{`\u00A0${space?.last_week_posts_count}\u00A0`}</span> منشورات الأسبوع الماضي
                            </span>

                        </div>
                        <button onClick={!checkIfUserIsOwner ? followSpace : null} className={`flex items-center gap-x-2 border ${!checkIfUserIsOwner && !isFollowed ? 'bg-[--theme-button-border-color] border-transparent' : ''}  rounded-full px-2 text-sm xxs:text-md xxs:px-6 py-1 xxs:py-2 font-bold`}>
                            {!checkIfUserIsOwner && isFollowed ? 'تمت المتابعة' : !checkIfUserIsOwner && !isFollowed ? 'متابعة' : 'دعوة'}
                            {!checkIfUserIsOwner && !isFollowed ? (<IoMdAddCircleOutline className={`text-2xl`}/>) : !checkIfUserIsOwner && isFollowed ? (<MdDone className={`text-2xl`}/>) : (<IoPersonAddOutline className={`text-2xl`}/>) }
                        </button>
                    </div>
                </header>
            </div>
            <main className={`h-[20rem] z-20 relative bg-[--theme-body-bg] w-full mt-10 px-2`}>
                <div className={`flex flex-col container max-w-screen-xl mx-auto rounded z-10 relative gap-y-6`}>
                    <header className={`flex border-b border-[--theme-main-bg-color] w-full`}>
                        <button
                            onClick={handleClickOnAboutButton}
                            id={`about`}
                            className={`py-3 px-5 ${isActive.about ? 'border-[--theme-button-border-color]' : 'border-transparent hover:bg-neutral-800'} border-b-[3px]`}>حول
                        </button>
                        <button
                            onClick={handleClickOnAboutButton}
                            id={`posts`}
                            className={`py-3 px-5 ${isActive.posts ? 'border-[--theme-button-border-color]' : 'border-transparent hover:bg-neutral-800'} border-b-[3px]`}>المنشورات
                        </button>
                        <button
                            onClick={handleClickOnAboutButton}
                            id={`questions`}
                            className={`py-3 px-5 ${isActive.questions ? 'border-[--theme-button-border-color]' : 'border-transparent hover:bg-neutral-800'} border-b-[3px]`}>الأسئلة
                        </button>
                    </header>
                    <div className={`grid grid-cols-[4fr_2.5fr] gap-x-10`}>
                        {isActive.about && <SpaceAbout space={space} isActive={isActive} checkIfUserIsOwner={checkIfUserIsOwner} handleClickOnAboutButton={handleClickOnAboutButton}/>}
                        {isActive.posts && <SpacePosts posts={posts} ref={lastPostRef}/>}
                        {isActive.questions && <SpaceQuestions questions={questions} ref={lastQuestionRef}/>}
                        <div className={`flex flex-col gap-y-3 ${isActive.posts ? 'mt-9' : ''}`}>
                            {display_recommended_spaces}
                        </div>
                    </div>
                </div>
            </main>
        </Master>
    )
}
