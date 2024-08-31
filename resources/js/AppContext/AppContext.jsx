import {createContext, useContext, useEffect, useState} from "react";
import {usePage} from "@inertiajs/react";

const AppContext = createContext(null);

const AppProvider = ({children}) => {
    const [appInfo, setAppInfo] = useState({
        settings: {},
        pages: {},
    })

    const [isCreatThreadModalOpen, setIsCreatThreadModalOpen] = useState(false)
    const [isSpaceModalOpen, setIsSpaceModalOpen] = useState(false)
    const [isPostActive, setIsPostActive] = useState(false)
    const [notificationsCount, setNotificationsCount] = useState(null);
    const setSettings = (newState) => {
        setAppInfo(prevState => ({
            ...prevState,
            settings: newState
        }))
    }

    const setUser = (newState) => {
        setAppInfo(prevState => ({
            ...prevState,
            user: newState
        }))
    }
    const setPages = (newState) => {
        setAppInfo(prevState => ({
            ...prevState,
            pages: newState
        }))
    }

    return (
        <AppContext.Provider
            value={{
                settings: appInfo.settings,
                setSettings,

                isCreatThreadModalOpen,
                setIsCreatThreadModalOpen,
                isSpaceModalOpen,
                setIsSpaceModalOpen,
                notificationsCount,
                setNotificationsCount,
                pages: appInfo.pages,
                setPages: setPages,

                isPostActive,
                setIsPostActive,
                setUser,
                user: appInfo.user,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

const useApp = () => {
    return useContext(AppContext)
}
export {AppProvider, useApp}
