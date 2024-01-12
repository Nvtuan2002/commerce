import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import { useDispatch } from 'react-redux';
import { addItem, deleteItem } from '@/redux/Cart';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { Col, Row } from 'antd';
import { useFetch } from '@/customHook/useFetch';
import Markdown from 'react-markdown';
import '@/components/Products/products.scss';
import ProductCate from './ProductCate';

const Product = () => {

    const params = useParams()
    const { data, loading } = useFetch(`/products/${params.slug}`);
    const dispatch = useDispatch()
    const addProduct = (data) => {
        dispatch(addItem(data))
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
            original: `https://backoffice.nodemy.vn${listImage?.attributes?.url}`,
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
            <Row gutter={[50, 20]} style={{ marginBottom: '36px' }}>
                <Col span={18}>
                    <ImageGallery items={images} />
                    <Col style={{ marginTop: '105px', padding: 0 }} >
                        <h4 className='text-uppercase text-black-50'>
                            {data.attributes?.idBrand?.data?.attributes?.name}
                        </h4>
                        <Row className='display-6 my-5'>{data?.attributes?.name}</Row>
                        <h5>Thông sổ sản phẩm</h5>
                        <p className='lead fw-medium'>
                            <li>CPU: {data?.attributes?.cpu}</li>
                            <li>RAM: {data?.attributes?.ram}</li>
                            <li>Quantity Available: {data?.attributes?.quantityAvailable}</li>
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
                        <button className='btn btn-outline-dark px-4 py-2 my-5'
                            onClick={() => {
                                addProduct(data)
                            }}>Add to Cart</button>
                        <Link to='/cart' className='btn btn-dark ms-2 px-3 py-2'>Go to Cart</Link>
                    </Col>
                    <h4>Mô tả:</h4>
                    <Markdown className='markdown'>{markdown}</Markdown>
                </Col>
                <Col span={6}>
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