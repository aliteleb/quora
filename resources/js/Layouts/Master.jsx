import React, {useCallback, useState} from 'react'
import {IoHomeOutline, IoNotificationsOutline, IoSearchOutline} from "react-icons/io5";
import { FaChevronDown, FaEdit, FaUsers} from "react-icons/fa";
import {Link, usePage} from "@inertiajs/react";
import {RxMagnifyingGlass} from "react-icons/rx";
import {useApp} from "@/AppContext/AppContext.jsx";
import {AiOutlinePlus} from "react-icons/ai";
import UserDropdownMenu from "@/Components/UserDropdownMenu.jsx";
import CreateDropdownMenu from "@/Components/CreateDropdownMenu.jsx";
import SpaceModal from "@/Pages/Auth/Components/SpaceModal.jsx";
import DefaultUserIcon from "@/Core/DefaultUserIcon.jsx";
import CreateThreadModal from "@/Pages/Home/Components/CreateThreadModal.jsx";
import SearchInput from "@/Components/SearchInput.jsx";
import {MdLogin} from "react-icons/md";

function Master({children, threads, setThreads}) {

    const {settings, user, setIsSpaceModalOpen, setIsCreatThreadModalOpen, notificationsCount, returnToLoginPage} = useApp()

    const [isUserDropdownMenuOpen, setIsUserDropdownMenuOpen] = useState(false)
    const [isCreateDropdownMenuOpen, setIsCreateDropdownMenuOpen] = useState(false)

    const redirectToLogin =  useCallback(() => {
        window.location = '/account'
    }, [])

    return (
        <>
            <div className={`z-40 sticky w-full top-0 flex justify-center bg-[--theme-main-bg-color] backdrop-blur-sm`}>
                <div className={`max-w-screen-xl container`}>
                    <nav className={`flex flex-row xl:gap-x-6 h-14 lg:gap-x-4 gap-x-2 px-2 items-center lg:justify-between sm:justify-around text-[#e6e7e8]`}>
                        <Link href={`/`} className={`select-none outline-0 border-none shadow-none`} data-select={true}>
                            <img src={settings.logo}
                                  alt="logo"
                                  className={`h-6`}
                            />
                        </Link>
                        <ul className={`flex gap-x-3 text-2xl flex-grow `} data-select={true}>
                            <div className={`sm:flex gap-x-1 hidden`}>
                                <Link
                                    href={`/`}
                                    className={`px-4 md:px-5 py-2 rounded hover:bg-[--theme-nav-bg-color-hover] transition cursor-pointer`}>
                                    <IoHomeOutline />
                                </Link>
                                <Link
                                    href={`/all-spaces`}
                                    className={`px-4 md:px-5 py-2 rounded hover:bg-[--theme-nav-bg-color-hover] transition cursor-pointer`}>
                                    <FaUsers />
                                </Link>
                                <Link
                                    href={`/threads/questions`}
                                    className={`px-4 md:px-5 py-2 rounded hover:bg-[--theme-nav-bg-color-hover] transition cursor-pointer`}>
                                    <FaEdit />
                                </Link>
                                <Link
                                    href={user ? `/notifications` : `/account`}
                                    className={`px-4 md:px-5 py-2 rounded hover:bg-[--theme-nav-bg-color-hover] transition cursor-pointer relative`}>
                                    <IoNotificationsOutline />
                                    {notificationsCount > 0 &&
                                        <span
                                            className={`absolute text-xs bg-[--theme-primary-button-color] ${notificationsCount < 10 ? 'size-4' : 'size-5'} flex justify-center items-center rounded-full top-0 left-4`}>
                                            {notificationsCount}
                                        </span>
                                    }
                                </Link>
                            </div>

                           <SearchInput className={`flex-grow relative`}/>

                        </ul>
                        <div className={`flex min-w-[40px] max-h-[40px] max-w-[40px] size-[40px] md:max-w-max md:max-h-max md:w-44 lg:w-auto items-center gap-x-4 justify-center`}>

                            <div
                                id={`userDropdown`}
                                className={`${!user ? `hidden lg:flex` : ``} max-h-[40px] relative items-center`}
                            >
                                <button
                                    onClick={() => setIsUserDropdownMenuOpen(!isUserDropdownMenuOpen)}
                                    className={`size-10`}
                                >
                                    {user?.avatar &&
                                        <img
                                            src={user?.avatar}
                                            className={`h-full rounded-full cursor-pointer pointer-events-none`}
                                            alt={'user-avatar'}
                                        />
                                    }
                                    {(!user?.avatar && user) && <DefaultUserIcon/>}
                                </button>

                                <UserDropdownMenu
                                    isUserDropdownMenuOpen={isUserDropdownMenuOpen}
                                    setIsUserDropdownMenuOpen={setIsUserDropdownMenuOpen}
                                />

                            </div>
                            <button
                                id={`createDropdown`}
                                onClick={!user ? redirectToLogin : () => setIsCreateDropdownMenuOpen(!isCreateDropdownMenuOpen)}
                                className={`relative hidden md:flex items-center justify-center lg:gap-x-4 gap-x-2 bg-[--theme-primary-button-color] text-sm lg:py-1 size-full rounded-full md:w-fit md:px-4`}
                                data-select={true}
                            >
                                <span className="hidden md:block">
                                    {user ? 'إنشاء' : 'تسجيل دخول'}
                                </span>
                                {!user && <MdLogin className={`md:hidden size-5`}/>}
                                {user && <FaChevronDown id={`createDropdown`}/>}

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
                <button onClick={() => user ? setIsCreatThreadModalOpen(true) : returnToLoginPage()}
                        className={`fixed md:hidden size-12 text-[--theme-primary-text-color] text-2xl bg-red-500 rounded-full flex justify-center items-center bottom-[15%] right-4 z-50`}>
                        <AiOutlinePlus/>
                </button>
            }
            {/*  Bottom Nav  */}
            <nav className={`bg-[#141414] sm:hidden z-50 fixed bottom-0 flex w-full justify-between text-3xl text-[--theme-primary-text-color]`}>
                <Link href={`/`} className={`w-full flex justify-center py-3 hover:bg-[--theme-main-bg-color-hover] transition cursor-pointer`}>
                    <IoHomeOutline />
                </Link>
                <Link href={`/all-spaces`} className={`w-full flex justify-center py-3 hover:bg-[--theme-main-bg-color-hover] transition cursor-pointer`}>
                    <FaUsers />
                </Link>
                <Link href={`/`} className={`w-full flex justify-center py-3 hover:bg-[--theme-main-bg-color-hover] transition cursor-pointer`}>
                    <FaEdit />
                </Link>
                <Link href={user ? `/notifications` : `/account`} className={`relative w-full flex justify-center py-3 hover:bg-[--theme-main-bg-color-hover] transition cursor-pointer`}>
                    <IoNotificationsOutline />
                    {notificationsCount > 0 &&
                        <span className={`absolute text-xs bg-[--theme-primary-button-color] ${notificationsCount < 10 ? 'size-4' : 'size-5'} flex justify-center items-center rounded-full top-1 left-1/2 -translate-x-4`}>
                            {notificationsCount}
                        </span>
                    }
                </Link>
            </nav>

            <main>{children}</main>

            <CreateThreadModal threads={threads} setThreads={setThreads}/>
            <SpaceModal/>

        </>

    )
}
export default Master
