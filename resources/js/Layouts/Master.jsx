import React, {useState} from 'react'
import {IoHomeOutline, IoNotificationsOutline} from "react-icons/io5";
import {FaAngleDown, FaChevronDown, FaEdit, FaPlus, FaUserCircle, FaUsers} from "react-icons/fa";
import {Head} from "@inertiajs/react";
import {RxMagnifyingGlass} from "react-icons/rx";
import {useApp} from "@/AppContext/AppContext.jsx";
import {AiOutlinePlus} from "react-icons/ai";
import {TbUsersGroup} from "react-icons/tb";
import {FaRegCircleUser} from "react-icons/fa6";
import UserDropdownMenu from "@/Layouts/UserDropdownMenu.jsx";

function Master({children}) {

    const {settings, user} = useApp()

    const [isUserDropdownMenuOpen, setIsUserDropdownMenuOpen] = useState(false)

    return (
        <>
            <div className={`z-40 sticky w-full top-0 flex justify-center bg-[--theme-main-bg-color] backdrop-blur-sm`}>
                <div className={`max-w-screen-xl container`}>
                    <nav className={`flex flex-row xl:gap-x-6 h-14 lg:gap-x-4 gap-x-2 px-2 items-center lg:justify-between sm:justify-around text-[#e6e7e8]`}>
                        <img src={settings.logo}
                              alt="logo"
                              className={`h-6`}
                        />
                        <ul className={`flex xl:gap-x-3 gap-x-1 text-2xl flex-grow `}>
                            <div className={`sm:flex gap-x-1 hidden`}>
                                <div className={`xl:px-5 md:px-3 lg:px-4 px-2 py-2 rounded hover:bg-[--theme-nav-bg-color-hover] transition cursor-pointer`}>
                                    <IoHomeOutline />
                                </div>
                                <div className={`xl:px-5 md:px-3 lg:px-4 px-2 py-2 rounded hover:bg-[--theme-nav-bg-color-hover] transition cursor-pointer`}>
                                    <FaUsers />
                                </div>
                                <div className={`xl:px-5 md:px-3 lg:px-4 px-2 py-2 rounded hover:bg-[--theme-nav-bg-color-hover] transition cursor-pointer`}>
                                    <FaEdit />
                                </div>
                                <div className={`xl:px-5 md:px-3 lg:px-4 px-2 py-2 rounded hover:bg-[--theme-nav-bg-color-hover] transition cursor-pointer`}>
                                    <IoNotificationsOutline />
                                </div>
                            </div>

                            <div className={`flex-grow relative`}>
                                <RxMagnifyingGlass className={`pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-5 text-[--theme-placeholder-color]`}/>
                                <input
                                    type="text"
                                    className={`shadow-none !ring-0 focus:shadow-none focus:border-red-600 hover:border-red-600 ps-8 w-full bg-[--theme-body-bg] rounded-sm border-1 border-[--theme-default-border-color] placeholder:absolute placeholder:right-8 placeholder:text-[--theme-placeholder-color]`}
                                    placeholder={'البحث عن Quora'}
                                />
                            </div>
                        </ul>
                        <div className={`flex md:w-44 lg:w-auto items-center gap-x-4`}>
                            {user?.avatar && <img onClick={() => setIsUserDropdownMenuOpen(true)} src={``} className={`md:size-10 size-7 rounded-full cursor-pointer`}/>}
                            {(!user?.avatar && user) && <FaRegCircleUser onClick={() => setIsUserDropdownMenuOpen(true)} className={`md:size-10 size-7 cursor-pointer text-[--theme-placeholder-color]`}/>}
                            <button className={`hidden md:flex items-center lg:gap-x-4 gap-x-2 bg-[--theme-primary-button-color] text-sm h-9 lg:py-1 px-4 rounded-full w-full`}>
                                أضف سؤال
                                <FaChevronDown />
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
            <button className={`fixed md:hidden size-14 text-[--theme-body-color] text-2xl bg-red-500 rounded-full flex justify-center items-center bottom-[15%] right-2`}>
                <AiOutlinePlus />
            </button>

            {/*  Bottom Nav  */}
            <nav className={`sm:hidden fixed bottom-0 flex bg-[--nav-bg-color] w-full justify-between text-3xl text-[--theme-body-color]`}>
                <div className={`w-full flex justify-center py-3 hover:bg-[--theme-main-bg-color-hover] transition cursor-pointer`}>
                    <IoHomeOutline />
                </div>
                <div className={`w-full flex justify-center py-3 hover:bg-[--theme-main-bg-color-hover] transition cursor-pointer`}>
                    <FaUsers />
                </div>
                <div className={`w-full flex justify-center py-3 hover:bg-[--theme-main-bg-color-hover] transition cursor-pointer`}>
                    <FaEdit />
                </div>
                <div className={`w-full flex justify-center py-3 hover:bg-[--theme-main-bg-color-hover] transition cursor-pointer`}>
                    <IoNotificationsOutline />
                </div>
            </nav>

            {isUserDropdownMenuOpen &&
                <UserDropdownMenu
                    isUserDropdownMenuOpen={isUserDropdownMenuOpen}
                    setIsUserDropdownMenuOpen={setIsUserDropdownMenuOpen}
                />
            }

            <main>{children}</main>
        </>

    )
}
export default Master
