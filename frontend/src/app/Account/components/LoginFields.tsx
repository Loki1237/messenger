import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, ColProps } from 'antd';
import { useAppSelector, shallowEqual } from 'app/_base/hooks';
import { isLoadingSelector } from '../selectors/accountSelectors';
import { AccountFormField } from '../models/accountModels';
import styles from './styles.less';

const fields: AccountFormField[] = [
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

interface Props {
    onClearForm: () => void;
    wrapperCol?: ColProps;
}

export const LoginFields: React.FC<Props> = ({ onClearForm, wrapperCol }) => {
    const isLoading = useAppSelector(isLoadingSelector, shallowEqual);

    return (
        <div className={styles.FormFields}>
            {fields.map((field) => (
                <Form.Item key={field.name} {...field}>
                    {field.name === 'password' ? <Input.Password /> : <Input />}
                </Form.Item>
            ))}

            <Form.Item wrapperCol={wrapperCol}>
                <div className={styles.actions}>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Enter
                    </Button>

                    <div className={styles.backlink}>
                        <Link to="../signup" onClick={onClearForm}>
                            Create a new account
                        </Link>
                    </div>
                </div>
            </Form.Item>
        </div>
    );
}
