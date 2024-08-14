import React from 'react'
import {Link} from "@inertiajs/react";

export default function FollowedSpace({space}) {
    return (
        <Link href={`/spaces/${space.slug}`} className={`flex items-center gap-x-3`}>
            {!space.avatar &&
                <img
                    src="/spaces/space_default_image.webp"
                    alt="followed-space"
                    className={`size-10 rounded-2xl`}
                />
            }
            {space.avatar &&
                <img
                    src={space.avatar}
                    alt="followed-space"
                    className={`size-10 rounded-2xl`}
                />
            }
            <div>
                <h1>{space.name}</h1>
                <span className={`text-[--theme-placeholder-color]`}>{space.followers_count} متابعين</span>
            </div>
        </Link>
    )
}
