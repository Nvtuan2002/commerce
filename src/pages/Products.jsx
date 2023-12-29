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
                <ProductCate title='laptop-xin'></ProductCate>
                <ProductCate title='man-hinh'></ProductCate>
                <ProductCate title='phu-kien'></ProductCate>
                <ProductCate title='ban-phim'></ProductCate>
                <ProductCate title='ghe-ban'></ProductCate>
                <ProductCate title='phan-mem-and-mang'></ProductCate>
                <ProductCate title='tai-nghe-loa'></ProductCate>
            </>
        )
    }

    return (
        <>
            {loading ? <Loading /> : <ShowProducts />}
        </>
    );
};

export default Products;