import React from 'react'
import {useApp} from "@/AppContext/AppContext.jsx";
import {router} from "@inertiajs/react";

export default function useFollowUser() {

    const { user, isUserFollowed, setIsUserFollowed } = useApp()
    const followUser = (id) => {
        router.post(`/users/follow/${id}`, {}, {
            preserveScroll: true,
            preserveState: true,

            onSuccess: (res) => {
                setIsUserFollowed(true)
                console.log(res.props)
            }
        })
    }

    return { followUser };

}
