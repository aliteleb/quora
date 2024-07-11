import React, {useEffect, useState} from 'react'
import SelectSpacesInput from '@/Core/SelectSpacesInput'
import {useForm} from "@inertiajs/react"
export default function SelectSpacesModal() {

    const { data, setData, post, errors } = useForm({spaces: []})

    const handleChange = (e) => {
        const value = e.target.value

        if (data.spaces.includes(value))
        {
            const spaces = data.spaces.filter(space => space !== value)
            setData({...data, spaces})
        } else {
            setData(previousData => ({
                spaces: [...previousData.spaces, value]
            }))
        }
    }

    useEffect(() => {
        console.log(data)
    }, [data]);


    return (
    <div className="bg-[--theme-main-bg-color] rounded absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-50">
        <header className={`border-b border-[--theme-nav-bg-color-hover] p-4 font-bold text-lg text-[--theme-body-color]`}>ما هي اهتماماتك؟</header>
        <main className={`relative grid grid-cols-5 gap-2 py-4 px-3`}>
            <SelectSpacesInput onChange={handleChange} display_name="البرمجة" img="spaces-imgs/Water8.jpg" value="programming"/>
            <SelectSpacesInput onChange={handleChange} display_name="الطبخ" img="spaces-imgs/Nature23.jpg" value="cooking"/>
            <SelectSpacesInput onChange={handleChange} display_name="التكونولجيا" img="spaces-imgs/Mountains12.jpg" value="technology"/>
            <SelectSpacesInput onChange={handleChange} display_name="السياسة" img="spaces-imgs/City2.jpg" value="politics"/>
            <SelectSpacesInput onChange={handleChange} display_name="الاقتصاد" img="spaces-imgs/Colour12.jpg" value="economy"/>
            <SelectSpacesInput onChange={handleChange} display_name="الكتابة" img="spaces-imgs/Misc9.jpg" value="writing"/>
            <SelectSpacesInput onChange={handleChange} display_name="الموسيقي" img="spaces-imgs/Colour11.jpg" value="music"/>
            <SelectSpacesInput onChange={handleChange} display_name="الصحة" img="spaces-imgs/LandWater7.jpg" value="health"/>
            <SelectSpacesInput onChange={handleChange} display_name="الموضة" img="spaces-imgs/Misc1.jpg" value="fashion"/>
            <SelectSpacesInput onChange={handleChange} display_name="الأفلام" img="spaces-imgs/Space4.jpg" value="movies"/>
        </main>
        <footer className={`flex justify-end p-3 border-t border-[--theme-nav-bg-color-hover]`}>
            <button className={`rounded-full px-4 py-2 bg-[--theme-button-border-color] w-fit`}>
                تابع موضوع واحد على الأقل للمواصلة
            </button>
        </footer>
    </div>
    )
}
