import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SellerNavbar from "../Shared/SellerNavbar";
import DashBoard from "./DashBoard";
import SellerProductForm from "./SellerProductForm";
import OrdersDashboard from "./OrdersDashboard";

// Customer end wale existing components ko yahan reuse kiya hai
import Login from "../../Shared/LogIn";
import Register from "../../Shared/Register";
import Footer from "../../Shared/Footer";
import SellerProducts from "./SellerProducts";

function SellerLayout() {
    return (
        /* 🚀 FIX: Added a full-height flex column container to perfectly ground the footer */
        <div className="flex flex-col min-h-screen bg-slate-50/60 font-sans antialiased">

            {/* 🏪 Seller Layout ka Navbar hamesha top par barqarar rahega */}
            <SellerNavbar />

            {/* 🚀 FIX: Wrapped Routes in a main tag with 'flex-grow' to push the footer down organically */}
            <main className="flex-grow w-full">
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="dashboard" replace />}
                    />

                    <Route path="dashboard" element={<DashBoard />} />
                    <Route path="products" element={<SellerProductForm />} />
                    <Route path="orders" element={<OrdersDashboard />} />
                    <Route path="all-products" element={<SellerProducts />} />

                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Routes>
            </main>

            {/* 🎯 Footer will now absolutely attach to the viewport bottom layer or scroll boundary context */}
            <Footer />
        </div>
    );
}

export default SellerLayout;