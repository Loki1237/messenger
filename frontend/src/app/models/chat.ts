import { Message } from './message';
import { User } from './user';

export type ChatType = 'CHANNEL' | 'DIALOG' | 'GROUP' | 'SELF'

export class Chat {
    public id: number = null;
    public type: ChatType = null;
    public name: string = null;
    public timestamp: Date = null;
    public creator: User = null;
    public members: User[] = [];
    public messages: Message[] = [];

    constructor(type: ChatType) {
        this.type = type;
    }
}
