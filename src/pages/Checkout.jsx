import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Button, Form, Input, InputNumber, Select } from 'antd'
import { get64City } from '@/services/64City';
const { Option } = Select;


const Checkout = () => {
    const cart = useSelector((state) => state.cart)
    const user = useSelector((state) => state.auth.user)
    const [form] = Form.useForm();

    useEffect(async () => {
        const { data } = await get64City();
    }, []);

    var total = 0;
    const itemList = (item, index) => {
        total = cart.reduce((acc, item) => acc + item.qty * item?.attributes?.price, 0);
        return (
            <li key={index} className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 className="">{item?.attributes?.name}</h6>
                </div>
                <span className="text-muted">{formatPrice(item?.attributes?.price)}</span>
            </li>
        );
    }

    const formatPrice = (price) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);

        const priceWithoutSymbol = formattedPrice.replace('₫', '');

        return priceWithoutSymbol.trim();
    };

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="84">+84</Option>
                <Option value="15">+15</Option>
            </Select>
        </Form.Item>
    );

    const onFinish = (values) => {
        console.log(values);
    };


    return (
        <>
            <Col>
                <h4 className="text-primary">Delivery address</h4>
                <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    style={{
                        maxWidth: 600,
                    }}
                    validateMessages={validateMessages}
                    form={form}
                    initialValues={{
                        prefix: '84',
                    }}
                >
                    <Form.Item
                        name={['user', 'name']}
                        label="Full Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'phone']} label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input
                            addonBefore={prefixSelector}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                    <Form.Item name={['user', 'email']} label="Email">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            ...layout.wrapperCol,
                            offset: 8,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col>
                <Col >
                    <h4 className="text-primary">Your cart</h4>
                    <h4 className="badge bg-primary rounded-pill">{cart.length}</h4>
                </Col>
                <Col>
                    <ul className="list-group mb-3">
                        {cart.map(itemList)}

                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (VNĐ)</span>
                            <strong>{formatPrice(total)}</strong>
                        </li>
                    </ul>
                </Col>
            </Col>
        </>
    )
}

export default Checkout