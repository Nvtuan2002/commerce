import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';
const { Content } = Layout;
import './Layout.css';

const BaseLayout = () => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{
            backgroundColor: colorBgContainer,
            borderRadius: borderRadiusLG,
        }}>
            <Header className='header'></Header>
            <Content className='container-lg'>
                <Outlet></Outlet>
            </Content>
            <Footer></Footer>
        </Layout>
    );
};

export default BaseLayout;