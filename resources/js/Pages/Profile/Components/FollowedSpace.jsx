import React, {useState} from 'react'
import {Link, router, usePage} from "@inertiajs/react";
import Button from "@/Core/Button.jsx";
import {followUser} from "@/Utilities/followUser.js";

export default function FollowedSpace({space, img_style, can_follow = false}) {

    const [isFollowed, setIsFollowed] = useState(space.is_followed);
    const [isFollowBtnDisabled, setIsFollowBtnDisabled] = useState(false);

    const followSpace = () => {
        setIsFollowBtnDisabled(true)
        if (!isFollowed) {
            router.post(`/follow-space/${space?.id}`, {}, {
                preserveScroll: true,
                onSuccess: (res) => {
                    setIsFollowed(res.props.data.space?.data.is_followed)
                    setIsFollowBtnDisabled(false)
                }
            })
        } else {
            router.post(`/unfollow-space/${space?.id}`, {}, {
                preserveScroll: true,
                onSuccess: (res) => {
                    setIsFollowed(res.props.data.space?.data.is_followed)
                    setIsFollowBtnDisabled(false)
                }
            })
        }
    }

    return (
        <div className={`flex justify-between gap-x-3`}>
            <div className={`flex gap-x-3`}>
                {!space.media?.avatar &&
                    <Link href={`/spaces/${space.slug}`}>
                        <img
                            src="/spaces/space_default_image.webp"
                            alt="followed-space"
                            className={`size-10 rounded-2xl ${img_style}`}
                        />
                    </Link>
                }
                {space.media?.avatar &&
                    <Link href={`/spaces/${space.slug}`}>
                        <img
                            src={space.media?.avatar}
                            alt="followed-space"
                            className={`size-10 rounded-2xl ${img_style}`}
                        />
                    </Link>
                }
                <div className={`flex flex-col`}>
                    <Link href={`/spaces/${space.slug}`}>
                        {space.name}
                    </Link>
                    <span className={`text-[--theme-placeholder-color]`}>{space.followers_count} متابعين</span>
                </div>
            </div>

            {can_follow &&
                <div className={`flex flex-col items-end gap-y-2`}>
                    <Button
                        disabled={isFollowBtnDisabled}
                        onClick={followSpace}
                        content={isFollowed ? 'تمت المتابعة' : 'متابعة'}
                        custom_styles={`border ${!isFollowed ? 'border-transparent' : 'bg-transparent'} w-fit`}
                        isTypeFollow={true}
                        isFollowed={isFollowed}
                    />
                </div>
            }
        </div>
    )
}
