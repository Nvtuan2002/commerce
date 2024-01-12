import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { qtyItem, deleteItem } from '@/redux/Cart';
import { Link } from 'react-router-dom'
import { InputNumber, Empty, Button, Table } from 'antd';

const Cart = () => {
    const state = useSelector((state) => state.cart);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch()

    const handleClose = (item) => {
        console.log(item);
        dispatch(deleteItem(item))
    }

    const editqty = (item) => {
        dispatch(qtyItem(item))
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
                <Button onClick={() => handleClose(record)}>Delete</Button>
            ),
        },
    ];

    const data = state?.map((item) => {
        return {
            id: item.id,
            product: <img src={`https:backoffice.nodemy.vn${item?.attributes?.image?.data[0]?.attributes?.url}`} alt={item.title} height="200px" width="180px" />,
            price: `${formatPrice(item?.attributes?.price) + ' VNĐ'}`,
            quantity: <InputNumber min={1} max={99} value={item.qty} onChange={(values) => {
                editqty({ ...item, qty: values })
            }} />,
            subtotal: `${formatPrice(item.qty * item?.attributes?.price) + ' VNĐ'}`,
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
            <Table
                style={{
                    marginBottom: 16,
                }}
                columns={columns}
                dataSource={data}
                pagination={false}
/>
        </>
        );
    }


    return (
        <>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="text-center display-6 fw-bolder">Shoping Cart</h1>
                        <hr />
                    </div>
                </div>
                {!token && state.length === 0 && emptyCart()}
                {state.length !== 0 && cartItems()}
                {state.length !== 0 && button()}
            </div>
        </>
    )
}

export default Cart