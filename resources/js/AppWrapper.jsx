// Wrapper.jsx
import React, { useEffect } from 'react';
import { AppProvider, useApp } from './AppContext/AppContext.jsx';

const AppWrapper = ({ App, props }) => {
    const {setSettings, setUser} = useApp()
    useEffect(() => {
        setSettings(props.initialPage.props.settings)
        setUser(props.initialPage.props.auth.user)
    }, []);

    return <App {...props} />;
};

const Wrapper = ({ App, props }) => (
    <AppProvider>
        <AppWrapper App={App} props={props} />
    </AppProvider>
);

export default Wrapper;
