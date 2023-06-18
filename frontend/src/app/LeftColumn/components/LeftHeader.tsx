import React from 'react';
import { Button, Input } from 'antd';
import { MenuOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons';
import styles from './LeftHeader.less';

interface Props {

}

export const LeftHeader: React.FC<Props> = ({}) => (
    <div className={styles.LeftHeader}>
        <Button type="primary" size="large" shape="circle" icon={<MenuOutlined />} />
        <Input bordered={false} size="large" className={styles.search} prefix={<SearchOutlined />} />
        <Button type="primary" size="large" shape="circle" icon={<EditOutlined />} />
    </div>
);
