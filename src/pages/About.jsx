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
                        <div className="lead mb-4">
                            <h5 className='fw-bold'>Welcome to NVT! </h5>

                            <p>
                                At NVT, we're dedicated to bringing you top-notch products with a focus on quality, variety, and customer satisfaction.
                            </p>

                            <h5 className='fw-bold'>Our Story</h5>
                            <p>
                                Established in 2024, we've evolved from a startup to a trusted products destination. Our mission is to redefine your shopping experience with curated, high-quality products.
                            </p>

                            <h5 className='fw-bold'>Why Choose Us?</h5>
                            <p>
                                <strong>Quality</strong>: We source from reputable manufacturers for durability.
                            </p>
                            <p>
                                <strong>Selection</strong>: Explore a diverse range of products.
                            </p>
                            <p>
                                <strong>Satisfaction</strong>: Our dedicated support team is here for you.
                            </p>

                            <h5 className='fw-bold'>Our Commitment</h5>
                            <p>
                                We're committed to sustainability, minimizing our carbon footprint, and promoting eco-friendly practices.
                            </p>

                            <h5 className='fw-bold'>Connect With Us</h5>
                            <p>
                                Join us on social media for the latest updates, promotions, and more. Your feedback matters! <br />
                                Thanks for choosing NVT. Let's make your products experience extraordinary!
                            </p>
                            <p>
                                Regard!
                            </p>
                        </div>
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