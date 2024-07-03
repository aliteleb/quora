import Modal from "@/Components/Modal.jsx";
import {GrClose} from "react-icons/gr";
import Input from "@/Core/Input.jsx";

import React, {useState} from 'react'
import {useForm} from "@inertiajs/react";
import {useApp} from "@/AppContext/AppContext.jsx";

export default function SpaceModal() {

    const {isSpaceModalOpen, setIsSpaceModalOpen} = useApp()

    const { data, setData, post, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submitRegister = (e) => {
        e.preventDefault()
        post('/register', {
            onSuccess: () => {
                setIsSpaceModalOpen(false)
                reset()
            },
            onError: (response) => {
                console.log(response)
            },
        })
    }
    const closeSpaceModal = () => {
        setIsSpaceModalOpen(false)
    }

    return (
        <Modal show={isSpaceModalOpen} onClose={closeSpaceModal} backdropColor={`bg-[#222222dd]`} >
            <div className={`border border-[#393839] rounded bg-[--theme-body-bg]`}>
                <header className={`p-2 flex justify-between`}>
                    <button className={`rounded-full hover:bg-white/5 text-white p-3 `} onClick={closeSpaceModal}>
                        <GrClose className={`size-5`}/>
                    </button>
                    <h3 className={`p-2 font-bold text-lg`}>
                        إنشاء مساحة
                    </h3>
                </header>
                <main className={`py-2 px-3 pb-20`}>
                    <h3 className={`px-3 text-[1rem]`}>
                        قم بمشاركة إهتماماتك، إنشئ محتوى، إستضف مناقشات والمزيد.
                    </h3>
                    <div className={`mt-5 flex flex-col gap-y-2`}>
                        <Input
                            placeholder={``}
                            onChange={e => setData('name', e.target.value)}
                            value={data.name}
                            name={'name'}
                            label={`الاسم`}
                            error={errors.name}
                            required={true}
                            helperText={`يمكنك تغيير هذا من إعدادات المساحة.`}
                            showCounter={true}
                        />
                    </div>

                    <div className={`mt-5 flex flex-col gap-y-2`}>
                        <Input
                            placeholder={`بريدك الالكترونى`}
                            onChange={e => setData('email', e.target.value)}
                            name={'email'}
                            value={data.email}
                            label={`البريد الإلكترونى`}
                            error={errors.email}
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


