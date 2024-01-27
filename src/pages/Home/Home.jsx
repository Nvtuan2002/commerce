import './Home.scss'
import React, { useEffect } from 'react'
import Products from '@/pages/Products/Products'
import { Row, Col, Carousel, Menu } from 'antd'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useFetch } from '@/customHook/useFetch'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const { data } = useFetch('homepage')
    const { data: dropdownTabs } = useFetch('dropdown-tabs', 'populate[0]=bannerFeatures&populate[1]=section.image&populate[2]=section.link', 10)

    const leftBanner = data?.attributes?.leftBanner?.data
    const rightBanner = data?.attributes?.rightBanner?.data
    const subBanner = data?.attributes?.subBanner?.data
    const bottomBanner = data?.attributes?.bottomBanner?.data

    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        outline: 'none',
    };
    
    let dropdownMenuComponent = dropdownTabs?.map((item) => {
        let megamenuItems = item?.attributes?.section?.map((megaItem, index) => {
            return <li key={megaItem?.id} className="mega-menu-items">
                <div className='mega-item-info'>
                    <img src={import.meta.env.VITE_BASE_API_URL + megaItem?.image?.data?.attributes?.url} alt="" />
                    <h3>{megaItem?.title}</h3>
                </div>
                <div className="sub-menu-mega-items">
                    {megaItem?.link?.map(subMegaItem => {
                        return (
                            <Link
                                key={subMegaItem?.id}
                                to={subMegaItem?.url}
                            > {subMegaItem?.label} </Link>
                        )
                    })}
                </div>
            </li>
        })
        return (
            <li key={item?.id}> {item?.attributes?.label}
                <div className="mega-menu">
                    <div className="mega-menu-left-part">
                        <ul>
                            {megamenuItems}
                        </ul>
                    </div>
                    <div className="mega-menu-right-part">
                        <img src={import.meta.env.VITE_BASE_API_URL + item?.attributes?.bannerFeatures?.data?.attributes?.url} alt="" />
                    </div>
                </div>
            </li>
        )
    })

    return (
        <>
            <div className=" container-lg my-4">
                <Row className='banner-home' gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
                    <Col xs={0} md={5}>
                        <ul className="menu">
                            {dropdownMenuComponent}
                        </ul>
                    </Col>
                    <Col xs={24} md={19}>
                        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
                            <Col xs={24} md={16} style={{ outline: 'none' }} >
                                <Carousel autoplay style={{ outline: 'none' }} >
                                    {leftBanner?.map((item, index) => (
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
                            <Col xs={0} md={8}>
                                {rightBanner?.map((item, index) => {
                                    return (
                                        <Row key={index} span={12} style={{ marginBottom: 10, borderRadius: 15 }}>
                                            <img src={`https://backoffice.nodemy.vn${item.attributes.url}`} alt="" width="100%" />
                                        </Row>
                                    )
                                })}
                            </Col>
                        </Row>
                        <Row gutter={[16, 40]} style={{ borderRadius: '10px' }}>
                            {subBanner?.map((item, index) => {
                                return (
                                    <Col xs={0} md={8} key={index} style={{ marginBottom: 10, borderRadius: 15 }}>
                                        <img src={`https://backoffice.nodemy.vn${item.attributes.url}`} alt="" width="100%" />
                                    </Col>
                                )
                            })}
                        </Row>
                    </Col>
                </Row>
                <Row gutter={[16, 40]}>
                    {bottomBanner?.map((item, index) => {
                        return (
                            <Col xs={0} md={6} key={index} >
                                <img src={`https://backoffice.nodemy.vn${item.attributes.url}`} alt="" width="100%" />
                            </Col>
                        )
                    })}
                </Row>
            </div >
            <Products />
        </>
    )
}

export default Home