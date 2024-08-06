import React from 'react'

export default function Button({content, onClick, select, custom_styles}) {
    return (
        <button onClick={onClick} className={`hover:bg-[--theme-main-bg-color] px-5 pt-2 pb-4 border-b-[3px] border-transparent ${custom_styles}`} select={select}>
            {content}
        </button>
    )
}
