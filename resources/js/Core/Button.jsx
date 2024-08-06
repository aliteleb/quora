import React from 'react'

export default function Button({custom_styles, content, disabled = false, onClick}) {
    return (
        <button
            className={`rounded-full px-4 py-1 bg-[--theme-button-border-color] ${custom_styles}`}
            disabled={disabled}
            onClick={onClick}
        >
            {content}
        </button>
    )
}
