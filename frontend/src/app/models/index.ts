import { User } from './user';

export type LoadStatus = 'IDLE' | 'IN_PROGRESS' | 'SUCCESS' | 'FAILURE';

export interface SearchResult<T> {
    list: T[];
    total: number;
}

export interface ContactView {
    user: User;
    chatId: number;
}
