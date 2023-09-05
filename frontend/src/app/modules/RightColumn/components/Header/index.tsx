import React from 'react';
import { Avatar, Button, Typography  } from 'antd';
import { CloseOutlined  } from '@ant-design/icons';
import styles from './styles.less';

const { Text, Title } = Typography;

interface Props {
    title: string;
    onClose: () => void;
    status?: string;
}

export const Header: React.FC<Props> = ({ title, onClose, status }) => (
    <div className={styles.Header}>
        <div className={styles.chatInfo}>
            <Avatar size={40}>1</Avatar>

            <div className={styles.title}>
                <Title level={5}>{title}</Title>
                <Text type="secondary">{status ?? ''}</Text>
            </div>
        </div>

        <Button type="ghost" shape="circle" size="large" icon={<CloseOutlined />} onClick={onClose} />
    </div>
);
