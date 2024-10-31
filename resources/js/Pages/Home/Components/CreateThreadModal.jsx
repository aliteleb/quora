import React, {useEffect, useRef, useState} from 'react';
import { HiMiniXMark } from 'react-icons/hi2';
import { BiCaretLeft } from 'react-icons/bi';
import { TbUsers } from 'react-icons/tb';
import {FaAngleDown} from 'react-icons/fa';
import { useApp } from '@/AppContext/AppContext.jsx';
import Modal from '@/Components/Modal.jsx';
import { RiImageAddLine } from 'react-icons/ri';
import Input from '@/Core/Input.jsx';
import {useForm} from '@inertiajs/react';
import PublicOrPrivateDropdown from "@/Components/PublicOrPrivateDropdown.jsx";
import SelectSpaces from "@/Components/SelectSpaces.jsx";
import DefaultUserIcon from "@/Core/DefaultUserIcon.jsx";
import Button from "@/Core/Button.jsx";

export default function CreateThreadModal({threads, setThreads}) {
    const { isCreatThreadModalOpen, setIsCreatThreadModalOpen, isPostActive, setIsPostActive, user } = useApp();

    const [isPublicOrPrivateDropdownOpen, setIsPublicOrPrivateDropdownOpen] = useState(false)

    const { data, setData, post, clearErrors, reset } = useForm({
        title: '',
        image: null,
        video: null,
        space: 'الملف الشخصي',
        type: 'post',
        visibility: 'public',
    }, {forceFormData: true,});

    const [selectedSpaceImg, setSelectedSpaceImg] = useState('');

    useEffect(() => {
        if (isPostActive) {
            setData(previousData => ({
                ...previousData,
                type: 'post'
            }))
        } else {
            setData(previousData => ({
                ...previousData,
                type: 'question'
            }))
        }
    }, [isCreatThreadModalOpen]);


    const handleThreadChange = (e) => {
        setData((formData) => ({
            ...formData,
            [e.target.name]: e.target.value,
        }));
    };

    const removeUploadedFile = () => {
        setData({
            ...data,
            image: null,
            video: null,
        });
    };

    const resetDataWhenClosingModal = () => {
        setData({
            title: '',
            image: null,
            video: null,
            space: 'الملف الشخصي',
            visibility: 'public',
            type: 'post',
        })
    }

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            if (!isCreatThreadModalOpen)
            {
                resetDataWhenClosingModal()
            }
        }
    }, [isCreatThreadModalOpen]);

    const submitForm = (e) => {
        e.preventDefault()
        post('/threads/create', {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (res) => {
                setIsCreatThreadModalOpen(false)
                reset()
                setThreads(prevState => ([
                    res.props.thread.data,
                    ...prevState
                ]))
            },
            onError: () => {
            },
        })
    }

    const textAreaRef = useRef(null)
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 1 + 'px';
        }
    }, [data.title])

    const onCloseModal = () => {
        setIsCreatThreadModalOpen(false)
        reset()
        clearErrors()
    }

    const handleFileChange =(e) => {
        if (e.target.files[0].type.startsWith('image'))
        {
            setData('image', e.target.files[0])
        } else {
            setData('video', e.target.files[0])
        }
        e.target.value = null;
    }

    return (
        <Modal
            data={data}
            show={isCreatThreadModalOpen}
            onClose={onCloseModal}
            bgColor={`bg-black/30 backdrop-blur-[2px]`}
        >
            <div className={`h-fit text-[--theme-primary-text-color] bg-[--theme-body-bg] z-40 rounded border border-[--theme-default-border-color]`}>
                <div className={`grid grid-cols-[0.5fr_6fr] justify-center items-center relative`}>
                    <div
                        onClick={() => setIsCreatThreadModalOpen(false)}
                        className={`hover:bg-[--theme-main-bg-color] p-2 rounded-full w-fit cursor-pointer m-2`}
                    >
                        <HiMiniXMark className={`size-6`} />
                    </div>

                    <div className={`absolute z-50 mt-2 xxs:left-1/2 left-2 top-1/2 xxs:-translate-x-1/2 -translate-y-1/2`}>
                        <SelectSpaces
                            setData={setData}
                            data={data}
                            selectedSpaceImg={selectedSpaceImg}
                            setSelectedSpaceImg={setSelectedSpaceImg}
                        />
                    </div>
                </div>


                <div className={`mt-2 flex border-b border-[--theme-default-border-color] text-lg`}>
                    <button onClick={() => setIsPostActive(false)} className={`hover:bg-[--theme-secondary-bg-color-hover] transition w-1/2 py-3 border-b-2  ${!isPostActive ? 'border-[--theme-button-border-color]' : 'border-transparent'}`}>إضافة سؤال</button>
                    <button onClick={() => setIsPostActive(true)} className={`hover:bg-[--theme-secondary-bg-color-hover] transition w-1/2 py-3 border-b-2 ${isPostActive ? 'border-[--theme-button-border-color]' : 'border-transparent'}`}>إنشاء منشور</button>
                </div>

                <div className={`px-4`}>
                    <div className={`mt-5 flex gap-x-3`}>
                        <div className={`flex items-center ${isPostActive ? 'gap-x-3' : 'gap-x-1'} `}>
                            {user?.avatar && <img src={user?.avatar} className={`size-7 rounded-full cursor-pointer`} alt={'user-avatar'}/>}
                            {(!user?.avatar && user) && <DefaultUserIcon className={`size-9 cursor-pointer text-[--theme-placeholder-color]`}/>}
                            {!isPostActive && <BiCaretLeft className={`size-5`}/>}
                            {isPostActive && <span>{user?.name}</span>}
                        </div>

                        <button className={`${isPostActive ? 'hidden' : ''} relative `}>
                            <div onClick={() => setIsPublicOrPrivateDropdownOpen(!isPublicOrPrivateDropdownOpen)}
                                 id={`publicOrPrivateDropdown`}
                                 className={`cursor-pointer flex items-center border border-[--theme-main-bg-color-hover] rounded-full px-3 py-1 gap-x-1 hover:bg-[--theme-main-bg-color]`}>
                                <TbUsers className={`size-4`} id={`publicOrPrivateDropdown`}/>
                                <span >{data.visibility === 'public' ? 'عام' : 'خاص'}</span>
                                <FaAngleDown className={`size-4`} id={`publicOrPrivateDropdown`}/>
                            </div>


                            <div className={`absolute top-0 left-1/2`}>
                                <PublicOrPrivateDropdown
                                    isPublicOrPrivateDropdownOpen={isPublicOrPrivateDropdownOpen}
                                    setIsPublicOrPrivateDropdownOpen={setIsPublicOrPrivateDropdownOpen}
                                    setData={setData}
                                    data={data}
                                    handleThreadChange={handleThreadChange}
                                />
                            </div>
                        </button>

                    </div>
                </div>

                <div className={`px-4`}>
                    <textarea
                        ref={textAreaRef}
                        placeholder={`${isPostActive ? 'قل شيئاً ما...' : 'إبدء سؤال بماذا, كيف, لماذا, إلخ.'}`}
                        className={`w-full overflow-auto resize-none p-0 mt-4 bg-transparent ${isPostActive ? 'border-transparent' : 'border-[--theme-default-border-color] hover:border-[--theme-button-border-color]  focus:border-[--theme-main-bg-color]'} border-x-0 border-t-0  focus:ring-0`}
                        maxLength={600}
                        name={'title'}
                        value={data.title}
                        onChange={handleThreadChange}
                    />

                    {/* Preview uploaded image */}
                    {(data.image && !data.video) &&
                        <div
                            className={`${!data.image ? 'invisible' : 'visible w-full pb-3 border-zinc-700/70 relative'}`}>
                            <div onClick={removeUploadedFile}
                                 className="absolute right-2 top-2 p-1 cursor-pointer hover:bg-neutral-700 bg-neutral-600/30 flex justify-center items-center rounded-full transition">
                                <HiMiniXMark className={`size-6`}/>
                            </div>
                            <img className={`w-full max-h-[30rem] rounded`}
                                 src={data?.image ? URL.createObjectURL(data?.image) : ''}
                                 alt="post-img"/>
                        </div>
                    }

                    {/* Preview uploaded video */}
                    {(data.video && !data.image) &&
                        <div
                            className={`${!data.video ? 'invisible' : 'visible w-full pb-3 relative'}`}>
                            <div onClick={removeUploadedFile}
                                 className="absolute z-40 right-2 top-2 p-1 cursor-pointer hover:bg-neutral-700 bg-neutral-600/30 flex justify-center items-center rounded-full transition">
                                <HiMiniXMark className={`size-6`}/>
                            </div>
                            <video
                                src={URL.createObjectURL(data.video)}
                                className={`w-full max-h-[30rem] rounded`}
                                controls
                            />
                        </div>
                    }
                </div>

                <div className={`${ data.image || data.video ? '' : 'h-72' } border-b border-[--theme-default-border-color] pb-3`}></div>

                <div className={`p-4 relative `}>
                    <div className={`w-full flex justify-end gap-x-2`}>
                        <Button
                            onClick={() => setIsCreatThreadModalOpen(false)}
                            content={`إالغاء`}
                            custom_styles={`bg-transparent hover:bg-[--theme-main-bg-color] transition rounded-full px-4 py-2`}
                        />
                        <Button
                            disabled={!data.video && !data.image && !data.title}
                            onClick={submitForm}
                            custom_styles={`${!data.video && !data.image && !data.title ? 'opacity-40' : ''}`}
                            content={isPostActive ? 'نشر' : 'أضف سؤال'}
                        />
                    </div>

                    <label htmlFor="upload_post_img" className={`block w-fit`}>
                        <Input
                            type={'file'}
                            id={'upload_post_img'}
                            visibility={'hidden'}
                            onChange={handleFileChange}
                        />
                        <RiImageAddLine className={`size-9 p-1 text-[--theme-secondary-text-color] top-1/2 -translate-y-1/2 absolute rounded border border-transparent hover:border-[--theme-button-border-color] transition cursor-pointer`}/>
                    </label>
                </div>

            </div>
        </Modal>
    );
}
