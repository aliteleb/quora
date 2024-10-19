import React, {forwardRef, useEffect, useRef, useState} from 'react';
import { IoChevronDownOutline } from "react-icons/io5";
import { IoIosTrendingUp } from "react-icons/io";
import Thread from "@/Components/Thread.jsx";
import FilterPosts from "@/Pages/Spaces/Components/FilterPosts.jsx";
import { router } from "@inertiajs/react";

const SpacePosts = forwardRef (({ posts, setPosts, filteredNextPageUrl, setFilteredNextPageUrl, filterType }, ref) => {

    const [isPostsFetching, setIsPostsFetching] = useState(false);

    const loadNextPosts = (pageUrl) => {
        if (pageUrl && !isPostsFetching) {
            setIsPostsFetching(true)
            router.get(pageUrl, {}, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (res) => {
                    setPosts(prevState => ([
                        ...prevState,
                        ...res.props.threads.data,
                    ]));
                    setFilteredNextPageUrl(res.props.threads.links.next);
                    setIsPostsFetching(false)
                },
            });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isPostsFetching && filteredNextPageUrl) {
                loadNextPosts(filteredNextPageUrl);
            }
        }, {
            threshold: 0.5 // Trigger when 50% of the last post is visible
        });

        // Watch the last post
        if (ref.current) {
            observer.observe(ref.current);
        }

        // Cleanup
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [filteredNextPageUrl, isPostsFetching, filterType]);

    const show_posts = posts.map((post, index) => (
        <Thread
            key={index}
            passed_thread={post}
            ref={index === posts.length - 1 ? ref : null}
            customStyles={`${index !== 0 ? `mt-3` : ''} ${index === posts.length - 1 ? 'pb-14 sm:pb-3' : ''}`}
        />
    ));


    return (
        <div className={`flex flex-col gap-y-3 w-full`}>
            <div className={`pb-3`}>
                {show_posts}
            </div>
        </div>
    );
});

export default SpacePosts;
