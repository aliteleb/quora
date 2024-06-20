import {createContext, useContext, useState} from "react";

const AppContext = createContext(null);

const AppProvider = ({children}) => {
    const [appInfo, setAppInfo] = useState({
        settings: {}
    })

    const setSettings = (newState) => {
        setAppInfo(prevState => ({
            ...prevState,
            settings: newState
        }))
    }

    return (
        <AppContext.Provider value={{settings: appInfo.settings, setSettings}}>
            {children}
        </AppContext.Provider>
    )
}

const useApp = () => {
    return useContext(AppContext)
}
export {AppProvider, useApp}
