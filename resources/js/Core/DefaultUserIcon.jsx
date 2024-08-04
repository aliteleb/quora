import React from 'react'
import {FaRegCircleUser} from "react-icons/fa6";

export default function DefaultUserIcon({classStyle, id}) {
    return (
        <img
            src={`/profile-default-svgrepo-com.svg`}
            id={id}
            className={`size-9 cursor-pointer text-[--theme-placeholder-color] ${classStyle}`}
        />
    )
}
