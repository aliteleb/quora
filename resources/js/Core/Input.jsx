import React from 'react'

export default function Input({placeholder, onChange, name, value, label, error, type='text'}) {

    return (
        <>
            {label && <span>{label}</span>}
            <input
                className={`w-full bg-[--theme-body-bg] ${error ? 'border-red-500 hover:border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[--theme-default-border-color] hover:border-[--theme-button-border-color] focus:border-[--theme-button-border-color] focus:ring-[--theme-button-border-color]'}  rounded  placeholder:text-[--theme-secondary-text-color]`}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error?.length !== 0 && <span className={`text-red-500`}>{error}</span>}
        </>
    )
}
