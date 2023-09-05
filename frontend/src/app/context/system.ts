import { createContext } from 'react';
import { User } from 'app/models/user';

interface System {
    user: User;
    screenType: 'NARROW' | 'WIDE';
}

export const SystemContext = createContext<System>(null);
