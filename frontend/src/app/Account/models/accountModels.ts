import { Rule } from 'antd/lib/form';

export interface AccountFields {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
}

export interface AccountFormField {
    label: string;
    name: keyof AccountFields;
    rules: Rule[];
}
