import {
    createBrowserRouter,
} from "react-router-dom";
import Layout from '../components/Layout/Layout'
import Home from '../components/Home'
import Products from '../components/Products'
import Product from '../components/Product'
import Cart from '../components/Cart'
import About from "../components/About";
import Checkout from "../components/Checkout";
import Contact from "../components/Contact";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

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
                path: "/product/:id",
                element: <Product />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/checkout",
                element: <Checkout />
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