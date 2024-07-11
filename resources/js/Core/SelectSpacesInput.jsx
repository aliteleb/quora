import React from 'react';
import { MdDone } from "react-icons/md";

export default function SelectSpacesInput({ display_name, img, onChange, value }) {
    return (
        <div className={`w-32 h-32 relative`}>
            <input
                value={value}
                onChange={onChange}
                type="checkbox"
                id={`custom-checkbox-${value}`}
                className={`hidden`}
            />
            <label
                htmlFor={`custom-checkbox-${value}`}
                className={`cursor-pointer relative w-full h-full block`}
            >
                <img
                    src={img}
                    alt={display_name}
                    className={`absolute w-full h-full object-cover rounded shadow-lg`}
                />
                <div className={`absolute left-1 top-1 w-8 h-8 bg-white rounded-full opacity-75`}>
                    <MdDone className={`invisible w-6 h-6 text-[--theme-main-bg-color] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2`}/>
                </div>
                <span className={`absolute bottom-2 right-2`}>{display_name}</span>
            </label>
        </div>
    );
}
