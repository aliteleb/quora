import {createContext, useContext, useEffect, useState} from "react";

const AppContext = createContext(null);

const AppProvider = ({children}) => {
    const [appInfo, setAppInfo] = useState({
        settings: {}
    })

    const [isCreatThreadModalOpen, setIsCreatThreadModalOpen] = useState(false)
    const [isSpaceModalOpen, setIsSpaceModalOpen] = useState(false)
    const [isPostActive, setIsPostActive] = useState(false)
    const [profileUserInfo, setProfileUserInfo] = useState({});
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

    return (
        <AppContext.Provider
            value={{
                settings: appInfo.settings,
                setSettings,

                isCreatThreadModalOpen,
                setIsCreatThreadModalOpen,
                isSpaceModalOpen,
                setIsSpaceModalOpen,

                isPostActive,
                setIsPostActive,
                setUser,
                user: appInfo.user,
                profileUserInfo,
                setProfileUserInfo,
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
