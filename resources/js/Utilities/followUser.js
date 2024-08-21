import React from 'react'
import {router} from "@inertiajs/react";

export function followUser(id, setIsFollowed, isFollowed, setIsDisabled, setFollowersCount) {
    setIsDisabled(true)
    if (!isFollowed) {
        router.post(`/users/follow/follow/${id}`, {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (res) => {
                console.log(res.props)
                setIsFollowed(true)
                setIsDisabled(false)
                setFollowersCount(res.props.user.data.followers_count)

                if (setFollowersCount) {
                    setFollowersCount(res.props.user.data.followers_count)
                }
            }
        })
    } else {
        router.post(`/users/follow/unfollow/${id}`, {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (res) => {
                console.log(res.props)
                setIsFollowed(false)
                setIsDisabled(false)
                if (setFollowersCount) {
                    setFollowersCount(res.props.user.data.followers_count)
                }
            }
        })
    }

}
