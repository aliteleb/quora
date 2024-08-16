import React from 'react'
import Modal from "@/Components/Modal.jsx";
import {HiMiniXMark} from "react-icons/hi2";
import TextInput from "@/Components/TextInput.jsx";
import Input from "@/Core/Input.jsx";
import {useForm} from "@inertiajs/react";
import Button from "@/Core/Button.jsx";

export default function EditInfoModal({isEditModalOpen, setIsModalOpen}) {

    const { data, setData, errors } = useForm()

    return (
        <Modal
            data={data}
            show={isEditModalOpen}
            onClose={() => setIsModalOpen(false)}
            bgColor={`bg-black/30 backdrop-blur-[2px]`}
        >
            <div className={`flex flex-col gap-y-3 p-1 pb-3 h-fit text-[--theme-primary-text-color] bg-[--theme-body-bg] z-40 rounded border border-[--theme-default-border-color]`}>
                <div className={`flex items-center justify-between`}>
                    <div
                        onClick={() => setIsModalOpen(false)}
                        className={`hover:bg-[--theme-main-bg-color] p-2 rounded-full w-fit cursor-pointer m-2`}>
                        <HiMiniXMark className={`size-6`} />
                    </div>

                    <Button
                        content={`حفظ`}
                        custom_styles={`me-3 px-5`}
                    />
                </div>


                <div className={`px-3`}>
                    <img
                        src="/profile-default-svgrepo-com.svg"
                        alt="avatar"
                        className={`size-32 object-cover rounded-full`}
                    />
                </div>

                <div className={`px-3 flex flex-col gap-y-4`}>
                    <Input
                        placeholder={`الإسم`}
                        onChange={e => setData('name', e.target.value)}
                        value={data?.name}
                        name={'name'}
                        label={`الاسم`}
                        error={errors?.name}
                        parentClassStyle={`-mt-2`}
                    />
                    <Input
                        placeholder={`البريد الإلكترونى`}
                        onChange={e => setData('email', e.target.value)}
                        value={data?.email}
                        name={'email'}
                        label={`البريد الإلكترونى`}
                        error={errors?.email}
                        parentClassStyle={`-mt-2`}

                    />
                    <Input
                        placeholder={`نبذة`}
                        onChange={e => setData('bio', e.target.value)}
                        value={data?.bio}
                        name={'bio'}
                        label={`نبذة`}
                        error={errors?.bio}
                        parentClassStyle={`-mt-2`}

                    />
                    <Input
                        placeholder={`كلمة المرور القديمة`}
                        onChange={e => setData('old_password', e.target.value)}
                        value={data?.old_password}
                        name={'old_password'}
                        label={`كلمة المرور القديمة`}
                        error={errors?.old_password}
                        parentClassStyle={`-mt-2`}

                    />
                    <Input
                        placeholder={`كلمة المرور الجديدة`}
                        onChange={e => setData('new_password', e.target.value)}
                        value={data?.new_password}
                        name={'new_password'}
                        label={`كلمة المرور الجديدة`}
                        error={errors?.new_password}
                        parentClassStyle={`-mt-2`}

                    />
                    <Input
                        placeholder={`تأكيد كلمة المرور`}
                        onChange={e => setData('password_confirmation', e.target.value)}
                        value={data?.password_confirmation}
                        name={'password_confirmation'}
                        label={`تأكيد كلمة المرور`}
                        error={errors?.password_confirmation}
                        parentClassStyle={`-mt-2`}

                    />
                </div>

            </div>
        </Modal>
    )
}
