import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import { useDispatch } from 'react-redux';
import { addItem } from '@/redux/Cart';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { Col, Row, InputNumber, Form } from 'antd';
import { useFetch } from '@/customHook/useFetch';
import Markdown from 'react-markdown';
import '@/components/Products/products.scss';
import ProductCate from './ProductCate';

const Product = () => {

    const params = useParams()
    const [form] = Form.useForm();
    const { data, loading } = useFetch(`/products/${params.slug}`);

    const dispatch = useDispatch()
    const addtoCart = () => {
        dispatch(addItem({
            id: data?.id,
            quantity: form.getFieldValue('quantity'),
            quantityAvailable: data?.attributes?.quantityAvailable
        }))
    }

    const Loading = () => {
        return (<>
            <div className="col-md-6">
                <Skeleton height={400} />
            </div>
            <div className="col-md-6" style={{ lineHeight: 2 }}>
                <Skeleton height={50} width={300} />
                <Skeleton height={75} />
                <Skeleton height={25} width={150} />
                <Skeleton height={50} />
                <Skeleton height={150} />
                <Skeleton height={50} width={100} />
                <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
            </div>
        </>)
    }

    const newArrImage = Object.values(data);
    const images = newArrImage?.map((item) =>
        item?.image?.data?.map((listImage) => ({
            original: `${import.meta.env.VITE_BASE_API_URL}${listImage?.attributes?.url}`,
            thumbnail: `https://backoffice.nodemy.vn${listImage?.attributes?.url}`,
        }))
    ).flat().filter((item) => item !== undefined);
    let categories = data?.attributes?.idCategories?.data
    let queryWithCategories = categories?.reduce((txt, item, index) => {
        return txt + `&filters[idCategories][slug][$in][${index}]=${item?.attributes?.slug}`
    }, `filters[slug][$ne]=${params.slug}`)

    //Replace Markdown to data
    const markdown = data?.attributes?.description.replaceAll('/uploads/', `${import.meta.env.VITE_BASE_API_URL}/uploads/`);

    const formatPrice = (price) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);

        const priceWithoutSymbol = formattedPrice.replace('₫', '');

        return priceWithoutSymbol.trim();
    };

    const ShowProduct = () => {
        return (<>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginBottom: '36px' }}>
                <Row className='display-6 fw-bold'>{data?.attributes?.name}
                </Row>

                <Col xs={24} md={18}>
                    <ImageGallery items={images} />
                    <Col style={{ marginTop: '55px', padding: 0 }} >
                        <h4 className='text-uppercase text-black-50 fw-bold'>
                            {data.attributes?.idBrand?.data?.attributes?.name}
                        </h4>
                        <h5 style={{ fontWeight: 'bold' }}>Thông số sản phẩm</h5>
                        <p className='lead fw-medium'>
                            {
                                data?.attributes?.cpu ?
                                    <li>CPU: {data?.attributes?.cpu}</li>
                                    : null
                            }
                            {data?.attributes?.ram ? <li>RAM: {data?.attributes?.ram}</li> : null}
                            {data?.attributes?.quantityAvailable ? <li>Quantity Available: {data?.attributes?.quantityAvailable}</li> : <li>Hết hàng</li>}
                        </p>

                        <h4 className='my-4'> Giá cũ:
                            <del className=" my-4" style={{ color: 'red' }}>
                                {formatPrice(data?.attributes?.oldPrice) + ' VND'}
                            </del>
                        </h4>
                        <h3 className="fw-bold my-4">
                            Giá mới:
                            {formatPrice(data?.attributes?.price) + 'VND'}
                        </h3>
                        <h5>
                            Số lượng:
                            <Form
                                form={form}
                            >
                                <Form.Item
                                    name='quantity'
                                    initialValue={1}
                                >
                                    <InputNumber
                                        defaultValue={1}
                                        min={1}
                                        max={data?.attributes?.quantityAvailable || 1}
                                    >
                                    </InputNumber>
                                </Form.Item>
                            </Form>
                        </h5>
                        <button className='btn btn-outline-dark px-4 py-2 my-5'
                            onClick={() => {
                                addtoCart()
                            }}>Add to Cart</button>
                        <Link to='/cart' className='btn btn-dark ms-2 px-3 py-2'>Go to Cart</Link>
                    </Col>
                    <h4>Mô tả:</h4>
                    <Markdown className='markdown'>{markdown}</Markdown>
                </Col>
                <Col xs={24} md={6}>
                    <ProductCate
                        query={`filters[idBrand][name]=${data?.attributes?.idBrand?.data?.attributes?.name}&filters[slug][$ne]=${params.slug}`}
                        title='Sản phẩm cùng hãng'
                        direction='column'
                        pageSize={4}
                        showButton={false}
                        showPagination={false} />
                </Col>
            </Row>
            <Row>
                <ProductCate
                    query={queryWithCategories}
                    link={`/products/category/san-pham-moi`}
                    title='Sản phẩm liên quan'
                    direction='row'
                    showPagination={false}
                    showButton={false}
                    pageSize={4}
                />
            </Row>
        </>)
    }

    return (
        <div>
            <div className="container py-5">
                <div className="row py-4">
                    {loading ? <Loading /> : <ShowProduct />}
                </div>
            </div>
        </div>
    );
};

export default Product;