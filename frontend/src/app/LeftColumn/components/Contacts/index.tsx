import React, { useEffect } from 'react';
import { Avatar, List  } from 'antd';
import { useAppDispatch, useAppSelector, shallowEqual } from 'app/_base/hooks';
import { fetchContacts } from '../../requests/contactRequests';
import { contactsSelector, loadStatusSelector } from '../../selectors/contactSelectors';
import styles from './styles.less';

interface Props {
    isOpen: boolean;
}

export const Contacts: React.FC<Props> = ({ isOpen }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchContacts());
    }, []);

    const loadStatus = useAppSelector(loadStatusSelector, shallowEqual);
    const contacts = useAppSelector(contactsSelector, shallowEqual);

    if (!isOpen) return null;

    return (
        <div className={styles.Contacts}>
            {loadStatus !== 'IDLE' && (
                <List loading={loadStatus === 'IN_PROGRESS'}>
                    {contacts?.list?.map(item => (
                        <div className={styles.listItem}>
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar size={50}>{item.firstname.substring(0, 1)}</Avatar>}
                                    title={`${item.firstname} ${item.lastname}`}
                                    description={item.username}
                                />
                            </List.Item>
                        </div>
                    ))}
                </List>
            )}
        </div>
    );
};
