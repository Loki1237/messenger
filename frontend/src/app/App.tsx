import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Account } from './Account';
import { Main } from './Main';
import { stomp } from './_base/websocket';
import styles from './App.less';

export const App = () => {

    useEffect(() => {
        stomp.activate();
    }, []);

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#1983f1' } }}>
            <div className={styles.App}>
                <Routes>
                    <Route path="/account/*" element={<Account />} />
                    <Route path="/" element={<Main />} />
                </Routes>
            </div>
        </ConfigProvider>
    );
}
