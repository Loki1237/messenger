import React, { useState } from 'react';
import { ChatList } from './components/ChatList';
import { Contacts } from './components/Contacts';
import { Navigation } from './components/Navigation';
import { Search } from './components/Search';
import styles from './styles.less';

export const LeftColumn: React.FC = () => {
    const [tabIndex, setTabIndex] = useState(1);

    return (
        <div className={styles.LeftColumn}>
            <Search />

            <div className={styles.content}>
                <Contacts isOpen={tabIndex === 0} />
                <ChatList isOpen={tabIndex === 1} />
            </div>

            <div className={styles.footer}>
                <Navigation value={tabIndex} onChange={setTabIndex} />
            </div>
        </div>
    );
};
