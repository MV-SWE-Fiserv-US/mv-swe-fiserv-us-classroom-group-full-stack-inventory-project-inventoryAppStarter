import React from "react";
import { createRoot } from "react-dom/client";
import "regenerator-runtime/runtime";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import App from "./components/App";
import Cart from "./components/Cart/Cart";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ItemDescription from "./components/ItemDescription/ItemDescription";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import { AuthProvider } from "./AuthProvider";

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
                element: <App />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/item/:id",
                element: <ItemDescription />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/auth",
                element: <Login />
            }
        ],
    },
]);

const root = createRoot(document.getElementById("root"));
root.render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
);


