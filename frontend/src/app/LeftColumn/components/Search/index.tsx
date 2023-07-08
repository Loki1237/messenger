import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './styles.less';

export const Search: React.FC = () => {


    return (
        <div className={styles.Search}>
            <Input size="large" prefix={<SearchOutlined />} placeholder="Search" />
        </div>
    );
};
