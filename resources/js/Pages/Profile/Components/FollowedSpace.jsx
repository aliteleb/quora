import React from 'react'
import {Link} from "@inertiajs/react";

export default function FollowedSpace({space}) {
    return (
        <div className={`flex gap-x-3`}>
            {!space.media?.poster &&
                <Link href={`/spaces/${space.slug}`}>
                    <img
                        src="/spaces/space_default_image.webp"
                        alt="followed-space"
                        className={`size-10 rounded-2xl`}
                    />
                </Link>
            }
            {space.media?.poster &&
                <Link href={`/spaces/${space.slug}`}>
                    <img
                        src={space.media?.poster}
                        alt="followed-space"
                        className={`size-10 rounded-2xl`}
                    />
                </Link>
            }
            <div className={`flex flex-col`}>
                <Link href={`/spaces/${space.slug}`}>
                    {space.name}
                </Link>
                <span className={`text-[--theme-placeholder-color]`}>{space.followers_count} متابعين</span>
            </div>
        </div>
    )
}
