import React, {useState} from 'react'
import {IoHomeOutline, IoNotificationsOutline} from "react-icons/io5";
import {FaAngleDown, FaChevronDown, FaEdit, FaPlus, FaUserCircle, FaUsers} from "react-icons/fa";
import {Head, Link, router} from "@inertiajs/react";
import {RxMagnifyingGlass} from "react-icons/rx";
import {useApp} from "@/AppContext/AppContext.jsx";
import {AiOutlinePlus} from "react-icons/ai";
import {TbUsersGroup} from "react-icons/tb";
import {FaRegCircleUser} from "react-icons/fa6";
import UserDropdownMenu from "@/Components/UserDropdownMenu.jsx";
import CreateDropdownMenu from "@/Components/CreateDropdownMenu.jsx";
import RegistrationModal from "@/Pages/Auth/Partials/RegistrationModal.jsx";
import SpaceModal from "@/Pages/Auth/Partials/SpaceModal.jsx";
import DefaultUserIcon from "@/Core/DefaultUserIcon.jsx";

function Master({children}) {

    const {settings, user, isSpaceModalOpen, setIsSpaceModalOpen, setIsCreatThreadModalOpen} = useApp()

    const [isUserDropdownMenuOpen, setIsUserDropdownMenuOpen] = useState(false)
    const [isCreateDropdownMenuOpen, setIsCreateDropdownMenuOpen] = useState(false)

    const redirectToLogin = () => {
        window.location = '/account'
    }

    return (
        <>
            <div className={`z-40 sticky w-full top-0 flex justify-center bg-[--theme-main-bg-color] backdrop-blur-sm`}>
                <div className={`max-w-screen-xl container`}>
                    <nav className={`flex flex-row xl:gap-x-6 h-14 lg:gap-x-4 gap-x-2 px-2 items-center lg:justify-between sm:justify-around text-[#e6e7e8]`}>
                        <Link href={`/`}>
                            <img src={settings.logo}
                                  alt="logo"
                                  className={`h-6`}
                            />
                        </Link>
                        <ul className={`flex xl:gap-x-3 gap-x-1 text-2xl flex-grow `}>
                            <div className={`sm:flex gap-x-1 hidden`}>
                                <Link href={`/`} className={`xl:px-5 md:px-3 lg:px-4 px-2 py-2 rounded hover:bg-[--theme-nav-bg-color-hover] transition cursor-pointer`}>
                                    <IoHomeOutline />
                                </Link>
                                <Link href={`/spaces`} className={`xl:px-5 md:px-3 lg:px-4 px-2 py-2 rounded hover:bg-[--theme-nav-bg-color-hover] transition cursor-pointer`}>
                                    <FaUsers />
                                </Link>
                                <Link className={`xl:px-5 md:px-3 lg:px-4 px-2 py-2 rounded hover:bg-[--theme-nav-bg-color-hover] transition cursor-pointer`}>
                                    <FaEdit />
                                </Link>
                                <Link className={`xl:px-5 md:px-3 lg:px-4 px-2 py-2 rounded hover:bg-[--theme-nav-bg-color-hover] transition cursor-pointer`}>
                                    <IoNotificationsOutline />
                                </Link>
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

                            <div className={`relative flex items-center`}>
                                <button onClick={() => setIsUserDropdownMenuOpen(!isUserDropdownMenuOpen)}>
                                    {user?.avatar && <img src={``} className={`md:size-9 size-7 rounded-full cursor-pointer pointer-events-none`}/>}
                                    {(!user?.avatar && user) && <DefaultUserIcon id={`userDropdown`} />}
                                </button>

                                <UserDropdownMenu
                                    isUserDropdownMenuOpen={isUserDropdownMenuOpen}
                                    setIsUserDropdownMenuOpen={setIsUserDropdownMenuOpen}
                                />

                            </div>
                            <button id={`createDropdown`} onClick={!user ? redirectToLogin : () => setIsCreateDropdownMenuOpen(!isCreateDropdownMenuOpen)} className={`relative hidden md:flex items-center lg:gap-x-4 gap-x-2 bg-[--theme-primary-button-color] text-sm h-9 lg:py-1 px-4 rounded-full w-fit`}>
                                {user ? 'إنشاء' : 'تسجيل دخول'}
                                {user && <FaChevronDown/>}

                                <CreateDropdownMenu
                                    isCreateDropdownMenuOpen={isCreateDropdownMenuOpen}
                                    setIsCreateDropdownMenuOpen={setIsCreateDropdownMenuOpen}
                                    setIsSpaceModalOpen={setIsSpaceModalOpen}
                                />

                            </button>

                        </div>
                    </nav>
                </div>
            </div>
            {location.pathname === '/' &&
                <button onClick={() => setIsCreatThreadModalOpen(true)}
                        className={`fixed md:hidden size-14 text-[--theme-body-color] text-2xl bg-red-500 rounded-full flex justify-center items-center bottom-[15%] right-2 z-50`}>
                        <AiOutlinePlus/>
                </button>
            }
            {/*  Bottom Nav  */}
            <nav className={`bg-[#141414] sm:hidden z-50 fixed bottom-0 flex w-full justify-between text-3xl text-[--theme-body-color]`}>
                <Link href={`/`} className={`w-full flex justify-center py-3 hover:bg-[--theme-main-bg-color-hover] transition cursor-pointer`}>
                    <IoHomeOutline />
                </Link>
                <Link href={`/spaces`} className={`w-full flex justify-center py-3 hover:bg-[--theme-main-bg-color-hover] transition cursor-pointer`}>
                    <FaUsers />
                </Link>
                <Link href={`/`} className={`w-full flex justify-center py-3 hover:bg-[--theme-main-bg-color-hover] transition cursor-pointer`}>
                    <FaEdit />
                </Link>
                <Link href={`/`} className={`w-full flex justify-center py-3 hover:bg-[--theme-main-bg-color-hover] transition cursor-pointer`}>
                    <IoNotificationsOutline />
                </Link>
            </nav>

            <main>{children}</main>

            <SpaceModal/>

        </>

    )
}
export default Master
