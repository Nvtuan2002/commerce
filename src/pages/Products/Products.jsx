import React from 'react';
import ProductCate from '@/components/Products/ProductCate';

const Products = () => {

    return (
        <>
            <ProductCate
                title='Sản phẩm mới'
            ></ProductCate>
            <ProductCate
                title='Laptop Gamming'
                query='filters[idCategories][slug]=laptop-gaming'
                link='/products/category/laptop-gaming'
            ></ProductCate>
            <ProductCate
                title='Laptop Xịn'
                query='filters[idCategories][slug]=laptop-xin'
                link='/products/category/laptop-xin'
            ></ProductCate>
        </>
    );
};

export default Products;