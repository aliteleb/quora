import React, { forwardRef } from 'react';
import {IoIosSearch} from "react-icons/io";

const Input = forwardRef(({
    placeholder,
    onChange,
    name,
    value,
    label,
    error,
    type = 'text',
    id = "",
    visibility = "visible",
    required = false,
    helperText,
    minLength = null,
    maxLength = null,
    parentClassStyle,
    inputClassStyle,
    isSearch,
    autoFocus = false,
}, ref) => {

    return (
        <>
            <div>
                {label && (
                    <div>
                        {label}{required && <span className="text-red-600">*</span>}
                    </div>
                )}
                {helperText && <div className="text-sm text-[--theme-primary-text-color] opacity-80">{helperText}</div>}
            </div>

            <div className={`relative ${parentClassStyle}`}>
                <input
                    className={`${visibility} w-full bg-[--theme-body-bg] ${inputClassStyle} ${error ? 'border-red-500 hover:border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[--theme-default-border-color] hover:border-[--theme-button-border-color] focus:border-[--theme-button-border-color] focus:ring-[--theme-button-border-color]'} rounded placeholder:text-[--theme-secondary-text-color] pe-12`}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    id={id}
                    required={required}
                    minLength={minLength}
                    maxLength={maxLength}
                    ref={ref}
                    autoFocus={autoFocus}
                />
                {maxLength && (
                    <span className={`absolute left-[.6rem] top-1/2 -translate-y-1/2 text-[--theme-primary-text-color] opacity-70 text-[.7rem] ${maxLength === value?.length ? 'text-red-600 !opacity-100' : ''}`}>
                        {value?.length}
                    </span>
                )}
                {isSearch === 'searchable' && <IoIosSearch className={`size-5 absolute top-1/2 right-2 -translate-y-1/2 text-[--theme-secondary-text-color] pointer-events-none`}/>}
            </div>

            {error?.length !== 0 && <span className="text-red-500">{error}</span>}
        </>
    );
});

export default Input;
