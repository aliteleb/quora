import React, {useState} from 'react'
import Button from "@/Core/Button.jsx";
import {followUser} from "@/Utilities/followUser.js";

export default function User({user}) {

    const [isFollowed, setIsFollowed] = useState(user.is_followed);
    const [isFollowBtnDisabled, setIsFollowBtnDisabled] = useState(false);
    const [followersCount, setFollowersCount] = useState(user.followers_count);


    return (
        <div className={`flex justify-between`}>
            <div>
                <div className={`flex gap-x-3`}>
                    {!user.avatar &&
                        <img
                            src="/profile-default-svgrepo-com.svg"
                            alt="avatar"
                            className={`size-10`}
                        />
                    }
                    {user.avatar &&
                        <img
                            src={user.avatar}
                            alt="avatar"
                            className={`size-10 rounded-full`}
                        />
                    }
                    <div>
                        <span>{user.name}</span>
                        <div>{user.created_at}</div>
                    </div>

                </div>
            </div>

            <div className={`flex flex-col gap-y-2 items-end`}>
                <span>عدد المتابعين {followersCount}</span>
                <Button
                    disabled={isFollowBtnDisabled}
                    onClick={() => followUser(user.id, setIsFollowed, isFollowed, setIsFollowBtnDisabled, setFollowersCount)}
                    content={isFollowed ? 'تمت المتابعة' : 'متابعة'}
                    custom_styles={`border ${!isFollowed ? 'border-transparent' : 'bg-transparent'} w-fit`}
                    isTypeFollow={true}
                    isFollowed={isFollowed}
                />
            </div>
        </div>
    )
}
