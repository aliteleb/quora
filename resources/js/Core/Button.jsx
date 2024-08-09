import React from 'react'
import {IoChevronDownOutline} from "react-icons/io5";
import {IoMdAddCircleOutline} from "react-icons/io";
import {MdDone} from "react-icons/md";

export default function Button(
    {
        custom_styles,
        content,
        disabled = false,
        onClick,
        isDropDown = false,
        isTypeFollow = false,
        isFollowed,
        isTypeBlock = false,
        isBlocked,
    }) {
    return (
        <button
            className={`rounded-full px-4 py-1 bg-[--theme-button-border-color] ${custom_styles} flex items-center gap-x-1`}
            disabled={disabled}
            onClick={onClick}
        >
            {content}
            {isDropDown && <IoChevronDownOutline />}
            {isTypeFollow && (!isFollowed ? (<IoMdAddCircleOutline className={`text-2xl`}/>) : (<MdDone className={`text-2xl`}/>)) }
            {isTypeBlock && (isBlocked && <MdDone className={`text-2xl`}/>)}
        </button>
    )
}
