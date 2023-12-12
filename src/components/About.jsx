import React from 'react'
import { Link } from 'react-router-dom'
import about from '../assets/images/about.png'

const About = () => {
    
    return (
        <div>
            <div className="container py-5 my-5">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="text-primary fw-bold mb-4">About Us</h1>
                        <p className="lead mb-4">
                            <h5 className='fw-bold'>Welcome to NVT! </h5>

                            At NVT, we're dedicated to bringing you top-notch products with a focus on quality, variety, and customer satisfaction.

                            <h5 className='fw-bold'>Our Story</h5>
                            Established in 2024, we've evolved from a startup to a trusted products destination. Our mission is to redefine your shopping experience with curated, high-quality products.

                            <h5 className='fw-bold'>Why Choose Us?</h5>
                            <strong>Quality</strong>: We source from reputable manufacturers for durability.

                            <strong>Selection</strong>: Explore a diverse range of products.

                            <strong>Satisfaction</strong>: Our dedicated support team is here for you.

                            <h5 className='fw-bold'>Our Commitment</h5>
                            We're committed to sustainability, minimizing our carbon footprint, and promoting eco-friendly practices.

                            <h5 className='fw-bold'>Connect With Us</h5>
                            Join us on social media for the latest updates, promotions, and more. Your feedback matters! <br />

                            Thanks for choosing NVT. Let's make your products experience extraordinary!
                            Regard!
                        </p>
                        <Link to="/contact" className="btn btn-outline-primary px-3">Contact Us</Link>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center">
                        <img src={about} alt="About Us" height="400px" width="400px" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About