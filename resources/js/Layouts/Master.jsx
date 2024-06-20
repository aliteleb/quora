import React from 'react'
import {IoHomeOutline, IoNotificationsOutline} from "react-icons/io5";
import {FaAngleDown, FaChevronDown, FaEdit, FaPlus, FaUsers} from "react-icons/fa";
import {Head} from "@inertiajs/react";
import {RxMagnifyingGlass} from "react-icons/rx";
import {useApp} from "@/AppContext/AppContext.jsx";
import {AiOutlinePlus} from "react-icons/ai";

function Master({children}) {
    const {settings} = useApp()

    return (
        <>
            <Head title='Home'/>
            <div className={`w-full flex justify-center bg-[--nav-bg-color]`}>
                <div className={`max-w-screen-xl container py-2`}>
                    <nav className={`flex flex-row xl:gap-x-8 md:gap-x-4 gap-x-2 px-2 items-center justify-between sm:justify-around text-[#e6e7e8]`}>
                        <img src={settings.logo}
                              alt="logo"
                              className={`h-6`}
                        />
                        <ul className={`flex xl:gap-x-3 lg:gap-x-1 gap-x-1 text-2xl flex-grow `}>
                            <div className={`sm:flex gap-x-2 hidden`}>
                                <div className={`xl:px-5 md:px-3 lg:px-4 px-2 py-2 rounded hover:bg-[--nav-bg-color-hover] transition cursor-pointer`}>
                                    <IoHomeOutline />
                                </div>
                                <div className={`xl:px-5 md:px-3 lg:px-4 px-2 py-2 rounded hover:bg-[--nav-bg-color-hover] transition cursor-pointer`}>
                                    <FaUsers />
                                </div>
                                <div className={`xl:px-5 md:px-3 lg:px-4 px-2 py-2 rounded hover:bg-[--nav-bg-color-hover] transition cursor-pointer`}>
                                    <FaEdit />
                                </div>
                                <div className={`xl:px-5 md:px-3 lg:px-4 px-2 py-2 rounded hover:bg-[--nav-bg-color-hover] transition cursor-pointer`}>
                                    <IoNotificationsOutline />
                                </div>
                            </div>

                            <div className={`h-9  flex-grow xl:-mr-4 mr-0 relative`}>
                                <RxMagnifyingGlass className={`pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-5 text-[--placeholder-color] mt-1`}/>
                                <input
                                    type="text"
                                    className={`shadow-none !ring-0 focus:shadow-none focus:border-red-600 hover:border-red-600 ps-8 w-full bg-[--main-website-color] rounded-sm border-1 border-[--nav-bg-color-hover] placeholder:absolute placeholder:right-8 placeholder:text-[--placeholder-color]`}
                                    placeholder={'البحث عن Quora'}
                                />
                            </div>
                        </ul>
                        <div className={`flex gap-x-2`}>
                            <button className={`size-10 rounded-full bg-sky-950`}></button>
                            <button className={`hidden md:flex items-center lg:gap-x-4 gap-x-2 bg-[--primary_button_color] text-sm h-9 lg:h-auto lg:py-1 px-4 rounded-full`}>
                                أضف سؤال
                                <FaChevronDown />
                            </button>
                        </div>
                    </nav>


                    {/*  Bottom Nav  */}
                    <nav className={`sm:hidden absolute bottom-0 flex bg-[--nav-bg-color] w-full justify-around text-3xl text-[--theme-body-color] py-2 px-4`}>
                        <div className={`px-5 py-2 rounded hover:bg-[--nav-bg-color-hover] transition cursor-pointer`}>
                            <IoHomeOutline />
                        </div>
                        <div className={`px-5 py-2 rounded hover:bg-[--nav-bg-color-hover] transition cursor-pointer`}>
                            <FaUsers />
                        </div>
                        <div className={`px-5 py-2 rounded hover:bg-[--nav-bg-color-hover] transition cursor-pointer`}>
                            <FaEdit />
                        </div>
                        <div className={`px-5 py-2 rounded hover:bg-[--nav-bg-color-hover] transition cursor-pointer`}>
                            <IoNotificationsOutline />
                        </div>
                    </nav>

                    <button className={`md:hidden size-14 text-[--theme-body-color] text-2xl bg-red-500 rounded-full absolute flex justify-center items-center bottom-[15%] right-2`}>
                        <AiOutlinePlus />
                    </button>


                <main>{children}</main>
                </div>

            </div>
        </>

    )
}
export default Master
