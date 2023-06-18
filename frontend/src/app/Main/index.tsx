import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, List } from 'antd';
import { LeftColumn } from '../LeftColumn';
import { RightColumn } from '../RightColumn';
import styles from './styles.less';

export const Main: React.FC = () => {
    return (
        <div className={styles.Main}>
            <LeftColumn />
            <RightColumn />
        </div>
    );
};
