import React from 'react';
import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom';


const Products = () => {
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
    }

    const FilterProduct = (category) => {
        const updateList = data.filter((product) => {
            return product.category === category;
        });
        setFilter(updateList);
    }

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className="btn btn-outline-dark me-2" onClick={() => {
                        setFilter(data);
                    }}>All</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => {
                        FilterProduct("men's clothing");
                    }}>Men's Clothing</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => {
                        FilterProduct("women's clothing")
                    }}>Women's Clothing</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => {
                        FilterProduct("jewelery");
                    }}>Jewelery</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => {
                        FilterProduct("electronic");
                    }}>Electronic</button>
                </div>
                {filter.map((product, index) => {
                    return (
                        <div className='col-md-3 mb-4' key={index}>
                            <div className="card">
                                <img src={product.image} className="card-img-top" alt={product.title} height="250px" />
                                <div className="card-body">
                                    <h5 className="card-title">{product.title.substring(0, 12)}...</h5>
                                    <p className="card-text lead fw-bold">${product.price}</p>
                                    <Link to={`/product/${product.id}`} className="btn btn-outline-dark">Buy Now</Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="text-center display-6 fw-bolder">Latest Product</h1>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    );
};

export default Products;