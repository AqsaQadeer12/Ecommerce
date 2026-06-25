import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Store, Menu, X, LayoutDashboard, ShoppingBag, ShoppingCart, User, LogOut, LogIn, AlertTriangle } from "lucide-react";

function SellerNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    const closeMenu = () => setMenuOpen(false);

    // 🚀 Authentication Evacuation Handler
    const handleLogoutConfirm = () => {
        // 1. Wipe out security access token signatures from active browser storage memory
        localStorage.removeItem("sellerToken");
        localStorage.removeItem("userToken");

        // 2. Shut off modal context layouts
        setShowLogoutModal(false);
        closeMenu();

        // 3. Dispatch safe fallback routing navigation to the primary customer portal homepage
        navigate("/");
    };

    return (
        <>
            <header className="sticky top-0 z-50 w-full bg-pink-600 shadow-md font-sans antialiased">
                <div className="w-[95%] max-w-[1400px] mx-auto">
                    <div className="flex items-center justify-between py-4">

                        {/* 🏪 LOGO */}
                        <div
                            className="flex items-center gap-2 text-white font-black text-xl cursor-pointer tracking-tight active:scale-[0.98] transition-transform"
                            onClick={() => navigate("/seller/dashboard")}
                        >
                            <Store className="w-6 h-6" />
                            <span>Shopping<span className="text-pink-200 font-normal tracking-wide ml-0.5">Hub</span></span>
                        </div>

                        {/* 📱 MOBILE MENU BUTTON */}
                        <button
                            className="lg:hidden text-white focus:outline-none p-1 hover:bg-pink-700/50 rounded-lg transition-colors"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>

                        {/* 💻 DESKTOP NAV LINKS */}
                        <div className="hidden lg:flex items-center gap-6 text-white text-sm font-semibold">
                            <NavLink to="/seller/dashboard" className={({ isActive }) => isActive ? "text-pink-200 underline underline-offset-4" : "hover:text-pink-100 transition-colors"}>
                                Dashboard
                            </NavLink>
                            <NavLink to="/seller/products" className={({ isActive }) => isActive ? "text-pink-200 underline underline-offset-4" : "hover:text-pink-100 transition-colors"}>
                                Products
                            </NavLink>
                            <NavLink to="/seller/orders" className={({ isActive }) => isActive ? "text-pink-200 underline underline-offset-4" : "hover:text-pink-100 transition-colors"}>
                                Orders
                            </NavLink>
                            <NavLink to="/seller/login" className={({ isActive }) => isActive ? "text-pink-200 underline underline-offset-4" : "hover:text-pink-100 transition-colors"}>
                                Log In
                            </NavLink>
                            <NavLink to="/seller/register" className={({ isActive }) => isActive ? "text-pink-200 underline underline-offset-4" : "hover:text-pink-100 transition-colors"}>
                                Sign Up
                            </NavLink>

                            <div className="h-4 w-px bg-pink-400 mx-1"></div>

                            {/* Trigger Modal Interface View */}
                            <button
                                onClick={() => setShowLogoutModal(true)}
                                className="flex items-center gap-1.5 hover:bg-pink-700 text-white font-bold bg-pink-700/40 px-3 py-1.5 rounded-lg transition-all active:scale-[0.97]"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 📱 MOBILE MENU CONTAINER */}
                <div className={`lg:hidden overflow-hidden transition-all duration-300 bg-pink-700 ${menuOpen ? "max-h-[400px] border-t border-pink-500/30" : "max-h-0"}`}>
                    <div className="px-6 py-4 flex flex-col gap-4 text-white text-sm font-medium">
                        <NavLink to="/seller/dashboard" className="flex items-center gap-3 py-1 hover:text-pink-200 transition-colors" onClick={closeMenu}>
                            <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </NavLink>
                        <NavLink to="/seller/products" className="flex items-center gap-3 py-1 hover:text-pink-200 transition-colors" onClick={closeMenu}>
                            <ShoppingBag className="w-4 h-4" /> Products
                        </NavLink>
                        <NavLink to="/seller/orders" className="flex items-center gap-3 py-1 hover:text-pink-200 transition-colors" onClick={closeMenu}>
                            <ShoppingCart className="w-4 h-4" /> Orders
                        </NavLink>
                        <NavLink to="/seller/login" className="flex items-center gap-3 py-1 hover:text-pink-200 transition-colors" onClick={closeMenu}>
                            <LogIn className="w-4 h-4" /> Log IN
                        </NavLink>
                        <NavLink to="/seller/register" className="flex items-center gap-3 py-1 hover:text-pink-200 transition-colors" onClick={closeMenu}>
                            <User className="w-4 h-4" /> Sign UP
                        </NavLink>

                        {/* Mobile Logout Dispatcher Button Anchor */}
                        <button
                            onClick={() => { setShowLogoutModal(true); }}
                            className="flex items-center gap-3 py-2 text-left border-t border-pink-600/50 mt-2 text-pink-200 hover:text-white transition-colors"
                        >
                            <LogOut className="w-4 h-4" /> Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* 🚨 HIGH-FIDELITY MODAL OVERLAY: Confirmation Dialog Block */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">

                    {/* Centered Modal White Card Wrapper Container */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-100 transform scale-100 transition-transform duration-200">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-red-50 rounded-xl text-red-500 shrink-0">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div className="space-y-1.5">
                                <h3 className="text-lg font-bold text-slate-800 tracking-tight">Confirm Secure Logout</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    Are you sure you want to terminate your current workspace session? You will need to provide account authorization tokens to log in again.
                                </p>
                            </div>
                        </div>

                        {/* Action Triggers Controls Layer Wrapper */}
                        <div className="flex items-center justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/80 active:scale-[0.98] rounded-xl transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleLogoutConfirm}
                                className="px-5 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] rounded-xl shadow-lg shadow-red-600/10 transition-all"
                            >
                                Yes, Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SellerNavbar;