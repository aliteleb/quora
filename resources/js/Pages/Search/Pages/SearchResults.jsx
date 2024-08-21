import React, {useEffect, useState} from 'react'
import Master from "@/Layouts/Master.jsx";
import {Head, usePage} from "@inertiajs/react";
import Footer from "@/Pages/Home/Layouts/Footer.jsx";
import HomeSidebar from "@/Pages/Home/Layouts/HomeSidebar.jsx";
import User from "@/Pages/Search/Components/User.jsx";

export default function SearchResults() {

    const { props } = usePage()
    const [users, setUsers] = useState(props.users?.data || []);
    const [spaces, setSpaces] = useState(props.spaces?.data || []);
    const [threads, setThreads] = useState(props.threads?.data || []);
    const [threadsNextPageUrl, setThreadsNextPageUrl] = useState(props.threads?.links?.next);

    const show_users = users.map(user => (
        <User user={user}/>
    ))

    return (
        <Master>
            <Head title='نتائج البحث' />
            <div className={`flex container max-w-screen-xl mx-auto lg:gap-x-10 gap-x-3 px-2`}>
                <Footer />
                <div className={`w-40 hidden lg:block`}></div> {/* Footer Simulation */}
                <div className={`lg:w-[750px] w-full flex flex-col py-2 pb-16 sm:pb-0 gap-y-6`}>{show_users}</div>
                <div className={`relative w-[50%] lg:w-[30%] hidden md:block`}>
                    <HomeSidebar/>
                </div>
                {/*  left screen for simulate add padding  */}
                <div className={`md:block hidden w-3 h-screen bg-[--theme-body-bg] fixed left-0 z-50`}></div>
            </div>
        </Master>
    )
}
