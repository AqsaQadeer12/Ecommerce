import React from "react";
import { FaAppStoreIos, FaGooglePlay, FaQrcode, FaShieldAlt, FaPercent, FaTruck, FaBell } from "react-icons/fa";

function SaveMoreOnApp() {
    // App features data array
    const features = [
        {
            icon: <FaPercent className="text-pink-600 text-3xl" />,
            title: "Exclusive App-Only Deals",
            desc: "Get an extra 10% off on your first app purchase and access flash sales 1 hour before everyone else."
        },
        {
            icon: <FaBell className="text-pink-600 text-3xl" />,
            title: "Instant Price Drop Alerts",
            desc: "Add items to your wishlist and receive real-time push notifications when prices drop or items go on sale."
        },
        {
            icon: <FaTruck className="text-pink-600 text-3xl" />,
            title: "Free & Faster Shipping",
            desc: "App users enjoy free delivery on selected products and priority order processing facilities."
        },
        {
            icon: <FaShieldAlt className="text-pink-600 text-3xl" />,
            title: "100% Secure Checkout",
            desc: "Experience biometric login (FaceID/TouchID) and ultra-secure instant one-click payment gateways."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">

            {/* 🚀 HERO SECTION */}
            <section className="relative overflow-hidden bg-gradient-to-r from-pink-600 to-red-500 py-16 md:py-24 text-white">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

                <div className="w-[90%] max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Content */}
                    <div className="space-y-6 text-center md:text-left z-10">
                        <span className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">
                            🔥 Ultimate Shopping Experience
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                            Shop Smarter, <br />
                            <span className="text-yellow-300">Save Much More!</span>
                        </h1>
                        <p className="text-base md:text-lg text-pink-50 font-medium max-w-xl">
                            Download the official app today to lock in lower prices, track orders live, and unlock exclusive vouchers up to Rs. 5,000.
                        </p>

                        {/* App Download Buttons */}
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                            <a
                                href="https://play.google.com"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 bg-black hover:bg-gray-900 px-5 py-3 rounded-xl shadow-lg transition-transform active:scale-95 group"
                            >
                                <FaGooglePlay className="text-2xl text-green-400 group-hover:scale-110 transition-transform" />
                                <div className="text-left">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">GET IT ON</p>
                                    <p className="text-sm font-bold mt-1">Google Play</p>
                                </div>
                            </a>

                            <a
                                href="https://www.apple.com/app-store"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 bg-black hover:bg-gray-900 px-5 py-3 rounded-xl shadow-lg transition-transform active:scale-95 group"
                            >
                                <FaAppStoreIos className="text-2xl text-blue-400 group-hover:scale-110 transition-transform" />
                                <div className="text-left">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">DOWNLOAD ON THE</p>
                                    <p className="text-sm font-bold mt-1">App Store</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Interactive App Frame mockup & QR Scan Wrapper */}
                    <div className="flex justify-center items-center relative">
                        {/* Decorative Background Glow */}
                        <div className="absolute w-72 h-72 bg-yellow-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>

                        <div className="bg-white text-gray-900 p-6 md:p-8 rounded-3xl shadow-2xl border border-pink-100 flex flex-col items-center max-w-sm text-center relative z-10">
                            <div className="bg-pink-50 p-4 rounded-2xl mb-4 border border-pink-100">
                                <FaQrcode className="text-pink-600 text-8xl md:text-9xl animate-pulse" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Scan to Download</h3>
                            <p className="text-xs text-gray-500 mt-1 max-w-[200px]">
                                Point your smartphone camera over this code to install the application instantly.
                            </p>
                            <div className="mt-4 inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full">
                                ⭐ Valid for Android & iOS
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* 🏷️ FIRST APP PURCHASE VOUCHER DISPLAY BANNER */}
            <section className="w-[90%] max-w-[1200px] mx-auto -mt-8 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-l-8 border-pink-600 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="md:col-span-2 space-y-1 text-center md:text-left">
                        <h2 className="text-xl md:text-2xl font-black text-gray-900">Welcome App Gift: Extra Rs. 1,000 Off</h2>
                        <p className="text-sm text-gray-500">Copy the coupon code below and apply it on your first check out layout inside the app environment.</p>
                    </div>
                    <div className="flex justify-center md:justify-end">
                        <div className="border-2 border-dashed border-pink-400 bg-pink-50 px-6 py-3 rounded-xl font-mono text-lg font-black tracking-widest text-pink-600 uppercase select-all cursor-pointer hover:bg-pink-100 transition-colors">
                            APPNEW1000
                        </div>
                    </div>
                </div>
            </section>

            {/* ✨ CORE FEATURES GRID */}
            <section className="w-[90%] max-w-[1200px] mx-auto py-16 md:py-24">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                    <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
                        Why Choose Our App?
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 font-medium">
                        Designed for super-fast navigation, heavy discount retention, and seamless order dispatch routines.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feat, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center border border-pink-100">
                                    {feat.icon}
                                </div>
                                <h3 className="text-base font-bold text-gray-900">{feat.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed font-medium">{feat.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 💬 APP STEP BY STEP PREPARATION FOOTER GRID */}
            <section className="bg-gray-900 text-white py-16">
                <div className="w-[90%] max-w-[1200px] mx-auto text-center space-y-8">
                    <h3 className="text-2xl font-bold">Get Started in 3 Easy Steps</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">

                        <div className="space-y-2">
                            <div className="w-10 h-10 rounded-full bg-pink-600 text-sm font-bold flex items-center justify-center mx-auto shadow-md">1</div>
                            <h4 className="text-base font-bold">Download App</h4>
                            <p className="text-xs text-gray-400">Scan QR or find it on App Marketplace ecosystem.</p>
                        </div>

                        <div className="space-y-2">
                            <div className="w-10 h-10 rounded-full bg-pink-600 text-sm font-bold flex items-center justify-center mx-auto shadow-md">2</div>
                            <h4 className="text-base font-bold">Register Account</h4>
                            <p className="text-xs text-gray-400">Sign up using your current active user credentials.</p>
                        </div>

                        <div className="space-y-2">
                            <div className="w-10 h-10 rounded-full bg-pink-600 text-sm font-bold flex items-center justify-center mx-auto shadow-md">3</div>
                            <h4 className="text-base font-bold">Enjoy Discounts</h4>
                            <p className="text-xs text-gray-400">Apply voucher `APPNEW1000` & unlock cheap deals.</p>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
}

export default SaveMoreOnApp;