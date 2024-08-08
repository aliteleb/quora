import React from 'react'
import {router} from "@inertiajs/react";

export function followUser(id, setIsFollowed, isFollowed) {

    if (!isFollowed) {
        router.post(`/users/follow/${id}`, {}, {
            preserveScroll: true,
            preserveState: true,

            onSuccess: () => {
                setIsFollowed(true)
            }
        })
    } else {
        router.post(`/users/unfollow/${id}`, {}, {
            preserveScroll: true,
            preserveState: true,

            onSuccess: () => {
                setIsFollowed(false)
            }
        })
    }

}
