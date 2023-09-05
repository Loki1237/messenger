import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { User } from 'app/models/user';
import { useSystem } from 'app/hooks';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import styles from './styles.less';

interface Props {
    setUser: (user: User) => void;
}

export const Auth: React.FC<Props> = ({ setUser }) => {
    const { user } = useSystem();

    return (
        <div className={styles.Auth}>
            {user && <Navigate to="/" replace={true} />}

            <Routes>
                <Route path="/login" element={<LoginForm setUser={setUser} />} />
                <Route path="/signup" element={<SignupForm setUser={setUser} />} />
                <Route path="*" element={<Navigate to="/account/login" replace={true} />} />
            </Routes>
        </div>
    );
};
