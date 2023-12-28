import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, Row, Col, Button, Space, Drawer, Radio } from 'antd';
import Login from "../Login";
import Signup from "../Signup";
import Logout from "../Logout";
import './Layout.css';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useWindowSize } from "@uidotdev/usehooks";


const Header = () => {
    const state = useSelector((state) => state.cart);
    const token = useSelector((state) => state.auth.token);
    const nav = useNavigate()
    const size = useWindowSize();


    const HeaderHorizontal = () => {
        const [open, setOpen] = useState(false);
        const [placement, setPlacement] = useState('left');

        const items2 = ['Home', 'Products', 'About', 'Contact'].map((key) => ({
            key,
            label: (<h5>{key}</h5>),
        }));

        const showDrawer = () => {
            setOpen(true);
        };
        const onClose = () => {
            setOpen(false);
        };
        const onChange = (e) => {
            setPlacement(e.target.value);
        };

        return (
            <>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={3} xl={6}>
                        <h3 className="fw-bold logo" style={{ margin: '15px 0px 0px 20px' }}>NVT</h3>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={3} xl={6} style={{ textAlign: 'end' }}>
                        <Radio.Group value={placement} onChange={onChange}></Radio.Group>
                        <Button
                            type="text"
                            icon={true ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            defaultSelectedKeys={['Home']}
                            onClick={() => {
                                showDrawer()
                            }}
                            style={{
                                fontSize: '16px',
                                width: 50,
                                height: 50,
                            }}
                        />
                    </Col>
                    <Drawer
                        title="NVT"
                        placement={placement}
                        closable={false}
                        onClose={onClose}
                        open={open}
                        key={placement}
                    >
                        <Menu
                            theme="light"
                            mode="inline"
                            defaultSelectedKeys={['Home']}
                            onClick={(e) => {
                                const selectedKey = e.key;
                                const selectedItem = items2.find((item) => item.key === selectedKey);
                                if (selectedItem && selectedItem.key === 'Home') {
                                    nav(`/`);
                                } else if (selectedItem) {
                                    nav(`/${selectedItem.key.toLowerCase()}`);
                                }
                            }}
                        >
                            {items2.map((item) => (
                                <Menu.Item key={item.key}>{item.label}</Menu.Item>
                            ))}
                        </Menu>
                    </Drawer>
                </Row>
            </>
        );
    }

    const HeaderVertical = () => {
        const items1 = ['Home', 'Products', 'About', 'Contact'].map((key) => ({
            key,
            label: (<h5>{key}</h5>),
        }));
        return (<>
            <Row className="container pt-4" justify="center" style={{ borderBottom: '1px solid #9a9a9a' }}>
                <Col xs={24} sm={24} md={2} lg={3} xl={6}>
                    <h3 className="fw-bold logo">NVT</h3>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={10}>
                    <Row>
                        <Menu
                            theme="light"
                            mode="horizontal"
                            defaultSelectedKeys={['Home']}
                            items={items1}
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
                <Col xs={24} sm={24} md={10} lg={8} xl={8}>
                    <Row align='end'>
                        <Space align="start">
                            {token ? <Logout /> : <Row><Login /> <Signup /></Row>}
                            <Button className="d-flex" type="primary" danger onClick={() => {
                                nav('/cart')
                            }}>
                                <i className="fa fa-shopping-cart"></i>Cart ({state.length})
                            </Button>
                        </Space>
                    </Row>
                </Col>
            </Row>
        </>)
    }

    return (
        <>
            {size.width < 992 ? <HeaderHorizontal /> : <HeaderVertical />}
        </>
    );
}

export default Header;