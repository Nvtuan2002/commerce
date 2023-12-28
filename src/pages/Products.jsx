import React from 'react';
import Skeleton from 'react-loading-skeleton'
import ProductCate from '@/components/Products/ProductCate';

const Products = () => {
    const loading = false;
    const Loading = () => {
        return (
            <>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
            </>
        );
    };

    const ShowProducts = () => {
        return (
            <>
                <ProductCate title='laptop-gaming'></ProductCate>
                <ProductCate title='man-hinh'></ProductCate>
            </>
        )
    }

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    );
};

export default Products;