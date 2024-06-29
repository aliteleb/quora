import React from 'react'
import Master from "@/Layouts/Master.jsx";
import Footer from "@/Pages/Home/Partials/Footer.jsx";
import CreateThread from "@/Pages/Home/Partials/CreateThread.jsx";
import CreateThreadModal from "@/Pages/Home/Partials/CreateThreadModal.jsx";
import {useApp} from "@/AppContext/AppContext.jsx";
import {Head} from "@inertiajs/react";

export default function Home() {

    return (
        <Master>
            <Head title='الرئيسية'/>
            <div className={`relative flex max-w-screen-xl container mx-auto gap-x-10 px-2 h-[100rem]`}>
                <Footer/>

                <div className={`w-40 hidden sm:block`}></div> {/* Footer Simulation */}
                <div className={`lg:w-1/2 sm:w-2/3 w-full flex justify-center py-2`}>
                    <CreateThread/>
                </div>
                <CreateThreadModal/>
            </div>
        </Master>
    )
}
