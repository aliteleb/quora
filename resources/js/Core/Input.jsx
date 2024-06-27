import React from 'react'

export default function Input({placeholder, handleInputChange, name, value}) {


    return (
        <input
            className={`w-full bg-[--theme-body-bg] border-[--theme-nav-bg-color-hover] border-t-transparent rounded hover:border-[--theme-button-border-color] placeholder:text-[--theme-secondary-text-color]`}
            type="text"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={handleInputChange}
        />
    )
}
