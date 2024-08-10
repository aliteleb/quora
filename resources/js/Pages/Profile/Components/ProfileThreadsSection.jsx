import React, {useEffect, useRef, useState} from 'react'
import Post from "@/Components/Post.jsx";
import {router} from "@inertiajs/react";

export default function ProfileThreadsSection({threads, setThreads, threadsNextPageUrl, setThreadsNextPageUrl}) {

    const [isThreadsFetching, setIsThreadsFetching] = useState(false);

    const lastThreadRef = useRef(null)
    const show_threads = threads?.map((thread, index) => (
        <Post
            key={index}
            thread={thread}
            ref={index === threads.length - 1 ? lastThreadRef : null}
            customStyles={`${index !== 0 ? `mt-3` : ''} ${index === threads.length - 1 ? 'pb-14 sm:pb-3' : ''}`}
        />
    ))
    const loadNextThreads = (pageUrl) => {
        if (pageUrl && !isThreadsFetching) {
            setIsThreadsFetching(true)
            router.get(pageUrl, {}, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (res) => {
                    setThreads(prevState => ([
                        ...prevState,
                        ...res.props.threads.data,
                    ]));
                    setThreadsNextPageUrl(res.props.threads.links.next);
                    setIsThreadsFetching(false)
                },
            });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isThreadsFetching && threadsNextPageUrl) {
                // loadNextThreads(threadsNextPageUrl);
            }
        }, {
            threshold: 0.5 // Trigger when 50% of the last post is visible
        });

        // Watch the last post
        if (lastThreadRef.current) {
            observer.observe(lastThreadRef.current);
        }

        // Cleanup
        return () => {
            if (lastThreadRef.current) {
                observer.unobserve(lastThreadRef.current);
            }
        };
    }, [threadsNextPageUrl, isThreadsFetching]);

    return (
        <div className={`mt-3`}>
            {show_threads}
        </div>
    )
}
