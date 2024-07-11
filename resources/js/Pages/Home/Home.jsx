import React, {useEffect, useState} from 'react'
import Master from "@/Layouts/Master.jsx";
import Footer from "@/Pages/Home/Partials/Footer.jsx";
import CreateThread from "@/Pages/Home/Partials/CreateThread.jsx";
import CreateThreadModal from "@/Pages/Home/Partials/CreateThreadModal.jsx";
import {Head, usePage} from "@inertiajs/react";
import Post from "@/Layouts/Post.jsx";
import {useApp} from "@/AppContext/AppContext.jsx";
import SelectTopicsModal from './Partials/SelectTopicsModal.jsx';

export default function Home() {

    const { setUser } = useApp()

    const { props } = usePage();
    useEffect(() => {
        setUser(props.auth.user)
        if (props.auth.user.spaces.length === 0)
        {
            setIsSelectSpacesModalOpen(true)
        }
    }, []);

    const [isSelectSpacesModalOpen, setIsSelectSpacesModalOpen] = useState(true);


    return (
        <Master>
            <Head title='الرئيسية'/>
            {!isSelectSpacesModalOpen &&
                <div className={`flex container max-w-screen-xl mx-auto gap-x-10 px-2`}>
                    <Footer/>

                    <div className={`w-40 hidden md:block`}></div> {/* Footer Simulation */}
                    <div className={`lg:w-[750px] w-full flex flex-col items-center gap-y-2 py-2`}>
                        <CreateThread/>
                        <Post/>
                    </div>
                    <CreateThreadModal/>
                </div>
            }

            {isSelectSpacesModalOpen && <SelectTopicsModal setIsSelectSpacesModalOpen={setIsSelectSpacesModalOpen}/>}
        </Master>
    )
}
