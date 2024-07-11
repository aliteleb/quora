import React, {useEffect, useState} from 'react'
import Master from "@/Layouts/Master.jsx";
import Footer from "@/Pages/Home/Partials/Footer.jsx";
import CreateThread from "@/Pages/Home/Partials/CreateThread.jsx";
import CreateThreadModal from "@/Pages/Home/Partials/CreateThreadModal.jsx";
import {Head, usePage} from "@inertiajs/react";
import Post from "@/Layouts/Post.jsx";
import SelectTopicsModal from "@/Pages/Home/Partials/SelectTopicsModal.jsx";

export default function SelectTopics() {

    const { props } = usePage();
    useEffect(() => {


    }, []);

    const [isSelectSpacesModalOpen, setIsSelectTopicsModalOpen] = useState(true);


    return (
        <Master>
            <Head title='الرئيسية'/>
            <SelectTopicsModal setIsSelectSpacesModalOpen={setIsSelectTopicsModalOpen}/>
        </Master>
    )
}
