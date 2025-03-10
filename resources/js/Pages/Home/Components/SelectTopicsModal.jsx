import React, {useEffect, useState} from 'react'
import SelectSpacesInput from '@/Core/SelectSpacesInput.jsx'
import {useForm, usePage} from "@inertiajs/react"
import {IoWarningOutline} from "react-icons/io5";
export default function SelectTopicsModal({setIsSelectTopicsModalOpen}) {

    const { props } = usePage();

    const { data, setData, post } = useForm({topics: []})

    const [loaded, setLoaded] = useState(false)
    const [topics, setTopics] = useState(null)
    const handleChange = (e) => {
        const value = e.target.value

        if (data.topics.includes(value))
        {
            const topics = data.topics.filter(topic => topic !== value)
            setData({...data, topics})
        } else {
            setData(previousData => ({
                topics: [...previousData.topics, value]
            }))
        }
    }

    const submitForm = (e) => {
        e.preventDefault()
        post('/select-topics', {
            onSuccess: () => {
                setIsSelectTopicsModalOpen(false)
            },
        })
    }

    useEffect(() => {
        setTopics(props.topics?.data)
        setLoaded(true)
    }, []);

    if (!loaded) return ;

    return (
        <div className="bg-[--theme-main-bg-color] rounded absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-50">
            <header className={`border-b border-[--theme-nav-bg-color-hover] p-4 font-bold text-lg text-[--theme-primary-text-color]`}>ما هي اهتماماتك؟</header>
            {topics?.length === 0 && (
                <div className={`text-center w-full py-6 px-48`}>
                    <IoWarningOutline className={`block mx-auto text-4xl my-6`}/>
                    <span>لا توجد مواضيع حتى الأن</span>
                </div>
            )}

            <main className={`relative grid grid-cols-5 gap-2 py-4 px-3`}>
                {topics?.map((topic, index) => {
                    return <SelectSpacesInput key={index} onChange={handleChange} display_name={topic.name} img={topic.cover} value={topic.id}/>
                })}
            </main>

            <footer className={`flex justify-end p-3 border-t border-[--theme-nav-bg-color-hover]`}>
                <button onClick={submitForm} className={`rounded-full px-4 py-2 bg-[--theme-button-border-color] w-fit ${topics?.length === 0 && 'hidden'}`}>
                    تابع موضوع واحد على الأقل للمواصلة
                </button>
            </footer>
        </div>
    )
}
