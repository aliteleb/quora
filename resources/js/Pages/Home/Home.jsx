import React from 'react'
import Master from "@/Layouts/Master.jsx";
import {useApp} from "@/AppContext/AppContext.jsx";

function Home() {
    const { settings } = useApp()
    return (
        <Master />
    )
}

export default Home
