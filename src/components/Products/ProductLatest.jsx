import React from 'react';
import { Link } from 'react-router-dom';
import { DownOutlined, FilterOutlined } from '@ant-design/icons';
import { Dropdown, Button, Row, Col, Pagination, Input, Card } from 'antd';
import { useState } from 'react';
import { getBrand, getProducts } from '../../services/products';

const ProductLatest = () => {

    const { Meta } = Card;

    //get API
    const { brand, setBrand } = getBrand();
    const { data, filter, setFilter, paging, setPaging } = getProducts();

    //UseState set BrandName
    const [brandName, setBrandName] = useState();

    //Format Price
    const formatPrice = (price) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);

        const priceWithoutSymbol = formattedPrice.replace('₫', '');

        return priceWithoutSymbol.trim();
    };

    //List Brand
    const itemBrand = [
        ...brand.map((item) => {
            return {
                label: item?.attributes?.name,
                key: item?.id,
                onClick: async () => {
                    const brandName = item?.attributes?.name;
                    setBrandName(item?.attributes?.name);
                    const updateList = data?.filter((product) => {
                        return product?.attributes?.idBrand?.data?.attributes?.name == brandName;
                    });
                    setFilter(updateList);
                }
            }
        })
    ];

    const beetwenPrice = (min, max) => {
        const updateList = data?.filter((product) => {
            return product?.attributes?.price >= min && product?.attributes?.price <= max;
        });
        setFilter(updateList);
    }

    return (
        <div>
            <div style={{ marginBottom: '16px' }}>
                <h3 className='fw-bold'><FilterOutlined />Filter</h3>
                <Row justify="space-between">
                    <Row gutter={[16, 40]}>
                        <Col>
                            <Button onClick={() => setFilter(data)}>Xem tất cả</Button>
                        </Col>
                        <Col>
                            <Dropdown.Button
                                icon={<DownOutlined />}
                                menu={{ items: itemBrand }}
                            >
                                {brandName ? brandName : "Brand"}
                            </Dropdown.Button>
                        </Col>
                    </Row>
                    <Row gutter={[16, 40]} align="middle">
                        <Col>Lọc theo giá tiền</Col>
                        <Col>
                            <Input id="minPrice" placeholder="Min price" />
                        </Col>
                        <Col>
                            <Input id="maxPrice" placeholder="Max price" />
                        </Col>
                        <Col>
                            <Button onClick={() => {
                                const minPrice = parseInt(document.getElementById("minPrice").value.trim());
                                const maxPrice = parseInt(document.getElementById("maxPrice").value.trim());
                                beetwenPrice(minPrice, maxPrice);
                            }}>Filter</Button>
                        </Col>
                    </Row>
                </Row>
            </div>
            <Row gutter={[16, 40]} className='mt-3'>
                {filter?.map((product, index) => {
                    return (
                        <Col span={6} key={index} className='d-flex justify-content-center'>
                            <Card
                                hoverable
                                style={{
                                    width: 250,
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
            </Row>
            <Pagination className='text-center mt-5' current={paging.page} onChange={(page) => {
                setPaging(prev => {
                    return {
                        ...prev,
                        page: page
                    }
                })
            }} total={paging.total * 2.5} />;
        </div>
    );
};

export default ProductLatest;