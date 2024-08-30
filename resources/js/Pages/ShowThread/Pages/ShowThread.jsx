import React, {useState} from 'react'
import {Head, usePage} from "@inertiajs/react";
import Post from "@/Components/Post.jsx";
import Master from "@/Layouts/Master.jsx";
import HomeSidebar from "@/Pages/Home/Layouts/HomeSidebar.jsx";
import Footer from "@/Pages/Home/Layouts/Footer.jsx";

export default function ShowThread({}) {

    const { props } = usePage()
    const [thread, setThread] = useState(props.thread?.data);

    return (
        <Master>
            <Head title='الاشعارات' />
            <div className={`container max-w-screen-xl mx-auto lg:gap-x-10 gap-x-3 px-2 flex`}>
                <Footer />
                <div className={`w-40 hidden lg:block`}></div> {/* Footer Simulation */}
                <div className={`lg:w-[750px] w-full flex flex-col items-center gap-y-2 py-2 pb-16 sm:pb-2`}>
                    <Post passed_thread={thread}/>
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
