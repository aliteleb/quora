import React, {useEffect, useState} from 'react'
import Master from "@/Layouts/Master.jsx";
import Sidebar from "@/Pages/Profile/Layouts/Sidebar.jsx";
import Header from "@/Pages/Profile/Layouts/Header.jsx";
import {Head, router, usePage} from "@inertiajs/react";
import ThreadsSection from "@/Pages/Profile/Components/ThreadsSection.jsx";

export default function Profile() {

    const { props } = usePage()
    const [isActive, setIsActive] = useState({
        profile: true,
        questions: false,
        posts: false,
    });

    const [userInfo, setUserInfo] = useState(props?.user?.data);
    const [threads, setThreads] = useState(props.threads?.data);
    const [threadsNextPageUrl, setThreadsNextPageUrl] = useState(props.threads?.links?.next);

    console.log(props)

    return (
        <Master>
            <Head title={``}/>

            <div className={`flex flex-col text-[--theme-body-color] container max-w-screen-xl mx-auto rounded z-10 relative px-3`}>
                <div className={`flex justify-between gap-x-6 2xl:gap-x-10`}>
                    <div className={`w-full lg:w-[70%]`}>
                        <Header
                            isActive={isActive}
                            setIsActive={setIsActive}
                            setThreads={setThreads}
                            setThreadsNextPageUrl={setThreadsNextPageUrl}
                            userInfo={userInfo}
                        />
                        <ThreadsSection
                            threads={threads}
                            setThreads={setThreads}
                            threadsNextPageUrl={threadsNextPageUrl}
                            setThreadsNextPageUrl={setThreadsNextPageUrl}
                        />
                    </div>

                    <div className={`relative w-[30%] hidden lg:block`}>
                        <Sidebar
                            join_date={userInfo.created_at}
                            followed_spaces_count={userInfo.followed_spaces_count}
                        />
                    </div>
                </div>
            </div>
        </Master>

    )
}
