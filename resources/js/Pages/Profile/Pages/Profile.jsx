import React, {useEffect, useState} from 'react'
import Master from "@/Layouts/Master.jsx";
import Sidebar from "@/Pages/Profile/Layouts/Sidebar.jsx";
import Header from "@/Pages/Profile/Layouts/Header.jsx";
import {Head, router, usePage} from "@inertiajs/react";

export default function Profile() {

    const { props } = usePage()
    console.log(props)
    const [isActive, setIsActive] = useState({
        profile: true,
        answers: false,
        questions: false,
        posts: false,
        followers: false,
        following: false,
    });
    const [profileUserInfo, setProfileUserInfo] = useState(props.data.data);

    return (
        <Master>
            <Head title={``}/>

            <div className={`flex flex-col text-[--theme-body-color] container max-w-screen-xl mx-auto rounded z-10 relative`}>
                <div className={`flex justify-between gap-x-10`}>
                    <div className={`w-[70%]`}>
                        <Header isActive={isActive} setIsActive={setIsActive} profileUserInfo={profileUserInfo}/>
                    </div>

                    <Sidebar/>
                </div>

            </div>
        </Master>
    )
}
