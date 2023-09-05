import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import { User } from 'app/models/user';
import { useService } from 'app/hooks';
import { LeftColumn } from '../LeftColumn';
import { RightColumn } from '../RightColumn';
import styles from './styles.less';

interface Props {
    setUser: (user: User) => void;
}

export const Main: React.FC<Props> = ({ setUser }) => {
    const [fetchLogin, loadStatus] = useService<User>('GET', '/api/user/login');

    useEffect(() => {
        fetchLogin().then(setUser);
    }, []);

    switch (loadStatus) {
        case "PENDING":
            return <Spin size="large" />;

        case "FAILURE":
            return <Navigate to="/account/login" replace={true} />;

        case "SUCCESS":
            return (
                <div className={styles.Main}>
                    <LeftColumn />
                    <RightColumn />
                </div>
            );

        default:
            return null;
    }
};
