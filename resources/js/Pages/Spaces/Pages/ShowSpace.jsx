import React, {useEffect, useRef, useState} from 'react'
import Master from "@/Layouts/Master.jsx";
import {Head, router, usePage} from "@inertiajs/react";
import {useApp} from "@/AppContext/AppContext.jsx";
import {IoIosTrendingUp, IoMdAddCircleOutline} from "react-icons/io";
import SpaceAbout from "@/Pages/Spaces/Partials/SpaceAbout.jsx";
import SpacePosts from "@/Pages/Spaces/Partials/SpacePosts.jsx";
import {IoChevronDownOutline, IoPersonAddOutline} from "react-icons/io5";
import {MdDone} from "react-icons/md";
import SpaceQuestions from "@/Pages/Spaces/Partials/SpaceQuestions.jsx";
import RecommendedSpace from "@/Pages/Spaces/Components/RecommendedSpace.jsx";
import FilterPosts from "@/Pages/Spaces/Components/FilterPosts.jsx";

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
    const [filterType, setFilterType] = useState('most_recent');
    const [filteredNextPageUrl, setFilteredNextPageUrl] = useState('');

    useEffect(() => {
        setPosts(props.data?.posts?.data)
        setPostsNextPageUrl(props.data?.posts.links.next)

        setQuestions(props.data?.questions.data)
        setQuestionsNextPageUrl(props.data?.questions.links.next)

        setRecommendedSpaces(props.data?.recommended_spaces.data)
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
                        ...res.props.data?.posts?.data,
                    ]))
                    setPostsNextPageUrl(res.props.data?.posts?.links.next)
                    setIsPostsFetching(false)
                }
            })
        }
    }

    const lastPostRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && isActive.posts && !isPostsFetching) {
                console.log('called')

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
    }, [questionsNextPageUrl, isActive.questions, isQuestionsFetching, posts]);

    const display_recommended_spaces = recommendedSpaces?.map((space, index) => (
        <RecommendedSpace key={space.id} space={space} checkIfUserIsOwner={checkIfUserIsOwner} customStyles={index === recommendedSpaces.length - 1 ? 'sm:col-span-2 min-h-32' : ''}/>
    ))

    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const section = isActive.posts ? 'posts' : 'question'
    const handleFilterTypeSelect = (e) => {
        setFilterType(e.target.value);
        setIsFilterDropdownOpen(false);
        e.target.value === 'most_popular' ? filterThreads(section, 'most_popular') : filterThreads(section, 'most_recent');
    };
    const filterThreads = (section, filter_type) => {
        router.get(`/spaces/filter/${section}/${filter_type}/${space?.id}`, {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (res) => {
                section === 'posts' ? setPosts(res.props.threads.data) : setQuestions(res.props.threads.data);
                setFilteredNextPageUrl(res.props.threads.links.next);
            }
        });
    };

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
                        <div className={`flex xxs:flex-row flex-col items-start justify-center gap-x-1`}>
                            <button className={`hover:underline underline-offset-2`}>
                                <span className={`font-bold`}>{`${space?.followers_count} `}</span>
                                متابعين
                            </button>
                            <span className={`hidden xxs:block`}>· </span>
                            <span className={`flex`}>
                                <span className={`flex font-bold -ms-1`}>{`\u00A0${space?.last_week_posts_count}\u00A0`}</span> منشورات الأسبوع الماضي
                            </span>

                        </div>
                        <button onClick={!checkIfUserIsOwner ? followSpace : null} className={`flex items-center h-fit gap-x-2 border ${!checkIfUserIsOwner && !isFollowed ? 'bg-[--theme-button-border-color] border-transparent' : ''}  rounded-full px-2 text-sm xxs:text-md xxs:px-6 py-1 xxs:py-2 font-bold`}>
                            {!checkIfUserIsOwner && isFollowed ? 'تمت المتابعة' : !checkIfUserIsOwner && !isFollowed ? 'متابعة' : 'دعوة'}
                            {!checkIfUserIsOwner && !isFollowed ? (<IoMdAddCircleOutline className={`text-2xl`}/>) : !checkIfUserIsOwner && isFollowed ? (<MdDone className={`text-2xl`}/>) : (<IoPersonAddOutline className={`text-2xl`}/>) }
                        </button>
                    </div>
                </header>
            </div>
            <main className={`h-[20rem] z-20 relative bg-[--theme-body-bg] w-full mt-10 px-2`}>
                <div className={`flex flex-col container max-w-screen-xl mx-auto rounded z-10 relative gap-y-6`}>
                    <header className={`flex border-b border-[--theme-main-bg-color] ${isActive.about ? 'w-[60%]' : 'w-full'} `}>
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

                    <div className={`flex flex-col-reverse gap-y-10 lg:gap-y-0 lg:grid grid-cols-[4fr_2.5fr] ${isActive.about ? 'gap-x-[32px]' : 'gap-x-10'}`}>
                        <div className={`w-full flex flex-col gap-y-3`}>
                            <div className={`relative`}>
                                <button onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)} className={`flex items-center gap-x-2`}>
                                    <IoIosTrendingUp />
                                    <span>{filterType === 'most_popular' ? 'الأكثر تفاعلا' : 'الأحدث'}</span>
                                    <IoChevronDownOutline />
                                </button>
                                <FilterPosts
                                    isFilterDropdownOpen={isFilterDropdownOpen}
                                    setIsFilterDropdownOpen={setIsFilterDropdownOpen}
                                    filterType={filterType}
                                    handleFilterTypeSelect={handleFilterTypeSelect}
                                />
                            </div>
                            <div className={`flex flex-col-reverse gap-y-10 ${isActive.about ? 'gap-x-[32px]' : 'gap-x-10'} `}>
                                {isActive.about &&
                                    <SpaceAbout
                                        space={space}
                                        isActive={isActive}
                                        checkIfUserIsOwner={checkIfUserIsOwner}
                                        handleClickOnAboutButton={handleClickOnAboutButton}
                                    />
                                }
                                {isActive.posts &&
                                    <SpacePosts
                                        posts={posts}
                                        setPosts={setPosts}
                                        ref={lastPostRef}
                                        filteredNextPageUrl={filteredNextPageUrl}
                                        setFilteredNextPageUrl={setFilteredNextPageUrl}
                                        filterType={filterType}
                                    />
                                }
                                {isActive.questions &&
                                    <SpaceQuestions
                                        questions={questions}
                                        setQuestions={setQuestions}
                                        ref={lastQuestionRef}
                                        filteredNextPageUrl={filteredNextPageUrl}
                                        setFilteredNextPageUrl={setFilteredNextPageUrl}
                                        filterType={filterType}
                                    />
                                }
                            </div>
                        </div>



                        {(isActive.posts || isActive.questions) &&
                            <div>
                                <h1>مساحات قد تعجبك</h1>
                                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:flex flex-col gap-x-3 gap-y-3 mt-3`}>
                                    {display_recommended_spaces}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </main>
        </Master>
    )
}
