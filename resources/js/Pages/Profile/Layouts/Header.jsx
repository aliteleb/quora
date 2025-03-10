import React, {useEffect, useState} from 'react'
import {FiEdit} from "react-icons/fi";
import Button from "@/Core/Button.jsx";
import ProfileButton from "@/Pages/Profile/Components/ProfileButton.jsx";
import {router, usePage} from "@inertiajs/react";
import {useApp} from "@/AppContext/AppContext.jsx";
import {followUser} from "@/Utilities/followUser.js";
import FilterPosts from "@/Pages/Spaces/Components/FilterPosts.jsx";
import EditInfoModal from "@/Pages/Profile/Components/EditInfoModal.jsx";

export default function Header({isActive, setIsActive, threads, setThreads, setThreadsNextPageUrl, userInfo, setUserInfo, setIsAnswers, setIsLoading}) {
    const { user } = useApp()
    const { props, returnToLoginPage } = usePage()

    const [followersCount, setFollowersCount] = useState(props.user?.data.followers_count);
    const [followCount] = useState(props.user?.data.follow_count);
    const [isFollowed, setIsFollowed] = useState(props.is_followed);
    const [isFollowBtnDisabled, setIsFollowBtnDisabled] = useState(false);
    const [isBlocked, setIsBlocked] = useState(props.is_blocked);
    const [isBlockedBtnDisabled, setIsBlockedBtnDisabled] = useState(false);
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const [filterType, setFilterType] = useState('most_recent');
    const [sectionSelection, setSectionSelection] = useState('profile');
    const [isBtnClicked, setIsBtnClicked] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const blockUser = () => {
        setIsBlockedBtnDisabled(true)
        if (!user) {
            returnToLoginPage();
        }else {
            if (!isBlocked) {
                router.post(`/users/block/block/${userInfo?.id}`, {}, {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        setIsBlocked(true);
                        setIsBlockedBtnDisabled(false);
                    }
                })
            } else {
                router.post(`/users/block/unblock/${userInfo?.id}`, {}, {
                    preserveScroll: true,
                    preserveState: true,

                    onSuccess: () => {
                        setIsBlocked(false)
                        setIsBlockedBtnDisabled(false)
                    }
                })
            }
        }

    }

    const getAnswers = () => {
        setIsLoading(true)
        router.get(`/profile/answers/${userInfo?.id}/${filterType}`, {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (res) => {
                setThreads(res.props.answers.data)
                setThreadsNextPageUrl(res.props.answers?.links?.next)
                setIsLoading(false)
            }
        })
    }

    const handleClickOnButton = (e) => {
        const button = e.target.getAttribute('select')
        if (!isActive.button) {
            setIsActive({
                profile: false,
                questions: false,
                posts: false,
                answers: false,
                [button]: true,
            })
            setSectionSelection(button)
        }
        setIsBtnClicked(true)
        setIsAnswers(false)

    }

    const labels = {
        profile: 'الملف الشخصي',
        answers: 'إجابات',
        questions: 'أسئلة',
        posts: 'منشورات',
    };

    const active_label = Object.keys(isActive).find(key => isActive[key]);

    const filterThreads = (section, filter_type, isAnswer = false) => {
        setIsLoading(true)
        if (!isAnswer) {
            router.get(`/users/${userInfo?.id}/${section}/${filter_type}`, {}, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (res) => {
                    setThreads(res.props.threads.data)
                    setThreadsNextPageUrl(res.props.threads?.links?.next)
                    setIsLoading(false)
                }
            });
        } else {
            router.get(`/${section}/${sectionSelection}/${userInfo?.id}/${filter_type}`, {}, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (res) => {
                    setThreads(res.props.answers.data)
                    setThreadsNextPageUrl(res.props.answers?.links?.next)
                    setIsLoading(false)
                }
            });
        }

    }

    const handleFilterTypeSelect = (e) => {
        setFilterType(e?.target.value);
        setIsFilterDropdownOpen(false);
        if (isActive.profile || isActive.posts || isActive.questions) {
            e?.target.value === 'most_popular' ? filterThreads(sectionSelection, 'most_popular') : filterThreads(sectionSelection, 'most_recent');
        } else {
            e?.target.value === 'most_popular' ? filterThreads('profile', 'most_popular', true) : filterThreads('profile', 'most_recent', true)
        }
    };

    useEffect(() => {
        if ((isActive.profile || isActive.posts || isActive.questions) && isBtnClicked) {
            handleFilterTypeSelect()
        }
        setFilterType('most_recent')
    }, [isActive]);

    const toggleEditModalOpen = () => {
        setIsEditModalOpen(!isEditModalOpen)
    }

    return (
        <>
            <div className={`pb-2 pt-8 flex gap-x-4 w-full`}>

                <img
                    src={userInfo?.avatar ? userInfo?.avatar : '/profile-default-svgrepo-com.svg'}
                    alt="avatat"
                    className={`size-32 rounded-full`}
                />

                <div className={`flex flex-col gap-y-2 w-full`}>
                    <div className={`flex justify-between`}>
                        <h1 className={`text-3xl font-bold`}>{userInfo?.name}</h1>
                        {userInfo?.id === user?.id &&
                            <Button
                                onClick={toggleEditModalOpen}
                                content={`تعديل`}
                                custom_styles={`hidden xxs:block p-1 bg-transparent hover:bg-[--theme-main-bg-color] rounded-full px-4 py-2`}
                            />
                        }
                    </div>
                    <div className={`${!userInfo?.bio ? 'text-[--theme-placeholder-color]' : ''}`}>{userInfo?.bio ? userInfo.bio : 'نبذة'}</div>
                    <div className={`flex flex-col xs:flex-row gap-y-2 justify-between `}>
                        <div className={`flex justify-between items-center`}>
                            <div>
                                <span>{followersCount} متابعين · </span>
                                <span> يتابع {followCount}</span>
                            </div>
                            {userInfo?.id === user?.id &&
                                <Button
                                    onClick={toggleEditModalOpen}
                                    content={`تعديل`}
                                    custom_styles={`block xxs:hidden p-1 bg-transparent hover:bg-[--theme-main-bg-color] rounded-full px-4 py-2`}
                                />
                            }
                        </div>
                        {userInfo?.id !== user?.id &&
                            <div className={`flex flex-wrap gap-y-2 gap-x-2`}>
                                <Button
                                    disabled={isFollowBtnDisabled}
                                    onClick={() => followUser(userInfo.id, setIsFollowed, isFollowed, setIsFollowBtnDisabled, setFollowersCount, user)}
                                    content={isFollowed ? 'تمت المتابعة' : 'متابعة'}
                                    custom_styles={`border ${!isFollowed ? 'border-transparent' : 'bg-transparent'} `}
                                    isTypeFollow={true}
                                    isFollowed={isFollowed}
                                />
                                <Button
                                    disabled={isBlockedBtnDisabled}
                                    onClick={blockUser}
                                    content={isBlocked ? 'تم الحظر' : 'حظر'}
                                    custom_styles={`bg-[--theme-primary-button-color] border ${!isBlocked ? 'border-transparent' : 'bg-transparent'}`}
                                    isTypeBlock={true}
                                    isBlocked={isBlocked}
                                />
                            </div>
                        }
                    </div>

                </div>
            </div>

            <div className={`flex flex-col gap-y-3`}>
                <div className={`mt-5 flex border-b border-[--theme-secondary-bg-color-hover]`}>
                    <ProfileButton
                        select={`profile`}
                        custom_styles={isActive.profile ? 'border-[--theme-primary-button-color] text-[--theme-primary-button-color]' : 'border-transparent'}
                        onClick={handleClickOnButton}
                        content={`الملف الشخصي`}
                    />
                    <ProfileButton
                        select={`answers`}
                        custom_styles={isActive.answers ? 'border-[--theme-primary-button-color] text-[--theme-primary-button-color]' : 'border-transparent'}
                        onClick={(e) => {
                            handleClickOnButton(e)
                            getAnswers()
                            setIsAnswers(true)
                        }}
                        content={`${userInfo?.answers_count} إجابات`}
                    />
                    <ProfileButton
                        select={`questions`}
                        custom_styles={isActive.questions ? 'border-[--theme-primary-button-color] text-[--theme-primary-button-color]' : 'border-transparent'}
                        onClick={handleClickOnButton}
                        content={`${userInfo?.questions_count} أسئلة`}
                    />
                    <ProfileButton
                        select={`posts`}
                        custom_styles={isActive.posts ? 'border-[--theme-primary-button-color] text-[--theme-primary-button-color]' : 'border-transparent'}
                        onClick={handleClickOnButton}
                        content={`${userInfo?.posts_count} منشور`}
                    />
                </div>

                <div className={`flex justify-between border-b border-[--theme-secondary-bg-color-hover] pb-3 min-h-10`}>
                    <div className={`flex gap-x-2`}>
                        {labels[active_label] !== 'الملف الشخصي' && <span>{isActive.answers ? userInfo?.answers_count : isActive.questions ? userInfo?.questions_count : isActive.posts ? userInfo?.posts_count : null}</span>}
                        <span>{labels[active_label]}</span>
                    </div>

                    {threads?.length > 0 &&
                        <div className={`relative`}>
                            <Button
                                content={filterType === 'most_recent' ? 'الأحدث' : 'الأكثر تفاعلا'}
                                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                                isDropDown={true}
                                custom_styles={`justify-center bg-transparent hover:bg-[--theme-main-bg-color] min-w-[115px]`}
                            />
                            <FilterPosts
                                isFilterDropdownOpen={isFilterDropdownOpen}
                                setIsFilterDropdownOpen={setIsFilterDropdownOpen}
                                filterType={filterType}
                                handleFilterTypeSelect={handleFilterTypeSelect}
                                custom_styles={`!left-1/2 right-auto filterThreadsInProfilePage w-max`}
                            />
                        </div>
                    }

                </div>
            </div>


            <EditInfoModal
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                toggleEditModalOpen={toggleEditModalOpen}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
            />

        </>

    )
}
