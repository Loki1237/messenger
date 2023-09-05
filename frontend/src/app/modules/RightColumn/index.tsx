import React, { useCallback } from 'react';
import { Route, Routes, Navigate, useParams } from 'react-router-dom';
import { Empty } from 'antd';
import { Header } from './components/Header';
import { MessageList } from './components/MessageList';
import { InputPanel } from './components/InputPanel';
import { Chat } from './components/Chat';
import { getChatTitle } from 'app/utils';
import styles from './styles.less';

export const RightColumn: React.FC = () => {
    //const account = useAppSelector(accountSelector, shallowEqual);
    //const chatInfo = useAppSelector(currentChatInfoSelector, shallowEqual);
    //const chatTitle = getChatTitle(chatInfo.data, account.data);
//
    //const handleCloseChat = useCallback(() => {
    //    dispatch(currentChatInfoActions.fetch.clear());
    //    dispatch(currentChatMessagesActions.fetch.clear());
    //}, [dispatch]);

    return (
        <div className={styles.RightColumn}>
            <Routes>
                <Route path="/chat/:chatId" element={<Chat />} />
                <Route path="*" element={<Empty />} />
            </Routes>
        </div>
    );
};
