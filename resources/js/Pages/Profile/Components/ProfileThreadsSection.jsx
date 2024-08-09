import React from 'react'
import Post from "@/Components/Post.jsx";

export default function ProfileThreadsSection({threads, setThreads, threadsNextPageUrl, setThreadsNextPageUrl}) {

    const show_threads = threads?.map((thread, index) => (
        <Post key={index} thread={thread} />
    ))

    return (
        <div className={`mt-3`}>
            {show_threads}
        </div>
    )
}
