import React from "react";
import { Routes, Route } from "react-router-dom";
import SellerNavbar from "./SellerLayout";
import DashBoard from "./DashBoard";

function SellerLayout() {
    return (
        <>
            {/* <SellerNavbar /> */}
            <DashBoard />
            <Route path="/seller/*" element={<SellerLayout />} />
        </>

    );
}

export default SellerLayout;