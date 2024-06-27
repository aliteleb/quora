import React from 'react'
import {useApp} from "@/AppContext/AppContext.jsx";

export default function Auth() {

    const {settings} = useApp()

    return (
        <>
            <img
                src="/auth-bg.webp"
                alt="background"
                className={`object-cover w-full max-h-svh absolute`}
            />

            <div className={`text-[--theme-body-color] bg-[--theme-input-bg-color] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded`}>
                <div className={`p-10 `}>
                    <div className={`flex items-center flex-col pb-12`}>
                        <div className={`w-fit relative`}>
                            <img
                                src={settings.logo}
                                alt="logo"
                                className={`w-52`}
                            />
                            <span className={`absolute left-0`}>العربية</span>
                        </div>
                    </div>

                    <span className={`font-bold text-[--theme-primary-text-color]`}>مكان لتبادل المعرفة وفهم العالم بشكل أفضل</span>
                </div>
            </div>
        </>

    )
}
