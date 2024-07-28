import React, {useEffect, useRef, useState} from 'react'
import {IoChevronDownSharp} from "react-icons/io5";
import {AiOutlineGlobal} from "react-icons/ai";
import Input from "@/Core/Input.jsx";
import {RiGlobalLine} from "react-icons/ri";
import SelectSpaceOption from "@/Components/SelectSpaceOption.jsx";

export default function SelectSpaces() {

    const [isSelectSpacesOpen, setIsSelectSpacesOpen] = useState(false);

    const spacesMenu = useRef(null);
    const toggleOpenSelectSpaceMenu = () => {
        if (spacesMenu.current?.classList.contains('animate-fade-in')) {
            spacesMenu.current?.classList.remove('animate-fade-in')
            spacesMenu.current?.classList.add('animate-fade-out')
        } else {
            spacesMenu.current?.classList.remove('animate-fade-out')
            spacesMenu.current?.classList.add('animate-fade-in')
        }
        setTimeout(() => {
            setIsSelectSpacesOpen(!isSelectSpacesOpen)
        }, 100)
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            console.log(e.target.tagName)
            if (!spacesMenu.current?.contains(e.target) && e.target.id !== 'spaceDropDown' ) {
                spacesMenu.current?.classList.remove('animate-fade-in')
                spacesMenu.current?.classList.add('animate-fade-out')
                setTimeout(() => {
                    setIsSelectSpacesOpen(false)
                }, 100)
            }
        };

        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`flex relative`}>
            <button onClick={toggleOpenSelectSpaceMenu} className={`flex items-center gap-x-2 hover:bg-[--theme-main-bg-color] rounded-full px-4 py-2`}>
                <RiGlobalLine className={`size-5`}/>
                <span>الملف الشخصي</span>
                <IoChevronDownSharp />
            </button>

            {isSelectSpacesOpen &&
                <div id={`spaceDropDown`} ref={spacesMenu} className={`animate-fade-in bg-[--theme-main-bg-color] pt-2 rounded absolute w-max right-44 border border-[--theme-select-space-border-color] z-50`}>
                    <div className={`px-2`}>
                        <Input placeholder={`اختر مساحة`} isSearch={'searchable'} inputClassStyle={`ps-8`}/>
                    </div>
                    <div
                        className={`flex items-center gap-x-2 py-3 px-2 hover:bg-[--theme-nav-bg-color-hover] cursor-pointer`}>
                        <RiGlobalLine className={`size-5 text-[--theme-button-border-color]`}/>
                        <span>الملف الشخصي</span>
                    </div>
                    <div
                        className={`border-t border-[--theme-nav-bg-color-hover] py-3 px-2 cursor-pointer font-bold`}>المساحات
                        المقترحة
                    </div>
                    <div>
                        <SelectSpaceOption/>
                        <SelectSpaceOption/>
                        <SelectSpaceOption/>
                    </div>
                </div>
            }

        </div>
    )
}
