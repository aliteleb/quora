import React from 'react'
import DefaultUserIcon from "@/Core/DefaultUserIcon.jsx";
import {RxDotsHorizontal} from "react-icons/rx";
import {PiArrowFatDown, PiArrowFatDownFill, PiArrowFatUp, PiArrowFatUpFill} from "react-icons/pi";

export default function Comment({customStyles}) {
    return (
        <div className={`px-5 pt-3 flex gap-x-3 ${customStyles}`}>
            <div>
                <DefaultUserIcon/>
            </div>
            <div className={`flex flex-col gap-y-2`}>
                <div className={`flex`}>
                    <div>
                        <div className={`font-bold cursor-pointer w-fit`}>Username <span className={`font-medium cursor-auto`}>· منذ 3 أسابيع</span></div>
                        {/*  محتوي التعليق  */}
                        <div className={`mt-3`}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis ducimus fugit id ipsam minima, porro quibusdam. Accusantium dolore.
                        </div>
                    </div>

                    <div className={`hover:bg-[--theme-nav-bg-color-hover] rounded-full p-2 h-fit cursor-pointer`}>
                        <RxDotsHorizontal className={`size-5`} />
                    </div>
                </div>
                <div className={`flex items-center gap-x-3`}>
                    <div className={`w-fit flex items-center bg-[--theme-nav-bg-color-hover] border border-[--theme-secondary-bg-color-hover] rounded-full`}>
                        <div className={`flex items-center gap-x-1 px-4 py-1 border-e border-[--theme-secondary-bg-color-hover] hover:bg-[--theme-secondary-bg-color-hover] rounded-r-full cursor-pointer`}>
                            <div className={`flex items-center gap-x-1`}>
                                <PiArrowFatUpFill className={`text-[--theme-button-border-color] size-5`}/>
                                <span>أويد ·</span>
                            </div>
                            <span>55</span>
                        </div>
                        <div className={`flex items-center h-full gap-x-2 px-4 py-1 rounded-l-full hover:bg-[--theme-secondary-bg-color-hover] cursor-pointer`}>
                            <PiArrowFatDown className={`size-5`}/>
                            <span>0</span>
                        </div>
                    </div>
                    <button className={`hover:bg-[--theme-nav-bg-color-hover] rounded-full w-[40px] h-[40px] cursor-pointer`}>رد</button>
                </div>
            </div>
        </div>
    )
}
