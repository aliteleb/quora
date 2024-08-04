import React, {forwardRef, useState} from 'react'
import {IoChevronDownOutline} from "react-icons/io5";
import {IoIosTrendingUp} from "react-icons/io";
import Post from "@/Components/Post.jsx";
import FilterPosts from "@/Pages/Spaces/Components/FilterPosts.jsx";

const SpacePosts = forwardRef(({posts}, ref) => {

    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const [filterType, setFilterType] = useState('most_popular');

    const handleFilterTypeSelect = (e) => {
        setFilterType(e.target.value)
        setIsFilterDropdownOpen(false)
    }

    const show_posts = posts.map((post, index) => (
        <Post key={post.id} thread={post} ref={index === posts.length - 1 ? ref : null}
              customStyles={`${index !== 0 ? `mt-3` : ''} ${index === posts.length - 1 ? 'pb-14 sm:pb-3' : ''}`}/>
    ))

    return (
        <div className={`flex flex-col gap-y-3 w-full`}>
            <div className={`relative`}>
                <button onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)} className={`flex items-center gap-x-2`}>
                    <IoIosTrendingUp/>
                    <span>الأكثر تفاعلا</span>
                    <IoChevronDownOutline/>
                </button>
                <FilterPosts
                    isFilterDropdownOpen={isFilterDropdownOpen}
                    setIsFilterDropdownOpen={setIsFilterDropdownOpen}
                    filterType={filterType}
                    handleFilterTypeSelect={handleFilterTypeSelect}
                />
            </div>

            <div className={`pb-3`}>
                {show_posts}
            </div>
        </div>
    )
})

export default SpacePosts;
