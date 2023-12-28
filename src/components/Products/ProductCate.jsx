import React from 'react';
import { Row, Col, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { useFetch } from '@/customHook/useFetch';
import ProductList from './ProductList';

const ProductCate = (props) => {
    
    const { data } = useFetch('/products', props.title)
    
    return (
        <>
            <Row justify="space-between">
                <Col span={24}>
                    <Divider orientation="left"><h2 className='fw-bold'>{data[0]?.attributes?.idCategories?.data[0]?.attributes?.name} </h2></Divider>
                </Col>
            </Row>
            <Row className='justify-content-end' style={{ marginBottom: 15 }}>
                <Col>
                    <Link to={`/category/${data[0]?.attributes?.idCategories?.data[0]?.attributes?.slug}`} className="btn btn-outline-dark">See More</Link>
                </Col>
            </Row>
            <ProductList query={`filters[idCategories][slug]=${props.title}`}></ProductList>
        </>
    );
};

export default ProductCate;