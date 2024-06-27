import React from 'react'
import {useApp} from "@/AppContext/AppContext.jsx";
import {FcGoogle} from "react-icons/fc";
import {FaFacebook} from "react-icons/fa";
import Input from "@/Core/Input.jsx";

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
                <div className={`max-w-[50rem] pt-16 text-[--theme-body-color] bg-[--theme-nav-bg-color]`}>
                    <div className={`flex items-center flex-col pb-6`}>
                        <img
                            src={settings.logo}
                            alt="logo"
                            className={`w-52`}
                        />
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
                                <button className={`border border-[--theme-nav-bg-color-hover] flex items-center py-3 gap-x-4 px-4 bg-[--theme-body-bg] hover:bg-[--theme-button-bg-color-hover]`}>
                                    <FaFacebook className={`size-6 text-[--theme-button-border-color]`}/>
                                    <span>المتابعة عن طريق Facebook</span>
                                </button>
                            </div>

                            <div className={`text-center mt-5 cursor-pointer font-bold text-sm`}>اشترك عن طريق البريد الإلكتروني</div>
                        </div>

                        <div className={`ps-8 flex flex-col gap-y-4`}>
                            <div className={`border-b border-[--theme-nav-bg-color-hover] w-full pb-2 font-bold`}>تسجيل الدخول</div>

                            <div className={`flex flex-col gap-y-2`}>
                                <span className={`font-bold`}>البريد الإلكترونى</span>
                                <Input placeholder={`بريدك الإلكترونى`}/>
                            </div>

                            <div className={`flex flex-col gap-y-2`}>
                                <span className={`font-bold`}>كلمة المرور</span>
                                <Input placeholder={`كلمة المرور الخاصة بك`}/>
                            </div>

                            <div className={`flex justify-between`}>
                                <button className={`text-sm text-[--theme-secondary-text-color] hover:underline`}>هل نسيت كلمة المرور؟</button>
                                <button className={`rounded-full px-4 py-2 bg-[--theme-button-border-color] font-bold`}>تسجيل الدخول</button>
                            </div>
                        </div>
                    </div>

                    <div className={`w-full bg-[--theme-body-bg] mt-5 py-4 px-8 text-sm text-center`}>
                        <span className={`hover:underline cursor-pointer`}>حول . </span>
                        <span className={`hover:underline cursor-pointer`}>الوظائف . </span>
                        <span className={`hover:underline cursor-pointer`}>الخصوصية . </span>
                        <span className={`hover:underline cursor-pointer`}>الشروط . </span>
                        <span className={`hover:underline cursor-pointer`}>الاتصال . </span>
                        <span className={`hover:underline cursor-pointer`}>اللغات . </span>
                        <span className={`hover:underline cursor-pointer`}>الصحافة . </span>
                        <span className={`ms-2`}>© Quora, Inc. 2024</span>
                    </div>

                </div>
            </div>
        </>

    )
}
