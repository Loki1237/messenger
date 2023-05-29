import { Rule } from 'antd/lib/form';

export interface UserFields {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
}

interface Field {
    label: string;
    name: keyof UserFields;
    rules: Rule[];
}

export const loginFields: Field[] = [
    {
        label: "Username",
        name: "username",
        rules: [{ required: true, message: 'Please input your username!' }]
    },
    {
        label: "Password",
        name: "password",
        rules: [{ required: true, message: 'Please input your password!' }]
    }
];

export const signupFields: Field[] = [
    {
        label: "Firstname",
        name: "firstname",
        rules: [{ required: true, message: 'Please input your firstname!' }]
    },
    {
        label: "Lastname",
        name: "lastname",
        rules: [{ required: true, message: 'Please input your lastname!' }]
    },
    {
        label: "Username",
        name: "username",
        rules: [{ required: true, message: 'Please input your username!' }]
    },
    {
        label: "Email",
        name: "email",
        rules: [{ required: true, message: 'Please input your email!' }]
    },
    {
        label: "Password",
        name: "password",
        rules: [
            { required: true, message: 'Please input your password!' },
            { min: 8, message: 'The password must contain at least 8 characters!'  }
        ]
    }
];
