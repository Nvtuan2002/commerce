import React from 'react';
import { Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import { useFetch } from '@/customHook/useFetch';


const ProductList = (props) => {
    const { data } = useFetch('/products', props.query)
    const { Meta } = Card;
    //Format Price
    const formatPrice = (price) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);

        const priceWithoutSymbol = formattedPrice.replace('₫', '');

        return priceWithoutSymbol.trim();
    };

    return (
        <>
            <Row gutter={[16, 40]} className='mt-3 my-5'>
                {data?.map((product, index) => {
                    return (
                        <Col span={4.8} key={index}>
                            <Card
                                hoverable
                                style={{
                                    width: 240,
                                }}
                                cover={<img src={`https://backoffice.nodemy.vn${product?.attributes?.image?.data[0]?.attributes?.url}`} className="card-img-top" height="250px" />}
                            >
                                <Meta className='my-3' title={product?.attributes?.name} description={product?.attributes?.description.substring(0, 40)} />
                                <h5>
                                    <del className="card-text lead fw-bold" style={{ color: '#666', fontWeight: '15px' }}>{formatPrice(product?.attributes?.oldPrice) + ' VND'}</del> <br />
                                </h5>
                                <h5 className='my-3'>
                                    <p className="card-text lead fw-bold">{formatPrice(product?.attributes?.price) + ' VND'}</p>
                                </h5>
                                <Link to={`/product/${product?.attributes?.slug}`} className="btn btn-outline-dark">Buy Now</Link>
                            </Card>
                        </Col>
                    )
                })}
            </Row >
        </>
    );
};

export default ProductList;