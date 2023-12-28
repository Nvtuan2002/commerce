import React, { useEffect, useState } from 'react'
import { login } from '../services/Auth/Login'
import { useDispatch } from 'react-redux'
import { LoginRedux } from '../redux/Auth'
import { Button, Modal, Input, Form, Checkbox } from 'antd';

const Login = () => {
    const dispatch = useDispatch()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values) => {
        const response = await login(values)
        if (response) {
            dispatch(LoginRedux({
                token: response.data.jwt,
                user: response.data.user,
            }));
        }
    }

    return (
        <>
            <Button className='me-2' type="primary" onClick={showModal}>
                LOGIN
            </Button>
            <Modal title="LOGIN" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="basic"
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Username"
                        name="identifier"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" size='large'>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Login