import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { qtyItem, deleteItem } from '../redux/Cart';
import { Link } from 'react-router-dom'
import { debounce } from "lodash";

const Cart = () => {
    const state = useSelector((state) => state.cart);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch()

    const handleClose = (item) => {
        dispatch(deleteItem(item))
    }

    const editqty = debounce((item) => {
        dispatch(qtyItem(item))
    }, 1000);

    const formatPrice = (price) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);

        const priceWithoutSymbol = formattedPrice.replace('₫', '');

        return priceWithoutSymbol.trim();
    };

    const emptyCart = () => {
        return (
            <div className="px-4 my-5 bg-light rounded-3 py-5">
                <div className="container py-4">
                    <div className="row">
                        <h3 className='text-center'>Product Empty</h3>
                    </div>
                </div>
            </div>
        );
    }

    const button = () => {
        return (
            <div className="container">
                <div className="row">
                    <Link to="/checkout" className="btn btn-outline-primary mb-5 w-25 mx-auto">Proceed To checkout</Link>
                </div>
            </div>
        );
    }

    const cartItems = (cartItem) => {
        return (
            <div className="px-4 my-5 bg-light rounded-3" key={cartItem.id}>
                <div className="container py-4">
                    <button onClick={() => handleClose(cartItem)} className="btn-close float-end" aria-label="Close"></button>
                    <div className="row">
                        <div className="col-md-2">
                            <img src={`https:backoffice.nodemy.vn${cartItem?.attributes?.image?.data[0]?.attributes?.url}`} alt={cartItem.title} height="200px" width="180px" />
                        </div>
                        <div className="col-md-2">
                            <h4>{cartItem?.attributes?.name}</h4>
                        </div>
                        <div className="col-md-2">
                            <p className="lead fw-bold">{formatPrice(cartItem?.attributes?.price) + ' VNĐ'}</p>
                        </div>
                        <div className="col-md-2">
                            <input type="number" className='lead fw-bold' style={{ width: 60 }} placeholder={cartItem.qty}
                                onChange={(e) => {

                                    if (e.target.valueAsNumber > 100) {
                                        e.target.valueAsNumber = 99
                                        return alert('You can not add more than 100 items')
                                    }
                                    else if (e.target.valueAsNumber < 1) {
                                        e.target.valueAsNumber = 1
                                        return alert('You can not add less than 1 items')
                                    }
                                    editqty({ ...cartItem, qty: e.target.valueAsNumber })
                                }} />
                        </div>
                        <div className="col-md-2">
                            <p className="lead fw-bold">{formatPrice(cartItem.qty * cartItem?.attributes?.price ) + ' VNĐ'}</p>
                        </div>
                    </div>
                </div>
            </div>
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
                <div className='px-4'>
                    <div className="container">
                        <div className='row py-2'>
                            <div className='col-md-2'></div>
                            <div className='col-md-2'><h4>Product</h4></div>
                            <div className='col-md-2'><h4>Price</h4></div>
                            <div className='col-md-2'><h4>Quantity</h4></div>
                            <div className='col-md-2'><h4>Subtotal</h4></div>
                        </div>
                    </div>
                </div>
                <hr />
                {!token && state.length === 0 && emptyCart()}
                {state.length !== 0 && state.map(cartItems)}
                {state.length !== 0 && button()}
            </div>
        </>
    )
}

export default Cart