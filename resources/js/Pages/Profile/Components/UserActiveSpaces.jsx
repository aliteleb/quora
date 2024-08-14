import React, {useState} from 'react'
import FollowedSpace from "@/Pages/Profile/Components/FollowedSpace.jsx";
import {usePage} from "@inertiajs/react";

export default function UserActiveSpaces() {

    const {props} = usePage()
    const [followedSpaces, setFollowedSpaces] = useState(props?.followed_spaces);

    const show_followed_spaces = followedSpaces.map((space, index) => (
        <FollowedSpace key={index} space={space}/>
    ))

    return (
        <div>
            <h1 className={`border-b border-[--theme-secondary-bg-color-hover] pb-3`}>المساحات</h1>
            <div className={`flex flex-col gap-y-2 mt-3`}>
                {show_followed_spaces}
            </div>
        </div>
    )
}
