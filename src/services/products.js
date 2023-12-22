import { useState, useEffect } from 'react';
import axios from 'axios';

//Get All Products
export const getProducts = (slug) => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paging, setPaging] = useState({
        page: 1,
        pageSize: 8,
        pageCount: 1,
        total: 18,
    });

    useEffect(() => {
        let componentMounted = true;

        const getProducts = async () => {
            setLoading(true);
            try {
                let response;

                if (slug) {
                    response = await axios(`https://backoffice.nodemy.vn/api/products/${slug}?populate=*`);
                } else {
                    response = await axios(`https://backoffice.nodemy.vn/api/products?populate=*&pagination[page]=${paging.page}&pagination[pageSize]=${paging.pageSize}`);
                }

                const responseData = response.data.data;

                if (componentMounted) {
                    setData(responseData);
                    setFilter(responseData);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        getProducts();

        return () => {
            componentMounted = false;
        };
    }, [slug, paging.page]);

    return { data, loading, filter, setData, setFilter, setLoading, paging, setPaging };
};

//Get All Brand 
export const getBrand = () => {
    const [brand, setBrand] = useState([])

    useEffect(() => {
        const fetchBrand = async () => {
            const response = await fetch('https://backoffice.nodemy.vn/api/brands')
            const res = await response.json()
            const data = res.data
            setBrand(data)
        }
        fetchBrand()
    }, [])

    return { brand, setBrand }
}