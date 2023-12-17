import React, { useEffect, useState } from 'react'
import { listUser, login } from '../services/Login'
import { useDispatch } from 'react-redux'
import { LoginRedux } from '../redux/Auth'

const Login = () => {

    const [user, setUser] = useState({})
    const dispatch = useDispatch()

    const handleAccount = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        try {
            const response = await login(user);
            const dataListUser = await listUser();

            const resultUser = dataListUser.data.find((item) => {
                return item.username === user.username && item.password === user.password && response;
            });

            if (resultUser) {
                dispatch(LoginRedux({
                    token: response.data.token,
                    user: resultUser,
                }));
                window.location.reload();
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    }

    return (
        <>
            <button type="button" className="btn btn-outline-primary ms-auto" data-bs-toggle="modal" data-bs-target="#loginModal">
                <span className="fa fa-sign-in me-1"></span>Login
            </button>


            <div className="modal fade" id="loginModal" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Login</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">UserName</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='username' onChange={handleAccount} />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" >Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={handleAccount} />
                                </div>
                                <div className="mb-3 form-check">
                                    <label className="form-check-label" >Check me out</label>
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                </div>
                                <button type="button" className="btn btn-outline-primary w-100 mt-5" onClick={handleSubmit}>Submit</button>
                            </form>
                            <hr />
                            <button className="btn btn-danger w-100 mb-4 mt-2">
                                <span className="fa fa-google me-2"></span> Sign in With Google
                            </button>
                            <button className="btn btn-primary w-100 mb-4">
                                <span className="fa fa-facebook me-2"></span> Sign in With Facebook
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login