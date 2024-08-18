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
        answers: false,
    });

    const [userInfo, setUserInfo] = useState(props?.user?.data);
    const [threads, setThreads] = useState(props.threads?.data);
    const [threadsNextPageUrl, setThreadsNextPageUrl] = useState(props.threads?.links?.next);
    const [isAnswers, setIsAnswers] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Master>
            <Head title={``}/>
            {/*  left screen for simulate add padding  */}
            <div className={`md:block hidden w-3 h-screen bg-[--theme-body-bg] fixed left-0 z-50`}></div>
            <div className={`flex flex-col text-[--theme-body-color] container max-w-screen-xl mx-auto rounded z-10 relative px-3`}>
                <div className={`flex justify-between gap-x-6 2xl:gap-x-10`}>
                    <div className={`w-full md:w-[70%]`}>
                        <Header
                            isActive={isActive}
                            setIsActive={setIsActive}
                            setThreads={setThreads}
                            setThreadsNextPageUrl={setThreadsNextPageUrl}
                            userInfo={userInfo}
                            setUserInfo={setUserInfo}
                            setIsAnswers={setIsAnswers}
                            setIsLoading={setIsLoading}
                        />
                        {!isLoading &&
                            <ThreadsSection
                                threads={threads}
                                setThreads={setThreads}
                                threadsNextPageUrl={threadsNextPageUrl}
                                setThreadsNextPageUrl={setThreadsNextPageUrl}
                                isAnswers={isAnswers}
                                userInfo={userInfo}
                            />
                        }
                        {isLoading &&
                            <div className={`flex justify-center h-full py-5 mt-14`}>
                                <div className='flex space-x-2 justify-center items-center'>
                                    <span className='sr-only'>جاري التحميل</span>
                                    <div className='h-2 w-2 bg-[--theme-secondary-text-color] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                    <div className='h-2 w-2 bg-[--theme-secondary-text-color]  rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                    <div className='h-2 w-2 bg-[--theme-secondary-text-color]  rounded-full animate-bounce'></div>
                                </div>
                            </div>
                        }
                    </div>

                    <div className={`relative w-[30%] hidden md:block`}>
                        <Sidebar
                            join_date={userInfo?.created_at}
                            followed_spaces_count={userInfo?.followed_spaces_count}
                        />
                    </div>
                </div>
            </div>
        </Master>

    )
}
