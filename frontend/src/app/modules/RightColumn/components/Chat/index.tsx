import React, { useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Header } from '../Header';
import { MessageList } from '../MessageList';
import { InputPanel } from '../InputPanel';
import { getChatTitle } from 'app/utils';
import styles from './styles.less';

export const Chat: React.FC = () => {
    //const dispatch = useAppDispatch();
//
    //const account = useAppSelector(accountSelector, shallowEqual);
    //const chatInfo = useAppSelector(currentChatInfoSelector, shallowEqual);
    //const chatTitle = getChatTitle(chatInfo.data, account.data);
//
    //const handleCloseChat = useCallback(() => {
    //    dispatch(currentChatInfoActions.fetch.clear());
    //    dispatch(currentChatMessagesActions.fetch.clear());
    //}, [dispatch]);

    const location = useLocation();

    console.log(location)

    return (
        //<>
        //    <Header title={chatTitle} onClose={handleCloseChat} />
//
        //    <MessageList data={[]} user={account.data} />
//
        //    <InputPanel chat={chatInfo.data} />
        //</>
    <h1>CHAT</h1>
    );
};
