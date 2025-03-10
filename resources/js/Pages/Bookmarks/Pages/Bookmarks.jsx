import React, {useEffect, useRef, useState} from 'react'
import Master from "@/Layouts/Master.jsx";
import {Head, router, usePage} from "@inertiajs/react";
import Footer from "@/Pages/Home/Layouts/Footer.jsx";
import HomeSidebar from "@/Pages/Home/Layouts/HomeSidebar.jsx";
import Thread from "@/Components/Thread.jsx";

export default function Bookmarks() {

    const { props } = usePage()
    const [threads, setThreads] = useState(props.saved_threads?.data || []);
    const [threadsNextPageUrl, setThreadsNextPageUrl] = useState(props.saved_threads?.links.next || '');
    const [isFetching, setIsFetching] = useState(false);

    const lastThreadRef = useRef(null)

    const show_threads = threads?.map((thread, index) => (
        <Thread
            key={index}
            passed_thread={thread}
            threads={thread}
            setThreads={setThreads}
            ref={index === threads.length - 1 ? lastThreadRef : null}
            customStyles={index === 0 ? 'mt-2' : ''}
        />
    ))

    const loadMoreThreads = (pageUrl) => {
        if (pageUrl && !isFetching) {
            setIsFetching(true);
            router.get(pageUrl, {}, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (page) => {
                    setThreads(prevThreads => [...prevThreads, ...page.props.saved_threads?.data]);
                    setThreadsNextPageUrl(page.props.threads?.links.next);
                    setIsFetching(false);
                },
            });
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isFetching) {
                loadMoreThreads(threadsNextPageUrl);
            }
        }, {
            threshold: 0.5 // Trigger when 50% of the last thread is visible
        });

        // Watch the last thread
        if (lastThreadRef.current) {
            observer.observe(lastThreadRef.current);
        }

        // Cleanup
        return () => {
            if (lastThreadRef.current) {
                observer.unobserve(lastThreadRef.current);
            }
        };
    }, [threadsNextPageUrl, isFetching]);

    return (
        <Master>
            <Head title='إشارات مرجعية' />
            <div className={`flex container max-w-screen-xl mx-auto lg:gap-x-10 gap-x-3 px-2`}>
                <Footer />
                <div className={`w-40 hidden lg:block`}></div> {/* Footer Simulation */}
                <div className={`lg:w-[750px] w-full flex flex-col items-center gap-y-2 py-2 pb-16 sm:pb-0`}>
                    <h1 className={`border-b border-[--theme-secondary-bg-color-hover] pb-3 w-full`}>الإشارات المرجعية</h1>
                    {show_threads}
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
