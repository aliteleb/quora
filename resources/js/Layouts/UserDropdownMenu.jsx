import React from 'react'
import Modal from "@/Components/Modal.jsx";
import {GrClose} from "react-icons/gr";

export default function UserDropdownMenu(props) {

    const closeUserDropdownMenu = () => {
        props.setIsUserDropdownMenuOpen(false)
    }

    return (
        <div className={`border border-[#393839] rounded bg-[--theme-body-bg]`}>
            <header className={`p-2 flex justify-between`}>
                <button className={`rounded-full hover:bg-white/5 text-white p-3 `} onClick={closeUserDropdownMenu}>
                    <GrClose className={`size-5`}/>
                </button>
                <h3 className={`p-2 font-bold text-lg`}>التسجيل</h3>
            </header>
            <main className={`py-2 px-3 pb-20`}>

            </main>
            <footer className={`border-t border-[#393839] flex flex-row-reverse py-3 px-2`}>
                <button className={`bg-[#1471ff] hover:bg-opacity-90 px-4 py-1.5 rounded-3xl`}>
                    التالي
                </button>
            </footer>
        </div>

    )
}
