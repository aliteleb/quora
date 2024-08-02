import React from 'react'

export default function SelectSpaceOption({name, img, setData, handleCloseModelWhenSelect, setSelectedSpaceImg}) {

    const  handleSelectSpaceOption = () => {
        setData(previousData => ({
            ...previousData,
            space: name
        }))
        img ? setSelectedSpaceImg(img) : setSelectedSpaceImg('/spaces/space_default_image.webp')
        handleCloseModelWhenSelect()
    }

    return (
        <div onClick={handleSelectSpaceOption} className={`p-2 cursor-pointer flex items-center gap-x-3 hover:bg-[--theme-nav-bg-color-hover] border-t border-[--theme-nav-bg-color-hover]`}>
            {!img &&
                <img
                    src="/spaces/space_default_image.webp"
                    alt="space-img"
                    className={`w-8 rounded-xl`}
                />
            }
            {img &&
                <img
                    src={img}
                    alt="space-img"
                    className={`w-8 rounded-xl`}
                />
            }
            <span>{name}</span>
        </div>
    )
}
