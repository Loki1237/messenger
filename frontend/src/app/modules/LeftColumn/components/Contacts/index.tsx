import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, List  } from 'antd';
import { User } from 'app/models/user';
import { SearchResult } from 'app/models';
import { useService } from 'app/hooks';
import styles from './styles.less';

interface Props {
    isOpen: boolean;
}

interface ContactView {
    user: User;
    chatId: number;
}

export const Contacts: React.FC<Props> = ({ isOpen }) => {
    const [data, setData] = useState<SearchResult<ContactView>>({ total: 0, list: [] });
    const [fetchContacts, loadStatus] = useService<SearchResult<ContactView>>('GET', '/api/user/contacts?offset=0'); // TODO: offset

    useEffect(() => {
        fetchContacts().then(res => setData(prev => ({
            total: res.total,
            list: prev.list.concat(res.list)
        })));
    }, []);

    if (!isOpen) return null;

    return (
        <div className={styles.Contacts}>
            {loadStatus !== 'IDLE' && (
                <List loading={loadStatus === 'PENDING'}>
                    {data?.list?.map(({ user, chatId }) => (
                        <Link key={user.id} to={`/chat/${chatId ?? 'void'}`} state={{ type: 'DIALOG', userId: user.id }}>
                            <div className={styles.listItem}>
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar size={50}>{user.firstname.substring(0, 1)}</Avatar>}
                                        title={`${user.firstname} ${user.lastname}`}
                                        description={user.username}
                                    />
                                </List.Item>
                            </div>
                        </Link>
                    ))}
                </List>
            )}
        </div>
    );
};
