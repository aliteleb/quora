import React from 'react'
import {Link} from "@inertiajs/react";

export default function RecommendedSpace() {
    return (
        <Link className={`bg-[--theme-main-bg-color] h-max relative pb-4 rounded `}>
            <img
                src="/auth-bg.webp"
                alt="space-img"
                className={`h-1/2 rounded-t`}
            />
            <img
                src="/how-to-make-a-macchiato-003s.webp"
                alt="space-small-img"
                className={`absolute w-20 h-20 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl hover:opacity-95 cursor-pointer`}
            />
            <div className={`flex flex-col items-center`}>
                <h1 className={`mt-16 font-bold text-lg`}>Life & Lessons</h1>
                <div className={`text-center p-4`}>Knowledge & actionable advice to help you grow as a human being. Life Lessons, Personal...</div>
            </div>
        </Link>
    )
}
