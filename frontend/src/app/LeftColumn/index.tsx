import React from 'react';
import { LeftHeader } from './components/LeftHeader';
import { ChatList } from './components/ChatList';
import styles from './styles.less';

export const LeftColumn: React.FC = () => (
    <div className={styles.LeftColumn}>
        <LeftHeader />
        <ChatList />
    </div>
);
