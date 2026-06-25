import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash, FaEnvelope, FaLock, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { Loader2 } from "lucide-react";

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    // Structured Credentials Form State
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Request Feedback Status Handles
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Detect if logging into Merchant Central or Customer Front-End Portal
    const isSeller = window.location.pathname.includes("seller");

    // Unified input state mutation listener
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(""); // Instantly clear error blocks on user type action
    };

    // Authentication transaction dispatch submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError("Please fill out all mandatory credential fields.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            // Pointing directly to the integrated custom auth layout pathway
            const apiUrl = "http://localhost:5000/api/product/auth/login";

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    role: isSeller ? "seller" : "customer"
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Invalid credentials supplied.");
            }

            setSuccess(data.message || "Authentication successful! Redirecting...");

            // Set persistence tokens safe configuration
            if (data.token) {
                localStorage.setItem(isSeller ? "sellerToken" : "userToken", data.token);
            }

            // Route execution redirect window timer
            setTimeout(() => {
                if (isSeller) {
                    navigate("/seller/dashboard");
                } else {
                    navigate("/home");
                }
            }, 1500);

        } catch (err) {
            setError(err.message || "Network validation failed. Verify your server script engine status.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 font-sans antialiased selection:bg-gray-100 selection:text-gray-600">
            <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-5xl w-full grid md:grid-cols-12 min-h-[620px] border border-gray-100">

                {/* 🟠 LEFT COLUMN: Branding Identity Grid Panel */}
                <div className="hidden md:flex md:col-span-5 flex-col justify-between bg-gradient-to-br from-pink-500 to-pink-600 text-white p-10 relative overflow-hidden">
                    {/* Atmospheric Lighting Shapes */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-pink-400 rounded-full blur-2xl opacity-40 -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-700 rounded-full blur-3xl opacity-30 -ml-16 -mb-16"></div>

                    {/* Top Context Category Tags */}
                    <div className="relative z-10">
                        <span className="text-xs uppercase tracking-widest bg-pink-700/40 text-pink-100 px-3 py-1 rounded-full font-semibold">
                            {isSeller ? "Operations Console" : "Personal Hub"}
                        </span>
                        <h1 className="text-4xl font-extrabold tracking-tight mt-4 leading-tight">
                            Welcome Back
                        </h1>
                        <p className="mt-3 text-sm text-pink-100/90 leading-relaxed">
                            {isSeller
                                ? "Log in to access your administrative merchant storefront dashboard controls."
                                : "Log in to keep track of premium items, exclusive user vouchers, and express checkout configurations."}
                        </p>
                    </div>

                    {/* Center Placed Graphic Identity Asset */}
                    <div className="relative z-10 my-auto py-6">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
                            className="w-56 mx-auto drop-shadow-2xl object-contain animate-pulse [animation-duration:8s]"
                            alt="Secure Gate Access Visual Vector Artwork"
                        />
                    </div>

                    {/* Footer Trademark Content Placement */}
                    <div className="relative z-10 text-xs text-pink-200/80 tracking-wide">
                        &copy; 2026 Daraz Platform Architecture. All Rights Reserved.
                    </div>
                </div>

                {/* ⚪ RIGHT COLUMN: High-Fidelity Access Identity Control Form */}
                <div className="md:col-span-7 p-8 lg:p-14 flex flex-col justify-center bg-white relative">

                    {/* Component Title Header Setup */}
                    <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 tracking-tight">
                            {isSeller ? "Merchant Account Access" : "Secure Account Login"}
                        </h2>
                        <p className="text-slate-400 text-sm mt-1.5">Provide account email credentials to gain database system entry.</p>
                    </div>

                    {/* Status Operational Feedback Notifications */}
                    {error && (
                        <div className="mt-5 p-3.5 text-xs text-pink-800 bg-red-50 rounded-xl border border-red-100 font-medium flex items-center gap-2.5 animate-fadeIn">
                            <FaExclamationTriangle className="text-red-500 text-base shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}
                    {success && (
                        <div className="mt-5 p-3.5 text-xs text-pink-800 bg-emerald-50 rounded-xl border border-emerald-100 font-medium flex items-center gap-2.5 animate-fadeIn">
                            <FaCheckCircle className="text-emerald-500 text-base shrink-0" />
                            <span>{success}</span>
                        </div>
                    )}

                    {/* Main Interaction Form Layer */}
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4.5">

                        {/* Email Capture Input Wrapper */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600 tracking-wide">Account Email Address</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors">
                                    <FaEnvelope className="text-sm" />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                    className="w-full border border-slate-200 pl-11 pr-4 py-3.5 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 bg-slate-50/50 focus:bg-white transition-all duration-200"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Password Capture Input Wrapper */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-semibold text-slate-600 tracking-wide">Security Password</label>
                                <button type="button" className="text-xs text-pink-600 hover:text-pink-700 font-medium hover:underline">
                                    Forgot Password?
                                </button>
                            </div>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors">
                                    <FaLock className="text-sm" />
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full border border-slate-200 pl-11 pr-12 py-3.5 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 bg-slate-50/50 focus:bg-white transition-all duration-200 font-mono"
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 active:scale-95 transition-all p-1 rounded"
                                >
                                    {showPassword ? <FaEyeSlash className="text-base" /> : <FaEye className="text-base" />}
                                </button>
                            </div>
                        </div>

                        {/* Dispatch Access Action Buttons */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 disabled:from-slate-400 disabled:to-slate-400 text-white py-3.5 px-4 rounded-xl text-sm font-semibold tracking-wide shadow-lg shadow-pink-600/15 active:scale-[0.99] disabled:scale-100 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center gap-2.5 mt-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                                    <span>Verifying Profile Access...</span>
                                </>
                            ) : (
                                <span>Authorize Profile Entrance</span>
                            )}
                        </button>
                    </form>

                    {/* Divider Block Separator Layer */}
                    <div className="relative my-7 text-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100"></div>
                        </div>
                        <span className="relative bg-white px-4 text-xs font-semibold text-slate-400 tracking-wider uppercase">Or Secure OAuth Sign-In</span>
                    </div>

                    {/* Social Authentication Access Providers */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="border border-slate-200 py-3 rounded-xl flex items-center justify-center gap-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98]">
                            <FaGoogle className="text-pink-500 text-base" /> Google
                        </button>
                        <button className="border border-slate-200 py-3 rounded-xl flex items-center justify-center gap-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98]">
                            <FaFacebookF className="text-blue-600 text-base" /> Facebook
                        </button>
                    </div>

                    {/* Redirection Navigation Link Anchor Point */}
                    <p className="text-center mt-8 text-sm text-slate-500">
                        Do not possess an active portal user account yet?
                        <Link
                            to={isSeller ? "/seller/register" : "/register"}
                            className="text-pink-600 font-bold ml-1.5 hover:text-pink-700 hover:underline inline-flex items-center transition-all"
                        >
                            Create Account Identity
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;