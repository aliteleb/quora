import React, {useEffect, useRef, useState} from 'react';
import {Transition, TransitionChild} from '@headlessui/react';
import {MdDone} from "react-icons/md";

export default function PublicOrPrivateDropdown({
    isPublicOrPrivateDropdownOpen,
    setIsPublicOrPrivateDropdownOpen,
    data,
    handleThreadChange
}) {

    const publicOrPrivateDropdownOpenRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!publicOrPrivateDropdownOpenRef.current?.contains(e.target) && e.target.id !== 'publicOrPrivateDropdown' && e.target.tagName !== 'path' && e.target.tagName !== 'svg' &&  e.target.tagName !== 'SPAN' && e.target.id !== 'drop') {
                setIsPublicOrPrivateDropdownOpen(false);
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
            show={isPublicOrPrivateDropdownOpen}
            leave="duration-200"
        >
            <div
                ref={publicOrPrivateDropdownOpenRef}
                className={`createQuestion-clip-path-responsive min-[915px]:createQuestion-clip-path 2xl:dropdown-clip-path absolute min-[915px]:left-1/2 max-[390px]:-right-10 top-11 2xl:-translate-x-1/2 border border-[--theme-default-border-color] rounded bg-[--theme-main-bg-color]`}
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
                        <div className="pb-3 pt-6 px-3 w-60 border-b border-[--theme-default-border-color] hover:bg-[--theme-nav-bg-color-hover]">
                            <label
                                htmlFor="public"
                                className={`grid grid-cols-[5fr_0.5fr] items-center gap-x-2 cursor-pointer`}
                            >
                                <span className="text-sm text-right">
                                    عام<br/>
                                    سيرى الآخرون هويتك بجانب هذا السؤال في ملفك الشخصي وفي نشراتهم.
                                </span>
                                <input
                                    type="radio"
                                    id="public"
                                    name="visibility"
                                    value="public"
                                    checked={data.visibility === 'public'}
                                    onChange={handleThreadChange}
                                    className="hidden"
                                />
                                {data.visibility === 'public' && <MdDone className="size-6 text-[--theme-button-border-color]"/>}
                            </label>
                        </div>
                        <div className="py-3 px-3 w-60 border-b border-[--theme-default-border-color] hover:bg-[--theme-nav-bg-color-hover]">
                            <label
                                htmlFor="private"
                                className={`grid grid-cols-[5fr_0.5fr] items-center gap-x-2 cursor-pointer`}
                            >
                                <span className="text-sm text-right">
                                    خاص<br/>
                                    سيتم عرض هويتك ولكن هذا السؤال لن يظهر في نشرات متابعيك أو ملفك الشخصي.
                                </span>
                                <input
                                    type="radio"
                                    id="private"
                                    name="visibility"
                                    value="private"
                                    checked={data.visibility === 'private'}
                                    onChange={handleThreadChange}
                                    className="hidden"
                                />
                                {data.visibility === 'private' && <MdDone className="size-6 text-[--theme-button-border-color]"/>}
                            </label>
                        </div>
                    </main>

                </TransitionChild>
            </div>
        </Transition>
    );
}
