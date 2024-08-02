import React, {forwardRef} from 'react'
import {IoChevronDownOutline} from "react-icons/io5";
import {IoIosTrendingUp} from "react-icons/io";
import Post from "@/Components/Post.jsx";

const SpacePosts = forwardRef(({posts}, ref) => {


    const show_posts = posts.map((post, index) => (
        <Post key={post.id} thread={post} ref={index === posts.length - 1 ? ref : null}
              customStyles={index !== 0 ? `mt-3` : ''}/>
    ))

    return (
        <div className={`flex flex-col gap-y-3 w-full md:w-[80%] lg:w-[65%] xl:w-[60%]`}>
            <div className={`flex items-center gap-x-2`}>
                <IoIosTrendingUp/>
                <span>الأكثر تفاعلا</span>
                <IoChevronDownOutline/>
            </div>

            <div className={`pb-3`}>
                {show_posts}
            </div>
        </div>
    )
})

export default SpacePosts;
