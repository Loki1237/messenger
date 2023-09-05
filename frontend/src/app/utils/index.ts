import { Chat } from 'app/models/chat';
import { User } from 'app/models/user';

export const getScreenType = () => document.body.clientWidth <= 600 ? 'NARROW' : 'WIDE';

export const getChatTitle = (chat: Chat, user: User) => {
    if (!chat || !user) return null;

    if (chat.type === 'DIALOG') {
        const { firstname, lastname } = user;
        const names = chat.name.split('::');

        return names[0] === `${firstname} ${lastname}` ? names[1] : names[0];
    }

    return chat.name;
};

