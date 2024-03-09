// import React from 'react'
// import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { Row, Col, Button, Form, Input, Select, Radio } from 'antd'
// import { get64City } from '@/services/64City';
// import { useFetch } from '@/customHook/useFetch';
// import qrcode from '@/assets/images/qrcode.jpg'
// import { convertTocurrency } from '@/common/currencyHelper'

// const Checkout = () => {
//     const productList = useSelector((state) => state.cart.productList)
//     const [form] = Form.useForm();

//     let query = productList?.reduce((txt, item, index) => {
//         return txt + `filters[id][$in][${index}]=${item.id}&`
//     }, '')

//     let { data } = productList.length && useFetch(`/products`, `${query}`);

//     const [selectedLocation, setSelectedLocation] = useState({
//         province: { value: 'Chọn Thành Phố', options: [] },
//         district: { value: 'Chọn Quận', options: [] },
//         ward: { value: 'Chọn Phường', options: [] },
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const { data } = await get64City();
//                 if (true) {
//                     const tinh = data?.map((item) => item?.name);
//                     setSelectedLocation((prevLocation) => ({
//                         ...prevLocation,
//                         province: { value: selectedLocation?.province?.value, options: tinh },
//                         district: { value: 'Chọn Quận', options: [] },
//                         ward: { value: 'Chọn Phường', options: [] },
//                     }));
//                 }
//                 if (selectedLocation?.province?.value !== 'Chọn Thành Phố') {
//                     const huyen = data
//                         ?.find((item) => item?.name === selectedLocation?.province?.value)?.districts
//                         ?.map((item) => item?.name);
//                     setSelectedLocation((prevLocation) => ({
//                         ...prevLocation,
//                         district: { value: selectedLocation?.district?.value, options: huyen },
//                         ward: { value: 'Chọn Phường', options: [] },
//                     }));
//                 }
//                 if (selectedLocation?.district?.value !== 'Chọn Quận') {
//                     const xa = data
//                         ?.find((item) => item?.name === selectedLocation?.province?.value)?.districts
//                         ?.find((item) => item?.name === selectedLocation?.district?.value)?.wards
//                         ?.map((item) => item?.name);
//                     setSelectedLocation((prevLocation) => ({
//                         ...prevLocation,
//                         ward: { value: selectedLocation?.ward?.value, options: xa },
//                     }));
//                 }

//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, [selectedLocation.province.value, selectedLocation.district.value, selectedLocation.ward.value]);

//     let total = 0;
//     const itemList = (item, index) => {
//         let ItemQuantity = productList?.find((itemRedux) => itemRedux?.id === item?.id);

//         let productTotal = ItemQuantity?.quantity * item?.attributes?.price;
//         total += productTotal;

//         return (
//             <div key={index}>
//                 <li className="list-group-item d-flex justify-content-between lh-sm" >
//                     <div>
//                         <div className='d-flex'>
//                             <img src={`${import.meta.env.VITE_BASE_API_URL}${item?.attributes?.image?.data[0]?.attributes?.url}`} alt={item.title} height="80px" width="90px" />,
//                             <div style={{ margin: 'auto', marginLeft: 10 }}>
//                                 <h6 className="">{item?.attributes?.name}</h6>
//                                 <h6 className="fw-600">Quantity: {ItemQuantity?.quantity}</h6>
//                             </div>
//                         </div>
//                     </div>
//                     <h6 className='d-flex' style={{ alignItems: 'end' }}>{convertTocurrency(item?.attributes?.price)}</h6>
//                 </li >
//             </div >
//         );
//     };

//     const layout = {
//         labelCol: {
//             span: 6,
//         },
//         labelAlign: 'left',
//         wrapperCol: {
//             span: 15,
//         },
//     };

//     const validateMessages = {
//         required: '${label} is required!',
//         types: {
//             email: '${label} is not a valid email!',
//             number: '${label} is not a valid number!',
//         },
//         number: {
//             range: '${label} must be between ${min} and ${max}',
//         },
//     };

//     const onFinish = (values) => {
//         console.log(values);
//     };

//     return (
//         <><Form
//             {...layout}
//             name="nest-messages"
//             onFinish={onFinish}
//             style={{
//                 width: '100%',
//             }}
//             validateMessages={validateMessages}
//             form={form}
//             initialValues={{
//                 address: {
//                     province: '',
//                     district: '',
//                     ward: '',
//                 },
//                 selectTransfer: '0'
//             }}

//         >
//             <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
//                 <Col xs={24} md={16}>
//                     <Row>
//                         <Col
//                             xs={{
//                                 order: 2,
//                                 span: 23,
//                             }}
//                             md={{
//                                 order: 1,
//                                 span: 18,
//                             }}

//                         >
//                             <h4 className="text-primary">Delivery address</h4>

