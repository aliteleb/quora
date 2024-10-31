import React from 'react'
import {router} from "@inertiajs/react";

export function followUser(id, setIsFollowed, isFollowed, setIsDisabled, setFollowersCount, user = null) {
    if (!user) {
        window.location.href = `${window.location.origin}/account`;
    }else {
        if (!isFollowed) {
            router.post(`/users/follow/follow/${id}`, {}, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (res) => {
                    setIsFollowed(true)
                    setIsDisabled(false)

                    if (setFollowersCount) {
                        setFollowersCount(res.props.user.data.followers_count)
                    }
                }
            })
        }
        else {
            router.post(`/users/follow/unfollow/${id}`, {}, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (res) => {
                    setIsFollowed(false)
                    setIsDisabled(false)

                    if (setFollowersCount) {
                        setFollowersCount(res.props.user.data.followers_count)
                    }
                }
            })
        }
    }


}
