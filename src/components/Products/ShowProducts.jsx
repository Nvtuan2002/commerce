import ProductLatest from './ProductLatest';
import ProductsCate from './ProductsCate';


export const ShowProducts = () => {


    return (
        <>
            <ProductLatest></ProductLatest>
            <ProductsCate category='Laptop-gaming' />
            <ProductsCate category='man-hinh' />
        </>
    )
}