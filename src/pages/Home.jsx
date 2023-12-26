import React, { useEffect } from 'react'
import Products from './Products'
import { useState } from 'react'
import { getBanner } from '../services/Banner'
import { Row, Col } from 'antd'

const Home = () => {

    const [leftBanner, setLeftBanner] = useState([])
    const [rightBanner, setRightBanner] = useState([])
    const [subBanner, setSubBanner] = useState([])
    const [bottomBanner, setBottomBanner] = useState([])

    useEffect(() => {
        const fetchLeftBanner = async () => {
            const response = await getBanner()
            setLeftBanner(response.response.leftBanner.data)
            setRightBanner(response.response.rightBanner.data)
            setSubBanner(response.response.subBanner.data)
            setBottomBanner(response.response.bottomBanner.data)
            console.log(response.response);
        }
        fetchLeftBanner()
    }, [])

    return (
        <>
            <div className="container my-4">
                <Row gutter={[16, 40]}>
                    <Col span={16} style={{ borderRadius: '16px' }} >
                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" style={{ width: '100%' }}>
                            <div className="carousel-inner" style={{ borderRadius: 10, width: '100%' }}>
                                {leftBanner.map((item, index) => (
                                    <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                                        <img
                                            src={`https://backoffice.nodemy.vn${item.attributes.url}`}
                                            className="d-block w-100"
                                            alt=""
                                            style={{ height: "100%", width: '100%', objectFit: "cover" }}
                                        />
                                    </div>
                                ))}
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

                    </Col>
                    <Col span={8}>
                        {rightBanner.map((item, index) => {
                            return (
                                <Row key={index} span={12} style={{ marginBottom: 10, borderRadius: 15 }}>
                                    <img src={`https://backoffice.nodemy.vn${item.attributes.url}`} alt="" width="100%" />
                                </Row>
                            )
                        })}
                    </Col>
                </Row>
                <Row gutter={[16, 40]} style={{ borderRadius: '10px' }}>
                    {subBanner.map((item, index) => {
                        return (
                            <Col span={8} key={index} style={{ marginBottom: 10, borderRadius: 15 }}>
                                <img src={`https://backoffice.nodemy.vn${item.attributes.url}`} alt="" width="100%" />
                            </Col>
                        )
                    })}
                </Row>
                <Row gutter={[16, 40]}>
                    {bottomBanner.map((item, index) => {
                        return (
                            <Col span={6} key={index} >
                                <img src={`https://backoffice.nodemy.vn${item.attributes.url}`} alt="" width="100%" />
                            </Col>
                        )
                    })}
                </Row>
            </div>
            <Products />
        </>
    )
}

export default Home