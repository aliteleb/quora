import {createContext, useContext, useState} from "react";

const AppContext = createContext(null);

const AppProvider = ({children}) => {
    const [appInfo, setAppInfo] = useState({
        settings: {}
    })

    const [isCreatThreadModalOpen, setIsCreatThreadModalOpen] = useState(false)
    const [isPostActive, setIsPostActive] = useState(false)

    const setSettings = (newState) => {
        setAppInfo(prevState => ({
            ...prevState,
            settings: newState
        }))
    }

    return (
        <AppContext.Provider
            value={{
                settings: appInfo.settings,
                setSettings,
                isCreatThreadModalOpen,
                setIsCreatThreadModalOpen,
                isPostActive,
                setIsPostActive,
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
