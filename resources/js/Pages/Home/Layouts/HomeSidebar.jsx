import React, {useState} from 'react'
import {router, usePage} from "@inertiajs/react";
import FollowedSpace from "@/Pages/Profile/Components/FollowedSpace.jsx";

export default function HomeSidebar() {

    const { props } = usePage()
    const [spaces, setSpaces] = useState(props.user_created_spaces?.data);
    const [spaces_next_page_url, setSpaces_next_page_url] = useState(props.user_created_spaces?.links.next);

    const show_spaces = spaces?.map((space, index) => (
        <FollowedSpace key={index} space={space}/>
    ))
    console.log(props)
    const getSpaces = (pageUrl) => {
        router.visit(pageUrl, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (res) => {
                setSpaces(prevState => ([
                    ...prevState,
                    ...res.props.user_created_spaces?.data
                ]))
                setSpaces_next_page_url(res.props.user_created_spaces?.links.next)
            }
        })
    }

    return (
        <>
            <div className={`fixed w-full xl:w-[347px] py-2 flex flex-col gap-y-3 overflow-y-scroll h-svh`}>
                <h1 className={`border-b border-[--theme-secondary-bg-color-hover] pb-3`}>مساحاتك</h1>
                {spaces?.length === 0 &&
                    <span>لا توجد لديك مساحات</span>
                }
                {show_spaces}
                {spaces_next_page_url &&
                    <button onClick={() => getSpaces(spaces_next_page_url)}
                            className={`bg-[--theme-main-bg-color] py-1 px-6 w-fit rounded-full hover:brightness-110`}>عرض المزيد
                    </button>
                }
            </div>
        </>

    )
}
