import React from 'react'
import {IoChevronDownOutline} from "react-icons/io5";

export default function Button({custom_styles, content, disabled = false, onClick, isDropDown = false}) {
    return (
        <button
            className={`rounded-full px-4 py-1 bg-[--theme-button-border-color] ${custom_styles} flex items-center gap-x-1`}
            disabled={disabled}
            onClick={onClick}
        >
            {content}
            {isDropDown && <IoChevronDownOutline />}
        </button>
    )
}
