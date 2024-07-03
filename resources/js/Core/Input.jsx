import React from 'react'

export default function Input({placeholder, onChange, name, value, label, error, type = 'text', id = "", visibility = "visible", required = false, helperText, showCounter = false}) {

    return (
        <>
            {label && (
                <span>
                    {label}{required && <span className={`text-red-600`}>*</span>}
                </span>
            )}
            {helperText && <span className={`text-sm text-[--theme-body-color] opacity-80`}>{helperText}</span>}

            <div className={`relative`}>
                <input
                    className={`${visibility} w-full bg-[--theme-body-bg] ${error ? 'border-red-500 hover:border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[--theme-default-border-color] hover:border-[--theme-button-border-color] focus:border-[--theme-button-border-color] focus:ring-[--theme-button-border-color]'}  rounded  placeholder:text-[--theme-secondary-text-color] pe-12`}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    id={id}
                    required={required}
                />
                {showCounter && (
                    <span className={`absolute left-[.6rem] top-1/2 -translate-y-1/2 text-[--theme-body-color] opacity-70 text-[.7rem]`}>
                        {value.length}
                    </span>
                )}

            </div>

            {error?.length !== 0 && <span className={`text-red-500`}>{error}</span>}
        </>
    )
}
