import React from 'react'
import {IoMdAddCircleOutline} from "react-icons/io";
import SpacePerson from "@/Pages/Spaces/Components/SpacePerson.jsx";
import {MdOutlineModeEdit} from "react-icons/md";

export default function SpaceAbout({checkIfUserIsOwner, space}) {
    return (
        <main className={`w-full flex flex-col gap-y-4 pb-10`}>
            <div className={`flex flex-col gap-y-3`}>
                <h1>التفاصيل</h1>
                <div className={`w-full bg-[--theme-main-bg-color] flex flex-col justify-center items-center gap-y-2 py-24 rounded`}>
                    <img
                        src="/spaces/no-details.webp"
                        alt=""
                        className={`w-16`}
                    />
                    <h2>لا توجد تفاصيل حتى الآن</h2>
                    {checkIfUserIsOwner &&
                        <button
                            className={`outline-0 bg-[--theme-space-owner-main-color] text-[--theme-body-color] w-fit flex items-center gap-x-2 py-2 px-4 mt-2 rounded-full`}>
                            أضف تفاصيل
                        </button>
                    }
                </div>
            </div>
            <div className={`flex flex-col gap-y-3`}>
                <h1>الأشخاص</h1>
                <div className={`w-full bg-[--theme-main-bg-color] flex flex-col rounded`}>
                    <div className={`flex flex-col gap-y-1 p-4 border-b border-[--theme-secondary-bg-color-hover]`}>
                        <span className={`font-bold`}>المشرفين</span>
                        <span className={`text-[--theme-secondary-text-color]`}>يمكن للمسؤولين إدارة المحتوى.</span>
                        {checkIfUserIsOwner &&
                            <button
                                className={`outline-0 border border-[--theme-space-owner-main-color] text-[--theme-space-owner-main-color] w-fit flex items-center gap-x-2 py-1 px-4 mt-2 rounded-full`}>
                                دعوة
                                <IoMdAddCircleOutline className={`text-xl`}/>
                            </button>
                        }
                    </div>
                    <div className={`p-4 flex justify-between items-center`}>
                        <SpacePerson space={space}/>
                        {checkIfUserIsOwner &&
                            <button
                                className={`hover:bg-[--theme-secondary-bg-color-hover] p-3 rounded-full`}>
                                <MdOutlineModeEdit className={`size-5`}/>
                            </button>
                        }
                    </div>
                </div>
            </div>
            <div className={`flex flex-col gap-y-3`}>
                <div className={`w-full bg-[--theme-main-bg-color] flex flex-col rounded`}>
                    <div className={`flex flex-col gap-y-1 p-4 border-b border-[--theme-secondary-bg-color-hover]`}>
                        <span className={`font-bold`}>المتابعين</span>
                        <span className={`text-[--theme-secondary-text-color]`}>يري المتابعون محتوي المساحة ويتلقون اشعارات للمنشورات بداخل المساحة</span>
                        {checkIfUserIsOwner &&
                            <button
                                className={`outline-0 border border-[--theme-space-owner-main-color] text-[--theme-space-owner-main-color] w-fit flex items-center gap-x-2 py-1 px-4 mt-2 rounded-full`}>
                                دعوة
                                <IoMdAddCircleOutline className={`text-xl`}/>
                            </button>
                        }
                    </div>
                    <div className={`p-4 flex flex-col justify-between gap-y-3`}>
                        <SpacePerson space={space} isFollower={true}/>
                        <SpacePerson space={space} isFollower={true}/>
                    </div>
                </div>
            </div>
        </main>
    )
}
