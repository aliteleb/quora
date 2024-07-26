import React, {useEffect, useState} from 'react'
import Master from "@/Layouts/Master.jsx";
import {router, usePage} from "@inertiajs/react";
import {useApp} from "@/AppContext/AppContext.jsx";
import {IoIosTrendingUp, IoMdAddCircleOutline} from "react-icons/io";
import SpaceAbout from "@/Pages/Spaces/Partials/SpaceAbout.jsx";
import SpacePosts from "@/Pages/Spaces/Partials/SpacePosts.jsx";

export default function ShowSpace() {

    const { user } = useApp()
    const {props} = usePage()
    const space = props.space.data

    const [isActive, setIsActive] = useState({
        about: false,
        posts: true,
        questions: false,
    });

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

    const checkIfUserIsOwner = user?.id === space.user.id

    return (
        <Master>
            <img
                src={space.media?.cover ? space.media?.cover : '/spaces/space_cover_default_image_space_page.webp'}
                alt="space-blur-cover"
                className={`h-[27rem] w-full blur-lg absolute`}
            />
            <div className={``}>
                <div className={`flex flex-col container max-w-screen-xl mx-auto rounded z-10 relative`}>
                    <div className={`relative`}>
                        <img
                            src={space.media?.cover ? space.media?.cover : '/spaces/space_cover_default_image_space_page.webp'}
                            alt="space-cover"
                            className={`h-[14rem] w-full rounded-b-xl`}
                        />
                        <img
                            src={space.media?.poster ? space.media?.poster : '/spaces/space_default_image.webp'}
                            alt="space-poster"
                            className={`w-36 h-36 absolute right-16 top-1/2 rounded-3xl`}
                        />
                    </div>
                    <header className={`mt-12 flex flex-col gap-y-2`}>
                        <h1 className={`text-2xl font-extrabold`}>{space.name}</h1>
                        <div>{space.description}</div>
                        <div className={`flex justify-between items-center`}>
                            <div className={`flex gap-x-1`}>
                                <button className={`hover:underline underline-offset-2`}>
                                    <span className={`font-bold`}>{`16k `}</span>
                                    متابعين
                                </button>
                                <span>· </span>
                                <span className={`flex`}>
                                    <span className={`flex font-bold`}>{`\u00A0${14}\u00A0`}</span> منشورات الأسبوع الماضي
                                </span>

                            </div>
                            <button className={`flex items-center gap-x-2 bg-[--theme-button-border-color] rounded-full px-6 py-2 font-bold`}>
                                متابعة
                                <IoMdAddCircleOutline className={`text-2xl`}/>
                            </button>
                        </div>
                    </header>
                </div>
                <main className={`h-[20rem] z-20 relative bg-[--theme-body-bg] w-full mt-10`}>
                    <div className={`flex flex-col container max-w-screen-xl mx-auto rounded z-10 relative gap-y-6`}>
                        <header className={`flex border-b border-[--theme-main-bg-color] w-[60%]`}>
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
                        {isActive.about && <SpaceAbout space={space} isActive={isActive} checkIfUserIsOwner={checkIfUserIsOwner} handleClickOnAboutButton={handleClickOnAboutButton}/>}
                        {isActive.posts && <SpacePosts />}
                    </div>
                </main>


            </div>
        </Master>
    )
}
