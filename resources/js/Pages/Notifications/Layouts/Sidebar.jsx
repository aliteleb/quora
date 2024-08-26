import React, {useState} from 'react'

export default function Sidebar() {

    const [isActive, setIsActive] = useState({
        all: true,
        questions: false,
        spaces: false,
        reactions: false,
        comments: false,
    });

    const labels = {
        all: 'all',
        questions: 'questions',
        spaces: 'spaces',
        reactions: 'reactions',
        comments: 'comments'
    }

    const handleClick = (e) => {
        setIsActive({
            all: false,
            questions: false,
            spaces: false,
            reactions: false,
            comments: false,
            [e.target.value]: true,
        })
    }

    return (
        <div className={`top-16 fixed text-[--theme-primary-text-color] gap-y-4 lg:flex hidden flex-col`}>
            <h1 className={`border-b border-[--theme-secondary-bg-color-hover] pb-3 max-w-[9rem] w-[9rem]`}>فلاتر</h1>
            <ul className={`flex flex-col items-start gap-y-1`}>
                <button onClick={handleClick} value={labels.all} className={`cursor-pointer px-3 py-1 ${isActive.all ? 'bg-red-600/10 text-[--theme-primary-button-color] w-full rounded text-right' : ''}`}>كل الإشعارات</button>
                <button onClick={handleClick} value={labels.questions} className={`cursor-pointer px-3 py-1 ${isActive.questions ? 'bg-red-600/10 text-[--theme-primary-button-color] w-full rounded text-right' : ''}`}>الأسئلة</button>
                <button onClick={handleClick} value={labels.spaces} className={`cursor-pointer px-3 py-1 ${isActive.spaces ? 'bg-red-600/10 text-[--theme-primary-button-color] w-full rounded text-right' : ''}`}>المساحات</button>
                <button onClick={handleClick} value={labels.reactions} className={`cursor-pointer px-3 py-1 ${isActive.reactions ? 'bg-red-600/10 text-[--theme-primary-button-color] w-full rounded text-right' : ''}`}>التفاعلات</button>
                <button onClick={handleClick} value={labels.comments} className={`cursor-pointer px-3 py-1 ${isActive.comments ? 'bg-red-600/10 text-[--theme-primary-button-color] w-full rounded text-right' : ''}`}>التعلقيات</button>
            </ul>
        </div>
    )
}
