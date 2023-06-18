import React from 'react';
import { RightHeader } from './components/RightHeader';
import { Message } from './components/Message';
import styles from './styles.less';

const messages = [
    { body: 'Lorem ipsum dolor sit amet', user: { id: 3 } },
    { body: 'consectetur adipiscing elit', user: { id: 3 } },
    { body: 'sed do eiusmod tempor incididunt ut', user: { id: 4 } },
    { body: 'labore et dolore magna aliqua', user: { id: 3 } },
    { body: 'Ut enim ad minim veniam', user: { id: 3 } },
    { body: 'quis nostrud exercitation ullamco', user: { id: 3 } },
    { body: 'laboris nisi ut aliquip', user: { id: 4 } },
    { body: 'ex ea commodo consequat', user: { id: 4 } },
    { body: 'Duis aute irure dolor in reprehenderit', user: { id: 4 } },
];

const currentUser = { id: 4 }

export const RightColumn: React.FC = () => (
    <div className={styles.RightColumn}>
        <RightHeader />
        <div className={styles.message_list}>
            {messages.map((item, index, list) => (
                <Message
                    body={item.body}
                    own={item.user.id === currentUser.id}
                    firstInGroup={!index || list[index - 1].user.id !== item.user.id}
                />
            ))}
        </div>
    </div>
);
