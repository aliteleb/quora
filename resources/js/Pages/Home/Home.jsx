import React, {useEffect, useState} from 'react'
import Master from "@/Layouts/Master.jsx";
import Footer from "@/Pages/Home/Partials/Footer.jsx";
import CreateThread from "@/Pages/Home/Partials/CreateThread.jsx";
import CreateThreadModal from "@/Pages/Home/Partials/CreateThreadModal.jsx";
import {Head, Link, router, useForm, usePage} from "@inertiajs/react";
import Post from "@/Layouts/Post.jsx";
import {useApp} from "@/AppContext/AppContext.jsx";
import SelectTopicsModal from './Partials/SelectTopicsModal.jsx';

export default function Home() {
    const {props} = usePage();
    const [isSelectTopicsModalOpen, setIsSelectTopicsModalOpen] = useState(false);
    const [threads, setThreads] = useState([]);
    const [nextPaginationLink, setNextPaginationLink] = useState('');


    useEffect(() => {
        console.log(props)
        setThreads(props.threads.data)
        setNextPaginationLink(props.threads.links.next)
    }, []);

    const loadMoreThreads = async () => {
        if (nextPaginationLink) {
            router.get(nextPaginationLink, {}, {
                preserveScroll: true,
                preserveState: true,
                only: ['threads'],
                onSuccess: (page) => {
                    setThreads(prevThreads => [...prevThreads, ...page.props.threads.data]);
                    setNextPaginationLink(page.props.threads.links.next);
                    window.history.replaceState({}, '', '/');
                }
            });
        }
    };

    return (
        <Master>
            <Head title='الرئيسية'/>
            <div className={`flex container max-w-screen-xl mx-auto gap-x-10 px-2`}>
                <Footer/>
                <div className={`w-40 hidden md:block`}></div> {/* Footer Simulation */}
                <div className={`lg:w-[750px] w-full flex flex-col items-center gap-y-2 py-2`}>
                    <CreateThread/>
                    {threads.map(thread => (
                        <Post key={thread.id} thread={thread} />
                    ))}
                    {nextPaginationLink && (
                        <button onClick={loadMoreThreads} className="btn btn-primary">
                            Load More
                        </button>
                    )}

                </div>
                <CreateThreadModal/>
            </div>

            {isSelectTopicsModalOpen && <SelectTopicsModal setIsSelectTopicsModalOpen={setIsSelectTopicsModalOpen}/>}
        </Master>
    )
}
