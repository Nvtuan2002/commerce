import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, deleteItem, editItem } from '@/redux/Cart';
import { Link } from 'react-router-dom'
import { InputNumber, Empty, Button, Table, Row, Col } from 'antd';
import { useFetch } from '@/customHook/useFetch';

const Cart = () => {
    const productList = useSelector((state) => state.cart.productList);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch()

    let query = productList?.reduce((txt, item, index) => {
        return txt + `filters[id][$in][${index}]=${item.id}&`
    }, '')

    let { data } = productList.length && useFetch(`/products`, `${query}`);
    console.log(data);

    const delToCart = (idDel) => {
        // dispatch(deleteItem(idDel))
    }

    const editToCart = ({ ID, values }) => {
        // dispatch(editItem({ ID, values }))
    };

    const formatPrice = (price) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);

        const priceWithoutSymbol = formattedPrice.replace('₫', '');

        return priceWithoutSymbol.trim();
    };

    const columns = [
        {
            title: 'Product',
            dataIndex: 'product',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Subtotal',
            dataIndex: 'subtotal',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <Button onClick={() => delToCart(record.id)}>Delete</Button>
            ),
        },
    ];

    const dataTH = data?.map((item) => {
        return {
            key: item.id,
            id: item.id,
            product: <div style={{display: 'inline-flex', alignItems: 'center'}}>
                <img src={`${import.meta.env.VITE_BASE_API_URL}${item?.attributes?.image?.data[0]?.attributes?.url}`} alt={item.title} height="120px" width="150px" style={{borderRadius: '5px'}} />
                <p className="fw-bold" style={{marginLeft: 10, width: '50%'}}>{item?.attributes?.name}</p>
            </div>,
            price: `${formatPrice(item?.attributes?.price) + ' VNĐ'}`,
            quantity: <InputNumber
                min={1} max={99}
                defaultValue={productList.find((p) => p.id === item.id)?.quantity || 1}
                onChange={(values) => {
                    // editToCart(values)
                    let ID = item?.id
                    console.log({ ID, values });
                }}
            />,
            subtotal: `${formatPrice((productList.find((p) => p.id === item.id)?.quantity || 1) * item?.attributes?.price) + ' VNĐ'}`,
            action: <Button onClick={() => delToCart(item?.id)}>Delete</Button>
        }
    });

    const emptyCart = () => {
        return (
            <div className="px-4 my-5 bg-light rounded-3 py-5">
                <div className="container py-4">
                    <div className="row">
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
                    </div>
                </div>
            </div>
        );
    }

    const button = () => {
        return (
            <div className="container">
                <div className="row">
                    <Link to="/checkout" className="btn btn-outline-primary mb-5 w-25 mx-auto">Proceed To Order</Link>
                </div>
            </div>
        );
    }

    const cartItems = () => {
        return (<>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col sm={24} md={24}>
                    <Table
                        style={{
                            marginBottom: 16,
                        }}
                        scroll={{ x: 10 }}
                        columns={columns}
                        dataSource={dataTH}
                        pagination={false}
                    />
                </Col>
            </Row>
        </>
        );
    }


    return (
        <>
            <Row style={{ textAlign: 'center' }}>
                <Col sm={24} md={24} className="display-6 fw-bold my-3">Shoping Cart</Col>
                <Col sm={24} md={24}>
                    {!token && productList?.length === 0 && emptyCart()}
                    {productList?.length !== 0 && cartItems()}
                    {productList?.length !== 0 && button()}
                </Col>
            </Row >
        </>
    )
}

export default Cart