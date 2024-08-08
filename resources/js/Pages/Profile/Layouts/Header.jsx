import React, {useEffect, useState} from 'react'
import {FiEdit} from "react-icons/fi";
import Button from "@/Core/Button.jsx";
import ProfileButton from "@/Pages/Profile/Components/ProfileButton.jsx";
import {router, usePage} from "@inertiajs/react";
import {useApp} from "@/AppContext/AppContext.jsx";
import {followUser} from "@/Utilities/followUser.js";

export default function Header({isActive, setIsActive, profileUserInfo}) {
    const {props} = usePage()
    const { user } = useApp()
    const [userInfo, setUserInfo] = useState(props?.user?.data);
    const [isFollowed, setIsFollowed] = useState(true);


    const handleClickOnButton = (e) => {
        const button = e.target.getAttribute('select')
        if (!isActive.button) {
            setIsActive({
                profile: false,
                answers: false,
                questions: false,
                posts: false,
                followers: false,
                following: false,
                [button]: true,
            })
        }
    }

    const labels = {
        profile: 'الملف الشخصي',
        answers: 'إجابات',
        questions: 'أسئلة',
        posts: 'منشورات',
        followers: 'متابعين',
        following: 'يتابع'
    };

    const active_label = Object.keys(isActive).find(key => isActive[key]);

    return (
        <>
            <div className={`py-2 flex gap-x-4 w-full`}>
                <img
                    src="/auth-bg.webp"
                    alt="avatat"
                    className={`size-32 rounded-full object-cover`}
                />
                <div className={`flex flex-col gap-y-2 w-full`}>
                    <div className={`flex justify-between`}>
                        <h1 className={`text-3xl font-bold`}>{userInfo?.name}</h1>
                        {userInfo.id === user.id &&
                            <Button content={`تعديل`} custom_styles={`p-1 bg-transparent hover:bg-[--theme-main-bg-color] transition rounded-full px-4 py-2`}/>
                        }
                    </div>
                    <div className={`${!userInfo?.bio ? 'text-[--theme-placeholder-color]' : ''}`}>{userInfo?.bio ? userInfo.bio : 'نبذة'}</div>
                    <div className={`flex justify-between `}>
                        <div>
                            <span>0 متابعين · </span>
                            <span> يتابع 0</span>
                        </div>
                        {userInfo?.id !== user?.id &&
                            <div className={`flex gap-x-2`}>
                                <Button
                                    onClick={() => followUser(profileUserInfo.id, setIsFollowed, isFollowed)}
                                    content={isFollowed ? 'تمت المتابعة' : 'متابعة'}
                                    custom_styles={`border ${!isFollowed ? 'border-transparent' : 'bg-transparent'} `}
                                    isTypeFollow={true}
                                    isFollowed={isFollowed}
                                />
                                <Button content={`حظر`} custom_styles={`bg-[--theme-primary-button-color]`}/>
                            </div>
                        }
                    </div>

                </div>
            </div>

            <div className={`flex flex-col gap-y-3`}>
                <div className={`mt-5 flex border-b border-[--theme-secondary-bg-color-hover]`}>
                    <ProfileButton select={`profile`} custom_styles={isActive.profile ? 'border-[--theme-primary-button-color] text-[--theme-primary-button-color]' : 'border-transparent'} onClick={handleClickOnButton} content={`الملف الشخصي`}/>
                    <ProfileButton select={`answers`} custom_styles={isActive.answers ? 'border-[--theme-primary-button-color] text-[--theme-primary-button-color]' : 'border-transparent'} onClick={handleClickOnButton} content={`${userInfo?.answers_count} إجابات`}/>
                    <ProfileButton select={`questions`} custom_styles={isActive.questions ? 'border-[--theme-primary-button-color] text-[--theme-primary-button-color]' : 'border-transparent'} onClick={handleClickOnButton} content={`${userInfo?.questions_count} أسئلة`}/>
                    <ProfileButton select={`posts`} custom_styles={isActive.posts ? 'border-[--theme-primary-button-color] text-[--theme-primary-button-color]' : 'border-transparent'} onClick={handleClickOnButton} content={`${userInfo?.posts_count} منشور`}/>
                    <ProfileButton select={`followers`} custom_styles={isActive.followers ? 'border-[--theme-primary-button-color] text-[--theme-primary-button-color]' : 'border-transparent'} onClick={handleClickOnButton} content={`0 متابعين`}/>
                    <ProfileButton select={`following`} custom_styles={isActive.following ? 'border-[--theme-primary-button-color] text-[--theme-primary-button-color]' : 'border-transparent'} onClick={handleClickOnButton} content={`يتابع`}/>
                </div>

                <div className={`flex justify-between border-b border-[--theme-secondary-bg-color-hover] pb-3 min-h-10`}>
                    <div className={`flex gap-x-2`}>
                        {(labels[active_label] !== 'الملف الشخصي' && labels[active_label] !== 'يتابع') && <span>112</span>}
                        <span>{labels[active_label]}</span>
                        {labels[active_label] === 'يتابع' && <span>0</span>}
                    </div>

                    {labels[active_label] !== 'يتابع' &&
                        <Button
                            content={`الأحدث`}
                            isDropDown={true}
                            custom_styles={`bg-transparent hover:bg-[--theme-main-bg-color]`}
                        />
                    }
                    {labels[active_label] === 'يتابع' &&
                        <span className={`px-4 py-1`}>Spaces</span>
                    }
                </div>
            </div>
        </>

    )
}
