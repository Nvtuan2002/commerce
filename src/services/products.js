import { useState, useEffect } from 'react'

//get Product by id
export const getProduct = (id) => {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            const response = await fetch(`https://fakestoreapi.com/products/${id}`)
            const data = await response.json()
            setProduct(data)
            setLoading(false)
        }
        fetchProduct()
    }, [id])

    return { product, loading, setProduct, setLoading }
}

//Get List Products 
export const getProducts = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;
    useEffect(() => {
        const getProducs = async () => {
            setLoading(true);
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            if (componentMounted) {
                setData(data);
                setFilter(data);
                setLoading(false);
            }
            return () => {
                componentMounted = false;
            }
        }
        getProducs();
    }, []);

    return { data, loading, filter, setData, setFilter, setLoading }
}