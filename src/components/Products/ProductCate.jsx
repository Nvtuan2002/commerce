import React from 'react';
import { Row, Col, Divider } from 'antd';
import { Link } from 'react-router-dom';
import ProductList from '@/components/Products/ProductList';

const ProductCate = (props) => {

    return (
        <>
            <Row justify="space-between">
                <Col span={24}>
                    <Divider orientation="left"><h2 className='fw-bold'>{props.title} </h2></Divider>
                </Col>
            </Row>
            <Row className='justify-content-end' style={{ marginBottom: 15 }}>
                <Col>
                    {props.link === undefined ? '' :
                        <Link to={`${props.link}`} className="btn btn-outline-dark">See More</Link>
                    }
                </Col>
            </Row>
            <ProductList
                query={`${props.query}`}
                direction={`${props.direction}`}
                showPagination={`${props.showPagination}`}
            ></ProductList >
        </>
    );
};

export default ProductCate;