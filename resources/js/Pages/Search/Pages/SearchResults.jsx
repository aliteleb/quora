import React, {useEffect, useState} from 'react'
import Master from "@/Layouts/Master.jsx";
import {Head, usePage} from "@inertiajs/react";
import Footer from "@/Pages/Home/Layouts/Footer.jsx";
import HomeSidebar from "@/Pages/Home/Layouts/HomeSidebar.jsx";
import User from "@/Pages/Search/Components/User.jsx";
import FollowedSpace from "@/Pages/Profile/Components/FollowedSpace.jsx";

export default function SearchResults() {

    const { props } = usePage()
    const [users, setUsers] = useState(props.users?.data || []);
    const [spaces, setSpaces] = useState(props.spaces?.data || []);
    const [threads, setThreads] = useState(props.threads?.data || []);
    const [threadsNextPageUrl, setThreadsNextPageUrl] = useState(props.threads?.links?.next);

    const show_users = users.map(user => (
        <User user={user}/>
    ))

    const show_spaces = spaces.map(space => (
        <FollowedSpace space={space} img_style={``} can_follow={true}/>
    ))

    return (
        <Master>
            <Head title='نتائج البحث' />
            <div className={`flex container max-w-screen-xl mx-auto lg:gap-x-10 gap-x-3 px-2`}>
                <Footer />
                <div className={`w-40 hidden lg:block`}></div> {/* Footer Simulation */}
                <div className={`lg:w-[750px] w-full flex flex-col py-2 pb-16 sm:pb-0 gap-y-4`}>
                    <div className={`flex flex-col gap-y-4`}>
                        {users.length > 0 && <h1 className={`border-b border-[--theme-secondary-bg-color-hover] pb-3`}>الأشخاص</h1>}
                        {show_users}
                    </div>
                    <div className={`flex flex-col gap-y-4`}>
                        {spaces.length > 0 && <h1 className={`border-b border-[--theme-secondary-bg-color-hover] pb-3`}>المساحات</h1>}
                        {show_spaces}
                    </div>
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
