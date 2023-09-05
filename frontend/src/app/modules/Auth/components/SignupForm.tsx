import React, {useCallback} from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Form, Input, Typography } from 'antd';
import { useService, useSystem } from 'app/hooks';
import { User } from 'app/models/user';
import {AuthFields, AuthFormField} from '../models/authModels';
import styles from './styles.less';

const fields: AuthFormField[] = [
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
    setUser: (user: User) => void;
}

export const SignupForm: React.FC<Props> = ({ setUser }) => {
    const [fetchSignup, loadStatus, error, clearError] = useService<User, AuthFields>('GET', '/api/user/signup');
    const [form] = Form.useForm();

    const { screenType } = useSystem();
    const tailLayout = { ...(screenType === 'WIDE' && { wrapperCol: { offset: 6, span: 18 } }) };

    const handleSubmit = useCallback((fields: AuthFields) => {
        fetchSignup(fields).then(setUser);
    }, [fetchSignup]);

    return (
        <div className={styles.FormFields}>
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                size={screenType === 'NARROW' ? 'large' : 'middle'}
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={handleSubmit}
            >
                <Form.Item {...tailLayout}>
                    <Typography.Title level={3}>
                        Creating an account
                    </Typography.Title>
                </Form.Item>

                {error && (
                    <Form.Item {...tailLayout}>
                        <Alert message={error} type="error" showIcon closable onClose={clearError} />
                    </Form.Item>
                )}

                {fields.map((field) => (
                    <Form.Item key={field.name} {...field}>
                        {field.name === 'password' ? <Input.Password /> : <Input />}
                    </Form.Item>
                ))}

                <Form.Item {...tailLayout}>
                    <div className={styles.actions}>
                        <Button type="primary" htmlType="submit" loading={loadStatus === 'PENDING'}>
                            Create account
                        </Button>

                        <div className={styles.backlink}>
                            <Link to="../login">
                                Back to login
                            </Link>
                        </div>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
}
