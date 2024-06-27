import React, {useEffect, useState} from 'react'
import {HiMiniXMark} from "react-icons/hi2";
import {BiCaretLeft} from "react-icons/bi";
import {TbUsers} from "react-icons/tb";
import {FaAngleDown} from "react-icons/fa";
import {useApp} from "@/AppContext/AppContext.jsx";
import Modal from "@/Components/Modal.jsx";
import {AiOutlineGlobal} from "react-icons/ai";
import {RiImageAddLine} from "react-icons/ri";

export default function CreateThreadModal() {

    const {isCreatThreadModalOpen ,setIsCreatThreadModalOpen, isPostActive, setIsPostActive} = useApp();

    const [thread, setThread] = useState({
        title: '',
        image: '',
        space: '',
    })

    const handleThreadChange = (e) => {
        setThread(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <Modal
            show={isCreatThreadModalOpen}
            onClose={() => {setIsCreatThreadModalOpen(false)}}
            bgColor={`bg-black/30 backdrop-blur-[2px]`}
        >
            <div className={`text-[--theme-primary-text-color] bg-[--theme-body-bg] z-50 rounded-lg border border-[--theme-nav-bg-color-hover]`}>
                <div className={`flex items-center relative`}>
                    <div onClick={() => setIsCreatThreadModalOpen(false)}
                         className={`hover:bg-[--theme-nav-bg-color] p-2 rounded-full w-fit cursor-pointer m-2`}>
                        <HiMiniXMark className={`size-6`}/>
                    </div>

                    <button className={`${!isPostActive ? 'hidden' : ''} absolute left-1/2 -translate-x-1/2 flex items-center gap-x-1 hover:bg-[--theme-nav-bg-color] py-2 px-4 rounded-full`}>
                        <AiOutlineGlobal />
                        <span>الجميع</span>
                        <FaAngleDown className={`size-4`}/>
                    </button>
                </div>


                <div className={`mt-2 flex border-b border-[--theme-nav-bg-color-hover]`}>
                    <button onClick={() => setIsPostActive(false)} className={`hover:bg-[--theme-nav-bg-color] transition w-1/2 py-3 border-b-2  ${!isPostActive ? 'border-[--theme-button-border-color]' : 'border-transparent'} font-bold`}>إضافة سؤال</button>
                    <button onClick={() => setIsPostActive(true)} className={`hover:bg-[--theme-nav-bg-color] transition w-1/2 py-3 border-b-2 ${isPostActive ? 'border-[--theme-button-border-color]' : 'border-transparent'} font-bold`}>إنشاء منشور</button>
                </div>

                <div className={`px-4`}>
                    <div className={`mt-5 flex gap-x-3`}>
                        <div className={`flex items-center gap-x-1`}>
                            <div className={`bg-blue-600 size-8 rounded-full`}></div>
                            {!isPostActive && <BiCaretLeft className={`size-5`}/>}
                            {isPostActive && <span>{`Username`}</span>}
                        </div>

                        <button
                            className={`${isPostActive ? 'hidden' : ''} flex items-center border border-[--theme-nav-bg-color-hover] rounded-full px-3 gap-x-1 hover:bg-[--theme-nav-bg-color]`}>
                            <TbUsers className={`size-4`}/>
                            <span>عام</span>
                            <FaAngleDown className={`size-4`}/>
                        </button>
                    </div>
                </div>

                <div className={`px-4`}>
                    <textarea
                        placeholder={`${isPostActive ? 'قل شيئاً ما...' : 'إبدء سؤال بماذا, كيف, لماذا, إلخ.'}`}
                        className={`w-full resize-none p-0 mt-4 bg-transparent ${isPostActive ? 'border-0' : ''} border-x-0 border-t-0 border-[--theme-nav-bg-color-hover] hover:border-[--theme-button-border-color] focus:border-[--theme-nav-bg-color] focus:ring-0`}
                        maxLength={200}
                        name={'title'}
                        value={thread.title}
                        onChange={handleThreadChange}
                    >
                    </textarea>
                </div>

                <div className={`h-72 border-b border-[--theme-nav-bg-color-hover] pb-3`}></div>

                <div className={`p-4 relative `}>
                    <div className={`w-full flex justify-end gap-x-2`}>
                        <button onClick={() => setIsCreatThreadModalOpen(false)} className={`hover:bg-[--theme-nav-bg-color] transition rounded-full px-4 py-2`}>إالغاء</button>
                        <button disabled={!thread.title} className={`rounded-full px-4 py-1 bg-[--theme-button-border-color] ${!thread.title ? 'opacity-40' : ''}`}>{isPostActive ? 'نشر' : 'أضف سؤال'}</button>
                    </div>

                    <div className={`absolute top-1/2 -translate-y-1/2 p-1 rounded border border-transparent hover:border-[--theme-button-border-color] transition cursor-pointer`}>
                        <RiImageAddLine className={`size-6 text-[--theme-secondary-text-color]`}/>
                    </div>
                </div>

            </div>
        </Modal>
    );
}
