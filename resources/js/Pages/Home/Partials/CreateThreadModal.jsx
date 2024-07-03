import React, {useEffect} from 'react';
import { HiMiniXMark } from 'react-icons/hi2';
import { BiCaretLeft } from 'react-icons/bi';
import { TbUsers } from 'react-icons/tb';
import { FaAngleDown } from 'react-icons/fa';
import { useApp } from '@/AppContext/AppContext.jsx';
import Modal from '@/Components/Modal.jsx';
import { AiOutlineGlobal } from 'react-icons/ai';
import { RiImageAddLine } from 'react-icons/ri';
import Input from '@/Core/Input.jsx';
import { FaRegCircleUser } from 'react-icons/fa6';
import { useForm } from '@inertiajs/react';

export default function CreateThreadModal() {
    const { isCreatThreadModalOpen, setIsCreatThreadModalOpen, isPostActive, setIsPostActive, user } = useApp();

    const { data, setData, post, errors, processing, reset } = useForm({
        title: '',
        image: null,
        video: null,
        space: '',
    }, {forceFormData: true,});

    const handleThreadChange = (e) => {
        setData((formData) => ({
            ...formData,
            [e.target.name]: e.target.value,
        }));
        // console.log(data)
    };

    const removeUploadedFile = () => {
        setData({
            ...data,
            image: null,
            video: null,
        });
    };

    const handleImage =(e) => {
        setData('image', e.target.files[0])
    }

    useEffect(() => {
        console.log(data)
    }, [data]);

    const submitForm = (e) => {
        e.preventDefault()
        post('/thread/create', {
            onSuccess: () => {
                setIsCreatThreadModalOpen(false)
                reset()
            },
            onError: (response) => {
                console.log(response)
            },
        })
    }

    return (
        <Modal
            show={isCreatThreadModalOpen}
            onClose={() => setIsCreatThreadModalOpen(false)}
            bgColor={`bg-black/30 backdrop-blur-[2px]`}
        >
            <div className={`text-[--theme-primary-text-color] bg-[--theme-body-bg] z-50 rounded border border-[--theme-default-border-color]`}>
                <div className={`flex items-center relative`}>
                    <div
                        onClick={() => setIsCreatThreadModalOpen(false)}
                        className={`hover:bg-[--theme-main-bg-color] p-2 rounded-full w-fit cursor-pointer m-2`}
                    >
                        <HiMiniXMark className={`size-6`} />
                    </div>

                    <button className={`${!isPostActive ? 'hidden' : ''} absolute left-1/2 -translate-x-1/2 flex items-center gap-x-1 hover:bg-[--theme-main-bg-color] py-2 px-4 rounded-full`}>
                        <AiOutlineGlobal />
                        <span>الجميع</span>
                        <FaAngleDown className={`size-4`} />
                    </button>
                </div>

                <div className={`mt-2 flex border-b border-[--theme-default-border-color] text-lg`}>
                    <button onClick={() => setIsPostActive(false)} className={`hover:bg-[--theme-main-bg-color] transition w-1/2 py-3 border-b-2  ${!isPostActive ? 'border-[--theme-button-border-color]' : 'border-transparent'}`}>إضافة سؤال</button>
                    <button onClick={() => setIsPostActive(true)} className={`hover:bg-[--theme-main-bg-color] transition w-1/2 py-3 border-b-2 ${isPostActive ? 'border-[--theme-button-border-color]' : 'border-transparent'}`}>إنشاء منشور</button>
                </div>

                <div className={`px-4`}>
                    <div className={`mt-5 flex gap-x-3`}>
                        <div className={`flex items-center ${isPostActive ? 'gap-x-3' : 'gap-x-1'} `}>
                            {user?.avatar && <img src={``} className={`size-7 rounded-full cursor-pointer`}/>}
                            {(!user?.avatar && user) && <FaRegCircleUser className={`size-9 cursor-pointer text-[--theme-placeholder-color]`}/>}
                            {!isPostActive && <BiCaretLeft className={`size-5`}/>}
                            {isPostActive && <span>{user?.name}</span>}
                        </div>

                        <button
                            className={`${isPostActive ? 'hidden' : ''} flex items-center border border-[--theme-main-bg-color-hover] rounded-full px-3 gap-x-1 hover:bg-[--theme-main-bg-color]`}>
                            <TbUsers className={`size-4`}/>
                            <span>عام</span>
                            <FaAngleDown className={`size-4`}/>
                        </button>
                    </div>
                </div>

                <div className={`px-4`}>
                    <textarea
                        placeholder={`${isPostActive ? 'قل شيئاً ما...' : 'إبدء سؤال بماذا, كيف, لماذا, إلخ.'}`}
                        className={`w-full resize-none p-0 mt-4 bg-transparent ${isPostActive ? 'border-transparent' : 'border-[--theme-default-border-color] hover:border-[--theme-button-border-color]  focus:border-[--theme-main-bg-color]'} border-x-0 border-t-0  focus:ring-0`}
                        maxLength={200}
                        name={'title'}
                        value={data.title}
                        onChange={handleThreadChange}
                    >
                    </textarea>

                    {/* Preview uploaded image */}
                    {(data.image && !data.video) &&
                        <div
                            className={`${!data.image ? 'invisible' : 'visible w-full pb-3 border-zinc-700/70 relative'}`}>
                            <div onClick={removeUploadedFile}
                                 className="absolute right-2 top-2 p-1 cursor-pointer hover:bg-neutral-700 bg-neutral-600/30 flex justify-center items-center rounded-full transition">
                                <HiMiniXMark className={`size-6`}/>
                            </div>
                            <img className={`w-full max-h-[30rem] rounded-2xl transition`}
                                 src={data?.image ? URL.createObjectURL(data?.image) : ''}
                                 alt="post-img"/>
                        </div>
                    }

                    {/* Preview uploaded video */}
                    {(data.video && !data.image) &&
                        <div
                            className={`${!data.video ? 'invisible' : 'visible w-full pb-3 relative'}`}>
                            <div onClick={removeUploadedFile}
                                 className="absolute z-50 right-2 top-2 p-1 cursor-pointer hover:bg-neutral-700 bg-neutral-600/30 flex justify-center items-center rounded-full transition">
                                <HiMiniXMark className={`size-6`}/>
                            </div>
                            <video
                                src={data.video}
                                className={`w-full max-h-[30rem]`}
                                controls
                            />
                        </div>
                    }
                </div>

                <div className={`${ !data.image || !data.video ? 'h-72' : '' } border-b border-[--theme-default-border-color] pb-3`}></div>

                <div className={`p-4 relative `}>
                    <div className={`w-full flex justify-end gap-x-2`}>
                        <button onClick={() => setIsCreatThreadModalOpen(false)} className={`hover:bg-[--theme-main-bg-color] transition rounded-full px-4 py-2`}>إالغاء</button>
                        <button onClick={submitForm} disabled={!data.title} className={`rounded-full px-4 py-1 bg-[--theme-button-border-color] ${!data.title ? 'opacity-40' : ''}`}>{isPostActive ? 'نشر' : 'أضف سؤال'}</button>
                    </div>

                    <label htmlFor="upload_post_img" className={`block w-fit`}>
                        <Input type={'file'} id={'upload_post_img'} visibility={'hidden'} onChange={handleImage}/>
                        <RiImageAddLine className={`size-9 p-1 text-[--theme-secondary-text-color] top-1/2 -translate-y-1/2 absolute rounded border border-transparent hover:border-[--theme-button-border-color] transition cursor-pointer`}/>
                    </label>
                </div>

            </div>
        </Modal>
    );
}
