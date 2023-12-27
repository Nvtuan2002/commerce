import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { useFetch } from '@/customHook/useFetch';
import ProductList from './ProductList';

const ProductCate = (props) => {
    const { data } = useFetch('/products', props.title)
    return (
        <>
            <Row justify="space-between">
                <Col span={12}>
                    <h2 className='fw-bold'>{data[0]?.attributes?.idCategories?.data[0]?.attributes?.name} </h2>
                </Col>
                <Col span={12} className='text-end'>
                    <Link to={`/category/${data[0]?.attributes?.idCategories?.data[0]?.attributes?.slug}`} className="btn btn-outline-dark">See More</Link>
                </Col>
            </Row>
            <ProductList query={`filters[idCategories][slug]=${props.title}`}></ProductList >
        </>
    );
};

export default ProductCate;