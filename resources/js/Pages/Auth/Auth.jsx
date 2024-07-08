import React, {useEffect, useState} from 'react'
import {useApp} from "@/AppContext/AppContext.jsx";
import {FaFacebook} from "react-icons/fa";
import Input from "@/Core/Input.jsx";
import {Head, Link, useForm, usePage} from "@inertiajs/react";
import {MdOutlineEmail} from "react-icons/md";
import RegistrationModal from "@/Pages/Auth/Partials/RegistrationModal.jsx";

export default function Auth() {

    const {settings, setUser} = useApp()

    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const { data, setData, post, errors, processing, reset } = useForm({
        email: '',
        password: '',
    });

    const submitLogin = (e) => {
        e.preventDefault()
        post('/login', {
            onSuccess: (res) => {
                setUser(res.props.auth.user)
                reset()
            },
            onError: (response) => {
                console.log(response)
            },
        })
    }

    return (
        <>
            <Head title='التسجيل - تسجيل الدخول'/>
            <img
                src="/auth-bg.webp"
                alt="background"
                className={`object-cover w-full h-svh absolute`}
            />

            <div className={`w-[96%] max-w-[50rem] pt-16 text-[--theme-body-color] bg-[--theme-main-bg-color] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded`}>

                    <div className={`flex items-center flex-col pb-6`}>
                        <img
                            src={settings.logo}
                            alt="logo"
                            className={`w-52`}
                        />
                    </div>

                    <span className={`font-bold text-[--theme-primary-text-color] text-center block`}>مكان لتبادل المعرفة وفهم العالم بشكل أفضل</span>

                    <div className={`md:grid grid-cols-2 mt-10 px-8 flex flex-col`}>
                        <div className={`md:border-l border-[--theme-default-border-color] md:pe-8`}>
                            <div className={`text-[--theme-secondary-text-color]`}>
                                <span>بالنقر على "متابعة" فإنك تشير على أنك قد قرأت ووافقت على </span>
                                <a href="#" className={`text-[--theme-button-border-color]`}>شروط الخدمة </a>
                                و
                                <a href="#" className={`text-[--theme-button-border-color]`}>سياسة الخصوصية </a>
                                الخاصة بـ Quora.
                            </div>


                            <div className={`mt-6 flex flex-col gap-y-3`}>
                                <button
                                    className={`border border-[--theme-default-border-color] flex items-center py-3 gap-x-4 px-4 bg-[--theme-body-bg] hover:bg-[--theme-button-bg-color-hover]`}>
                                    <FaFacebook className={`size-6 text-[--theme-body-color]]`}/>
                                    <span>المتابعة عن طريق Facebook</span>
                                </button>
                            </div>

                            <div onClick={() => setIsRegisterModalOpen(true)} className={`mt-3 flex flex-col gap-y-3`}>
                                <button
                                    className={`border border-[--theme-default-border-color] flex items-center py-3 gap-x-4 px-4 bg-[--theme-body-bg] hover:bg-[--theme-button-bg-color-hover]`}>
                                    <MdOutlineEmail  className={`size-6 text-[--theme-placeholder-color]`}/>
                                    <span>اشترك عن طريق البريد الإلكتروني</span>
                                </button>
                            </div>

                            <button className={`mt-5 text-center cursor-pointer text-sm`}>
                                <Link href={`/`}>تصفح بدون تسجيل الدخول</Link>
                            </button>

                        </div>

                        <div className={`md:ps-8 flex flex-col gap-y-4 mt-10 md:mt-0`}>
                            <div className={`border-b border-[--theme-default-border-color] w-full pb-2 font-bold`}>تسجيل الدخول</div>

                            <div className={`flex flex-col gap-y-2`}>
                                <span className={`font-medium`}>البريد الإلكترونى</span>
                                <Input
                                    placeholder={`بريدك الإلكترونى`}
                                    onChange={e => setData('email', e.target.value)}
                                    name={'email'}
                                    value={data.email}
                                    error={errors.invalid_credentials}
                                    id={'email'}
                                />
                            </div>

                            <div className={`flex flex-col gap-y-2`}>
                                <span className={`font-medium`}>كلمة المرور</span>
                                <Input
                                    placeholder={`كلمة المرور الخاصة بك`}
                                    type={'password'} onChange={e => setData('password', e.target.value)}
                                    name={'password'}
                                    value={data.password}
                                    id={'password'}
                                />

                            </div>

                            <div className={`flex justify-between`}>
                                <button className={`text-sm text-[--theme-secondary-text-color] hover:underline`}>هل نسيت كلمة المرور؟</button>
                                <button
                                    onClick={submitLogin}
                                    className={`${processing ? 'opacity-40 cursor-not-allowed' : ''} rounded-full px-4 py-2 bg-[--theme-button-border-color] font-medium`}
                                    disabled={processing}
                                >
                                    تسجيل الدخول
                                </button>
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

            <RegistrationModal isRegisterModalOpen={isRegisterModalOpen} setIsRegisterModalOpen={setIsRegisterModalOpen}/>
        </>

    )
}
