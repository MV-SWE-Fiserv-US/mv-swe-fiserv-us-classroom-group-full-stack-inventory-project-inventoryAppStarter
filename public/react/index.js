import React from "react";
import { createRoot } from 'react-dom/client';
import 'regenerator-runtime/runtime'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import App from './components/App';
import Cart from './components/Cart/Cart';
import Navbar from './components/Navbar/Navbar';
import Footer from "./components/Footer/Footer";


const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Navbar />
                <Outlet />
                <Footer />
            </>
        ),
        children: [
            {
                path: "/",
                element: <App />
            },
            {
                path: "/cart",
                element: <Cart />
            }
        ]
    }
])


const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);