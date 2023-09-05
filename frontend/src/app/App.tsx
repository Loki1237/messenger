import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { SystemContext } from './context/system';
import { User } from './models/user';
import { Auth } from './modules/Auth';
import { Main } from './modules/Main';
import { stomp } from './websocket';
import { getScreenType } from './utils';
import styles from './App.less';

export const App = () => {
    const [user, setUser] = useState<User>(null);
    const [screenType, setScreenType] = useState<'NARROW' | 'WIDE'>(getScreenType());

    useEffect(() => {
        window.addEventListener('resize', () => setScreenType(getScreenType()));
        stomp.activate();
    }, []);

    return (
        <SystemContext.Provider value={{ user, screenType }}>
            <ConfigProvider theme={{ token: { colorPrimary: '#2196f3' } }}>
                <div className={styles.App}>
                    <Routes>
                        <Route path="/account/*" element={<Auth setUser={setUser} />} />
                        <Route path="/*" element={<Main setUser={setUser} />} />
                    </Routes>
                </div>
            </ConfigProvider>
        </SystemContext.Provider>
    );
};
