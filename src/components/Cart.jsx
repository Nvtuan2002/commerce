import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { qtyItem, deleteItem } from '../redux/Cart';
import { Link } from 'react-router-dom'
import { debounce, min } from "lodash";

const Cart = () => {
    const state = useSelector((state) => state.cart);
    const dispatch = useDispatch()
    console.log(state);

    const handleClose = (item) => {
        dispatch(deleteItem(item))
    }

    const editqty = debounce((item) => {
        dispatch(qtyItem(item))
        window.location.reload()
    }, 1000);

    const emptyCart = () => {
        return (
            <div className="px-4 my-5 bg-light rounded-3 py-5">
                <div className="container py-4">
                    <div className="row">
                        <h3>Your Cart is Empty</h3>
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
                            <img src={cartItem.image} alt={cartItem.title} height="200px" width="180px" />
                        </div>
                        <div className="col-md-2">
                            <h4>{cartItem.title}</h4>
                        </div>
                        <div className="col-md-2">
                            <p className="lead fw-bold">${cartItem.price}</p>
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
                            <p className="lead fw-bold">$ {cartItem.qty * cartItem.price}</p>
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
                {state.length === 0 && emptyCart()}
                {state.length !== 0 && state.map(cartItems)}
                {state.length !== 0 && button()}
            </div>
        </>
    )
}

export default Cart