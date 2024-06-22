import React from 'react'
import Master from "@/Layouts/Master.jsx";
import Footer from "@/Pages/Home/Partials/Footer.jsx";
import CreateThread from "@/Pages/Home/Partials/CreateThread.jsx";

export default function Home() {
    return (
        <Master>
            <div className={`flex max-w-screen-xl container mx-auto gap-x-10 mt-5`}>
                <Footer/>
                <CreateThread/>
            </div>
        </Master>
    )
}
