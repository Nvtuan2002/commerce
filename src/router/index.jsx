import {
    createBrowserRouter,
} from "react-router-dom";
import BaseLayout from '@/components/Layout/Layout'
import PrivateRoute from '@/router/PrivateRouter'
import Home from '@/pages/Home/Home'
import Products from '@/pages/Products/Products'
import ProductDetail from '@/components/Products/ProductDetail'
import Categories from "@/components/Products/Categories";
import Cart from '@/pages/Cart'
import About from "@/pages/About";
import Checkout from "@/pages/Checkout";
import Contact from "@/pages/Contact";

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
        ]
    },
]);