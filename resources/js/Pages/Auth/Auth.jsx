import React from 'react'
import {useApp} from "@/AppContext/AppContext.jsx";
import {FcGoogle} from "react-icons/fc";
import {FaFacebook} from "react-icons/fa";

export default function Auth() {

    const {settings} = useApp()

    return (
        <>
            <img
                src="/auth-bg.webp"
                alt="background"
                className={`object-cover w-full max-h-svh absolute`}
            />

            <div className={`bg-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded`}>
                <div className={`max-w-[50rem] pb-5 pt-16 text-[--theme-body-color] bg-[--theme-nav-bg-color]`}>
                    <div className={`flex items-center flex-col pb-6`}>
                        <div className={`w-fit relative`}>
                            <img
                                src={settings.logo}
                                alt="logo"
                                className={`w-52`}
                            />
                            <span className={`absolute left-0`}>العربية</span>
                        </div>
                    </div>

                    <span className={`font-bold text-[--theme-primary-text-color] text-center block`}>مكان لتبادل المعرفة وفهم العالم بشكل أفضل</span>

                    <div className={`grid grid-cols-2 mt-10 px-8`}>
                        <div className={`border-l border-[--theme-nav-bg-color-hover] pe-8`}>
                            <div className={`text-[--theme-secondary-text-color]`}>
                                <span>بالنقر على "متابعة" فإنك تشير على أنك قد قرأت ووافقت على </span>
                                <a href="#" className={`text-[--theme-button-border-color]`}>شروط الخدمة </a>
                                و
                                <a href="#" className={`text-[--theme-button-border-color]`}>سياسة الخصوصية </a>
                                الخاصة بـ Quora.
                            </div>


                            <div className={`mt-6 flex flex-col gap-y-3`}>
                                <button className={`border border-[--theme-nav-bg-color-hover] flex items-center py-3 gap-x-4 px-4 bg-[--theme-body-bg] hover:bg-[--theme-button-bg-color-hover] transition`}>
                                    <FaFacebook className={`size-6 text-[--theme-button-border-color]`}/>
                                    <span>المتابعة عن طريق Facebook</span>
                                </button>
                            </div>

                            <div className={`text-center mt-5 cursor-pointer font-bold text-sm`}>اشترك عن طريق البريد الإلكتروني</div>
                        </div>

                        <div className={`ps-8`}>
                            <div className={`border-b border-[--theme-nav-bg-color-hover] w-full pb-2`}>تسجيل الدخول</div>

                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
