import React from 'react';
import { Row, Col, Divider } from 'antd';
import { Link } from 'react-router-dom';
import ProductList from '@/components/Products/ProductList';

const ProductCate = (props) => {
    const { title, link, query, showButton = true } = props

    return (
        <>
            <Row>
                <Col span={24}>
                    {title != undefined ?
                        <Divider orientation="left"><h4 className='fw-bold'>{title}</h4></Divider>
                        : ''}
                </Col>
            </Row>
            <Col
                style={{ marginBottom: 15, textAlign: 'end' }}
            >
                {showButton ?
                    <Link to={`${link}`} className="btn btn-outline-dark">See More</Link>
                    : ''
                }
            </Col>
            <Col span={24}>
                <ProductList
                    query={query}
                    {...props}
                ></ProductList >
            </Col>
        </>
    );
};

export default ProductCate;