import React from 'react';
import ProductCate from '@/components/Products/ProductCate';

const Products = () => {

    return (
        <>
            <ProductCate
                title='Sản phẩm mới'
                showButton={false}
                pageSize={4}
            ></ProductCate>
            <ProductCate
                title='Laptop Gamming'
                query='filters[idCategories][slug]=laptop-gaming'
                link='/category/laptop-gaming'
            ></ProductCate>
            <ProductCate
            
                title='Laptop Xịn'
                query='filters[idCategories][slug]=laptop-xin'
                link='/category/laptop-xin'
            ></ProductCate>
        </>
    );
};

export default Products;