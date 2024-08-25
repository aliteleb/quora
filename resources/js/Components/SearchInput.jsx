import { RxMagnifyingGlass } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import React, { useEffect, useRef, useState } from "react";
import { Link, router } from "@inertiajs/react";
import useDebounce from "@/Hooks/useDebounce.jsx";

export default function SearchInput({ className }) {
    const [showDropDown, setShowDropDown] = useState(false);
    const [keyword, setKeyword] = useState('');
    const searchRef = useRef(null);
    const [usersResult, setUsersResult] = useState([]);
    const [spacesResult, setSpacesResult] = useState([]);
    const [threadsResult, setThreadsResult] = useState([]);

    const debounceKeyword = useDebounce(keyword);

    function handleKeywordChange(e) {
        setKeyword(e.target.value);

        if (e.target?.value?.length > 0)
            setShowDropDown(true);
        else
            setShowDropDown(false);
    }

    const searchKeyword = () => {
        router.get(`/quick-search?q=${debounceKeyword}`, {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (response) => {
                setUsersResult(response.props.search?.users?.data ?? []);
                setSpacesResult(response.props.search?.spaces?.data ?? []);
                setThreadsResult(response.props.search?.threads?.data ?? []);
            }
        });
    };

    useEffect(() => {
        if (debounceKeyword !== '') {
            searchKeyword();
        }
    }, [debounceKeyword]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!searchRef?.current?.contains(e.target))
                setShowDropDown(false);
        };
        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function handleSearchClick() {
        if (keyword.length > 0) {
            setShowDropDown(true);
        }
    }

    const show_users_result = usersResult.map((user, index) => (
        <li key={index}>
            <Link href={`/profile/${user?.username}`} className="flex justify-between items-center cursor-pointer hover:bg-[--theme-select-space-border-color]">
                <div className="flex items-center gap-x-1 py-1 px-2">
                    <img src={user?.avatar ?? `/profile-default-svgrepo-com.svg`} className="size-5 rounded-full cursor-pointer text-[--theme-placeholder-color]" alt="" />
                    <span className="text-[.9rem] text-white px-1">{user?.name}</span>
                </div>
                <span className="text-[.9rem] text-[--theme-placeholder-color] pe-3">ملف شخصي</span>
            </Link>
        </li>
    ));

    const show_spaces_result = spacesResult.map((space, index) => (
        <li key={index}>
            <Link href={`/spaces/${space?.slug}`} className="flex justify-between items-center cursor-pointer hover:bg-[--theme-select-space-border-color]">
                <div className="flex items-center gap-x-1 py-1 px-2">
                    <img src={space?.media?.poster ?? 'https://qph.cf2.quoracdn.net/main-thumb-ti-186577-100-ejuoadvdybaqjgqmtdhzqwfbohzluqgg.jpeg'}
                         className="size-5 rounded-lg cursor-pointer text-[--theme-placeholder-color]" alt="" />
                    <span className="text-[.9rem] text-white px-1">{space?.name}</span>
                </div>
                <span className="text-[.9rem] text-[--theme-placeholder-color] pe-3">مساحة</span>
            </Link>
        </li>
    ));

    return (
        <div ref={searchRef} className={`${className}`}>
            <RxMagnifyingGlass className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-5 text-[--theme-placeholder-color]" />
            <input
                type="text"
                onChange={handleKeywordChange}
                onClick={handleSearchClick}
                value={keyword}
                className="shadow-none !ring-0 focus:shadow-none focus:border-red-600 hover:border-red-600 ps-8 w-full bg-[--theme-body-bg] rounded-sm border-1 border-[--theme-default-border-color] placeholder:absolute placeholder:right-8 placeholder:text-[--theme-placeholder-color]"
                placeholder="البحث عن Quora"
            />
            <div id="spaceDropDown" className={`animate-fade-in bg-[--theme-main-bg-color] absolute w-full top-[42px] left-0 border border-[--theme-select-space-border-color] ${!showDropDown && 'hidden'}`}>
                <ul className="divide-y divide-[--theme-select-space-border-color]">
                    <li>
                        <Link href={`/search?q=${keyword}`} className="flex justify-between items-center cursor-pointer hover:bg-[--theme-select-space-border-color]">
                            <div className="flex items-center gap-x-1 py-1 px-2">
                                <IoSearchOutline className="size-5 text-white/80" />
                                <span className="text-[.9rem] text-white px-1">{keyword}</span>
                            </div>
                            <span className="text-[.9rem] text-[--theme-placeholder-color] pe-3">بحث ...</span>
                        </Link>
                    </li>
                    {show_users_result}
                    {show_spaces_result}
                </ul>
            </div>
        </div>
    );
}
