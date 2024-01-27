import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Button, Form, Input, Select, Radio } from 'antd'
import { get64City } from '@/services/64City';
import { useFetch } from '@/customHook/useFetch';
import qrcode from '../assets/images/qrcode.jpg'

const Checkout = () => {
    const productList = useSelector((state) => state.cart.productList)
    const [form] = Form.useForm();

    let query = productList?.reduce((txt, item, index) => {
        return txt + `filters[id][$in][${index}]=${item.id}&`
    }, '')

    let { data } = productList.length && useFetch(`/products`, `${query}`);

    const [selectedLocation, setSelectedLocation] = useState({
        province: { value: 'Chọn Thành Phố', options: [] },
        district: { value: 'Chọn Quận', options: [] },
        ward: { value: 'Chọn Phường', options: [] },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await get64City();
                if (true) {
                    const tinh = data?.map((item) => item?.name);
                    setSelectedLocation((prevLocation) => ({
                        ...prevLocation,
                        province: { value: selectedLocation?.province?.value, options: tinh },
                        district: { value: 'Chọn Quận', options: [] },
                        ward: { value: 'Chọn Phường', options: [] },
                    }));
                }
                if (selectedLocation?.province?.value !== 'Chọn Thành Phố') {
                    const huyen = data
                        ?.find((item) => item?.name === selectedLocation?.province?.value)?.districts
                        ?.map((item) => item?.name);
                    setSelectedLocation((prevLocation) => ({
                        ...prevLocation,
                        district: { value: selectedLocation?.district?.value, options: huyen },
                        ward: { value: 'Chọn Phường', options: [] },
                    }));
                }
                if (selectedLocation?.district?.value !== 'Chọn Quận') {
                    const xa = data
                        ?.find((item) => item?.name === selectedLocation?.province?.value)?.districts
                        ?.find((item) => item?.name === selectedLocation?.district?.value)?.wards
                        ?.map((item) => item?.name);
                    setSelectedLocation((prevLocation) => ({
                        ...prevLocation,
                        ward: { value: selectedLocation?.ward?.value, options: xa },
                    }));
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedLocation.province.value, selectedLocation.district.value, selectedLocation.ward.value]);

    const formatPrice = (price) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);

        const priceWithoutSymbol = formattedPrice.replace('₫', '');

        return priceWithoutSymbol.trim();
    };

    let total = 0;
    const itemList = (item, index) => {
        let ItemQuantity = productList?.find((itemRedux) => itemRedux?.id === item?.id);

        let productTotal = ItemQuantity?.quantity * item?.attributes?.price;
        total += productTotal;

        return (
            <div key={index}>
                <li className="list-group-item d-flex justify-content-between lh-sm" >
                    <div>
                        <div className='d-flex'>
                            <img src={`${import.meta.env.VITE_BASE_API_URL}${item?.attributes?.image?.data[0]?.attributes?.url}`} alt={item.title} height="80px" width="90px" />,
                            <div style={{ margin: 'auto', marginLeft: 10 }}>
                                <h6 className="">{item?.attributes?.name}</h6>
                                <h6 className="fw-600">Quantity: {ItemQuantity?.quantity}</h6>
                            </div>
                        </div>
                    </div>
                    <h6 className='d-flex' style={{ alignItems: 'end' }}>{formatPrice(item?.attributes?.price)} VNĐ</h6>
                </li >
            </div >
        );
    };

    const layout = {
        labelCol: {
            span: 6,
        },
        labelAlign: 'left',
        wrapperCol: {
            span: 15,
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

    return (
        <><Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{
                width: '100%',
            }}
            validateMessages={validateMessages}
            form={form}
            initialValues={{
                address: {
                    province: '',
                    district: '',
                    ward: '',
                },
                selectTransfer: '0'
            }}

        >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col xs={24} md={16}>
                    <Row>
                        <Col
                            xs={{
                                order: 2,
                                span: 23,
                            }}
                            md={{
                                order: 1,
                                span: 18,
                            }}

                        >
                            <h4 className="text-primary">Delivery address</h4>

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
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>
                            <Form.Item name={['user', 'email']} label="Email"
                                rules={[
                                    {
                                        type: 'email',
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={['address', 'province']}
                                label="Provice"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Province is required',
                                    },
                                ]}
                            >
                                <Select
                                    onChange={(selectedProvince) => {
                                        setSelectedLocation({
                                            ...selectedLocation,
                                            province: {
                                                ...selectedLocation?.province,
                                                value: selectedProvince,
                                            },
                                            district: { value: 'Chọn Quận', options: [] },
                                            ward: { value: 'Chọn Phường', options: [] },
                                        });
                                        form.setFieldsValue({
                                            address: {
                                                district: '',
                                                ward: '',
                                            },
                                        });
                                    }}
                                >
                                    {selectedLocation?.province?.options?.map((item, index) => {
                                        return <Select.Option key={index} value={item} label={item}></Select.Option>
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name={['address', 'district']}
                                label="District"
                                rules={[
                                    {
                                        required: true,
                                        message: 'District is required',
                                    },
                                ]}
                            >
                                <Select
                                    onChange={(selectedDistrict) => {
                                        setSelectedLocation({
                                            ...selectedLocation,
                                            district: {
                                                ...selectedLocation?.district,
                                                value: selectedDistrict,
                                            },
                                            ward: { value: 'Chọn Phường', options: [] },
                                        });
                                        form.setFieldsValue({
                                            address: {
                                                ward: '',
                                            },
                                        });
                                    }}
                                >
                                    {selectedLocation?.district?.options?.map((item, index) => {
                                        return <Select.Option key={index} value={item} label={item}></Select.Option>
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name={['address', 'ward']}
                                label="Ward"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Ward is required',
                                    },
                                ]}
                            >
                                <Select
                                    onChange={(selectedWard) => {
                                        setSelectedLocation({
                                            ...selectedLocation,
                                            ward: {
                                                ...selectedLocation?.ward,
                                                value: selectedWard,
                                            },
                                        });
                                    }}
                                >
                                    {selectedLocation?.ward?.options?.map((item, index) => {
                                        return <Select.Option key={index} value={item} label={item}>
                                        </Select.Option>
                                    }
                                    )}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name={['address', 'address']}
                                label="address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Address is required',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item name={['address', 'note']} label="Note">
                                <Input.TextArea />
                            </Form.Item>
                            <Col xs={24} md={0} className='mb-3'>
                                <div>
                                    <h4 className='text-primary'>Select the form of payment</h4>
                                    <Form.Item
                                        name='selectTransfer'
                                    >
                                        <Radio.Group>
                                            <Radio value="0"> Payment on delivery </Radio>
                                            <Radio value="1"> Payment by bank transfer </Radio>
                                            <Radio value="2" disabled> Payment with international visa cards, master </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </div>
                                <div>
                                    <h6 className='my-3'>Please scan the code below to pay the transfer</h6>
                                    <div className='text-center mt-3'>
                                        <img src={qrcode} style={{ objectFit: 'cover', height: '320px', width: '230px', objectPosition: 'center' }} />
                                    </div>
                                </div>
                            </Col>
                            <Form.Item
                                wrapperCol={{
                                    ...layout.wrapperCol,
                                }}
                                style={{ textAlign: 'center' }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Order
                                </Button>
                            </Form.Item>
                        </Col >
                        <Col >
                            <Col>
                                <h4 className="text-primary mt-3">Your productList?</h4>
                            </Col>
                            <Col>
                                <ul className="list-group mb-3">
                                    {data?.map(itemList)}
                                    <li className="list-group-item d-flex justify-content-between">
                                        <h3 className="badge bg-primary">Total Product : {productList?.length}</h3>
                                        <div>
                                            <span>Total (VNĐ): </span>
                                            <strong>{formatPrice(total)}</strong>
                                        </div>
                                    </li>
                                </ul>
                            </Col>
                        </Col>
                    </Row>
                </Col>
                <Col xs={0} md={8}>
                    <div>
                        <h4 className='text-primary'>Select the form of payment</h4>
                        <Form.Item
                            name='selectTransfer'
                        >
                            <Radio.Group>
                                <Radio value="0"> Payment on delivery </Radio>
                                <Radio value="1"> Payment by bank transfer </Radio>
                                <Radio value="2" disabled> Payment with international visa cards, master </Radio>
                            </Radio.Group>
                        </Form.Item>

                    </div>
                    <div>
                        <h6 className='my-3'>Please scan the code below to pay the transfer</h6>
                        <div className='text-center mt-3'>
                            <img src={qrcode} style={{ objectFit: 'cover', height: '320px', width: '230px', objectPosition: 'center' }} />
                        </div>
                    </div>
                </Col>
            </Row >
        </Form>
        </>
    )
}

export default Checkout