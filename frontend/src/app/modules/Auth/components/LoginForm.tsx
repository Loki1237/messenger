import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Form, Input, Typography } from 'antd';
import { useService, useSystem } from 'app/hooks';
import { User } from 'app/models/user';
import { AuthFields, AuthFormField } from '../models/authModels';
import styles from './styles.less';

const fields: AuthFormField[] = [
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
    setUser: (user: User) => void;
}

export const LoginForm: React.FC<Props> = ({ setUser }) => {
    const [fetchLogin, loadStatus, error, clearError] = useService<User, AuthFields>('GET', '/api/user/login');
    const [form] = Form.useForm();

    const { screenType } = useSystem();
    const tailLayout = { ...(screenType === 'WIDE' && { wrapperCol: { offset: 6, span: 18 } }) };

    console.log(screenType)

    const handleSubmit = useCallback((fields: AuthFields) => {
        fetchLogin(fields).then(setUser);
    }, [fetchLogin]);

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
                        Authentication
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
                            Enter
                        </Button>

                        <div className={styles.backlink}>
                            <Link to="../signup">
                                Create a new account
                            </Link>
                        </div>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
}
