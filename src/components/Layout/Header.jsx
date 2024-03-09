import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, Row, Col, Button, Space, Drawer, Radio } from 'antd';
import Login from "../Login";
import Signup from "../Signup";
import Logout from "../Logout";
import './layout.scss';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useWindowSize } from "@uidotdev/usehooks";
import SearchComponent from "../Search/SearchComponent";

const Header = () => {
    const state = useSelector((state) => state.cart.productList);
    const user = useSelector((state) => state.auth);
    const nav = useNavigate()
    const size = useWindowSize();

    const HeaderVertical = () => {
        const [open, setOpen] = useState(false);
        const [placement, setPlacement] = useState('left');

        const items2 = ['Home', 'Cart', 'Products', 'About', 'Contact'].map((key) => ({
            key,
            label: (<h5>{key}</h5>),
        }));

        const items3 = ['Login', 'Register', 'Logout'].map((key) => ({
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
                <Row className="header">
                    <Col xs={12} sm={12} md={12} lg={3} xl={6}>
                        <h3 className="fw-bold logo" style={{ margin: '15px 0px 0px 20px' }} onClick={() => {
                            nav(`/`);
                        }}>NVT</h3>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={3} xl={6} style={{ textAlign: 'end' }}>
                        <Radio.Group value={placement} onChange={onChange}></Radio.Group>
                        <Button
                            type="text"
                            icon={true ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            defaultselectedkeys={['Home']}
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
                        width={size.width <= 376 ? 'calc(100% - 50px)' : null}
                    >
                        <Menu
                            theme="light"
                            mode="inline"
                            defaultselectedkeys={['Home']}
                            items={items2}
                            onClick={(e) => {
                                const selectedKey = e.key;
                                const selectedItem = items2.find((item) => item.key === selectedKey);

                                switch (selectedItem?.key) {
                                    case 'Home':
                                        nav(`/`);
                                        break;
                                    case 'Products':
                                    case 'About':
                                    case 'Contact':
                                        nav(`/${selectedItem.key.toLowerCase()}`);
                                        break;
                                    default:
                                        break;
                                }
                            }}
                        >
                        </Menu>
                        <Row align='end'
                            style={{
                                transform: 'translate(20px, -10px)',
                                bottom: 0,
                                position: 'fixed',
                                paddingTop: 20,
                                borderTop: '1px solid #9a9a9a',
                                justifyContent: 'center',
                                width: 280,
                            }}>
                            <Space
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                }}
                            >
                                {user?.token ? <Row><h3>{user?.user?.username}</h3><Logout /></Row> : <Row><Login /> <Signup /></Row>}
                                <Button className="d-flex" type="primary" danger onClick={() => {
                                    nav('/cart')
                                }}>
                                    <i className="fa fa-shopping-cart"></i>Cart ({state.length})
                                </Button>
                            </Space>
                        </Row>
                    </Drawer>
                </Row>
                <Row style={{ display: 'flex', marginTop: 15 }} justify={'center'}>
                    <Col xs={20} md={16}>
                        <SearchComponent />
                    </Col>
                </Row>
            </>
        );
    }

    const HeaderHorizontal = () => {
        const items1 = ['Home', 'Products', 'About', 'Contact'].map((key) => ({
            key,
            label: (<h5>{key}</h5>),
        }));
        return (<>
            <Row className="container-lg pt-4 header" justify="center" style={{ borderBottom: '1px solid #9a9a9a' }}>
                <Col xs={24} sm={3} md={3} lg={6} xl={8}>
                    <h3 className="fw-bold logo" onClick={() => {
                        nav(`/`);
                    }}>NVT</h3>
                </Col>
                <Col xs={24} sm={8} md={11} lg={10} xl={8}>
                    <Row
                        style={{
                            width: '100%',
                        }}>
                        <Menu
                            style={{
                                flex: 4
                            }}
                            theme="light"
                            mode="horizontal"
                            defaultselectedkeys={['Home']}
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
                <Col xs={24} sm={12} md={10} lg={8} xl={8}>
                    <Row align='end'>
                        <Space align="start">
                            {user?.token ? <Row><h3>{user?.user?.username}</h3><Logout /></Row> : <Row><Login /> <Signup /></Row>}
                            <Button className="d-flex" type="primary" danger onClick={() => {
                                nav('/cart')
                            }}>
                                <i className="fa fa-shopping-cart"></i>Cart ({state.length})
                            </Button>
                        </Space>
                    </Row>
                </Col>
            </Row>
            <Row style={{ display: 'flex', marginTop: 15 }} justify={'center'}>
                <Col xs={12} md={12}>
                    <SearchComponent />
                </Col>
            </Row >
        </>)
    }

    return (
        <>
            {size.width < 768 ? <HeaderVertical /> : <HeaderHorizontal />}
        </>
    );
}

export default Header;