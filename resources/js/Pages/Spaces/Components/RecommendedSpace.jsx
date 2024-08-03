import React, {useState} from 'react'
import {IoMdAddCircleOutline} from "react-icons/io";
import {MdDone} from "react-icons/md";
import {IoPersonAddOutline} from "react-icons/io5";
import {useApp} from "@/AppContext/AppContext.jsx";
import {router} from "@inertiajs/react";


export default function RecommendedSpace({space}) {
    const {user} = useApp()
    const [isFollowed, setIsFollowed] = useState(space.is_followed);

    const checkIfUserIsOwner = user?.id === space?.user?.id

    const followSpace = () => {
        if (!isFollowed) {
            router.post(`/follow-space/${space?.id}`, {}, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (res) => {
                    setIsFollowed(res.props.data.space?.data.is_followed)
                }
            })
        } else {
            router.post(`/unfollow-space/${space?.id}`, {}, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (res) => {
                    setIsFollowed(res.props.data.space?.data.is_followed)
                }
            })
        }
    }

    return (
        <div className={`bg-[--theme-main-bg-color] text-[--theme-primary-text-color] p-5 h-fit flex flex-col gap-y-3 rounded`}>
            <div className={`flex justify-between`}>
                <div className={`flex items-center gap-x-2`}>
                    {!space.poster &&
                        <img
                            src="/spaces/space_default_image.webp"
                            alt="space-img"
                            className={`w-8 rounded-xl`}
                        />
                    }
                    {space.poster &&
                        <img
                            src={img}
                            alt="space-img"
                            className={`w-8 rounded-xl`}
                        />
                    }
                    <div className={`font-bold`}>{space.name}</div>
                </div>
                <button onClick={!checkIfUserIsOwner ? followSpace : null} className={`flex items-center gap-x-2 border ${!checkIfUserIsOwner && !isFollowed ? 'bg-[--theme-button-border-color] border-transparent' : ''}  rounded-full px-2 text-sm xxs:text-md xxs:px-6 py-1 font-bold`}>
                    {!checkIfUserIsOwner && isFollowed ? 'تمت المتابعة' : !checkIfUserIsOwner && !isFollowed ? 'متابعة' : 'دعوة'}
                    {!checkIfUserIsOwner && !isFollowed ? (<IoMdAddCircleOutline className={`text-2xl`}/>) : !checkIfUserIsOwner && isFollowed ? (<MdDone className={`text-2xl`}/>) : (<IoPersonAddOutline className={`text-2xl`}/>) }
                </button>
            </div>

            <div>{space.description}</div>
        </div>
    )
}
