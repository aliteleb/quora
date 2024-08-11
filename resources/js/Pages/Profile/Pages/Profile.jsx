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
        answers: false,
        questions: false,
        posts: false,
        followers: false,
        following: false,
    });

    const [threads, setThreads] = useState(props.threads?.data);
    const [threadsNextPageUrl, setThreadsNextPageUrl] = useState(props.threads?.links?.next);

    return (
        <Master>
            <Head title={``}/>

            <div className={`flex flex-col text-[--theme-body-color] container max-w-screen-xl mx-auto rounded z-10 relative`}>
                <div className={`flex justify-between gap-x-10`}>
                    <div className={`w-[70%]`}>
                        <Header
                            isActive={isActive}
                            setIsActive={setIsActive}
                            setThreads={setThreads}
                            setThreadsNextPageUrl={setThreadsNextPageUrl}
                        />
                        <ThreadsSection
                            threads={threads}
                            setThreads={setThreads}
                            threadsNextPageUrl={threadsNextPageUrl}
                            setThreadsNextPageUrl={setThreadsNextPageUrl}
                        />
                    </div>

                    <Sidebar/>
                </div>

            </div>
        </Master>
    )
}
