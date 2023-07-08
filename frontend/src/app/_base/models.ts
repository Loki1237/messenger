export interface User {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
}

export interface SearchResult<T> {
    list: T[];
    total: number;
}

export type LoadStatus = 'IDLE' | 'IN_PROGRESS' | 'SUCCESS' | 'FAILURE';

