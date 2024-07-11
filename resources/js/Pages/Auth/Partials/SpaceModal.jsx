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
        description: '',
    });

    const submitForm = (e) => {
        e.preventDefault()
        post('/space/create', {
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
        <Modal show={isSpaceModalOpen} onClose={closeSpaceModal} backdropColor={`bg-[#222222dd]`} maxWidth={`xl`} >
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
                            maxLength={32}
                        />
                    </div>

                    <div className={`mt-5 flex flex-col gap-y-2`}>
                        <Input
                            type={'text'}
                            onChange={e => setData('description', e.target.value)}
                            name={'description'}
                            value={data.password}
                            label={`وصف موجز`}
                            helperText={`قم بتضمين بعض الكلمات الرئيسية لتوضح للأشخاص ما يمكن توقعه إذا انضموا.`}
                            error={errors.password}
                            maxLength={100}
                        />
                    </div>

                </main>
                <footer className={`border-t border-[#393839] flex flex-row-reverse py-3 px-2`}>
                    <button onClick={submitForm} className={`bg-[#1471ff] hover:bg-opacity-90 px-4 py-1.5 rounded-3xl`}>
                        إنشاء
                    </button>
                </footer>
            </div>
        </Modal>
    )
}


