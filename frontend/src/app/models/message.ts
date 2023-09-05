import { User } from './user';

export type MessageStatus = 'DELIVERED' | 'READ' | 'ERROR'

export class Message {
    public id: number = null;
    public creator: User = null;
    public body: string = null;
    public timestamp: Date = null;
    public status: MessageStatus = null;

    constructor(body: string) {
        this.body = body;
    }
}
