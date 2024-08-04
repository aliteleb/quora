import React, {forwardRef, useState} from 'react'
import {IoChevronDownOutline} from "react-icons/io5";
import {IoIosTrendingUp} from "react-icons/io";
import Post from "@/Components/Post.jsx";
import FilterPosts from "@/Pages/Spaces/Components/FilterPosts.jsx";
import {router, usePage} from "@inertiajs/react";

const SpacePosts = forwardRef(({posts, spaceID, setPosts, setPostsNextPageUrl, filterType, setFilterType}, ref) => {

    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

    const handleFilterTypeSelect = (e) => {
        setFilterType(e.target.value)
        setIsFilterDropdownOpen(false)
        e.target.value === 'most_popular' ? filterPosts('most_popular') : filterPosts('most_recent')
    }

    const show_posts = posts.map((post, index) => (
        <Post key={post.id} thread={post} ref={index === posts.length - 1 ? ref : null}
              customStyles={`${index !== 0 ? `mt-3` : ''} ${index === posts.length - 1 ? 'pb-14 sm:pb-3' : ''}`}/>
    ))

    const filterPosts = (filter_type) => {
        if (filter_type === 'most_recent') {

        }
        router.get(`/spaces/filter/posts/${filter_type}/${spaceID}`, {}, {
            preserveScroll: true,
            preserveState: true,

            onSuccess: (res) => {
                setPosts(res.props.threads.data)
                setPostsNextPageUrl(res.props.threads.links.next)
            }
        })
    }

    return (
        <div className={`flex flex-col gap-y-3 w-full`}>
            <div className={`relative`}>
                <button onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)} className={`flex items-center gap-x-2`}>
                    <IoIosTrendingUp/>
                    <span>{filterType === 'most_popular' ? 'الأكثر تفاعلا' : 'الأحدث'}</span>
                    <IoChevronDownOutline/>
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
    )
})

export default SpacePosts;
