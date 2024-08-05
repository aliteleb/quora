import React, {forwardRef, useEffect, useRef, useState} from 'react';
import { IoChevronDownOutline } from "react-icons/io5";
import { IoIosTrendingUp } from "react-icons/io";
import Post from "@/Components/Post.jsx";
import FilterPosts from "@/Pages/Spaces/Components/FilterPosts.jsx";
import { router } from "@inertiajs/react";

const SpacePosts = forwardRef (({ posts, spaceID, setPosts }, ref) => {
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const [filteredNextPageUrl, setFilteredNextPageUrl] = useState('');
    const [isPostsFetching, setIsPostsFetching] = useState(false);
    const [filterType, setFilterType] = useState('most_recent');

    const handleFilterTypeSelect = (e) => {
        setFilterType(e.target.value);
        setIsFilterDropdownOpen(false);
        e.target.value === 'most_popular' ? filterPosts('most_popular') : filterPosts('most_recent');
    };

    const filterPosts = (filter_type) => {
        router.get(`/spaces/filter/posts/${filter_type}/${spaceID}`, {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (res) => {
                setPosts(res.props.threads.data);
                setFilteredNextPageUrl(res.props.threads.links.next);
            }
        });
    };

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
                console.log('called')

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
        <Post
            key={post.id}
            thread={post}
            ref={index === posts.length - 1 ? ref : null}
            customStyles={`${index !== 0 ? `mt-3` : ''} ${index === posts.length - 1 ? 'pb-14 sm:pb-3' : ''}`}
        />
    ));


    return (
        <div className={`flex flex-col gap-y-3 w-full`}>
            <div className={`relative`}>
                <button onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)} className={`flex items-center gap-x-2`}>
                    <IoIosTrendingUp />
                    <span>{filterType === 'most_popular' ? 'الأكثر تفاعلا' : 'الأحدث'}</span>
                    <IoChevronDownOutline />
                </button>
                <FilterPosts
                    isFilterDropdownOpen={isFilterDropdownOpen}
                    setIsFilterDropdownOpen={setIsFilterDropdownOpen}
                    filterType={filterType}
                    handleFilterTypeSelect={handleFilterTypeSelect}
                    filterPosts={filterPosts}
                />
            </div>

            <div className={`pb-3`}>
                {show_posts}
            </div>
        </div>
    );
});

export default SpacePosts;
