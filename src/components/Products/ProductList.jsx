import React from 'react';
import { Row, Col, Card, Button, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { useFetch } from '@/customHook/useFetch';
import { Skeleton } from 'antd';
import { LazyLoadImage } from "react-lazy-load-image-component";

const ProductList = ({ query, direction = 'row', showPagination = true, pageSize = 8 }) => {
    const { data, loading, paging, setPaging } = useFetch('/products', query, pageSize)
    const { Meta } = Card;

    const loadingCard = () => {
        return (
            <Row gutter={[16, 40]} style={{ flexDirection: direction }} className='mt-3 my-5'>
                {[...Array(5)].map((_, index) => {
                    return (
                        <Col md={direction == 'column' ? 24 : 6} sm={24} key={index}>
                            <Card
                                hoverable
                                style={{
                                    width: 240,
                                }}
                                cover={<Skeleton.Image active />}
                            >
                                <Skeleton active />
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        )
    }

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
            {loading ? (
                loadingCard()
            )
                : <>
                    <Row gutter={[19, 16]} style={{ flexDirection: direction }}>
                        {data?.map((product, index) => {
                            return (
                                <Col xs={24} sm={12} md={direction == 'column' ? 24 : 6} key={index}
                                    width='100%'
                                >
                                    <Card
                                        hoverable
                                        style={{
                                            width: '100%',
                                        }}
                                        cover={
                                            <LazyLoadImage
                                                src={`https://backoffice.nodemy.vn${product?.attributes?.image?.data[0]?.attributes?.url}`}
                                                alt="Product Image"
                                                className="card-img-top"
                                                height="250px"
                                            />
                                        }
                                    >
                                        <Meta className='my-3' style={{ height: 80 }} title={product?.attributes?.name} description={product?.attributes?.description.substring(0, 40)} />
                                        <h5>
                                            <del className="card-text lead fw-bold" style={{ color: '#666', fontWeight: '15px' }}>{formatPrice(product?.attributes?.oldPrice) + ' VND'}</del> <br />
                                        </h5>
                                        <h5 className='my-3'>
                                            <p className="card-text lead fw-bold">{formatPrice(product?.attributes?.price) + ' VND'}</p>
                                        </h5>
                                        <Link to={`/product/${product?.attributes?.slug}`} className="btn btn-outline-dark my-3">Buy Now</Link>
                                        <Button type="dashed" block>
                                            Còn lại {product?.attributes?.quantityAvailable}
                                        </Button>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row >
                    <Row justify={'center'} style={{ marginTop: 20 }}>
                        {
                            showPagination == 'true' ?
                                < Pagination
                                    current={paging.page}
                                    pageSize={paging.pageSize}
                                    total={paging.total}
                                    onChange={(page) => {
                                        setPaging({
                                            ...paging,
                                            page: page,
                                        })
                                    }} /> : ''
                        }
                    </Row>
                </>
            }
        </>
    );
};

export default ProductList;