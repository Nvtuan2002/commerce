import React from 'react'
import Products from './Products'
import slide1 from '../assets/images/home/img1.jpg'
import slide2 from '../assets/images/home/img2.jpg'
import slide3 from '../assets/images/home/img3.jpg'
import slide4 from '../assets/images/home/img4.jpg'

const Home = () => {
    return (
        <div>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={slide1} className="d-block w-100" alt="IPhone" height="500px" />
                    </div>
                    <div className="carousel-item">
                        <img src={slide2} className="d-block w-100" alt="IPhone" height="500px" />
                    </div>
                    <div className="carousel-item">
                        <img src={slide3} className="d-block w-100" alt="IPhone" height="500px" />
                    </div>
                    <div className="carousel-item">
                        <img src={slide4} className="d-block w-100" alt="IPhone" height="500px" />
                    </div>
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