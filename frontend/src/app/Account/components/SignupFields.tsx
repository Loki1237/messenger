import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, ColProps } from 'antd';
import { useAppSelector, shallowEqual } from 'app/_base/hooks';
import { loadStatusSelector } from '../selectors/accountSelectors';
import { AccountFormField } from '../models/accountModels';
import styles from './styles.less';

const fields: AccountFormField[] = [
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

interface Props {
    onClearForm: () => void;
    wrapperCol?: ColProps;
}

export const SignupFields: React.FC<Props> = ({ onClearForm, wrapperCol }) => {
    const loadStatus = useAppSelector(loadStatusSelector, shallowEqual);

    return (
        <div className={styles.FormFields}>
            {fields.map((field) => (
                <Form.Item key={field.name} {...field}>
                    {field.name === 'password' ? <Input.Password /> : <Input />}
                </Form.Item>
            ))}

            <Form.Item wrapperCol={wrapperCol}>
                <div className={styles.actions}>
                    <Button type="primary" htmlType="submit" loading={loadStatus === 'IN_PROGRESS'}>
                        Create account
                    </Button>

                    <div className={styles.backlink}>
                        <Link to="../login" onClick={onClearForm}>
                            Back to login
                        </Link>
                    </div>
                </div>
            </Form.Item>
        </div>
    );
}
