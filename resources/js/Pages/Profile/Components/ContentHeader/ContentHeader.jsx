import React from 'react'
import Button from "@/Pages/Profile/Components/ContentHeader/Button.jsx";

export default function ContentHeader({isActive, setIsActive}) {

    const handleClickOnAboutButton = (e) => {
        const button = e.target.getAttribute('select')
        if (!isActive.button) {
            setIsActive({
                profile: false,
                answers: false,
                questions: false,
                posts: false,
                followers: false,
                following: false,
                [button]: true,
            })
        }
    }
    return (
        <div className={`mt-5 flex border-b border-[--theme-secondary-bg-color-hover]`}>
            <Button select={`profile`} custom_styles={isActive.profile ? 'border-[--theme-primary-button-color] text-[--theme-primary-button-color]' : ''} onClick={handleClickOnAboutButton} content={`الملف الشخصي`}/>
            <Button select={`answers`} custom_styles={isActive.answers ? 'border-[--theme-primary-button-color] text-[--theme-primary-button-color]' : ''} onClick={handleClickOnAboutButton} content={`23 إجابات`}/>
            <Button select={`questions`} custom_styles={isActive.questions ? 'border-[--theme-primary-button-color] text-[--theme-primary-button-color]' : ''} onClick={handleClickOnAboutButton} content={`5 أسئلة`}/>
            <Button select={`posts`} custom_styles={isActive.posts ? 'border-[--theme-primary-button-color] text-[--theme-primary-button-color]' : ''} onClick={handleClickOnAboutButton} content={`40 منشور`}/>
            <Button select={`followers`} custom_styles={isActive.followers ? 'border-[--theme-primary-button-color] text-[--theme-primary-button-color]' : ''} onClick={handleClickOnAboutButton} content={`20K متابعين`}/>
            <Button select={`following`} custom_styles={isActive.following ? 'border-[--theme-primary-button-color] text-[--theme-primary-button-color]' : ''} onClick={handleClickOnAboutButton} content={`يتابع 15`}/>
        </div>
    )
}
