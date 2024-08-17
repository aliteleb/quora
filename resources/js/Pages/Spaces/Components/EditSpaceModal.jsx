import React, {useEffect, useState} from 'react'
import Modal from "@/Components/Modal.jsx";
import {HiMiniXMark} from "react-icons/hi2";
import Input from "@/Core/Input.jsx";
import {useForm} from "@inertiajs/react";
import Button from "@/Core/Button.jsx";
import {CiCamera} from "react-icons/ci";
import InputError from "@/Components/InputError.jsx";

export default function EditSpaceModal({isEditModalOpen, setIsEditModalOpen, space, setSpace}) {

    const { data, post, setData, errors, clearErrors, reset } = useForm({
        name: "",
        description: "",
        avatar: null,
        cover: null,
    })

    const [isLoading, setIsLoading] = useState(false);

    const submitEdit = (e) => {
        setIsLoading(true)

        const hasInfoUpdates = data.name.length !== 0 || data.description.length !== 0 || data.avatar || data.cover

        if (hasInfoUpdates) {
            e.preventDefault()
            post('/space/edit', {
                onSuccess: (res) => {
                    setIsEditModalOpen(false)
                    setSpace(res.props.space.data)
                    reset()
                    setIsLoading(false)
                },
            })
        }
    }

    const handleFileChange =(e, type) => {
        if (e.target.files[0].type.startsWith('image') && type === 'avatar')
        {
            setData('avatar', e.target.files[0])
        } else {
            setData('cover', e.target.files[0])
        }
        e.target.value = null;
    }

    const onCloseModal = () => {
        setIsEditModalOpen(false)
        reset()
        clearErrors()
        setIsLoading(false)
    }

    useEffect(() => {
        console.log(data)
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

                {/* Avatar section */}
                <h1 className={`px-3`}>أيقونة</h1>
                <section className={`px-3 flex gap-x-3`}>
                    <div className={`relative`}>
                        {!data.avatar &&
                            <img
                                src={space?.avatar ? space?.avatar : '/spaces/space_default_image.webp'}
                                alt="avatar"
                                className={`size-32 object-cover rounded-full`}
                            />
                        }
                        {/* Preview uploaded avatar */}
                        {data.avatar &&
                            <div className={`${!data.avatar ? 'invisible' : 'visible w-full border-zinc-700/70'}`}>
                                <img className={`size-32 rounded-full object-cover`}
                                     src={data?.avatar ? URL.createObjectURL(data?.avatar) : ''}
                                     alt="space-avatar"/>
                            </div>
                        }
                        <label
                            htmlFor={`upload_space_avatar`}
                            className={`bg-black size-32 rounded-full flex justify-center items-center absolute top-0 bg-opacity-0 hover:bg-opacity-40 cursor-pointer group`}
                        >
                            <CiCamera className={`size-8 opacity-0 group-hover:opacity-80 `}/>
                        </label>
                        <Input
                            type={'file'}
                            id={'upload_space_avatar'}
                            visibility={'hidden'}
                            onChange={(e) => handleFileChange(e, 'avatar')}
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

                </section>

                {/* Cover section */}
                <h1 className={`px-3 mt-3`}>صورة الغلاف</h1>
                <section className={`px-3 flex flex-col gap-x-3`}>
                    <div className={`relative`}>
                        {!data.cover &&
                            <img
                                src={space?.cover ? space?.cover : '/spaces/space_cover_default_image_space_page.webp'}
                                alt="cover"
                                className={`w-full object-cover rounded`}
                            />
                        }
                        {/* Preview uploaded cover */}
                        {data.cover &&
                            <div className={`${!data.cover ? 'hidden' : 'visible w-full border-zinc-700/70'}`}>
                                <img className={`w-full h-[160px] rounded object-cover`}
                                     src={data?.cover ? URL.createObjectURL(data?.cover) : ''}
                                     alt="space-cover"/>
                            </div>
                        }
                        <label
                            htmlFor={`upload_space_cover`}
                            className={`bg-black w-full h-full rounded flex justify-center items-center absolute top-0 bg-opacity-0 hover:bg-opacity-40 cursor-pointer group`}
                        >
                            <CiCamera className={`size-8 opacity-0 group-hover:opacity-80 `}/>
                        </label>
                        <Input
                            type={'file'}
                            id={'upload_space_cover'}
                            visibility={'hidden'}
                            onChange={(e) => handleFileChange(e, 'cover')}
                        />
                    </div>

                    <div className={`flex flex-col gap-y-3`}>
                        <div>الحد الأقصي للحجم: <span className={`text-[--theme-placeholder-color]`}>6 MB</span></div>
                        <span>الإمتدادات المسوح بها هي:<br/>
                           <span className={`text-[--theme-placeholder-color]`}>JPEG, JPG, PNG, WebP, TIFF, BMP</span>
                        </span>
                        <InputError
                            message={errors.cover}
                            className={`!text-red-500`}
                        />
                    </div>

                </section>

                <section className={`px-3 flex flex-col gap-y-4`}>
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
                        id={"space-avatar"}
                    />
                    <Input
                        placeholder={`الوصف`}
                        onChange={e => setData('description', e.target.value)}
                        value={data?.description}
                        name={'description'}
                        label={`نبذة`}
                        error={errors?.description}
                        parentClassStyle={`-mt-2`}
                        minLength={10}
                        maxLength={160}
                        id={"space-description"}
                    />
                </section>

            </div>
        </Modal>
    )
}
