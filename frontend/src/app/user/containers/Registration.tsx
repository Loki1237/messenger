import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Form, Input, Typography } from 'antd';
import { useAppSelector, useAppDispatch } from 'app/_base/hooks';
import { getScreenType } from 'app/_base/utils/screenUtils';
import { UserFields, signupFields } from '../fields/userFields';
import { userActions } from '../actions/userActions';
import { userSelector } from '../selectors/userSelectors';
import { fetchUserRequest } from '../requests/userRequests';
import styles from './styles.less';

export const Registration: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const isNarrowScreen = getScreenType() === 'NARROW';

    const { isLoading, error } = useAppSelector(userSelector);

    const tailLayout = { ...(!isNarrowScreen && { wrapperCol: { offset: 8, span: 16 } }) };

    const handleSubmit = useCallback((fields: UserFields) => {
        dispatch(fetchUserRequest('signup', fields));
    }, [dispatch]);

    const clearForm = useCallback(() => {
        dispatch(userActions.clearForm());
    }, [dispatch]);

    const resetError = useCallback(() => {
        dispatch(userActions.resetError());
    }, [dispatch]);

    return (
        <div className={styles.Authentication}>
            <Form
                form={form}
                name="registration"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                size={isNarrowScreen ? 'large' : 'middle'}
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
                        <Alert message={error} type="error" showIcon closable onClose={resetError} />
                    </Form.Item>
                )}

                {signupFields.map((field) => (
                    <Form.Item key={field.name} {...field}>
                        {field.name === 'password' ? <Input.Password /> : <Input />}
                    </Form.Item>
                ))}

                <Form.Item {...tailLayout}>
                    <div className={styles.actions}>
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            Create account
                        </Button>

                        <div className={styles.backlink}>
                            <Link to="/login" onClick={clearForm}>
                                Back to login
                            </Link>
                        </div>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};
