import React, {useEffect} from 'react'
import Modal from "@/Components/Modal.jsx";
import {HiMiniXMark} from "react-icons/hi2";
import Input from "@/Core/Input.jsx";
import {useForm} from "@inertiajs/react";
import Button from "@/Core/Button.jsx";

export default function EditInfoModal({isEditModalOpen, setIsEditModalOpen, userInfo}) {

    const { data, post, setData, errors } = useForm({
        name: "",
        bio: "",
        old_password: "",
        new_password: "",
        password_confirmation: "",
    })

    const submitEdit = (e) => {
        e.preventDefault()
        post('/profile/edit', {
            onSuccess: (res) => {

            },
            onError: (response) => {
                console.log(response)
            },
        })
    }

    return (
        <Modal
            data={data}
            show={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            bgColor={`bg-black/30 backdrop-blur-[2px]`}
        >
            <div className={`flex flex-col gap-y-3 p-1 pb-3 h-fit text-[--theme-primary-text-color] bg-[--theme-body-bg] z-40 rounded border border-[--theme-default-border-color]`}>
                <div className={`flex items-center justify-between`}>
                    <div
                        onClick={() => setIsEditModalOpen(false)}
                        className={`hover:bg-[--theme-main-bg-color] p-2 rounded-full w-fit cursor-pointer m-2`}>
                        <HiMiniXMark className={`size-6`} />
                    </div>

                    <Button
                        onClick={submitEdit}
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
                        minLength={3}
                        maxLength={20}
                    />
                    <Input
                        placeholder={`نبذة`}
                        onChange={e => setData('bio', e.target.value)}
                        value={data?.bio}
                        name={'bio'}
                        label={`نبذة`}
                        error={errors?.bio}
                        parentClassStyle={`-mt-2`}
                        minLength={10}
                        maxLength={160}
                    />
                    <Input
                        placeholder={`كلمة المرور القديمة`}
                        onChange={e => setData('old_password', e.target.value)}
                        value={data?.old_password}
                        name={'old_password'}
                        type={'password'}
                        label={`كلمة المرور القديمة`}
                        error={errors?.old_password}
                        minLength={8}
                        maxLength={64}
                        parentClassStyle={`-mt-2`}
                    />
                    <Input
                        placeholder={`كلمة المرور الجديدة`}
                        onChange={e => setData('new_password', e.target.value)}
                        value={data?.new_password}
                        name={'new_password'}
                        type={'password'}
                        label={`كلمة المرور الجديدة`}
                        error={errors?.new_password}
                        minLength={8}
                        maxLength={64}
                        parentClassStyle={`-mt-2`}
                    />
                    <Input
                        placeholder={`تأكيد كلمة المرور`}
                        onChange={e => setData('password_confirmation', e.target.value)}
                        value={data?.password_confirmation}
                        name={'password_confirmation'}
                        type={'password'}
                        label={`تأكيد كلمة المرور`}
                        error={errors?.password_confirmation}
                        minLength={8}
                        maxLength={64}
                        parentClassStyle={`-mt-2`}
                    />
                </div>

            </div>
        </Modal>
    )
}
