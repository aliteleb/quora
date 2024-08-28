import React, {useState} from 'react'

export default function Sidebar({getNotifications}) {

    const [isActive, setIsActive] = useState({
        all: true,
        questions: false,
        posts: false,
        reactions: false,
        comments: false,
    });

    const labels = {
        all: 'all',
        questions: 'questions',
        posts: 'posts',
        reactions: 'reactions',
        comments: 'comments'
    }

    const handleClick = (e) => {
        setIsActive({
            all: false,
            questions: false,
            posts: false,
            reactions: false,
            comments: false,
            [e.target.value]: true,
        })
    }

    return (
        <div className={`top-16 fixed text-[--theme-primary-text-color] gap-y-4 lg:flex hidden flex-col`}>
            <h1 className={`border-b border-[--theme-secondary-bg-color-hover] pb-3 max-w-[9rem] w-[9rem]`}>فلاتر</h1>
            <ul className={`flex flex-col items-start gap-y-1`}>
                <button
                    onClick={(e) => {
                        getNotifications('/notifications', 'all_notifications')
                        handleClick(e)
                    }}
                    value={labels.all}
                    className={`w-full cursor-pointer px-3 py-1 ${isActive.all ? 'bg-red-600/10 text-[--theme-primary-button-color] rounded' : ''} text-right`}>
                    كل الإشعارات
                </button>
                <button
                    onClick={(e) => {
                        getNotifications('/notifications/questions', 'questions_notifications')
                        handleClick(e)
                    }}
                    value={labels.questions}
                    className={`w-full cursor-pointer px-3 py-1 ${isActive.questions ? 'bg-red-600/10 text-[--theme-primary-button-color] rounded' : ''} text-right`}>
                    الأسئلة
                </button>
                <button
                    onClick={(e) => {
                        getNotifications('/notifications/posts', 'posts_notifications')
                        handleClick(e)
                    }}
                    value={labels.posts}
                    className={`w-full cursor-pointer px-3 py-1 ${isActive.posts ? 'bg-red-600/10 text-[--theme-primary-button-color] rounded' : ''} text-right`}>
                    المنشورات
                </button>
                <button
                    onClick={(e) => {

                        handleClick(e)
                    }}
                    value={labels.reactions}
                    className={`w-full cursor-pointer px-3 py-1 ${isActive.reactions ? 'bg-red-600/10 text-[--theme-primary-button-color] rounded ' : '' } text-right`}>
                    التفاعلات
                </button>
                <button
                    onClick={(e) => {

                        handleClick(e)
                    }}
                    value={labels.comments}
                    className={`w-full cursor-pointer px-3 py-1 ${isActive.comments ? 'bg-red-600/10 text-[--theme-primary-button-color] rounded' : ''} text-right`}>
                    التعلقيات
                </button>
            </ul>
        </div>
    )
}
