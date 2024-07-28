import React from 'react'

export default function SelectSpaceOption() {
    return (
        <div className={`p-2 cursor-pointer flex items-center gap-x-3 hover:bg-[--theme-nav-bg-color-hover] border-t border-[--theme-nav-bg-color-hover]`}>
            <img
                src="/spaces/space_default_image.webp"
                alt="space-img"
                className={`w-8 rounded-xl`}
            />
            <span>Space Name</span>
        </div>
    )
}
