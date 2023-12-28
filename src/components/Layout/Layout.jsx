import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';
const { Content } = Layout;

const BaseLayout = () => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{
            backgroundColor: colorBgContainer,
            borderRadius: borderRadiusLG,

        }}>
            <Header></Header>
            <Content>
                <Outlet></Outlet>
            </Content>
            <Footer></Footer>
        </Layout>
    );
};

export default BaseLayout;