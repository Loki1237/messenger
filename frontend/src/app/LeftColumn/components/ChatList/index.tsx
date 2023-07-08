import React, { useCallback } from 'react';
import { Avatar, List, Input } from 'antd';
import { useAppDispatch } from 'app/_base/hooks';
import styles from './styles.less';

const chats = ['Homer Simpson', 'Harrison Ford', 'Bred Pitt', 'Silvester Stallone']

interface Props {
    isOpen: boolean;
}

export const ChatList: React.FC<Props> = ({ isOpen }) => {
    const dispatch = useAppDispatch();

    if (!isOpen) return null;

    return (
        <div className={styles.ChatList}>
            <List>
                {chats.map(item => (
                    <div className={styles.listItem}>
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar size={50}>{item.substring(0, 1)}</Avatar>}
                                title={item}
                                description="Bla bla bla"
                            />
                        </List.Item>
                    </div>
                ))}
            </List>
        </div>
    );
};
