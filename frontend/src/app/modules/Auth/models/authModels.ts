import { Rule } from 'antd/lib/form';

export interface AuthFields {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
}

export interface AuthFormField {
    label: string;
    name: keyof AuthFields;
    rules: Rule[];
}
