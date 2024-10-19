import { LuPlus } from "react-icons/lu";
import { useApp } from "@/AppContext/AppContext.jsx";
import {Link} from "@inertiajs/react";

function Footer() {
    const { setIsSpaceModalOpen, user, returnToLoginPage } = useApp();

    return (
        <div className={`top-16 fixed text-[--theme-primary-text-color] gap-y-4 lg:flex hidden flex-col`}>

            <button
                onClick={() => user ? setIsSpaceModalOpen(true) : returnToLoginPage() }
                className={`w-fit flex gap-x-3 items-center bg-[#1b1b1b] hover:bg-[#1d1d1d] px-6 py-2 rounded transition`}
            >
                <LuPlus className={`bg-[#262626] p-1 rounded text-xl`}/>
                <span>إنشاء مساحة</span>
            </button>

            <div className={`text-[--theme-secondary-text-color]`}>
                <div>
                    <a href="" className={`hover:underline`}>حول . </a>
                    <a href="" className={`hover:underline`}>الوظائف .</a>
                </div>
                <div>
                    <a href="" className={`hover:underline`}>الشروط . </a>
                    <a href="" className={`hover:underline`}>الخصوصية .</a>
                </div>
                <div>
                    <a href="" className={`hover:underline`}>الاستخدام المقبول .</a>
                </div>
                <div>
                    <a href="" className={`hover:underline`}>إعلان . </a>
                    <a href="" className={`hover:underline`}>الصحافة</a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
