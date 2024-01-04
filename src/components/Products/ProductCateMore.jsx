import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Card, Input, Form } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useFetch } from '@/customHook/useFetch';
import { debounce, set } from "lodash";

const ProductCateMore = () => {

    const { Meta } = Card;
    const params = useParams()
    const [query, setQuery] = useSearchParams();
    const { data } = useFetch('/products', `filters[idCategories][slug]=${params.slug}`);

    //Price Item
    const [statePrice, setStatePrice] = useState({
        min: 0,
        max: 0,
    });
    const handleInputChange = (name, value) => {
        setStatePrice(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    //Checkbox Brand
    const [stateCheckbox, setStateCheckbox] = useState([]);
    const plainOptions = Array.from(new Set((data || []).flatMap(product => (product?.attributes?.idBrand?.data?.attributes?.name || [])))) || [];
    const onCheckAllChange = (e) => {
        const updatedState = e.target.checked ? plainOptions : [];
        setStateCheckbox(updatedState);
        setQuery(updatedState.length > 0 ? { brand: updatedState.join(',') } : {});
    };

    const onChange = (e) => {
        const value = e.target.value;
        const updatedState = stateCheckbox.includes(value)
            ? stateCheckbox.filter(item => item !== value)
            : [...stateCheckbox, value];
        setStateCheckbox(updatedState);
        setQuery(updatedState.length > 0 ? { brand: updatedState.join(',') } : {});
    };

    useEffect(() => {
        const brand = query.get('brand');
        if (brand) {
            const brandArr = brand.split(',');
            setStateCheckbox(brandArr);
        }
    }, [query]);
    //Fetch Data

    const brandFilters = stateCheckbox?.map((brandName, index) => `filters[idBrand][name][$in][${index}]=${brandName}`).join('&');
    const priceFilters = `&filters[price][$between]=${statePrice.min}&filters[price][$between]=${statePrice.max}`;
    const apiEndpoint = `&filters[idCategories][slug]=${params.slug}${brandFilters.length >= 1 ? '&' + brandFilters : ''}${(statePrice.min && statePrice.max) != 0 ? priceFilters : ''}`;
    const { data: dataFilter } = useFetch('/products', apiEndpoint)



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
        <div className='container mt-3'>
            <Row justify="space-between">
                <Col span={12}>
                    <h2 className='fw-bold'>{data[0]?.attributes?.idCategories?.data[0]?.attributes?.name} <small style={{ fontSize: '14px', opacity: '0.8' }}>(Tổng {data.length} sản phẩm)</small></h2>
                </Col>
            </Row>
            <Row gutter={[16, 40]}>
                <Col span={6}>
                    <h5 className='text-center p-2' style={{ border: '1px solid #d9d9d9', borderRadius: '10px' }} >Lọc sản phẩm</h5>
                    <div>
                        <h5 className='fw-bold mt-4'>HÃNG SẢN XUẤT</h5>
                        <div>
                            <div>
                                <input
                                    type="checkbox"
                                    onChange={onCheckAllChange}
                                    checked={stateCheckbox.length === plainOptions.length}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '5px',
                                    }}
                                />
                                <span className='mx-2'>Check All</span>
                            </div>
                            <Row gutter={[16, 16]} className='justify-content-between my-3'>
                                {plainOptions.map((item, index) => (
                                    <Col span={8} key={index} className='d-flex'>
                                        <input
                                            type='checkbox'
                                            onChange={onChange}
                                            value={item}
                                            checked={stateCheckbox?.includes(item)}
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '5px',
                                            }}
                                        />
                                        <span className='mx-2'>{item}</span>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <h5 style={{ fontWeight: 'bold' }}>KHOẢNG GIÁ</h5>
                        <Form>
                            <Row justify={'space-between'} align={'middle'}>
                                <Col span={11}>
                                    <Input
                                        placeholder="Từ"
                                        name='min'
                                        onChange={(event) => {
                                            const minValue = event.target.value;
                                            handleInputChange('min', minValue);
                                        }}
                                    />
                                </Col>
                                <Col span={2} className='text-center'>
                                    <ArrowRightOutlined />
                                </Col>
                                <Col span={11}>
                                    <Input placeholder="Đến" name='max' onChange={(event) => {
                                        const maxValue = event.target.value;
                                        handleInputChange('max', maxValue);
                                    }} />
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Col>
                <Col span={18}>
                    <Row gutter={[16, 40]} className='mt-3 my-5'>
                        {(stateCheckbox?.length >= 1 ? dataFilter : data)?.map((product, index) => (
                            <Col span={6} key={index}>
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
                                </Card >
                            </Col >
                        ))}
                    </Row >
                </Col >
            </Row >
        </div >
    );
};

export default ProductCateMore;