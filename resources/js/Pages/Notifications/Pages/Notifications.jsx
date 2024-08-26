import React from 'react'
import Master from "@/Layouts/Master.jsx";
import {Head} from "@inertiajs/react";
import HomeSidebar from "@/Pages/Home/Layouts/HomeSidebar.jsx";
import Sidebar from "@/Pages/Notifications/Layouts/Sidebar.jsx";

export default function Notifications() {



    return (
        <Master>
            <Head title='الاشعارات' />
            <div className={`container max-w-screen-xl mx-auto lg:gap-x-10 gap-x-3 px-2 flex`}>
                <Sidebar/>
                <div className={`w-40 hidden lg:block`}></div> {/* Footer Simulation */}
                <div className={`lg:w-[750px] w-full flex flex-col items-center gap-y-2 py-2 pb-16 sm:pb-0`}>
                    <h1 className={`border-b border-[--theme-secondary-bg-color-hover] pb-3 w-full`}>الإشعارات</h1>
                    {/*{show_threads}*/}
                </div>
                <div className={`relative w-[50%] lg:w-[30%] hidden md:block`}>
                    <HomeSidebar/>
                </div>
                {/*  left screen for simulate add padding  */}
                <div className={`md:block hidden w-3 h-screen bg-[--theme-body-bg] fixed left-0 z-50`}></div>
            </div>
        </Master>
    )
}
