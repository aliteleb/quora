import React, {useEffect, useRef} from 'react';
import {Transition, TransitionChild} from '@headlessui/react';
import {MdDone} from "react-icons/md";

export default function FilterPosts({
    isFilterDropdownOpen,
    setIsFilterDropdownOpen,
    filterType,
    handleFilterTypeSelect,
    custom_styles,
}) {

    const filterPostsRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!filterPostsRef.current?.contains(e.target) && e.target.id !== 'publicOrPrivateDropdown' && e.target.tagName !== 'path' && e.target.tagName !== 'svg' &&  e.target.tagName !== 'SPAN' && e.target.id !== 'drop' && e.target.tagName !== 'BUTTON') {
                setIsFilterDropdownOpen(false);
            }
        };

        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Transition
            enter="duration-500 transition"
            show={isFilterDropdownOpen}
            leave="duration-200"
        >
            <div
                ref={filterPostsRef}
                className={`z-50 filterPostsInSpacePage ${custom_styles} absolute right-0 border border-[--theme-default-border-color] rounded bg-[--theme-main-bg-color] pt-3 `}
            >
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    as="div"
                >
                    <main id="drop">

                        <div className="w-40 hover:bg-[--theme-nav-bg-color-hover]">
                            <label
                                htmlFor="most_popular"
                                className={`grid grid-cols-[5fr_0.5fr] items-center gap-x-2 cursor-pointer px-3 py-2`}
                            >
                                <span className="text-sm text-right">الأكثر تفاعلا</span>
                                <input
                                    type="radio"
                                    id="most_popular"
                                    value="most_popular"
                                    checked={filterType === 'most_popular'}
                                    onChange={handleFilterTypeSelect}
                                    className="hidden"
                                />
                                <div className={`flex`}>
                                    <div className={`size-6`}></div>
                                    {filterType === 'most_popular' && <MdDone className="size-6 text-[--theme-button-border-color]"/>}
                                </div>

                            </label>
                        </div>
                        <div className="w-40 hover:bg-[--theme-nav-bg-color-hover]">
                            <label
                                htmlFor="most_recent"
                                className={`grid grid-cols-[5fr_0.5fr] items-center gap-x-2 cursor-pointer px-3 py-2`}
                            >
                                <span className="text-sm text-right">الأحدث</span>
                                <input
                                    type="radio"
                                    id="most_recent"
                                    value="most_recent"
                                    checked={filterType === 'most_recent'}
                                    onChange={handleFilterTypeSelect}
                                    className="hidden"
                                />
                                <div className={`flex`}>
                                    <div className={`size-6`}></div>
                                    {filterType === 'most_recent' && <MdDone className="size-6 text-[--theme-button-border-color]"/>}
                                </div>

                            </label>
                        </div>
                    </main>

                </TransitionChild>
            </div>
        </Transition>
    );
}
