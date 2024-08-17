import React, {useEffect, useState} from 'react'
import Master from "@/Layouts/Master.jsx";
import {IoIosAddCircleOutline} from "react-icons/io";
import {useApp} from "@/AppContext/AppContext.jsx";
import RecommendedSpace from "@/Components/RecommendedSpace.jsx";
import {Head, Link, router, usePage} from "@inertiajs/react";

export default function Spaces() {

    const {setIsSpaceModalOpen, user} = useApp()
    const {props} = usePage()

    const [spaces, setSpaces] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState('');

    const getSpaces = (pageUrl) => {
        router.visit(pageUrl, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (res) => {
                setSpaces(prevState => ([
                    ...prevState,
                    ...res.props.data.spaces.data
                ]))
                setNextPageUrl(res.props.data.next_page_url)
                window.history.replaceState({}, ``, `/spaces`)
            }
        })
    }

    useEffect(() => {
        setSpaces(props.data.spaces.data)
        setNextPageUrl(props.data.next_page_url)
    }, []);

    const display_spaces = spaces.map(space => (
        <RecommendedSpace space={space}/>
    ))

    return (
        <Master>
            <Head title={`المساحات`}/>
            <div className={`flex flex-col container max-w-screen-xl mx-auto rounded mt-10 gap-y-10`}>
                <div className={`bg-[--theme-main-bg-color] relative`}>
                    <img
                        className={`h-full absolute md:left-24 sm:left-6 left-0 w-fit object-cover`}
                        src="/spaces-img.webp"
                        alt="spaces-img"
                    />
                    <div className={`flex flex-col gap-y-4 p-6 bg-[#252525] sm:bg-transparent w-fit z-10 relative`}>
                        <div className={`flex flex-col gap-y-1`}>
                            <h1 className={`font-medium text-lg`}>مرحبا بك فى المساحات!</h1>
                            <h2 className={`text-[--theme-secondary-text-color]`}>تابع مساحات لتستكشف اهتماماتك.</h2>
                        </div>
                        <Link
                            href={!user ? 'account' : ''}
                            onClick={() => setIsSpaceModalOpen(true)}
                            className={`text-right text-[--theme-button-border-color] hover:bg-[#287dff1f] border-2 border-[--theme-button-border-color] w-fit px-4 py-1 rounded-full flex items-center gap-x-2`}
                        >
                            <IoIosAddCircleOutline className={`size-5`}/>
                            <span>إنشاء مساحة</span>
                        </Link>
                    </div>
                </div>

                <div className={`flex flex-col gap-y-3 px-6 xl:px-0 sm:pb-8 pb-16`}>
                    <h1 className={`font-bold text-lg`}>إستكشف مساحات</h1>
                    <h2>مساحات من الممكن أن تعجبك</h2>
                    <div className={`grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 mt-4 gap-4 pb-4`}>
                        {display_spaces}
                    </div>
                    {nextPageUrl &&
                        <div className={`flex justify-center`}>
                            <button onClick={() => getSpaces(nextPageUrl)}
                                    className={`bg-[--theme-main-bg-color] py-3 px-6 w-fit rounded hover:brightness-110`}>عرض المزيد
                            </button>
                        </div>
                    }
                </div>
            </div>
        </Master>
    )
}
