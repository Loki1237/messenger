import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import { useAppSelector, useAppDispatch, shallowEqual } from 'app/_base/hooks';
import { LeftColumn } from '../LeftColumn';
import { RightColumn } from '../RightColumn';
import { fetchLogin } from '../Account/requests/accountRequests';
import { loadStatusSelector } from '../Account/selectors/accountSelectors';
import styles from './styles.less';

export const Main: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchLogin());
    }, []);

    const loadStatus = useAppSelector(loadStatusSelector, shallowEqual);

    switch (loadStatus) {
        case "IN_PROGRESS":
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
