import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../Login";
import Signup from "../Signup";
import Logout from "../Logout";

const Header = () => {
    const state = useSelector((state) => state.cart);
    const token = useSelector((state) => state.auth.token);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
                <div className="container">
                    <Link className="navbar-brand fw-bold fs-4" to="#">NVT</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                        </ul>
                        <div className="d-flex">
                            {token ? <Logout /> : <div className="d-flex"><Login /> <Signup /></div>}

                            <Link to="/cart" className="btn btn-dark ms-2">
                                <i className="fa fa-shopping-cart me-1"></i>Cart ({state.length})</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;