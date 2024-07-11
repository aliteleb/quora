import React from 'react'
import SelectSpacesInput from '@/Core/SelectSpacesInput'

export default function SelectSpacesModal() {
  return (
    <div className="bg-[--theme-main-bg-color] rounded absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-50">
        <header className={`border-b border-[--theme-nav-bg-color-hover] p-4 font-bold text-lg text-[--theme-body-color]`}>ما هي اهتماماتك؟</header>
        <main className={`relative grid grid-cols-5 gap-2 py-4 px-3`}>
            <SelectSpacesInput name={`البرمجة`} img={`spaces-imgs/Water8.jpg`}/>
            <SelectSpacesInput name={`الطبخ`} img={`spaces-imgs/Nature23.jpg`}/>
            <SelectSpacesInput name={`التكونولجيا`} img={`spaces-imgs/Mountains12.jpg`}/>
            <SelectSpacesInput name={`السياسة`} img={`spaces-imgs/City2.jpg`}/>
            <SelectSpacesInput name={`الاقتصاد`} img={`spaces-imgs/Colour12.jpg`}/>
            <SelectSpacesInput name={`الكتابة`} img={`spaces-imgs/Misc9.jpg`}/>
            <SelectSpacesInput name={`الموسيقي`} img={`spaces-imgs/Colour11.jpg`}/>
            <SelectSpacesInput name={`الصحة`} img={`spaces-imgs/LandWater7.jpg`}/>
            <SelectSpacesInput name={`الموضة`} img={`spaces-imgs/Misc1.jpg`}/>
            <SelectSpacesInput name={`الأفلام`} img={`spaces-imgs/Space4.jpg`}/>
        </main>
        <footer className={`flex justify-end p-3 border-t border-[--theme-nav-bg-color-hover]`}>
            <button className={`rounded-full px-4 py-2 bg-[--theme-button-border-color] w-fit`}>
                تابع موضوع واحد على الأقل للمواصلة
            </button>
        </footer>
    </div>
  )
}
