import React from 'react'
import contact from '../assets/images/contact.png'
import { useSelector } from 'react-redux'

const Contact = () => {
    const user = useSelector(state => state.auth.user)
    console.log(user);

    // Check if user and user.name are defined
    const userName = user && user.name ? user.name.firstname : 'Your Name';

    return (
        <div>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-12 text-center py-4 my-4">
                        <h1>Have Some Question?</h1>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md 5 d-flex justify-content-center">
                        <img src={contact} alt="Contact Us" height="300px" width="300px" />
                    </div>
                    <div className="col-md-6">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleForm" className="form-label">Full Name</label>
                                <input type="text" className="form-control" id="exampleForm" placeholder={userName} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                            </div>
                            <button type="submit" className="btn btn-outline-primary">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact