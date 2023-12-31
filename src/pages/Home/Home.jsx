import React, { useEffect } from 'react'
import Products from '../Products/Products'
import { useState } from 'react'
import { getBanner } from '../../services/Banner'
import { Row, Col, Carousel } from 'antd'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import ProductCate from '../../components/Products/ProductCate'

const Home = () => {
    //1 State
    const [banner, setBanner] = useState([])

    useEffect(() => {
        const fetchBanner = async () => {
            const response = await getBanner()
            setBanner(response.response)
        }
        fetchBanner()
    }, [])

    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        outline: 'none',
    };

    return (
        <>
            <div className=" container-lg my-4">
                <Row gutter={[16, 40]}>
                    <Col span={16} style={{ outline: 'none' }} >
                        <Carousel autoplay style={{ outline: 'none' }} >
                            {((banner.leftBanner?.data || [])).map((item, index) => (
                                <div style={contentStyle} key={index}>
                                    <LazyLoadImage
                                        src={`https://backoffice.nodemy.vn${item.attributes.url}`}
                                        className="d-block w-100"
                                        alt=""
                                        style={{ height: "100%", width: '100%', objectFit: "cover", borderRadius: 12 }}
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </Col>
                    <Col span={8}>
                        {(banner.rightBanner?.data || []).map((item, index) => {
                            return (
                                <Row key={index} span={12} style={{ marginBottom: 10, borderRadius: 15 }}>
                                    <img src={`https://backoffice.nodemy.vn${item.attributes.url}`} alt="" width="100%" />
                                </Row>
                            )
                        })}
                    </Col>
                </Row>
                <Row gutter={[16, 40]} style={{ borderRadius: '10px' }}>
                    {(banner?.subBanner?.data || []).map((item, index) => {
                        return (
                            <Col span={8} key={index} style={{ marginBottom: 10, borderRadius: 15 }}>
                                <img src={`https://backoffice.nodemy.vn${item.attributes.url}`} alt="" width="100%" />
                            </Col>
                        )
                    })}
                </Row>
                <Row gutter={[16, 40]}>
                    {(banner?.bottomBanner?.data || []).map((item, index) => {
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