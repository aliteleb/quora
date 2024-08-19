import React, {useCallback, useEffect, useRef, useState} from 'react'
import Master from "@/Layouts/Master.jsx";
import Footer from "@/Pages/Home/Layouts/Footer.jsx";
import CreateThread from "@/Pages/Home/Components/CreateThread.jsx";
import { Head, router, usePage } from "@inertiajs/react";
import Post from "@/Components/Post.jsx";
import SelectTopicsModal from '../Components/SelectTopicsModal.jsx';
import Sidebar from "@/Pages/Profile/Layouts/Sidebar.jsx";
import HomeSidebar from "@/Pages/Home/Layouts/HomeSidebar.jsx";

export default function Home() {
    const { props } = usePage();
    const [isSelectTopicsModalOpen, setIsSelectTopicsModalOpen] = useState(false);
    const [threads, setThreads] = useState([]);
    const [nextPaginationLink, setNextPaginationLink] = useState('');
    const [isFetching, setIsFetching] = useState(false); // Flag to track fetch status
    useEffect(() => {
        if (props.threads?.links.url) {
            setThreads(props.threads?.threads.data)
            setNextPaginationLink(props.threads?.links.url)
        } else {
            setThreads(props.threads?.data)
            setNextPaginationLink(props.threads?.links.next)
        }
    }, []);

    const loadMoreThreads = (pageUrl) => {
        if (pageUrl && !isFetching) {
            setIsFetching(true); // Set fetch status to true
            router.get(pageUrl, {}, {
                preserveScroll: true,
                preserveState: true,
                only: ['threads'],
                onSuccess: (page) => {
                    setThreads(prevThreads => [...prevThreads, ...page.props.threads?.data]);
                    setNextPaginationLink(page.props.threads?.links.next);
                    setIsFetching(false); // Set fetch status to false after fetch completes
                },
                onError: () => {
                    setIsFetching(false); // Set fetch status to false if an error occurs
                }
            });
        }
    }

    const lastThreadRef = useRef(null);
    const show_threads = threads?.map((thread, index) => (
        <Post key={thread.id} thread={thread} ref={index === threads.length - 1 ? lastThreadRef : null} setThreads={setThreads} threads={threads}/>
    ));
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isFetching) {
                loadMoreThreads(nextPaginationLink);
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
    }, [nextPaginationLink, isFetching]);

    return (
        <Master>
            <Head title='الرئيسية' />
            <div className={`flex container max-w-screen-xl mx-auto lg:gap-x-10 gap-x-3 px-2`}>
                <Footer />
                <div className={`w-40 hidden lg:block`}></div> {/* Footer Simulation */}
                <div className={`lg:w-[750px] w-full flex flex-col items-center gap-y-2 py-2 pb-16 sm:pb-0`}>
                    <CreateThread />
                    {show_threads}
                </div>
                <div className={`relative w-[50%] lg:w-[30%] hidden md:block`}>
                    <HomeSidebar/>
                </div>
                {/*  left screen for simulate add padding  */}
                <div className={`md:block hidden w-3 h-screen bg-[--theme-body-bg] fixed left-0 z-50`}></div>
            </div>

            {isSelectTopicsModalOpen && <SelectTopicsModal setIsSelectTopicsModalOpen={setIsSelectTopicsModalOpen} />}
        </Master>
    );
}
