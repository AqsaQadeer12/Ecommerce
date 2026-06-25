import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import SearchResults from "./Component/Shared/SearchResults";

// Layouts
import Navbar from "./Component/Shared/Navbar";
import Footer from "./Component/Shared/Footer";
import SellerNavbar from "./Component/Seller/Shared/SellerNavbar";

// Customer Pages
import MainPage from "./Component/MainPage";
import FlashSale from "./Component/FlashSale";
import Category from "./Component/Category";
import Product from "./Component/Product";
import ProductDetails from "./Component/Shared/ProductDetails";
import MainPageProducts from "./Component/MainPageProducts";
import Cart from "./Component/Shared/Cart";
import OrderHistory from "./Component/OrderHistory";
import SplashScreen from "./Component/SplashScreen";
import Login from "./Component/Shared/LogIn";
import Register from "./Component/Shared/Register";
import HelpAndSupport from "./Component/HelpAndSupport";

// Seller Pages
import SaveMoreOnApp from "./Component/Seller/Pages/SaveMoreOnApp";
import SellOnDaraz from "./Component/SellOnDaraz";
import DashBoard from "./Component/Seller/Pages/DashBoard";
import OrdersDashboard from "./Component/Seller/Pages/OrdersDashboard";
import SellerProductForm from "./Component/Seller/Pages/SellerProductForm";
import SellerProducts from "./Component/Seller/Pages/SellerProducts"; // ✅ IMPORT ADDED

import { CartProvider } from "./Component/Shared/CartContext";

/* ================= HOME ================= */
function Home() {
  return (
    <>
      <MainPage />
      <FlashSale />
      <Category />
      <Product />
    </>
  );
}

/* ================= LAYOUT ================= */
function AppLayout() {
  const location = useLocation();

  const isSplash = location.pathname === "/";
  const isSellerPage = location.pathname.startsWith("/seller");

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">

      {/* Header */}
      {!isSplash && (
        isSellerPage ? <SellerNavbar /> : <Navbar />
      )}

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>

          {/* Splash */}
          <Route path="/" element={<SplashScreen />} />

          {/* Home */}
          <Route path="/home" element={<Home />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Product */}
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Categories */}
          <Route path="/banner/:id" element={<MainPageProducts />} />
          <Route path="/category/:id" element={<MainPageProducts />} />

          {/* Cart */}
          <Route path="/cart" element={<Cart />} />

          {/* Orders */}
          <Route path="/orders" element={<OrderHistory />} />

          {/* Support */}
          <Route path="/save-more-on-app" element={<SaveMoreOnApp />} />
          <Route path="/help-and-support" element={<HelpAndSupport />} />

          {/* Other */}
          <Route path="/sell-on-daraz" element={<SellOnDaraz />} />
          <Route path="/search/:keyword" element={<SearchResults />} />

          {/* ================= SELLER ROUTES ================= */}

          <Route path="/seller/dashboard" element={<DashBoard />} />

          <Route path="/seller/products" element={<SellerProductForm />} />

          <Route path="/seller/orders" element={<OrdersDashboard />} />

          <Route path="/seller/login" element={<Login />} />

          <Route path="/seller/register" element={<Register />} />

          {/* ✅ NEW PAGE FOR ACTIVE STORE ITEMS */}
          <Route
            path="/seller/all-products"
            element={<SellerProducts />}
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="p-20 text-center font-bold text-2xl">
                404 - Page Not Found
              </div>
            }
          />

        </Routes>
      </main>

      {/* Footer */}
      {!isSplash && <Footer />}
    </div>
  );
}

/* ================= APP ================= */
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;