import React, { useCallback } from 'react';
import { Route, Routes, Navigate, useParams } from 'react-router-dom';
import { Alert, Form, Typography } from 'antd';
import { useAppSelector, useAppDispatch, shallowEqual } from 'app/_base/hooks';
import { getScreenType } from 'app/_base/utils/screenUtils';
import { AccountFields } from './models/accountModels';
import { LoginFields } from './components/LoginFields';
import { SignupFields } from './components/SignupFields';
import { accountActions } from './actions/accountActions';
import { errorSelector, userSelector } from './selectors/accountSelectors';
import { fetchLogin, fetchSignup } from './requests/accountRequests';
import styles from './styles.less';

export const Account: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const formType = useParams()['*'];
    const isLoginForm = formType === 'login';
    const isSignupForm = formType === 'signup';

    const isNarrowScreen = getScreenType() === 'NARROW';
    const tailLayout = { ...(!isNarrowScreen && { wrapperCol: { offset: 6, span: 18 } }) };

    const error = useAppSelector(errorSelector, shallowEqual);
    const user = useAppSelector(userSelector, shallowEqual);

    const handleSubmit = useCallback((fields: AccountFields) => {
        if (isLoginForm) {
            dispatch(fetchLogin(fields));
        } else if (isSignupForm) {
            dispatch(fetchSignup(fields));
        }
    }, [dispatch, isLoginForm, isSignupForm]);

    const clearForm = useCallback(() => {
        dispatch(accountActions.clearForm());
        form.resetFields();
    }, [dispatch]);

    const resetError = useCallback(() => {
        dispatch(accountActions.resetError());
    }, [dispatch]);

    return (
        <div className={styles.Account}>
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                size={isNarrowScreen ? 'large' : 'middle'}
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={handleSubmit}
            >
                <Form.Item {...tailLayout}>
                    <Typography.Title level={3}>
                        {isLoginForm && 'Authentication'}
                        {isSignupForm && 'Creating an account'}
                    </Typography.Title>
                </Form.Item>

                {error && (
                    <Form.Item {...tailLayout}>
                        <Alert message={error} type="error" showIcon closable onClose={resetError} />
                    </Form.Item>
                )}

                {user && <Navigate to="/" replace={true} />}

                <Routes>
                    <Route path="/login" element={<LoginFields {...tailLayout} onClearForm={clearForm} />} />
                    <Route path="/signup" element={<SignupFields {...tailLayout} onClearForm={clearForm} />} />
                    <Route path="*" element={<Navigate to="/account/login" replace={true} />} />
                </Routes>
            </Form>
        </div>
    );
};
