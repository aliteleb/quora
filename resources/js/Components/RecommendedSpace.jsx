import React from 'react'
import {Link, router} from "@inertiajs/react";

export default function RecommendedSpace({name, description, slug, status, cover, poster}) {

    return (
        <Link href={`/spaces/${slug}`} className={`bg-[--theme-main-bg-color] relative pb-4 ${description.length > 65 ? 'xs:pb-10 xl:pb-4' : ''} rounded hover:brightness-90`}>

            <img
                src={`${cover ? cover : '/spaces/space_cover_default_image_discover_spaces.webp'}`}
                alt="space-cover"
                className={`h-1/2 rounded-t w-full`}
            />

            <img
                src={`${poster ? poster : '/spaces/space_default_image.webp'}`}
                alt="space-small-img"
                className={`absolute w-20 h-20 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl hover:brightness-90 cursor-pointer`}
            />

            <div className={`flex flex-col items-center`}>
                <h1 className={`mt-16 font-bold text-lg`}>{name}</h1>
                <div className={`text-center p-4`}>{description}</div>
            </div>
        </Link>
    )
}
