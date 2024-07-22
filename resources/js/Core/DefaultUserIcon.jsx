import React from 'react'
import {FaRegCircleUser} from "react-icons/fa6";

export default function DefaultUserIcon({classStyle, id}) {
    return (
        <FaRegCircleUser id={id} className={`md:size-9 size-7 cursor-pointer text-[--theme-placeholder-color] ${classStyle}`}/>
    )
}
