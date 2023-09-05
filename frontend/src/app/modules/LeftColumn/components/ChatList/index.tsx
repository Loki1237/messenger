import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, List } from 'antd';
import { useService, useSystem } from 'app/hooks';
import { SearchResult } from 'app/models';
import { Chat } from 'app/models/chat';
import { getChatTitle } from 'app/utils';
import styles from './styles.less';

interface Props {
    isOpen: boolean;
}

export const ChatList: React.FC<Props> = ({ isOpen }) => {
    const [data, setData] = useState<SearchResult<Chat>>({ total: 0, list: [] });
    const [fetchChats, loadStatus] = useService<SearchResult<Chat>>('GET', '/api/chat/getList?offset=0'); // TODO: offset

    const { user } = useSystem();

    useEffect(() => {
        fetchChats().then(res => setData(prev => ({
            total: res.total,
            list: prev.list.concat(res.list)
        })));
    }, []);

    if (!isOpen) return null;

    return (
        <div className={styles.ChatList}>
            <List loading={loadStatus === 'PENDING'}>
                {data?.list?.map(chat => {
                    const title = getChatTitle(chat, user);

                    return (
                        <Link key={chat.id} to={`/chat/${chat.id}'}`} state={{ type: 'DIALOG', userId: user.id }}>
                            <div className={styles.listItem}>
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar size={50}>{title.substring(0, 1)}</Avatar>}
                                        title={title}
                                        description={chat.messages[0]?.body}
                                    />
                                </List.Item>
                            </div>
                        </Link>
                    );
                })}
            </List>
        </div>
    );
};
