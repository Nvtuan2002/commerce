import React from 'react';
import { Row, Col, Divider } from 'antd';
import { Link } from 'react-router-dom';
import ProductList from '@/components/Products/ProductList';

const ProductCate = (props) => {
    const { title, link, query, showButton = true } = props

    return (
        <>
            <Row justify="space-between">
                <Col span={24}>
                    {title != undefined ?
                        <Divider orientation="left"><h3 className='fw-bold'>{title}</h3></Divider>
                        : ''}
                </Col>
            </Row>
            <Row className='justify-content-end' style={{ marginBottom: 15 }}>
                <Col>
                    {showButton ?
                        <Link to={`${link}`} className="btn btn-outline-dark">See More</Link>
                        : ''
                    }
                </Col>
            </Row>
            <ProductList
                query={query}
                {...props}
            ></ProductList >
        </>
    );
};

export default ProductCate;