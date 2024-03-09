import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Input, Form, Select, Checkbox, Button, Collapse, Breadcrumb } from 'antd';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useFetch } from '@/customHook/useFetch';
import ProductList from '@/components/Products/ProductList';
import { ArrowRightOutlined } from '@ant-design/icons';
const CheckboxGroup = Checkbox.Group;

const ProductCategories = () => {

    const params = useParams()
    const [query, setQuery] = useSearchParams();

    const [childData, setChildData] = useState({})
    let { data: categoriesList } = useFetch('/categories', '', 100)
    let { data: brands } = useFetch('/brands', '', 100)

    const [brandCheckList, setBrandCheckList] = useState([]);
    const [sortPrice, setSortPrice] = useState("asc")
    const [distancePrice, setDistancePrice] = useState({});
    const [formPriceCondition] = Form.useForm()

    //get query to object
    function getQueryToObject() {
        let result = {}
        query.forEach((value, key) => {
            result[key] = value
        })
        return result
    }

    useEffect(() => {
        let queryObj = getQueryToObject()
        let defaultSort = queryObj.sort ? queryObj?.sort : "asc"
        let defaultBrand = queryObj.brand ? queryObj?.brand?.split(',') : []
        let defaultDistancePrice = {
            minPrice: queryObj.minPrice,
            maxPrice: queryObj.maxPrice,
        }
        setBrandCheckList(defaultBrand)
        setSortPrice(defaultSort)
        setDistancePrice(defaultDistancePrice)
        formPriceCondition.setFieldsValue(defaultDistancePrice)
    }, []);

    //Brand
    const plainOptions = (brands)?.flatMap((product) => ({
        label: product?.attributes?.name,
        value: product?.attributes?.products?.data?.length ? product?.attributes?.products?.data?.length : 0,
    }))

    const optionsWithCount = plainOptions
        ?.filter(brand => brand.value !== 0)
        .map(brand => ({
            label: `${brand.label} (${brand.value})`,
            value: brand.label,
        }));

    // const checkAll = plainOptions.filter(brand => brand.value > 0).map(brand => brand.label).length === brandCheckList.length;
    // const indeterminate = brandCheckList.length > 0 && brandCheckList.length < plainOptions.filter(brand => brand.value > 0).map(brand => brand.label).length;

    // const onChangeAllBrand = (e) => {
    //     const updatedState = e.target.checked
    //         ? plainOptions.filter(brand => brand.value > 0).map(brand => brand.label)
    //         : [];
    //     setBrandCheckList(updatedState);
    //     let queryObj = getQueryToObject()
    //     queryObj.brand = updatedState.join(',')
    //     if (updatedState.length === 0) {
    //         delete queryObj.brand
    //     }
    //     setQuery(queryObj);
    // };

    const onChangeBrand = (list) => {
        setBrandCheckList(list);
        let queryObj = getQueryToObject()
        queryObj.brand = list.join(',')
        if (list.length === 0) {
            delete queryObj.brand
        }
        setQuery(queryObj);
    };

    //Sort
    const handleSortPricechange = (value) => {
        setSortPrice(value)
        let queryObj = getQueryToObject()
        queryObj.sort = value
        setQuery(queryObj)
    }

    //Price Distance
    const handleMinMaxChange = (value) => {
        let queryObj = getQueryToObject()
        if (value.minPrice) {
            queryObj.minPrice = value.minPrice
        } else {
            delete queryObj.minPrice
        }
        if (value.maxPrice) {
            queryObj.maxPrice = value.maxPrice
        } else {
            delete queryObj.maxPrice
        }
        setDistancePrice(value)
        setQuery(queryObj)
    }

    //Reset Filter
    const handleResetFilter = () => {
        setDistancePrice({})
        setBrandCheckList([])
        setSortPrice('asc')
        setQuery({})
        formPriceCondition.resetFields()
    }

    //Fetch Data
    let queryFilterTxt = ''
    let category = ''

    if (params.category) {
        category = params.category
    } else {
        category = query.get('cat')
    }

    if (category && category !== 'san-pham-moi') {
        queryFilterTxt = `&filters[idCategories][slug]=${category}`
    }

    let txtSearch = query.get('name')
    if (txtSearch) {
        queryFilterTxt += `&filters[name][$contains]=${txtSearch}`
    }

    if (distancePrice.minPrice) {
        queryFilterTxt += `&filters[price][$gte]=${distancePrice.minPrice}`
    }
    if (distancePrice.maxPrice) {
        queryFilterTxt += `&filters[price][$lte]=${distancePrice.maxPrice}`
    }

    if (sortPrice) {
        queryFilterTxt += `&sort[1]=price:${sortPrice}`
    }

    if (brandCheckList.length >= 0) {
        brandCheckList.forEach((value, index) => {
            queryFilterTxt += `&filters[idBrand][name][$in][${index}]=${value}`
        })
    }

    let breadcrumbItems = [{
        title: <Link to='/'>Trang chủ</Link>
    }]
    if (window.location.href.includes('danh-muc')) {
        breadcrumbItems.push({
            title: <Link to='#'>Danh mục</Link>
        }, {
            title: <Link to='#'>{params.category}</Link>
        })

    } else {
        breadcrumbItems.push({
            title: <Link to='#'>Tìm kiếm</Link>
        })
    }

    return (
        <div className='container mt-3'>
            <Breadcrumb
                items={breadcrumbItems}
            />
            <Row justify="space-between">
                <Col span={24}>
                    <h2 className='fw-bold'>
                        {txtSearch ? <h2 className='fw-bold'>Search: {txtSearch}</h2>
                            : (childData?.data?.[0]?.attributes?.idCategories?.data[0]?.attributes?.name
                                ? childData?.data?.[0]?.attributes?.idCategories?.data[0]?.attributes?.name : null)
                        }
                        <small style={{ fontSize: '14px', opacity: '0.8' }}>(Total {childData?.data?.length} items)</small></h2>
                </Col>
            </Row>
            <Row justify={'space-between'} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col xs={24} md={5} style={{ marginBottom: 15 }}>
                    <h5 className='text-center p-2' style={{ border: '1px solid #d9d9d9', borderRadius: '10px' }} >Filter</h5>
                    <div>
                        <h5 className='fw-bold mt-4'>BRAND</h5>
                        <div>
                            {/* <Checkbox indeterminate={indeterminate} onChange={onChangeAllBrand} checked={checkAll}>
                                Check all
                            </Checkbox> */}
                            <Row className='my-3'>
                                <CheckboxGroup options={optionsWithCount} value={brandCheckList} onChange={onChangeBrand} />
                            </Row>
                        </div>
                    </div>
                    <div>
                        <h5 className='fw-bold mt-4'>SORT</h5>
                        <Select
                            value={sortPrice}
                            onChange={handleSortPricechange}
                            options={[{
                                label: 'Icrease',
                                value: 'asc'
                            }, {
                                label: 'Decrease',
                                value: 'desc'
                            }]}
                        ></Select>
                    </div>
                    <div className='mt-4'>
                        <h5 style={{ fontWeight: 'bold' }}>PRICE</h5>
                        <Form
                            name="price-form"
                            onFinish={handleMinMaxChange}
                            form={formPriceCondition}
                        >
                            <Row justify={'center'}>
                                <Col xs={24} md={11}>
                                    <Form.Item
                                        name="minPrice"
                                    ><Input placeholder='Min' />
                                    </Form.Item>
                                </Col>
                                <Col xs={0} md={2} style={{ textAlign: 'center', marginTop: 5 }}>
                                    <ArrowRightOutlined />
                                </Col>
                                <Col xs={24} md={11}>
                                    <Form.Item
                                        name="maxPrice"
                                    ><Input placeholder='Max' />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Button htmlType='submit'>Filter</Button>
                            <Button onClick={handleResetFilter} style={{ marginLeft: '15px' }} >Delete Filter</Button>
                        </Form>
                    </div>
                    <div>
                        <h5 className='fw-bold mt-4'>CATEGORY</h5>
                        <Row>
                            {categoriesList?.map((item, index) => (
                                <Col xs={12} md={24}>
                                    <Link Link to={`/category/${item?.attributes?.slug}`}>
                                        {item?.attributes?.name}
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col >
                <Col xs={24} md={18}>
                    <ProductList query={queryFilterTxt} transferDataToParent={setChildData} />
                </Col >
            </Row >
        </div >
    );
};

export default ProductCategories;