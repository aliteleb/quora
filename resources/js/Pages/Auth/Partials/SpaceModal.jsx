import Modal from "@/Components/Modal.jsx";
import {GrClose} from "react-icons/gr";
import Input from "@/Core/Input.jsx";

import React, {useEffect, useState} from 'react'
import {useForm} from "@inertiajs/react";
import {useApp} from "@/AppContext/AppContext.jsx";
import ReactSelect from "@/Components/ReactSelect.jsx";
import InputError from "@/Components/InputError.jsx";

export default function SpaceModal() {

    const {isSpaceModalOpen, setIsSpaceModalOpen} = useApp()

    const { data, setData, post, errors, clearErrors, reset } = useForm({
        name: '',
        description: '',
        topics: [],
    });

    const submitForm = (e) => {
        e.preventDefault()
        post('/space/create', {
            onSuccess: () => {
                setIsSpaceModalOpen(false)
                reset()
            },
            onError: (response) => {
                // console.log(response)
                // console.log(errors)
            },
        })
    }
    const closeSpaceModal = () => {
        setIsSpaceModalOpen(false)
        reset()
        clearErrors()
    }

    const options = [
        { value: 'programming', label: 'البرمجة' },
        { value: 'cooking', label: 'الطبخ' },
        { value: 'technology', label: 'التكنولوجيا' },
        { value: 'politics', label: 'السياسة' },
        { value: 'economy', label: 'الاقتصاد' },
        { value: 'writing', label: 'الكتابة' },
        { value: 'music', label: 'الموسيقي' },
        { value: 'health', label: 'الصحة' },
        { value: 'fashion', label: 'الموضة' },
        { value: 'movies', label: 'الأفلام' },
    ];

    const handleSelectChange = (selectedOptions) => {

        setData(previousData => ({
            ...previousData,
            topics: selectedOptions.map(option => option.label)
        }));
    };

    useEffect(() => {
        // console.log(errors)
    }, [errors]);


    return (
        <Modal show={isSpaceModalOpen} onClose={closeSpaceModal} backdropColor={`bg-[#222222dd]`} maxWidth={`xl`} >
            <div className={`border border-[#393839] rounded bg-[--theme-body-bg]`}>
                <header className={`p-2 flex justify-between`}>
                    <button className={`rounded-full hover:bg-white/5 text-white p-3`} onClick={closeSpaceModal}>
                        <GrClose className={`size-5`}/>
                    </button>

                    <div className={`flex flex-col gap-y-2`}>
                        <div
                            className={`bg-[--theme-body-bg] mt-2 min-w-[10rem] max-w-[24rem]`}
                        >
                            <ReactSelect options={options} handleSelectChange={handleSelectChange} errors={errors.topics}/>
                        </div>
                        <InputError message={errors.topics} className={`!text-red-500`}/>
                    </div>

                    <h3 className={`p-2 font-bold text-lg`}>
                        إنشاء مساحة
                    </h3>
                </header>
                <main className={`py-2 px-3 pb-20`}>
                    <h3 className={`px-3 text-[1rem]`}>
                        قم بمشاركة إهتماماتك، إنشئ محتوى، إستضف مناقشات والمزيد.
                    </h3>
                    <div className={`mt-5 flex flex-col`}>
                        <Input
                            placeholder={``}
                            onChange={e => setData('name', e.target.value)}
                            value={data.name}
                            error={errors.name}
                            name={'name'}
                            label={`الاسم`}
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
                            error={errors.description}
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


