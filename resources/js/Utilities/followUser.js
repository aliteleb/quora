import React from 'react'
import {router} from "@inertiajs/react";

export function followUser(id, setIsFollowed, isFollowed, setIsDisabled) {
    setIsDisabled(true)
    if (!isFollowed) {
        router.post(`/users/follow/follow/${id}`, {}, {
            preserveScroll: true,
            preserveState: true,

            onSuccess: () => {
                setIsFollowed(true)
                setIsDisabled(false)
            }
        })
    } else {
        router.post(`/users/follow/unfollow/${id}`, {}, {
            preserveScroll: true,
            preserveState: true,

            onSuccess: () => {
                setIsFollowed(false)
                setIsDisabled(false)
            }
        })
    }

}
