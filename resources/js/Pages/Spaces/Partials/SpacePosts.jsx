import React from 'react'
import {IoChevronDownOutline} from "react-icons/io5";
import {IoIosTrendingUp} from "react-icons/io";

export default function SpacePosts() {
    return (
        <div>
            <div className={`flex items-center gap-x-2`}>
                <IoIosTrendingUp />
                <span>الأكثر تفاعلا</span>
                <IoChevronDownOutline />
            </div>


        </div>
    )
}
