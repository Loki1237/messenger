import React, { useState } from 'react';
import { ChatList } from './components/ChatList';
import { Contacts } from './components/Contacts';
import { Navigation } from './components/Navigation';
import { Search } from './components/Search';
import styles from './styles.less';

export const LeftColumn: React.FC = () => {
    const [tab, setTab] = useState(0);

    return (
        <div className={styles.LeftColumn}>
            <Search />

            <div className={styles.content}>
                <Contacts isOpen={tab === 0} />
                <ChatList isOpen={tab === 1} />
            </div>

            <div className={styles.footer}>
                <Navigation value={tab} onChange={setTab} />
            </div>
        </div>
    );
};