//                             <Form.Item
//                                 name={['user', 'name']}
//                                 label="Full Name"
//                                 rules={[
//                                     {
//                                         required: true,
//                                     },
//                                 ]}
//                             >
//                                 <Input />
//                             </Form.Item>
//                             <Form.Item name={['user', 'phone']} label="Phone Number"
//                                 rules={[
//                                     {
//                                         required: true,
//                                         message: 'Please input your phone number!',
//                                     },
//                                 ]}
//                             >
//                                 <Input
//                                     style={{
//                                         width: '100%',
//                                     }}
//                                 />
//                             </Form.Item>
//                             <Form.Item name={['user', 'email']} label="Email"
//                                 rules={[
//                                     {
//                                         type: 'email',
//                                         required: true,
//                                     },
//                                 ]}
//                             >
//                                 <Input />
//                             </Form.Item>
//                             <Form.Item
//                                 name={['address', 'province']}
//                                 label="Provice"
//                                 rules={[
//                                     {
//                                         required: true,
//                                         message: 'Province is required',
//                                     },
//                                 ]}
//                             >
//                                 <Select
//                                     onChange={(selectedProvince) => {
//                                         setSelectedLocation({
//                                             ...selectedLocation,
//                                             province: {
//                                                 ...selectedLocation?.province,
//                                                 value: selectedProvince,
//                                             },
//                                             district: { value: 'Chọn Quận', options: [] },
//                                             ward: { value: 'Chọn Phường', options: [] },
//                                         });
//                                         form.setFieldsValue({
//                                             address: {
//                                                 district: '',
//                                                 ward: '',
//                                             },
//                                         });
//                                     }}
//                                 >
//                                     {selectedLocation?.province?.options?.map((item, index) => {
//                                         return <Select.Option key={index} value={item} label={item}></Select.Option>
//                                     })}
//                                 </Select>
//                             </Form.Item>
//                             <Form.Item
//                                 name={['address', 'district']}
//                                 label="District"
//                                 rules={[
//                                     {
//                                         required: true,
//                                         message: 'District is required',
//                                     },
//                                 ]}
//                             >
//                                 <Select
//                                     onChange={(selectedDistrict) => {
//                                         setSelectedLocation({
//                                             ...selectedLocation,
//                                             district: {
//                                                 ...selectedLocation?.district,
//                                                 value: selectedDistrict,
//                                             },
//                                             ward: { value: 'Chọn Phường', options: [] },
//                                         });
//                                         form.setFieldsValue({
//                                             address: {
//                                                 ward: '',
//                                             },
//                                         });
//                                     }}
//                                 >
//                                     {selectedLocation?.district?.options?.map((item, index) => {
//                                         return <Select.Option key={index} value={item} label={item}></Select.Option>
//                                     })}
//                                 </Select>
//                             </Form.Item>
//                             <Form.Item
//                                 name={['address', 'ward']}
//                                 label="Ward"
//                                 rules={[
//                                     {
//                                         required: true,
//                                         message: 'Ward is required',
//                                     },
//                                 ]}
//                             >
//                                 <Select
//                                     onChange={(selectedWard) => {
//                                         setSelectedLocation({
//                                             ...selectedLocation,
//                                             ward: {
//                                                 ...selectedLocation?.ward,
//                                                 value: selectedWard,
//                                             },
//                                         });
//                                     }}
//                                 >
//                                     {selectedLocation?.ward?.options?.map((item, index) => {
//                                         return <Select.Option key={index} value={item} label={item}>
//                                         </Select.Option>
//                                     }
//                                     )}
//                                 </Select>
//                             </Form.Item>

//                             <Form.Item
//                                 name={['address', 'address']}
//                                 label="address"
//                                 rules={[
//                                     {
//                                         required: true,
//                                         message: 'Address is required',
//                                     },
//                                 ]}
//                             >
//                                 <Input />
//                             </Form.Item>
//                             <Form.Item name={['address', 'note']} label="Note">
//                                 <Input.TextArea />
//                             </Form.Item>
//                             <Col xs={24} md={0} className='mb-3'>
//                                 <div>
//                                     <h4 className='text-primary'>Select the form of payment</h4>
//                                     <Form.Item
//                                         name='selectTransfer'
//                                     >
//                                         <Radio.Group>
//                                             <Radio value="0"> Payment on delivery </Radio>
//                                             <Radio value="1"> Payment by bank transfer </Radio>
//                                             <Radio value="2" disabled> Payment with international visa cards, master </Radio>
//                                         </Radio.Group>
//                                     </Form.Item>
//                                 </div>
//                                 <div>
//                                     <h6 className='my-3'>Please scan the code below to pay the transfer</h6>
//                                     <div className='text-center mt-3'>
//                                         <img src={qrcode} style={{ objectFit: 'cover', height: '320px', width: '230px', objectPosition: 'center' }} />
//                                     </div>
//                                 </div>
//                             </Col>
//                             <Form.Item
//                                 wrapperCol={{
//                                     ...layout.wrapperCol,
//                                 }}
//                                 style={{ textAlign: 'center' }}
//                             >
//                                 <Button type="primary" htmlType="submit">
//                                     Order
//                                 </Button>
//                             </Form.Item>
//                         </Col >
//                         <Col >
//                             <Col>
//                                 <h4 className="text-primary mt-3">Your productList?</h4>
//                             </Col>
//                             <Col>
//                                 <ul className="list-group mb-3">
//                                     {data?.map(itemList)}
//                                     <li className="list-group-item d-flex justify-content-between">
//                                         <h3 className="badge bg-primary">Total Product : {productList?.length}</h3>
//                                         <div>
//                                             <span>Total (VNĐ): </span>
//                                             <strong>{convertTocurrency(total)}</strong>
//                                         </div>
//                                     </li>
//                                 </ul>
//                             </Col>
//                         </Col>
//                     </Row>
//                 </Col>
//                 <Col xs={0} md={8}>
//                     <div>
//                         <h4 className='text-primary'>Select the form of payment</h4>
//                         <Form.Item
//                             name='selectTransfer'
//                         >
//                             <Radio.Group>
//                                 <Radio value="0"> Payment on delivery </Radio>
//                                 <Radio value="1"> Payment by bank transfer </Radio>
//                                 <Radio value="2" disabled> Payment with international visa cards, master </Radio>
//                             </Radio.Group>
//                         </Form.Item>

