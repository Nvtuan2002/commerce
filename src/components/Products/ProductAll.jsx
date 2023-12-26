import React from 'react';
import { getCategory, getCheckboxBrand } from '../../services/products';
import { Row, Col, Card } from 'antd';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


const ProductAll = () => {

    const param = useParams()
    const [stateCheckbox, setStateCheckbox] = useState([]);
    const [query, setQuery] = useSearchParams();
    const { category } = getCategory(param.slug);
    const { Meta } = Card;
    const { dataCheckbox } = getCheckboxBrand(stateCheckbox)

    //CheckBox
    const plainOptions = Array.from(new Set(category.flatMap(product => (product?.attributes?.idBrand?.data?.attributes?.name || [])))) || [];
    const onCheckAllChange = (e) => {
        const updatedState = e.target.checked ? plainOptions : [];
        setStateCheckbox(updatedState);
        setQuery({ key: updatedState });
    };
 
    const onChange = (e) => {
        const value = e.target.value;
        const updatedState = stateCheckbox.includes(value)
            ? stateCheckbox.filter(item => item !== value)
            : [...stateCheckbox, value];
        setStateCheckbox(updatedState);
        setQuery({ key: updatedState });
    };

    useEffect(() => {
        const urlState = query.getAll('key');
        setStateCheckbox(urlState);
    }, [query]);

    console.log('dataCheckbox', dataCheckbox , 'stateCheckbox', stateCheckbox, 'category', category);
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
                    <h2 className='fw-bold'>{category[0]?.attributes?.idCategories?.data[0]?.attributes?.name} <small style={{ fontSize: '14px', opacity: '0.8' }}>(Tổng {category.length} sản phẩm)</small></h2>
                </Col>

            </Row>
            <Row gutter={[16, 40]}>
                <Col span={6}>
                    <h5 className='text-center p-2' style={{ border: '1px solid #d9d9d9', borderRadius: '10px' }} >Lọc sản phẩm</h5>
                    <h5 className='fw-700 mt-4'>HÃNG SẢN XUẤT</h5>
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
                </Col>
                <Col span={18}>
                    <Row gutter={[16, 40]} className='mt-3 my-5'>
                        {(dataCheckbox.length >= 1 ? dataCheckbox : category)?.map((product, index) => (
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
                                </Card>
                            </Col>
                        ))}
                    </Row >
                </Col>
            </Row>
        </div>
    );
};

export default ProductAll;