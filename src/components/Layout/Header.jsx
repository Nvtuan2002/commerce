import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, Row, Col, Button, Space } from 'antd';
import Login from "../Login";
import Signup from "../Signup";
import Logout from "../Logout";
import './Layout.css';


const HeaderComponents = () => {
    const state = useSelector((state) => state.cart);
    const token = useSelector((state) => state.auth.token);
    const nav = useNavigate()


    return (
        <>
            <Row className="container pt-4" justify="center" style={{ borderBottom: '1px solid #9a9a9a' }}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <h3 className="fw-bold logo">NVT</h3>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Row>
                        <Menu
                            theme="light"
                            mode="horizontal"
                            defaultSelectedKeys={['Home']}
                            items={['Home', 'Products', 'About', 'Contact'].map((key) => ({
                                key,
                                label: (<h5>{key}</h5>),
                            }))}
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
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Row align='end'>
                        <Space>
                            {token ? <Logout /> : <Row><Login /> <Signup /></Row>}
                            <Button type="primary" danger onClick={() => {
                                nav('/cart')
                            }}>
                                <i className="fa fa-shopping-cart"></i>Cart ({state.length})
                            </Button>
                        </Space>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default HeaderComponents;

