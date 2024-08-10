import React, {useEffect, useState} from 'react'
import Master from "@/Layouts/Master.jsx";
import Sidebar from "@/Pages/Profile/Layouts/Sidebar.jsx";
import Header from "@/Pages/Profile/Layouts/Header.jsx";
import {Head, router, usePage} from "@inertiajs/react";
import ProfileThreadsSection from "@/Pages/Profile/Components/ProfileThreadsSection.jsx";

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
    const [threadsNextPageUrl, setThreadsNextPageUrl] = useState(props.threads?.links.next);
    const [posts, setPosts] = useState(props.threads?.data);
    const [postsNextPageUrl, setPostsNextPageUrl] = useState('');
    const [questions, setQuestions] = useState(props.threads?.data);
    const [questionsNextPageUrl, setQuestionsNextPageUrl] = useState('');

    // const [filteredNextPageUrl, setFilteredNextPageUrl] = useState('');

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
                            setPosts={setPosts}
                            setQuestions={setQuestions}
                            setQuestionsNextPageUrl={setQuestionsNextPageUrl}
                            setPostsNextPageUrl={setPostsNextPageUrl}
                            setThreadsNextPageUrl={setThreadsNextPageUrl}
                        />
                        <ProfileThreadsSection
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
