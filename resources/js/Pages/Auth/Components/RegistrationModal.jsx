import Modal from "@/Components/Modal.jsx";
import {GrClose} from "react-icons/gr";
import Input from "@/Core/Input.jsx";

import React, {useState} from 'react'
import {useForm} from "@inertiajs/react";
import {useApp} from "@/AppContext/AppContext.jsx";

export default function RegistrationModal({isRegisterModalOpen, setIsRegisterModalOpen}) {

    const { setUser } = useApp();

    const { data, setData, post, errors, reset } = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submitRegister = (e) => {
        e.preventDefault()
        post('/register', {
            onSuccess: (res) => {
                setUser(res.props.auth.user)
                setIsRegisterModalOpen(false)
                reset()
            },
            onError: (response) => {
            },
        })
    }
    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false)
    }

    return (
        <Modal show={isRegisterModalOpen} onClose={closeRegisterModal} backdropColor={`bg-[#222222dd]`} >
            <div className={`border border-[#393839] rounded bg-[--theme-body-bg]`}>
                <header className={`p-2 flex justify-between`}>
                    <button className={`rounded-full hover:bg-white/5 text-white p-3 `} onClick={closeRegisterModal}>
                        <GrClose className={`size-5`}/>
                    </button>
                    <h3 className={`p-2 font-bold text-lg`}>التسجيل</h3>
                </header>
                <main className={`py-2 px-3 pb-20`}>
                    <div className={`mt-5 flex flex-col gap-y-2`}>
                        <Input
                            placeholder={`ماذا تريد أن يكون اسمك؟`}
                            onChange={e => setData('name', e.target.value)}
                            value={data.name}
                            name={'name'}
                            label={`الاسم`}
                            error={errors.name}
                            id={'name'}
                        />
                    </div>

                    <div className={`mt-5 flex flex-col gap-y-2`}>
                        <Input
                            placeholder={`اسم المستخدم`}
                            onChange={e => setData('username', e.target.value)}
                            name={'username'}
                            value={data.username}
                            label={`اسم المستخدم`}
                            error={errors.username}
                            id={'username'}
                        />
                    </div>

                    <div className={`mt-5 flex flex-col gap-y-2`}>
                        <Input
                            placeholder={`بريدك الإلكتروني`}
                            onChange={e => setData('email', e.target.value)}
                            name={'email'}
                            value={data.email}
                            label={`البريد الإلكترونى`}
                            error={errors.email}
                            id={'email'}
                        />
                    </div>

                    <div className={`mt-5 flex flex-col gap-y-2`}>
                        <Input
                            placeholder={`كلمة المرور`}
                            type={'password'}
                            onChange={e => setData('password', e.target.value)}
                            name={'password'}
                            value={data.password}
                            label={`كلمة المرور`}
                            error={errors.password}
                            id={'register_password'}
                        />
                    </div>

                    <div className={`mt-5 flex flex-col gap-y-2`}>
                        <Input
                            placeholder={`تأكيد كلمة المرور`}
                            type={'password'}
                            onChange={e => setData('password_confirmation', e.target.value)}
                            name={'password_confirmation'}
                            value={data.password_confirmation}
                            label={`تأكيد كلمة المرور`}
                            error={errors.password_confirmation}
                            id={'register_password_confirmation'}
                        />
                    </div>

                </main>
                <footer className={`border-t border-[#393839] flex flex-row-reverse py-3 px-2`}>
                    <button onClick={submitRegister} className={`bg-[#1471ff] hover:bg-opacity-90 px-4 py-1.5 rounded-3xl`}>
                        التالي
                    </button>
                </footer>
            </div>
        </Modal>
    )
}


