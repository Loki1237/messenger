import React, { useCallback, useState } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useService } from 'app/hooks';
import { Message } from 'app/models/message';
import { Chat } from 'app/models/chat';
import styles from './styles.less';

const { TextArea } = Input;

interface Props {
    chat: Chat;
}

export const InputPanel: React.FC<Props> = ({ chat }) => {
    const [value, setValue] = useState('');

    const [sendMessage] = useService<Message, Message>('POST', `/api/message/send?chatId=${chat?.id}`);
    const [createChat] = useService<Chat, Chat>('POST', '/api/chat/create');

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    }, []);

    const handleSubmit = useCallback(() => {
        const newMessage = new Message(value);

        if (chat?.id) {
            sendMessage(newMessage);
        } else  {
            chat.messages = [newMessage];
            createChat(chat);
        }
    }, [sendMessage, value, chat]);

    return (
        <div className={styles.InputPanel}>
            <TextArea autoSize={{ maxRows: 8 }} size="large" value={value} onChange={handleChange} />
            <Button size="large" shape="circle" icon={<SendOutlined />} onClick={handleSubmit} />
        </div>
    );
};
