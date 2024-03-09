import {
    createBrowserRouter,
} from "react-router-dom";
import { lazy } from "react";
const BaseLayout = lazy(() => import('@/components/Layout/Layout'))
const PrivateRoute = lazy(() => import('@/router/PrivateRouter'))
const Home = lazy(() => import('@/pages/Home/Home'))
const Products = lazy(() => import('@/pages/Products/Products'))
const ProductDetail = lazy(() => import('@/components/Products/ProductDetail'))
const Categories = lazy(() => import("@/components/Products/Categories"))
const Cart = lazy(() => import('@/pages/Cart'))
const About = lazy(() => import("@/pages/About"))
const Checkout = lazy(() => import("@/pages/Checkout"))
const Contact = lazy(() => import("@/pages/Contact"))
const OrderDetail = lazy(() => import("@/pages/Order/OrderDetail"))
const OrderList = lazy(() => import("@/pages/Order/OrderList"))

export const router = createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout />,
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
                path: "/category/:category",
                element: <Categories />
            },
            {
                path: "/tim",
                element: <Categories />
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
            {
                path: "/order/:id",
                element: <PrivateRoute><OrderDetail /></PrivateRoute>
            },
            {
                path: "/list-order",
                element: <PrivateRoute><OrderList /></PrivateRoute>
            }
        ]
    },
]);