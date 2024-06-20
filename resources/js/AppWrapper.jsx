// Wrapper.jsx
import React, { useEffect } from 'react';
import { AppProvider, useApp } from './AppContext/AppContext.jsx';

const AppWrapper = ({ App, props }) => {
    const {setSettings} = useApp()
    useEffect(() => {
        setSettings(props.initialPage.props.settings)
    }, []);

    return <App {...props} />;
};

const Wrapper = ({ App, props }) => (
    <AppProvider>
        <AppWrapper App={App} props={props} />
    </AppProvider>
);

export default Wrapper;
