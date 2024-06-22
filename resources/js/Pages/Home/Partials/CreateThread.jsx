import React from 'react'
import {CiSquareQuestion} from "react-icons/ci";
import {IoPencil} from "react-icons/io5";
import {LuFileEdit} from "react-icons/lu";

export default function CreateThread() {
    return (
        <div className={`bg-[--theme-nav-bg-color] w-1/2 text-[--theme-primary-text-color] h-fit p-5 rounded flex flex-col gap-y-5`}>
            <div className={`grid grid-cols-[0.5fr_6fr] gap-x-4`}>
                <div className={`bg-blue-600 size-10 rounded-full`}></div>
                <div className={`cursor-pointer`}>
                    <input
                        type="text"
                        className={`w-full rounded-full bg-[--theme-input-bg-color] placeholder:text-[--theme-placeholder-color] border-[--theme-nav-bg-color-hover] pointer-events-none`}
                        placeholder={`ماذا تريد أن تسأل أو تشارك؟`}
                    />
                </div>

            </div>

            <div className={`grid grid-cols-3`}>
                <div className={`flex items-center gap-x-3 font-bold justify-center hover:bg-[--theme-nav-bg-color-hover] py-2 rounded`}>
                    <CiSquareQuestion/>
                    <span>اسأل</span>
                </div>
                <div className={`flex items-center gap-x-3 font-bold justify-center hover:bg-[--theme-nav-bg-color-hover] py-2 rounded`}>
                    <LuFileEdit />
                    أجب
                </div>
                <div className={`flex items-center gap-x-3 font-bold justify-center hover:bg-[--theme-nav-bg-color-hover] py-2 rounded`}>
                    <IoPencil />
                    نشر
                </div>
            </div>
        </div>
    )
}