//                     </div>
//                     <div>
//                         <h6 className='my-3'>Please scan the code below to pay the transfer</h6>
//                         <div className='text-center mt-3'>
//                             <img src={qrcode} style={{ objectFit: 'cover', height: '320px', width: '230px', objectPosition: 'center' }} />
//                         </div>
//                     </div>
//                 </Col>
//             </Row >
//         </Form>
//         </>
//     )
// }

// export default Checkout
import { useSelector, useDispatch } from "react-redux"
import { useFetch } from '@/customHook/useFetch'
import ProductTable from '@/components/products/ProductTable'
import { Button, Row, Col, Form, Input, Breadcrumb } from "antd"
import { useEffect } from "react"
import { saveUserThunk } from "@/redux/auth/thunk"
import { addOrder } from '@/services/order'
import { useNavigate, Link } from "react-router-dom"
import { clearCart } from '@/redux/Cart'
import { requiredRule } from '@/common/rule'

export default function Checkout() {
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const nav = useNavigate()
    const user = useSelector(state => state.auth.user)
    const productList = useSelector(state => state.cart.productList)
    let query = productList.reduce((txtQuery, item, index) => {
        return txtQuery + `filters[id][$in][${index}]=${item?.id}&`
    }, '')
    let { data } = useFetch(`/products`, query)
    if (!productList?.length) {
        data = []
    }
    let dataSource = data?.map(item => {
        let productFinded = productList.find(product => product?.id === item?.id)
        let quantity = 0
        if (productFinded) {
            quantity = productFinded.quantity
        }

        let price = Number(item?.attributes?.price)

        return {
            ...item,
            product: item?.id,
            key: item?.id,
            quantity: quantity,
            price: price,
            totalPrice: price * quantity
        }
    })

    useEffect(() => {
        form.setFieldsValue({
            address: user?.address,
            phone: user?.phone,
            customerName: user?.name
        })
    }, [user?.address, user?.phone, user?.name])
    const onOrder = async (values) => {
        try {
            let contact = {
                idUser: user?.id,
                address: values?.address,
                customerName: values?.customerName,
                phone: values?.phone
            }
            let totalOrderPrice = dataSource?.reduce((total, item) => {
                return total + Number(item?.attributes?.price) * item?.quantity
            }, 0)

            let newOrder = await addOrder(contact, totalOrderPrice, dataSource)
            dispatch(clearCart())
            nav(`/order/${newOrder?.data?.id}`)
        } catch (error) {
            alert('Khong the tao Order')
        }
    }
    const saveInfo = async () => {
        form.validateFields()
            .then(() => {
                let newInfo = form.getFieldsValue()
                newInfo.name = newInfo.customerName ? newInfo.customerName : newInfo.name
                dispatch(saveUserThunk(newInfo))
            }).catch(err => {
            })
    }

    let breadcrumbItems = [{
        title: <Link to='/'>Home</Link>
    }, {
        title: <Link to='#'>CheckOut</Link>
    }]

    return (
        <>
            <Row>
                <Breadcrumb
                    items={breadcrumbItems}
                />
                <Col span={24}><h2>Địa chỉ</h2></Col>
                <Col span={24}>
                    <h3>Tài khoản: {user?.username}</h3>
                </Col>
                <Col span={24}>
                    <Form form={form} onFinish={onOrder}>
                        <Form.Item name="customerName" label="Tên người nhận" rules={[requiredRule]}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item name="phone" label="Điện thoại" rules={[requiredRule]}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item name="address" label="Địa chỉ" rules={[requiredRule]}>
                            <Input></Input>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={24}>
                    <h3>Lưu thông tin mua hàng cho lần sau</h3>
                    <Button onClick={saveInfo}>Lưu</Button>
                </Col>
            </Row>
            <ProductTable dataSource={dataSource} options={{
                edit: false,
                buttonCTA: <Button
                    disabled={!dataSource?.length}
                    onClick={() => {
                        form.submit()
                    }}>Đặt hàng
                </Button>
            }}></ProductTable>
        </>
    )
}