import React from 'react'
import {useApp} from "@/AppContext/AppContext.jsx";
import {router} from "@inertiajs/react";

export default function useUserInfo() {
    const { profileUserInfo, setProfileUserInfo } = useApp();

    const getUserInfo = (username, id) => {
        router.get(`/profile/${username}/${id}`, {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (res) => {
                console.log(res.props);
                setProfileUserInfo(res.props);
            }
        });
    }

    return { getUserInfo };

}
