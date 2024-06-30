import React, {useState} from 'react'
import {CiEdit, CiSquareQuestion} from "react-icons/ci";
import {IoPencil} from "react-icons/io5";
import {LuFileEdit} from "react-icons/lu";
import {useApp} from "@/AppContext/AppContext.jsx";
import {RiQuestionAnswerLine, RiQuestionnaireLine} from "react-icons/ri";
import {AiOutlineQuestion} from "react-icons/ai";
import {BsQuestionSquare} from "react-icons/bs";
import {BiCommentEdit} from "react-icons/bi";
import {FaRegCircleUser} from "react-icons/fa6";

export default function CreateThread() {

    const {setIsCreatThreadModalOpen, setIsPostActive, user } = useApp();

    return (
        <div className={`z-10 bg-[--theme-main-bg-color] w-full text-[--theme-primary-text-color] h-fit p-5 rounded flex flex-col gap-y-5`}>
                <div className={`${user ? 'grid' : ''}  grid-cols-[0.5fr_6fr] items-center`}>
                    {user?.avatar && <img src={``} className={`size-7 rounded-full cursor-pointer`}/>}
                    {(!user?.avatar && user) && <FaRegCircleUser className={`size-9 cursor-pointer text-[--theme-placeholder-color]`}/>}
                    <div onClick={() => setIsCreatThreadModalOpen(true)} className={`cursor-pointer`}>
                        <input
                            type="text"
                            className={`w-full rounded-full bg-[--theme-input-bg-color] placeholder:text-[--theme-placeholder-color] border-[--theme-default-border-color] pointer-events-none`}
                            placeholder={`ماذا تريد أن تسأل أو تشارك؟`}
                        />
                    </div>
                </div>

                <div className={`grid grid-cols-3`}>
                    <div onClick={() => {
                        setIsCreatThreadModalOpen(true)
                        setIsPostActive(false)
                    }} className={`cursor-pointer flex items-center gap-x-3`}>
                        <div className={`w-full text-lg flex items-center gap-x-3 justify-center hover:bg-[--theme-nav-bg-color-hover] py-2 rounded`}>
                            <BsQuestionSquare className={`size-5 text-[--theme-placeholder-color]`}/>
                            <span>اسأل</span>
                        </div>
                        <div className={`w-[1px] h-5 ms-1 bg-[--theme-placeholder-color]`}></div>
                    </div>

                    <div className={`cursor-pointer flex items-center gap-x-3 ms-3`}>
                        <div className={`ms-1 w-full text-lg flex items-center gap-x-3 justify-center hover:bg-[--theme-nav-bg-color-hover] py-2 rounded`}>
                            <RiQuestionAnswerLine className={`size-6 text-[--theme-placeholder-color]`}/>
                            أجب
                        </div>
                        <div className={`w-[1px] h-5 ms-1 bg-[--theme-placeholder-color]`}></div>
                    </div>

                    <div onClick={() => {
                        setIsCreatThreadModalOpen(true)
                        setIsPostActive(true)
                    }} className={`cursor-pointer text-lg flex items-center gap-x-3 ms-3 justify-center hover:bg-[--theme-nav-bg-color-hover] py-2 rounded`}>
                        <BiCommentEdit  className={`size-6 text-[--theme-placeholder-color]`}/>
                        نشر
                    </div>
                </div>
            </div>
    )
}
