import React, {useEffect, useRef} from 'react'
import {Transition, TransitionChild} from "@headlessui/react";
import {BsQuestionSquare} from "react-icons/bs";
import {BiCommentEdit} from "react-icons/bi";
import {FaUsers} from "react-icons/fa";
import {useApp} from "@/AppContext/AppContext.jsx";

export default function CreateDropdownMenu(props) {

    const {setIsCreatThreadModalOpen, setIsPostActive, user } = useApp();

    const createDropDownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!createDropDownRef.current?.contains(e.target) && e.target.id !== "createDropdown") {
                props.setIsCreateDropdownMenuOpen(false)
            }
        }

        window.addEventListener('mousedown', handleClickOutside)
        return () => {
            window.removeEventListener('mousedown', handleClickOutside)
        }
    }, []);

    return (
        <Transition enter={'duration-500 transition'} show={props.isCreateDropdownMenuOpen} leave="duration-200" ref={createDropDownRef} className={`dropdown-clip-path-responsive 2xl:dropdown-clip-path absolute left-1/2 top-11 2xl:-translate-x-1/2 border border-[--theme-default-border-color] rounded bg-[--theme-main-bg-color] pt-3`}>
            <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                as={'div'}
            >
                <main>
                    <div onClick={() => {
                        setIsCreatThreadModalOpen(true)
                        setIsPostActive(false)
                    }} className={`flex items-center gap-x-5 hover:bg-[--theme-nav-bg-color-hover] cursor-pointer py-3 px-3 w-60 border-b border-[--theme-default-border-color]`}>
                        <BsQuestionSquare className={`size-6`}/>
                        <span>إنشاء سؤال</span>
                    </div>
                    <div onClick={() => {
                        setIsCreatThreadModalOpen(true)
                        setIsPostActive(true)
                    }} className={`flex items-center gap-x-5 hover:bg-[--theme-nav-bg-color-hover] cursor-pointer py-3 px-3 w-60 border-b border-[--theme-default-border-color]`}>
                        <BiCommentEdit className={`size-6`}/>
                        <span>إنشاء منشور</span>
                    </div>
                    <div className={`flex items-center gap-x-5 hover:bg-[--theme-nav-bg-color-hover] cursor-pointer py-3 px-3 w-60`}>
                        <FaUsers className={`size-6`}/>
                        <span>إنشاء مساحة</span>
                    </div>
                </main>
            </TransitionChild>


        </Transition>
    )
}
