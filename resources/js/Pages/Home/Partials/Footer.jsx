import React from 'react'
import {LuPlus} from "react-icons/lu";

export default function Footer() {
    return (
            <div className={`top-16 fixed text-[--theme-primary-text-color] gap-y-7 md:flex hidden flex-col`}>
                <button className={`w-fit`}>
                    <div className={`flex gap-x-3 items-center bg-[#1b1b1b] hover:bg-[#1d1d1d] px-6 py-2 rounded transition`}>
                        <div className={`bg-[#262626] p-1 rounded`}>
                            <LuPlus />
                        </div>
                        <span>إنشاء مساحة</span>
                    </div>
                    <div className={`w-full mt-5 h-[1px] bg-[--theme-main-bg-color]`}> </div>
                </button>

                <div className={`text-[--theme-secondary-text-color]`}>

                    <div>
                        <a href="" className={`hover:underline`}>حول . </a>
                        <a href="" className={`hover:underline`}>الوظائف .</a>
                    </div>
                    <div>
                        <a href="" className={`hover:underline`}>الشروط . </a>
                        <a href="" className={`hover:underline`}>الخصوصية .</a>
                    </div>
                    <div>
                        <a href="" className={`hover:underline`}>الاستخدام المقبول .</a>
                    </div>
                    <div>
                        <a href="" className={`hover:underline`}>إعلان . </a>
                        <a href="" className={`hover:underline`}>الصحافة</a>
                    </div>

                </div>

        </div>

    )
}
