import React from 'react'
import CredentialsAndHighlights from "@/Pages/Profile/Components/CredentialsAndHighlights.jsx";
import UserActiveSpaces from "@/Pages/Profile/Components/UserActiveSpaces.jsx";

export default function Sidebar({join_date, followed_spaces_count, name}) {
    return (
        <div className={`fixed w-full xl:w-[372px] my-2 pt-8 pb-2 flex flex-col gap-y-8 overflow-y-scroll h-svh`}>
            <CredentialsAndHighlights join_date={join_date} followed_spaces_count={followed_spaces_count} name={name}/>
            <UserActiveSpaces/>
        </div>
    )
}
