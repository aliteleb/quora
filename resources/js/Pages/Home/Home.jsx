import React from 'react'
import Master from "@/Layouts/Master.jsx";
import Footer from "@/Pages/Home/Partials/Footer.jsx";
import CreateThread from "@/Pages/Home/Partials/CreateThread.jsx";
import CreateThreadModal from "@/Pages/Home/Partials/CreateThreadModal.jsx";
import {Head} from "@inertiajs/react";
import Post from "@/Layouts/Post.jsx";

export default function Home() {

    return (
        <Master>
            <Head title='الرئيسية'/>
            <div className={`relative flex max-w-screen-xl container mx-auto gap-x-10 px-2 h-[100rem]`}>
                <Footer/>

                <div className={`w-40 hidden md:block`}></div> {/* Footer Simulation */}
                <div className={`lg:w-[750px] w-full flex flex-col items-center gap-y-2 py-2`}>
                    <CreateThread/>
                    <Post/>
                </div>
                <CreateThreadModal/>
            </div>
        </Master>
    )
}
