import React from 'react'
import {IoHomeOutline, IoNotificationsOutline} from "react-icons/io5";
import {FaAngleDown, FaChevronDown, FaEdit, FaUsers} from "react-icons/fa";
import {Head} from "@inertiajs/react";
import {RxMagnifyingGlass} from "react-icons/rx";
import {useApp} from "@/AppContext/AppContext.jsx";

function Master({children}) {
    const {settings} = useApp()

    return (
        <>
            <Head title='Home'/>
            <div className={`w-full flex justify-center bg-[--nav-bg-color]`}>
                <div className={`max-w-screen-xl container py-2`}>
                    <div className={`flex flex-row gap-x-8 items-center justify-center text-[#e6e7e8]`}>
                        <img src={settings.logo}
                             alt="logo"
                             className={`h-6`}
                        />
                        <ul className={`flex gap-x-3 text-2xl`}>
                            <div className={`px-5 py-2 rounded hover:bg-[--nav-bg-color-hover] transition cursor-pointer`}>
                                <li><IoHomeOutline /></li>
                            </div>
                            <div className={`px-5 py-2 rounded hover:bg-[--nav-bg-color-hover] transition cursor-pointer`}>
                                <li><FaUsers /></li>
                            </div>
                            <div className={`px-5 py-2 rounded hover:bg-[--nav-bg-color-hover] transition cursor-pointer`}>
                                <li><FaEdit /></li>
                            </div>
                            <div className={`px-5 py-2 rounded hover:bg-[--nav-bg-color-hover] transition cursor-pointer`}>
                                <IoNotificationsOutline />
                            </div>
                        </ul>
                        <div className={`h-9 w-1/3 -mr-4 relative`}>
                            <RxMagnifyingGlass className={`absolute right-2 top-1/2 -translate-y-1/2 size-5 text-[--placeholder_text_color] mt-1`}/>
                            <input
                                type="text"
                                className={`w-full bg-[--main-website-color] rounded-sm border-1 border-[--nav-bg-color-hover] placeholder:absolute placeholder:right-8 placeholder:text-[--placeholder_text_color]`}
                                placeholder={'البحث عن Quora'}
                            />
                        </div>
                        <button className={`size-10 rounded-full bg-sky-950`}></button>
                        <button className={`flex items-center gap-x-4 bg-[--primary_button_color] py-1 px-4 rounded-full`}>
                            أضف سؤال
                            <FaChevronDown />
                        </button>
                    </div>
                <main>{children}</main>
                </div>
            </div>
        </>

    )
}
export default Master
