import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, List, Space } from 'antd';
import { useAppSelector, useAppDispatch } from 'app/_base/hooks';
import { getScreenType } from 'app/_base/utils/screenUtils';
import styles from './ChatList.less';

const chats = ['Homer Simpson', 'Harrison Ford', 'Bred Pitt', 'Silvester Stallone']

export const ChatList: React.FC = () => {
    const dispatch = useAppDispatch();

    return (
        <List itemLayout="horizontal" className={styles.ChatList}>
            {chats.map(item => (
                <List.Item className={styles.ChatList_item} onClick={() => console.log(item)}>
                    <List.Item.Meta
                        className={styles.ChatList_item_meta}
                        avatar={<Avatar size={50}>{item.substring(0, 1)}</Avatar>}
                        title={item}
                        description="Bla bla bla"
                    />
                </List.Item>
            ))}
        </List>
    );
};
