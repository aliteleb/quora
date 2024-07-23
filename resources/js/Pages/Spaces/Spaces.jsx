import React from 'react'
import Master from "@/Layouts/Master.jsx";
import Footer from "@/Pages/Home/Partials/Footer.jsx";
import CreateThread from "@/Pages/Home/Partials/CreateThread.jsx";
import CreateThreadModal from "@/Pages/Home/Partials/CreateThreadModal.jsx";
import {IoIosAddCircleOutline} from "react-icons/io";
import {useApp} from "@/AppContext/AppContext.jsx";

export default function Spaces() {

    const {isSpaceModalOpen, setIsSpaceModalOpen} = useApp()

    return (
        <Master>
            <div className={`flex container max-w-screen-xl mx-auto rounded mt-10 bg-[--theme-nav-bg-color-hover] relative`}>
                <div>
                    <img
                        className={`h-full absolute left-24 w-fit object-cover`}
                        src="/spaces-img.webp"
                        alt="spaces-img"
                    />
                    <div className={`flex flex-col gap-y-4 p-6  `}>
                        <div className={`flex flex-col gap-y-1`}>
                            <h1 className={`font-medium text-lg`}>مرحبا بك فى المساحات!</h1>
                            <h2 className={`text-[--theme-secondary-text-color]`}>تابع مساحات لتستكشف اهتماماتك.</h2>
                        </div>
                        <button onClick={() => setIsSpaceModalOpen(true)} className={`text-right text-[--theme-button-border-color] hover:bg-[#287dff1f] border-2 border-[--theme-button-border-color] w-fit px-4 py-1 rounded-full flex items-center gap-x-2`}>
                            <IoIosAddCircleOutline className={`size-5`}/>
                            <span>Create a Space</span>
                        </button>
                    </div>
                </div>
            </div>
        </Master>
    )
}
