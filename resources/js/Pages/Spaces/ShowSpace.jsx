import React, {useEffect, useState} from 'react'
import Master from "@/Layouts/Master.jsx";
import {router, usePage} from "@inertiajs/react";
import {useApp} from "@/AppContext/AppContext.jsx";
import {IoIosTrendingUp} from "react-icons/io";
import {VscDiffAdded} from "react-icons/vsc";
import {RiAddBoxLine} from "react-icons/ri";

export default function ShowSpace() {

    const {props} = usePage()
    const space = props.space.data

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
                                <RiAddBoxLine className={`text-xl`}/>
                            </button>
                        </div>
                    </header>
                </div>

                <main className={`h-[20rem] z-50 relative bg-[--theme-body-bg] w-full mt-10`}>
                    <div className={`flex flex-col container max-w-screen-xl mx-auto rounded z-10 relative`}>

                    </div>
                </main>
            </div>
        </Master>
    )
}
