import React from 'react'
import {FiEdit} from "react-icons/fi";
import Button from "@/Core/Button.jsx";

export default function Header() {
    return (
        <div className={`py-2 flex gap-x-4 w-full`}>
            <img
                src="/auth-bg.webp"
                alt="avatat"
                className={`size-32 rounded-full object-cover`}
            />
            <div className={`flex flex-col gap-y-2 w-full`}>
                <div className={`flex justify-between`}>
                    <h1 className={`text-3xl font-bold`}>Username</h1>
                    <Button content={`تعديل`} custom_styles={`p-1 bg-transparent hover:bg-[--theme-main-bg-color] transition rounded-full px-4 py-2`}/>
                </div>
                <div className={`mt-2`}>BioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBio</div>
                <div className={`flex justify-between `}>
                    <div>
                        <span>3000 متابعين · </span>
                        <span> يتابع 27</span>
                    </div>
                    <div className={`flex gap-x-2`}>
                        <Button content={`متابعة`}/>
                        <Button content={`حظر`} custom_styles={`bg-[--theme-primary-button-color]`}/>
                    </div>
                </div>

            </div>
        </div>
    )
}
