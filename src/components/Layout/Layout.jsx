import React from 'react';
import HeaderComponents from './Header';
import FooterComponents from './Footer';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;

const BaseLayout = () => {
    
    return (
        <Layout>
            <Header><HeaderComponents /></Header>
            <Content><Outlet></Outlet></Content>
            <Footer><FooterComponents /></Footer>
        </Layout>
    );
};

export default BaseLayout;