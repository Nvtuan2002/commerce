import {
    createBrowserRouter,
} from "react-router-dom";
import Layout from '../components/Layout/Layout'
import PrivateRoute from '../router/PrivateRouter'
import Home from '../pages/Home'
import Products from '../pages/Products/Products'
import ProductDetail from '../pages/Products/ProductDetail'
import Cart from '../pages/Cart'
import About from "../pages/About";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/products",
                element: <Products />
            },
            {
                path: "/product/:slug",
                element: <ProductDetail />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/checkout",
                element: <PrivateRoute>
                    <Checkout />
                </PrivateRoute>
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
        ]
    },
]);