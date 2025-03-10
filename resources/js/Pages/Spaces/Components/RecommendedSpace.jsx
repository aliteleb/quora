import React, {useState} from 'react'
import {IoMdAddCircleOutline} from "react-icons/io";
import {MdDone} from "react-icons/md";
import {IoPersonAddOutline} from "react-icons/io5";
import {useApp} from "@/AppContext/AppContext.jsx";
import {Link, router} from "@inertiajs/react";


export default function RecommendedSpace({space, customStyles}) {
    const {user, returnToLoginPage} = useApp()
    const [isFollowed, setIsFollowed] = useState(space.is_followed);

    const checkIfUserIsOwner = user?.id === space?.user?.id

    const followSpace = () => {
        if (!user){
            returnToLoginPage();
        }else {
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
    }

    return (
        <div className={`relative rounded ${customStyles}`}>
            <img
                src={space.media.cover ? space.media.cover : '/spaces/space_cover_default_image_space_page.webp'}
                alt="cover"
                className={`absolute h-full rounded brightness-50 w-full`}
            />
            <div className={`bg-[--theme-main-bg-color] text-[--theme-primary-text-color] h-fit flex flex-col p-5 gap-y-3`}>
                <div className={`flex justify-between z-10`}>
                    <Link
                        href={`/spaces/${space.slug}`}
                        className={`flex items-center gap-x-2`}
                    >
                        {!space.media.poster &&
                            <img
                                src="/spaces/space_default_image.webp"
                                alt="space-img"
                                className={`size-8 rounded-xl`}
                            />
                        }
                        {space.media.poster &&
                            <img
                                src={space.media.poster}
                                alt="space-img"
                                className={`size-8 rounded-xl`}
                            />
                        }
                        <div className={`font-bold`}>{space.name}</div>
                    </Link>
                    <button onClick={!checkIfUserIsOwner ? followSpace : null} className={`flex items-center gap-x-2 border h-fit ${!checkIfUserIsOwner && !isFollowed ? 'bg-[--theme-button-border-color] border-transparent' : ''}  rounded-full px-2 text-sm xxs:text-md xxs:px-6 py-1 font-bold`}>
                        {!checkIfUserIsOwner && isFollowed ? 'تمت المتابعة' : !checkIfUserIsOwner && !isFollowed ? 'متابعة' : 'دعوة'}
                        {!checkIfUserIsOwner && !isFollowed ? (<IoMdAddCircleOutline className={`text-2xl`}/>) : !checkIfUserIsOwner && isFollowed ? (<MdDone className={`text-2xl`}/>) : (<IoPersonAddOutline className={`text-2xl`}/>) }
                    </button>
                </div>

                <div className={`z-10`}>{space.description}</div>
            </div>

        </div>
    )
}
