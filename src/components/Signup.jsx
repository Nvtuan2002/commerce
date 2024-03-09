import React from 'react'
import { useState } from 'react'
import { register } from '@/services/auth'
import { Button, Modal, Input, Form, Checkbox } from 'antd';
import useNotification from '@/customHook/useNotify'

const Signup = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { contextHolder, infoNotify, errorNotify } = useNotification()
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
        try {
            await register(values)
            infoNotify('topRight', 'Thanh Cong', 'Ban da tao thanh cong')
            setIsModalOpen(false)
        } catch ({ response }) {
            var { error } = response.data
            errorNotify('topRight', 'Loi dang ky', error.message)
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        errorNotify('topRight', 'Loi dang ky', 'Khong thanh cong')
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                REGISTER
            </Button>
            {contextHolder}
            <Modal title="REGISTER" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    labelAlign='left'
                    name="REGISTER"
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
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
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                required: true,
                                message: 'Please input your Email!',
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

export default Signup