import React, {Fragment, useEffect, useRef, useState} from 'react'
import {FaRegCircleUser} from "react-icons/fa6";
import {useApp} from "@/AppContext/AppContext.jsx";
import {FaRegBookmark, FaUsers} from "react-icons/fa";
import {BsBarChart, BsChevronLeft} from "react-icons/bs";
import {Transition, TransitionChild} from "@headlessui/react";
import {router} from "@inertiajs/react";
import DefaultUserIcon from "@/Core/DefaultUserIcon.jsx";


export default function UserDropdownMenu({isUserDropdownMenuOpen ,setIsUserDropdownMenuOpen}) {
    const [test, setTest] = useState('');

    const { user } = useApp()

    const dropDownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!dropDownRef.current?.contains(e.target) && e.target.id !== "userDropdown") {
                setIsUserDropdownMenuOpen(false)
            }
        }

        window.addEventListener('mousedown', handleClickOutside)
        return () => {
            window.removeEventListener('mousedown', handleClickOutside)
        }
    }, []);

    const logout = () => {
        router.get('/logout')
    }

    return (
        <Transition show={isUserDropdownMenuOpen} leave="duration-200 transition-all">
            <div ref={dropDownRef} className={`dropdown-clip-path-responsive md:dropdown-clip-path absolute left-1/2 top-11 md:-translate-x-1/2 border border-[--theme-default-border-color] rounded bg-[--theme-main-bg-color] w-64 pt-6 py-3 z-50`}>
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    as={'div'}
                >
                    <header>
                        <div className={`grid grid-cols-2 items-center gap-x-36 hover:bg-[--theme-nav-bg-color-hover] cursor-pointer py-2 px-3`}>
                            <div className={`flex items-center gap-x-4 w-max`}>
                                {user?.avatar && <img onClick={() => setIsUserDropdownMenuOpen(true)} src={user.avatar} className={`md:size-9 size-7 rounded-full cursor-pointer`}/>}
                                {(!user?.avatar && user) && <DefaultUserIcon onClick={() => setIsUserDropdownMenuOpen(true)} className={`md:size-9 size-7 cursor-pointer text-[--theme-placeholder-color]`}/>}
                                <span className={`font-bold`}>{user?.name}</span>
                            </div>
                            <BsChevronLeft className={`size-6 justify-self-end`}/>
                        </div>
                        <div className={`bg-[--theme-default-border-color] h-[1px] w-full`}></div>
                    </header>
                    <main className={`py-2 pb-4 border-b border-[--theme-default-border-color] 2xl:text-sm text-[15px]`}>
                        <div className={`flex items-center gap-x-5 hover:bg-[--theme-nav-bg-color-hover] cursor-pointer py-3 px-3`}>
                            <BsBarChart className={`size-6`}/>
                            <span>المحتوي والإحصاءات الخاصة بك</span>
                        </div>
                        <div className={`flex items-center gap-x-5 hover:bg-[--theme-nav-bg-color-hover] cursor-pointer py-3 px-3`}>
                            <FaRegBookmark className={`size-6`}/>
                            <span>إشارات مرجعية</span>
                        </div>
                        <div className={`flex items-center gap-x-5 hover:bg-[--theme-nav-bg-color-hover] cursor-pointer py-3 px-3`}>
                            <FaUsers className={`size-6`}/>
                            <span>إنشاء مساحة</span>
                        </div>
                    </main>
                    <footer className={`pt-3 px-2 flex flex-row-reverse`}>
                        <button onClick={logout} className={`bg-[--theme-primary-button-color] hover:bg-opacity-90 px-4 py-1.5 rounded-3xl`}>
                            تسجيل خروج
                        </button>
                    </footer>
                </TransitionChild>
            </div>
        </Transition>
    )
}
