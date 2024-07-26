import React from 'react'
import DefaultUserIcon from "@/Core/DefaultUserIcon.jsx";

export default function SpacePerson({space, isFollower}) {
    return (
        <div className={`flex gap-x-3`}>
            {space.user?.avatar ? space.user.avatar : (<DefaultUserIcon/>)}
            <div className={`flex flex-col justify-center`}>
                <span className={`font-bold`}>{space.user.name}</span>
                {!isFollower && <span>Owner</span>}
            </div>
        </div>
    )
}
