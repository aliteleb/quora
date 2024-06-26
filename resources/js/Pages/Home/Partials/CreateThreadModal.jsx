import React from 'react'
import {HiMiniXMark} from "react-icons/hi2";
import {BiCaretLeft} from "react-icons/bi";
import {TbUsers} from "react-icons/tb";
import {FaAngleDown} from "react-icons/fa";
import {useApp} from "@/AppContext/AppContext.jsx";
import Modal from "@/Components/Modal.jsx";

export default function CreateThreadModal() {

    const {isCreatThreadModalOpen ,setIsCreatThreadModalOpen } = useApp();

    return (
        <Modal
            show={isCreatThreadModalOpen}
            onClose={() => {setIsCreatThreadModalOpen(false)}}
            bgColor={`bg-black/30 backdrop-blur-[2px]`}
        >
            <div className={`text-white  bg-[--theme-body-bg] z-50 rounded-lg border border-[--theme-nav-bg-color-hover]`}>
                <div onClick={() => setIsCreatThreadModalOpen(false)}
                     className={`hover:bg-[--theme-nav-bg-color] p-2 rounded-full w-fit cursor-pointer m-2`}>
                    <HiMiniXMark className={`size-6`}/>
                </div>

                <div className={`mt-2 flex border-b border-[--theme-nav-bg-color-hover]`}>
                    <button className={`hover:bg-[--theme-nav-bg-color] transition w-1/2 py-3 border-b-2 border-[--theme-button-border-color] font-bold`}>إضافة سؤال</button>
                    <button className={`hover:bg-[--theme-nav-bg-color] transition w-1/2 py-3 font-bold`}>إنشاء منشور</button>
                </div>

                <div className={`px-4`}>
                    <div className={`mt-5 flex gap-x-3`}>
                        <div className={`flex items-center gap-x-1`}>
                            <div className={`bg-blue-600 size-8 rounded-full`}></div>
                            <BiCaretLeft className={`size-5`}/>
                        </div>

                        <button
                            className={`flex items-center border border-[--theme-nav-bg-color-hover] rounded-full px-3 gap-x-1 hover:bg-[--theme-nav-bg-color]`}>
                            <TbUsers className={`size-4`}/>
                            <span>عام</span>
                            <FaAngleDown className={`size-4`}/>
                        </button>
                    </div>
                </div>

                <div className={`px-4`}>
                    <textarea
                        placeholder={`إبدء سؤال بماذا, كيف, لماذا, إلخ.`}
                        className={`w-full resize-none p-0 mt-4 bg-transparent border-x-0 border-t-0 border-[--theme-nav-bg-color-hover] hover:border-[--theme-button-border-color] focus:border-[--theme-nav-bg-color] focus:ring-0`}
                        maxLength={200}
                    >
                    </textarea>
                </div>

                <div className={`h-72 border-b border-[--theme-nav-bg-color-hover] pb-3`}></div>

                <div className={`p-4`}>
                    <div className={`w-full flex justify-end gap-x-2`}>
                        <button className={`hover:bg-[--theme-nav-bg-color] transition rounded-full px-4 py-2`}>إالغاء</button>
                        <button className={`bg-[--theme-button-border-color] rounded-full px-4 py-1`}>أضف سؤال</button>
                    </div>
                </div>

            </div>
        </Modal>
    );
}
