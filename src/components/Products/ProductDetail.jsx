import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import { useDispatch } from 'react-redux';
import { addItem, deleteItem } from '../../redux/Cart';
import { getProducts } from '../../services/products';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { Col, Row } from 'antd';


const Product = () => {

    const params = useParams()
    const { loading, data } = getProducts(params.slug)
    const dispatch = useDispatch()

    const addProduct = (data) => {
        dispatch(addItem(data))
        console.log(data);
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
            <Row gutter={[100, 20]} style={{ marginBottom: '36px' }}>
                <Col span={14}>
                    <ImageGallery items={images} />
                </Col>
                <Col span={10} style={{ marginTop: '105px' }} >
                    <h4 className='text-uppercase text-black-50 '>
                        {data.attributes?.idBrand?.data?.attributes?.name}
                    </h4>
                    <Row className='display-6 my-5'>{data?.attributes?.name}</Row>
                    <h4 className='my-4'> Giá cũ:
                        <del className=" my-4" style={{ color: 'red' }}>
                            {formatPrice(data?.attributes?.oldPrice) + ' VND'}
                        </del>
                    </h4>
                    <h3 className=" fw-bold my-4">
                        Giá mới:
                        {formatPrice(data?.attributes?.price) + 'VND'}
                    </h3>
                    <button className='btn btn-outline-dark px-4 py-2 my-5'
                        onClick={() => {
                            addProduct(data)
                        }}>Add to Cart</button>
                    <Link to='/cart' className='btn btn-dark ms-2 px-3 py-2'>Go to Cart</Link>
                </Col>
            </Row>
            <Row>
                <h4>Mô tả:</h4>
                <p className="lead">
                    {data?.attributes?.description}
                </p>
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