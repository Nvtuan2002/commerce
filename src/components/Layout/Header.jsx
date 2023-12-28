import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, Row, Col, Button } from 'antd';
import Login from "../Login";
import Signup from "../Signup";
import Logout from "../Logout";

const Header = () => {
    const state = useSelector((state) => state.cart);
    const token = useSelector((state) => state.auth.token);
    const nav = useNavigate()

    const items1 = ['Home', 'Products', 'About', 'Contact'].map((key) => ({
        key,
        label: (<h4>{key}</h4>),
    }));

    return (
        <>
            <Row className="container mt-4" justify="center" style={{ borderBottom: '1px solid #9a9a9a' }}>
                <Col span={6}>
                    <h3 className="fw-bold">NVT</h3>
                </Col>
                <Col span={12}>
                    <Row>
                        <Menu
                            theme="light"
                            mode="horizontal"
                            items={items1}
                            style={{
                                flex: 3,
                                borderBottom: 'none',
                            }}
                            onClick={(e) => {
                                const selectedKey = e.key;
                                const selectedItem = items1.find((item) => item.key === selectedKey);
                                if (selectedItem.key === 'Home') {
                                    nav(`/`);
                                } else if (selectedItem) {
                                    nav(`/${selectedItem.key.toLowerCase()}`);
                                }
                            }}
                        />
                    </Row>
                </Col>
                <Col span={6}>
                    <Row >
                        {token ? <Logout /> : <Row><Login /> <Signup /></Row>}
                        <Button className="ms-2" type="primary" danger onClick={() => {
                            nav('/cart')
                        }}>
                            <i className="fa fa-shopping-cart me-1"></i>Cart ({state.length})
                        </Button>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Header;