import React from 'react'

export default function Input({placeholder, onChange, name, value, label, error, type='text'}) {

    return (
        <>
            {label && <span>{label}</span>}
            <input
                className={`w-full bg-[--theme-body-bg] border-[--theme-default-border-color] rounded hover:border-[--theme-button-border-color] placeholder:text-[--theme-secondary-text-color]`}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                autoComplete="one-time-code"
            />
            {error && <span className={`text-red-500`}>{error}</span>}
        </>
    )
}
