import React from 'react'
import Master from "@/Layouts/Master.jsx";
import Footer from "@/Pages/Home/Partials/Footer.jsx";
import CreateThread from "@/Pages/Home/Partials/CreateThread.jsx";
import CreateThreadModal from "@/Pages/Home/Partials/CreateThreadModal.jsx";
import {IoIosAddCircleOutline} from "react-icons/io";
import {useApp} from "@/AppContext/AppContext.jsx";
import RecommendedSpace from "@/Components/RecommendedSpace.jsx";

export default function Spaces() {

    const {isSpaceModalOpen, setIsSpaceModalOpen} = useApp()

    return (
        <Master>
            <div className={`flex flex-col container max-w-screen-xl mx-auto rounded mt-10 gap-y-10`}>
                <div className={`bg-[--theme-main-bg-color] relative`}>
                    <img
                        className={`h-full absolute md:left-24 sm:left-6 left-0 w-fit object-cover`}
                        src="/spaces-img.webp"
                        alt="spaces-img"
                    />
                    <div className={`flex flex-col gap-y-4 p-6 bg-[#252525] sm:bg-transparent w-fit z-10 relative`}>
                        <div className={`flex flex-col gap-y-1`}>
                            <h1 className={`font-medium text-lg`}>مرحبا بك فى المساحات!</h1>
                            <h2 className={`text-[--theme-secondary-text-color]`}>تابع مساحات لتستكشف اهتماماتك.</h2>
                        </div>
                        <button onClick={() => setIsSpaceModalOpen(true)} className={`text-right text-[--theme-button-border-color] hover:bg-[#287dff1f] border-2 border-[--theme-button-border-color] w-fit px-4 py-1 rounded-full flex items-center gap-x-2`}>
                            <IoIosAddCircleOutline className={`size-5`}/>
                            <span>إنشاء مساحة</span>
                        </button>
                    </div>
                </div>

                <div className={`flex flex-col gap-y-3 px-6`}>
                    <h1 className={`font-bold text-lg`}>إستكشف مساحات</h1>
                    <h2>مساحات من الممكن أن تعجبك</h2>
                    <div className={`grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 mt-4 gap-4 pb-4`}>
                        <RecommendedSpace/>
                        <RecommendedSpace/>
                        <RecommendedSpace/>
                        <RecommendedSpace/>
                        <RecommendedSpace/>
                        <RecommendedSpace/>
                        <RecommendedSpace/>
                        <RecommendedSpace/>
                    </div>
                </div>
            </div>
        </Master>
    )
}
