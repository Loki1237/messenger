import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Authentication } from './user/containers/Authentication';
import { Registration } from './user/containers/Registration';
import styles from './App.less';

export const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/login'); // TODO
    }, []);

    return (
        <div className={styles.App}>
            <div className={styles.App_bar} />

            <Routes>
                <Route path="/login" element={<Authentication />} />
                <Route path="/signup" element={<Registration />} />
            </Routes>
        </div>
    );
}
