import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaPhone, FaEnvelope, FaLock, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { Loader2 } from "lucide-react";

function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    // Form Input Fields State
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
    });

    // Request Handling States
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Identify active workspace environment (Seller Central vs Customer Retail)
    const isSeller = window.location.pathname.includes("seller");

    // Unified input change tracking handler
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(""); // Wipe old errors on user type action
    };

    // Client-side authentication submission validation logic
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation Checks
        if (!formData.name || !formData.phone || !formData.email || !formData.password) {
            setError("All mandatory submission fields must be filled completely.");
            return;
        }

        if (formData.password.length < 6) {
            setError("Security restriction: Password must consist of at least 6 characters.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            // Mapping dynamic endpoint through the integrated product route controller
            const apiUrl = "http://localhost:5000/api/product/auth/register";

            const payload = {
                ...formData,
                role: isSeller ? "seller" : "customer"
            };

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Authentication transmission failed.");
            }

            setSuccess(data.message || "Account identity created successfully!");

            // Safe session token initialization
            if (data.token) {
                localStorage.setItem(isSeller ? "sellerToken" : "userToken", data.token);
            }

            // Structured automatic routing timeout sequence
            setTimeout(() => {
                if (isSeller) {
                    navigate("/seller/dashboard");
                } else {
                    navigate("/login");
                }
            }, 2000);

        } catch (err) {
            setError(err.message || "Network layer error. Ensure the backend engine service is fully operational.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 font-sans antialiased selection:bg-orange-100 selection:text-orange-600">
            <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-5xl w-full grid md:grid-cols-12 min-h-[650px] border border-gray-100">

                {/* 🟠 LEFT COLUMN: Dynamic Brand Info Grid Section */}
                <div className="hidden md:flex md:col-span-5 flex-col justify-between bg-gradient-to-br from-pink-500 to-pink-600 text-white p-10 relative overflow-hidden">
                    {/* Decorative Ambient Graphics Layer */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-pink-400 rounded-full blur-2xl opacity-40 -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-700 rounded-full blur-3xl opacity-30 -ml-16 -mb-16"></div>

                    {/* Branding Top Context Header */}
                    <div className="relative z-10">
                        <span className="text-xs uppercase tracking-widest bg-pink-700/40 text-pink-100 px-3 py-1 rounded-full font-semibold">
                            {isSeller ? "Merchant Portal" : "Consumer Hub"}
                        </span>
                        <h1 className="text-4xl font-extrabold tracking-tight mt-4 leading-tight">
                            {isSeller ? "Daraz Seller Central" : "Experience Excellence"}
                        </h1>
                        <p className="mt-3 text-sm text-pink-100/90 leading-relaxed">
                            {isSeller
                                ? "Register your retail enterprise and gain exposure to millions of verified consumers across the region."
                                : "Create your primary account identity to unlock unlimited catalog interactions and premium checkouts."}
                        </p>
                    </div>

                    {/* Centralized High-Quality Graphic Placement */}
                    <div className="relative z-10 my-auto py-6">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4290/4290854.png"
                            className="w-56 mx-auto drop-shadow-2xl object-contain animate-pulse [animation-duration:8s]"
                            alt="Secure Authentication Interface Graphic"
                        />
                    </div>

                    {/* Footer Legal Sub-note Placement */}
                    <div className="relative z-10 text-xs text-pink-200/80 tracking-wide">
                        &copy; 2026 Daraz Platform Architecture. All Rights Reserved.
                    </div>
                </div>

                {/* ⚪ RIGHT COLUMN: High-Fidelity Interactive Access Form Grid Section */}
                <div className="md:col-span-7 p-8 lg:p-14 flex flex-col justify-center bg-white relative">

                    {/* Workspace Segment Title Indicators */}
                    <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 tracking-tight">
                            {isSeller ? "Create Merchant Account" : "Create Consumer Account"}
                        </h2>
                        <p className="text-slate-400 text-sm mt-1.5">Provide valid credentials to initialize system onboarding.</p>
                    </div>

                    {/* Modern Operational Feedback Alert Notifications */}
                    {error && (
                        <div className="mt-5 p-3.5 text-xs text-pink-800 bg-red-50 rounded-xl border border-red-100 font-medium flex items-center gap-2.5 animate-fadeIn">
                            <FaExclamationTriangle className="text-pink-500 text-base shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}
                    {success && (
                        <div className="mt-5 p-3.5 text-xs text-pink-800 bg-emerald-50 rounded-xl border border-emerald-100 font-medium flex items-center gap-2.5 animate-fadeIn">
                            <FaCheckCircle className="text-pink-500 text-base shrink-0" />
                            <span>{success}</span>
                        </div>
                    )}

                    {/* Registration Capture Structure */}
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4.5">

                        {/* Full Name Form Field Input Context Container */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600 tracking-wide">Full Legal Name</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors">
                                    <FaUser className="text-sm" />
                                </span>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. John Doe"
                                    className="w-full border border-slate-200 pl-11 pr-4 py-3.5 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 bg-slate-50/50 focus:bg-white transition-all duration-200"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Phone Number Form Field Input Context Container */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600 tracking-wide">Contact Phone Number</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink   -500 transition-colors">
                                    <FaPhone className="text-sm" />
                                </span>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="e.g. +923001234567"
                                    className="w-full border border-slate-200 pl-11 pr-4 py-3.5 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 bg-slate-50/50 focus:bg-white transition-all duration-200"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Email Address Form Field Input Context Container */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600 tracking-wide">Corporate Email Address</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink   -500 transition-colors">
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

                        {/* Password Form Field Input Context Container */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600 tracking-wide">Security Access Password</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors">
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

                        {/* Action Control Dispatch Execution Trigger */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 disabled:from-slate-400 disabled:to-slate-400 text-white py-3.5 px-4 rounded-xl text-sm font-semibold tracking-wide shadow-lg shadow-pink-600/15 active:scale-[0.99] disabled:scale-100 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center gap-2.5 mt-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                                    <span>Verifying Transmission...</span>
                                </>
                            ) : (
                                <span>Complete Registration Setup</span>
                            )}
                        </button>
                    </form>

                    {/* Redirection Navigation Link Anchor Point */}
                    <p className="text-center mt-8 text-sm text-slate-500">
                        Already possess an established portal account?
                        <Link
                            to={isSeller ? "/seller/login" : "/login"}
                            className="text-pink-600 font-bold ml-1.5 hover:text-pink-700 hover:underline inline-flex items-center transition-all"
                        >
                            Log In Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;