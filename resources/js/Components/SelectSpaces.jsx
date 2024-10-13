import React, {useEffect, useRef, useState} from 'react'
import {IoChevronDownSharp} from "react-icons/io5";
import {AiOutlineGlobal} from "react-icons/ai";
import Input from "@/Core/Input.jsx";
import {RiGlobalLine} from "react-icons/ri";
import SelectSpaceOption from "@/Components/SelectSpaceOption.jsx";
import {router, usePage} from "@inertiajs/react";
import useDebounce from "@/Hooks/useDebounce.jsx";

export default function SelectSpaces({setData, data, selectedSpaceImg, setSelectedSpaceImg}) {
    const {props} = usePage()
    const [isSelectSpacesOpen, setIsSelectSpacesOpen] = useState(false);
    const [spaces, setSpaces] = useState(props.followed_spaces.data);
    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const debounceKeyword = useDebounce(keyword);

    const handleChange = (e) => {
        setKeyword(e.target.value)
    }

    const search = () => {
        setIsLoading(true)
        router.get(`/search/spaces/${keyword}`, {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (res) => {
                setSearchResults(res.props.followed_spaces.data)
                setIsLoading(false)
            }
        })
    }

    useEffect(() => {
        if (debounceKeyword !== '') {
            search();
        }
    }, [debounceKeyword]);




    const spacesMenu = useRef(null);
    const toggleOpenSelectSpaceMenu = () => {
        if (spacesMenu.current?.classList.contains('animate-fade-in')) {
            spacesMenu.current?.classList.remove('animate-fade-in')
            spacesMenu.current?.classList.add('animate-fade-out')
        } else {
            spacesMenu.current?.classList.remove('animate-fade-out')
            spacesMenu.current?.classList.add('animate-fade-in')
        }
        setTimeout(() => {
            setIsSelectSpacesOpen(!isSelectSpacesOpen)
        }, 100)
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!spacesMenu.current?.contains(e.target) && e.target.id !== 'spaceDropDown' && e.target.tagName !== 'svg' && e.target.tagName !== 'path' && e.target.tagName !== 'SPAN') {
                spacesMenu.current?.classList.remove('animate-fade-in')
                spacesMenu.current?.classList.add('animate-fade-out')
                setTimeout(() => {
                    setIsSelectSpacesOpen(false)
                }, 80)
            }
        };

        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCloseModelWhenSelect = () => {
        spacesMenu.current?.classList.remove('animate-fade-in')
        spacesMenu.current?.classList.add('animate-fade-out')
        setTimeout(() => {
            setIsSelectSpacesOpen(false)
        }, 80)
    }

    const display_spaces_in_select =
        spaces?.map(space => (
        <SelectSpaceOption
            name={space.name}
            img={space.media?.avatar}
            setData={setData}
            handleCloseModelWhenSelect={handleCloseModelWhenSelect}
            setSelectedSpaceImg={setSelectedSpaceImg}
        />
    ))

    const display_results_in_select =
        searchResults?.map(result => (
            <SelectSpaceOption
                name={result.name}
                img={result.media?.avatar}
                setData={setData}
                handleCloseModelWhenSelect={handleCloseModelWhenSelect}
                setSelectedSpaceImg={setSelectedSpaceImg}
            />
        ))

    const  handleSelectSpaceOption = () => {
        setData(previousData => ({
            ...previousData,
            space: 'الملف الشخصي'
        }))
        handleCloseModelWhenSelect()
    }

    return (
        <div className={`flex relative`}>
            <button onClick={toggleOpenSelectSpaceMenu} className={`flex items-center gap-x-2 hover:bg-[--theme-main-bg-color] rounded-full px-4 py-2 w-max`}>
                {data.space ===  'الملف الشخصي' && <RiGlobalLine className={`size-5`}/>}
                {selectedSpaceImg && data.space !==  'الملف الشخصي' &&
                    <img
                        src={selectedSpaceImg ? selectedSpaceImg : `/spaces/space_default_image.webp`}
                        alt="space-img"
                        className={`size-8 rounded-xl`}
                    />
                }
                <span>{data.space}</span>
                <IoChevronDownSharp />
            </button>

            {isSelectSpacesOpen &&
                <div id={`spaceDropDown`} ref={spacesMenu} className={`animate-fade-in max-h-[30rem] overflow-y-scroll bg-[--theme-main-bg-color] pt-2 rounded absolute w-80 xxs:w-max top-12 left-0 ${data.space?.length > 12 ? 'lg:-left-96 xxs:-left-20' : 'lg:right-44 xxs:-right-24 left-0'} lg:top-0 border border-[--theme-select-space-border-color]`}>
                    <div className={`px-2`}>
                        <Input
                            placeholder={`البحث عن مساحة...`}
                            isSearch={'searchable'}
                            inputClassStyle={`ps-8`}
                            onChange={handleChange}
                            name={'keyword'}
                            value={keyword}
                            autoFocus={true}
                        />
                    </div>
                    <div
                        onClick={handleSelectSpaceOption}
                        className={`flex items-center gap-x-2 py-3 px-2 hover:bg-[--theme-nav-bg-color-hover] cursor-pointer`}>
                        <RiGlobalLine className={`size-5 text-[--theme-button-border-color]`}/>
                        <span>الملف الشخصي</span>
                    </div>
                    <div className={`border-t border-[--theme-nav-bg-color-hover] py-3 px-2 font-bold`}>المساحات المقترحة</div>
                    <div>
                        {keyword.length === 0 && !isLoading && display_spaces_in_select}
                        {keyword.length !== 0 && !isLoading  && display_results_in_select}
                        {(spaces.length === 0 || (searchResults.length === 0 && keyword.length !== 0) && !isLoading) &&
                            <h1 className={`py-3 px-2`}>
                                {searchResults.length === 0 && keyword.length !== 0 ? 'لا توجد نتائج' : 'لا تتابع اى مساحات'}
                            </h1>
                        }
                    </div>
                </div>
            }

        </div>
    )
}
