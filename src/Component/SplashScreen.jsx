import React from "react";
import { useNavigate } from "react-router-dom";

function SplashScreen() {
    const navigate = useNavigate();

    return (
        <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">

            {/* ANIMATED BACKGROUND */}
            <div className="absolute inset-0 bg-gradient animate-bg"></div>

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* FLOATING EFFECTS */}
            <div className="absolute w-72 h-72 bg-pink-400/20 rounded-full top-10 left-10 blur-3xl animate-pulse"></div>
            <div className="absolute w-80 h-80 bg-white/10 rounded-full bottom-10 right-10 blur-2xl animate-bounce"></div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 text-center text-white px-6 max-w-2xl">

                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                    Welcome to the <span className="text-pink-400">Best Shopping Hub</span>
                </h1>

                <p className="mt-4 text-lg md:text-xl text-gray-200">
                    Discover amazing products, connect with sellers, and enjoy a seamless shopping experience.
                </p>

                {/* BUTTONS */}
                <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">

                    <button
                        onClick={() => navigate("/home")}
                        className="px-8 py-3 rounded-full bg-pink-500 hover:bg-pink-600 transition font-semibold shadow-lg"
                    >
                        Continue as Customer
                    </button>

                    <button
                        onClick={() => navigate("/seller/dashboard")}
                        className="px-8 py-3 rounded-full bg-white text-pink-600 hover:bg-pink-100 transition font-semibold shadow-lg"
                    >
                        Continue as Seller
                    </button>

                </div>

                {/* SMALL TEXT */}
                <p className="mt-6 text-sm text-gray-300">
                    Fast • Secure • Trusted Marketplace
                </p>

            </div>

        </div>
    );
}

export default SplashScreen;