import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useNotification from '@/customHook/useNotify'
import { emailRule, passwordRule } from '@/common/rule';
import { Button, Modal, Input, Form, Checkbox } from 'antd';
import { loginThunk } from '@/redux/Auth/thunk';

const Login = () => {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.auth.loading)
    const { contextHolder, infoNotify, errorNotify } = useNotification()
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
        try {
            const data = await dispatch(loginThunk(values));
            console.log(data); // Kiểm tra giá trị của data
            if (data.error) {
                throw data.error;
            } else {
                setIsModalOpen(false);
                infoNotify('topRight', 'Thanh Cong', 'Ban da tao thanh cong');
            }
        } catch (error) {
            console.error(error); // In ra lỗi nếu có
            errorNotify('topRight', 'Loi dang nhap', error.message);
        }
    };
    

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        errorNotify('topRight', 'Loi dang nhap', 'Khong thanh cong')
    };

    return (
        <>
            <Button className='me-2' type="primary" onClick={showModal}>
                LOGIN
            </Button>
            {contextHolder}
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
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="identifier"
                        rules={emailRule}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={passwordRule}
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
                        <Button disabled={loading} type="primary" htmlType="submit" size='large'>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Login