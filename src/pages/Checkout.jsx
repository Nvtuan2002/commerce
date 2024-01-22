import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Button, Form, Input, Select } from 'antd'
import { get64City } from '@/services/64City';
const { Option } = Select;


const Checkout = () => {
    const cart = useSelector((state) => state.cart)
    const [form] = Form.useForm();
    const [address, setAddress] = useState({
        province: [],
        district: [],
        village: [],
    })

    const [optionValue, setOptionValue] = useState({
        province: 'Chọn Thành Phố',
        district: 'Chọn Quận',
        village: 'Chọn Phường'
    });


    useEffect(() => {
        const fetchData = async () => {
            const { data } = await get64City();

            if (optionValue.province === 'Chọn Thành Phố') {
                const tinh = data?.map((item) => item?.name);
                setAddress(prevAddress => ({ ...prevAddress, province: tinh, district: [], village: [] }));
            }

            if (optionValue.province != 'Chọn Thành Phố' && optionValue.district == 'Chọn Quận') {
                const huyen = data?.find((item) => item?.name === optionValue.province)?.districts;
                setAddress(prevAddress => ({ ...prevAddress, district: huyen, village: [] }));
            }

            if (optionValue.district != 'Chọn Quận' && optionValue.village == 'Chọn Phường') {
                const xa = data?.find((item) => item?.name === optionValue.province)?.districts?.find((item) => item?.name === optionValue.district)?.wards;
                setAddress(prevAddress => ({ ...prevAddress, village: xa }));
            }
        };
        fetchData();
    }, [optionValue.province, optionValue.district, optionValue.village]);

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
        labelAlign: 'left',
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

    const onFinish = (values) => {
        console.log(values);
    };

    console.log(optionValue);
    console.log(address);

    return (
        <>
            <Col>
                <h4 className="text-primary">Delivery address</h4>
                <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    style={{
                        maxWidth: 400,
                    }}
                    validateMessages={validateMessages}
                    form={form}

                >
                    <Form.Item
                        name={['user', 'name']}
                        label="Full Name"
                    // rules={[
                    //     {
                    //         required: true,
                    //     },
                    // ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'phone']} label="Phone Number"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: 'Please input your phone number!',
                    //     },
                    // ]}
                    >
                        <Input
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                    <Form.Item name={['user', 'email']} label="Email">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        key="province"
                        name={['address', 'province']}
                        label="City"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: 'Province is required',
                    //     },
                    // ]}
                    >
                        <Select
                            value={optionValue.province}
                            onChange={(selectedProvince) => {
                                setOptionValue({
                                    province: selectedProvince,
                                    district: 'Chọn Quận',
                                    village: 'Chọn Phường'
                                });
                                form.setFieldValue({
                                    ['address.district']: 'Chọn Quận',
                                    ['address.village']: 'Chọn Phường'
                                });
                            }}
                        >
                            {address?.province?.map((item, index) => {
                                return <Option key={index} value={item}>{item}</Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        key="district"
                        name={['address', 'district']}
                        label="District"
                    >
                        <Select
                            value={optionValue.district}
                            onChange={(selectedDistrict) => {
                                setOptionValue({
                                    ...optionValue,
                                    district: selectedDistrict,
                                    village: 'Chọn Phường'
                                });
                                form.setFieldsValue({
                                    ['address.village']: 'Chọn Phường'
                                });
                            }}
                        >
                            {address?.district?.map((item, index) => {
                                return <Option key={index} value={item?.name}>{item?.name}</Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={['address', 'village']}
                        label="Village"
                    >
                        <Select
                            value={optionValue.village}
                            onChange={(selectedVillage) => {
                                setOptionValue({
                                    ...optionValue,
                                    village: selectedVillage
                                });
                            }}
                        >
                            {address?.village?.map((item, index) => {
                                return <Option key={index} value={item?.name}>
                                    {item?.name}
                                </Option>
                            }
                            )}
                        </Select>
                    </Form.Item>

                    <Form.Item name={['address', 'address']} label="address">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            ...layout.wrapperCol,
                        }}
                        style={{ textAlign: 'center' }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>

                </Form>
            </Col >
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