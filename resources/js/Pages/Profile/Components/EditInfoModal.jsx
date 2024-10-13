import React, {useEffect, useState} from 'react'
import Modal from "@/Components/Modal.jsx";
import {HiMiniXMark} from "react-icons/hi2";
import Input from "@/Core/Input.jsx";
import {useForm} from "@inertiajs/react";
import Button from "@/Core/Button.jsx";
import {CiCamera} from "react-icons/ci";
import InputError from "@/Components/InputError.jsx";
import {useApp} from "@/AppContext/AppContext.jsx";

export default function EditInfoModal({isEditModalOpen, setIsEditModalOpen, userInfo, setUserInfo}) {

    const { setUser } = useApp()

    const { data, post, setData, errors, clearErrors, reset } = useForm({
        name: "",
        bio: "",
        old_password: "",
        new_password: "",
        password_confirmation: "",
        avatar: null,
    })
    const [isLoading, setIsLoading] = useState(false);

    const submitEdit = (e) => {
        setIsLoading(true)

        const hasGeneralInfoUpdates = data.name.length !== 0 || data.bio.length !== 0 || data.avatar
        const hasPasswordUpdates = data.old_password.length !== 0 || data.new_password.length !== 0 || data.password_confirmation.length !== 0

        if (hasGeneralInfoUpdates || hasPasswordUpdates) {
            e.preventDefault()
            post('/profile/edit', {
                onSuccess: (res) => {
                    setIsEditModalOpen(false)
                    setUserInfo(res.props.user.data)
                    setUser(res.props.user.data)
                    reset()
                    setIsLoading(false)
                },
            })
        }
        setIsLoading(false)
    }

    const handleFileChange =(e) => {
        if (e.target.files[0].type.startsWith('image'))
        {
            setData('avatar', e.target.files[0])
        }
        e.target.value = null;
    }

    const onCloseModal = () => {
        setIsEditModalOpen(false)
        reset()
        clearErrors()
    }

    useEffect(() => {
        console.log(errors)
    }, [data, isEditModalOpen]);


    return (
        <Modal
            data={data}
            show={isEditModalOpen}
            onClose={onCloseModal}
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
                        content={isLoading ? 'جار الحفظ...' : `حفظ`}
                        custom_styles={`me-3 px-5`}
                    />
                </div>


                <div className={`px-3 flex gap-x-3`}>
                    <div className={`relative`}>
                        {!data.avatar &&
                            <img
                                src={userInfo?.avatar ? userInfo?.avatar : '/profile-default-svgrepo-com.svg'}
                                alt="avatar"
                                className={`size-32 rounded-full`}
                            />
                        }
                        {/* Preview uploaded avatar */}
                        {data.avatar &&
                            <div className={`${!data.avatar ? 'invisible' : 'visible w-full pb-3 border-zinc-700/70'}`}>
                                <img className={`size-32 rounded-full`}
                                     src={data?.avatar ? URL.createObjectURL(data?.avatar) : ''}
                                     alt="profile-avatar"/>
                            </div>
                        }
                        <label
                            htmlFor={`upload_profile_avatar`}
                            className={`bg-black size-32 rounded-full flex justify-center items-center absolute top-0 bg-opacity-0 hover:bg-opacity-40 cursor-pointer group`}
                        >
                            <CiCamera className={`size-8 opacity-0 group-hover:opacity-80 `}/>
                        </label>
                        <Input
                            type={'file'}
                            id={'upload_profile_avatar'}
                            visibility={'hidden'}
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className={`flex flex-col gap-y-3`}>
                        <div>الحد الأقصي للحجم: <span className={`text-[--theme-placeholder-color]`}>3 MB</span></div>
                        <span>الإمتدادات المسوح بها هي:<br/>
                           <span className={`text-[--theme-placeholder-color]`}>JPEG, JPG, PNG, WebP, TIFF, BMP</span>
                        </span>
                        <InputError
                            message={errors.avatar}
                            className={`!text-red-500`}
                        />
                    </div>

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
                        id={"profile-name"}
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
                        id={"profile-bio"}
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
                        id={"profile-old-password"}
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
                        id={"profile-new_password"}
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
                        id={"profile-password_confirmation"}
                    />
                </div>

            </div>
        </Modal>
    )
}
