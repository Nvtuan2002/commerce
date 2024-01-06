import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, Input, Form, Select, Checkbox, Button } from 'antd';
import { useParams, useSearchParams } from 'react-router-dom';
import { useFetch } from '@/customHook/useFetch';
import ProductList from '@/components/Products/ProductList';
import { ArrowRightOutlined } from '@ant-design/icons';
const CheckboxGroup = Checkbox.Group;

const ProductCateMore = () => {

    const params = useParams()
    const [query, setQuery] = useSearchParams();

    let modifiedSlug = params.slug;
    if (params.slug === 'san-pham-moi') {
        modifiedSlug = ''
    } else {
        modifiedSlug = `filters[idCategories][slug]=${params.slug}`
    }
    const { data } = useFetch('/products', `${modifiedSlug}`);
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
    const plainOptions = Array.from(new Set((data).flatMap(product => (product?.attributes?.idBrand?.data?.attributes?.name))));
    const brandCount = {};
    (data).forEach(product => {
        const brand = product?.attributes?.idBrand?.data?.attributes?.name;
        if (brand) {
            brandCount[brand] = brandCount[brand] ? brandCount[brand] + 1 : 1;
        }
        return brand;
    })

    const optionsWithCount = plainOptions.map(brand => ({
        label: `${brand} (${brandCount[brand]})`,
        value: brand,
    }));

    const checkAll = plainOptions.length === brandCheckList.length;
    const indeterminate = brandCheckList.length > 0 && brandCheckList.length < plainOptions.length;

    const onChangeAllBrand = (e) => {
        const updatedState = e.target.checked ? plainOptions : [];
        setBrandCheckList(updatedState);
        let queryObj = getQueryToObject()
        queryObj.brand = updatedState.join(',')
        if (updatedState.length === 0) {
            delete queryObj.brand
        }
        setQuery(queryObj);
    };

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
    if (params.category !== 'san-pham-moi') {
        queryFilterTxt = `filters[idCategories][slug]=${params.slug}`
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

    return (
        <div className='container mt-3'>
            <Row justify="space-between">
                <Col span={12}>
                    <h2 className='fw-bold'>{data[0]?.attributes?.idCategories?.data[0]?.attributes?.name} <small style={{ fontSize: '14px', opacity: '0.8' }}>(Tổng {data.length} sản phẩm)</small></h2>
                </Col>
            </Row>
            <Row justify={'space-between'}>
                <Col span={5}>
                    <h5 className='text-center p-2' style={{ border: '1px solid #d9d9d9', borderRadius: '10px' }} >Lọc sản phẩm</h5>
                    <div>
                        <h5 className='fw-bold mt-4'>HÃNG SẢN XUẤT</h5>
                        <div>
                            <Checkbox indeterminate={indeterminate} onChange={onChangeAllBrand} checked={checkAll}>
                                Check all
                            </Checkbox>
                            <Row className='my-3'>
                                <CheckboxGroup options={optionsWithCount} value={brandCheckList} onChange={onChangeBrand} />
                            </Row>
                        </div>
                    </div>
                    <div>
                        <h5 className='fw-bold mt-4'>Sắp xếp</h5>
                        <Select
                            value={sortPrice}
                            onChange={handleSortPricechange}
                            options={[{
                                label: 'Giá tăng dần',
                                value: 'asc'
                            }, {
                                label: 'Giá giảm dần',
                                value: 'desc'
                            }]}
                        ></Select>
                    </div>
                    <div className='mt-4'>
                        <h5 style={{ fontWeight: 'bold' }}>KHOẢNG GIÁ</h5>
                        <Form
                            name="price-form"
                            onFinish={handleMinMaxChange}
                            form={formPriceCondition}
                        >
                            <Row justify={'center'}>
                                <Col span={11}>
                                    <Form.Item
                                        name="minPrice"
                                    ><Input placeholder='Giá thấp nhất' />
                                    </Form.Item>
                                </Col>
                                <Col span={2} style={{ textAlign: 'center', marginTop: 5 }}>
                                    <ArrowRightOutlined />
                                </Col>
                                <Col span={11}>
                                    <Form.Item
                                        name="maxPrice"
                                    ><Input placeholder='Giá cao nhất' />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Button htmlType='submit'>Lọc</Button>
                            <Button onClick={handleResetFilter} style={{ marginLeft: '15px' }} >Xóa Lọc</Button>
                        </Form>
                    </div>
                </Col >
                <Col span={18}>
                    <ProductList query={queryFilterTxt} />
                </Col >
            </Row >
        </div >
    );
};

export default ProductCateMore;