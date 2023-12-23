import React, { useEffect } from 'react'
import Products from './Products/Products'
import { useState } from 'react'
import { getLeftBanner } from '../services/Banner/leftBanner'

const Home = () => {

    const [leftBanner, setLeftBanner] = useState([])

    useEffect(() => {
        const fetchLeftBanner = async () => {
            const leftBanner = await getLeftBanner()
            setLeftBanner(leftBanner.response.slice(0, 4))
        }
        fetchLeftBanner()
    }, [])

    return (
        <div>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    {leftBanner.map((item, index) => {
                        return (
                            index === 0 ? <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" key={index}></button>
                                : <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} aria-label={`Slide ${index + 2}`} key={index}></button>
                        )
                    })}
                </div>
                <div className="carousel-inner">
                    {leftBanner.map((item, index) => {
                        return (
                            index === 0 ? <div className="carousel-item active" key={index}>
                                <img src={`https://backoffice.nodemy.vn${item.attributes.url}`} className="d-block w-100" alt="" height="500px" />
                            </div> : <div className="carousel-item" key={index}>
                                <img src={`https://backoffice.nodemy.vn${item.attributes.url}`} className="d-block w-100" alt="" height="500px" />
                            </div>
                        )
                    })}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <Products />
        </div>
    )
}

export default Home