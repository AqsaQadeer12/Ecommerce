import React, { useState } from "react";
import {
    FaStore, FaRocket, FaHandshake, FaShieldAlt,
    FaChevronDown, FaCheckCircle, FaChartLine, FaBoxOpen, FaUserCheck
} from "react-icons/fa";

function SellOnDaraz() {
    const [activeFaq, setActiveFaq] = useState(null);

    const metrics = [
        { id: 1, value: "20M+", label: "Active Monthly Customers", icon: <FaUserCheck /> },
        { id: 2, value: "0%", label: "Commission for First 30 Days", icon: <FaStore /> },
        { id: 3, value: "24/7", label: "Seller Support & Training", icon: <FaHandshake /> },
        { id: 4, value: "Rs. 0", label: "Sign Up & Listing Fees", icon: <FaRocket /> },
    ];

    const steps = [
        {
            step: "01",
            title: "Register Your Shop",
            desc: "Create your seller account in less than 2 minutes with valid phone authentication, business details, and a legal bank account mapping structure."
        },
        {
            step: "02",
            title: "List Premium Products",
            desc: "Upload item listings completely free via our advanced multi-media bulk publisher matrix tool inside your newly unlocked vendor dashboard panel."
        },
        {
            step: "03",
            title: "Receive Orders & Ship",
            desc: "When customers match transactions, comfortably pack products and drop them at fulfillment centers or pick our automated warehouse shipping pipeline."
        },
        {
            step: "04",
            title: "Get Swift Payments",
            desc: "Receive safe, direct weekly deposit funds mapped securely inside your connected banking setup immediately upon verified target fulfillment arrival."
        }
    ];

    const faqs = [
        { q: "How much does it cost to sell products on this platform?", a: "Account registration and baseline product listing operations are completely free! There are absolutely no hidden registration setup fees. Only tiny categorical dynamic referral commission parameters execute whenever successful sales complete." },
        { q: "What files or identification documents do I need to prepare?", a: "To complete active store legal validation layers successfully, please have your valid Government ID (CNIC/Passport/Business Tax Registration) and clear matching bank account statement credentials ready." },
        { q: "When and how do I receive payments for fulfilled orders?", a: "Revenue amounts from successful delivery checkpoints process directly into automated weekly financial disbursements deposited straight to your linked bank account." }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800">

            {/* 🚀 HERO SECTION (Featuring dynamic glassmorphism and animated text entrance layers) */}
            <div className="relative bg-gradient-to-br from-pink-600 via-pink-500 to-red-600 overflow-hidden py-20 lg:py-32 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(254,240,138,0.15),transparent_50%)] animate-pulse" />

                <div className="w-[90%] max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                    <div className="lg:col-span-7 space-y-6 text-center lg:text-left animate-fadeIn">
                        <span className="bg-white/10 backdrop-blur-md text-yellow-200 text-xs font-black tracking-widest px-4 py-2 rounded-full border border-white/10 uppercase shadow-inner">
                            ✨ Open For Global Omnichannel Registration
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                            Launch Your Brand to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-300 to-white">
                                Millions of Buyers
                            </span>
                        </h1>
                        <p className="text-pink-50 text-base sm:text-lg font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed opacity-90">
                            Partner with the region’s premier e-commerce marketplace engine. Unlock automated logistic networks, immediate payouts, and world-class optimization support.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <button className="bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-orange-950 font-black px-8 py-4 rounded-xl shadow-xl hover:shadow-yellow-400/20 active:scale-95 transition-all transform duration-200 tracking-wide text-sm uppercase">
                                Start Selling Today
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm font-bold px-8 py-4 rounded-xl active:scale-95 transition-all duration-200 text-sm tracking-wide">
                                Watch Tutorial Video
                            </button>
                        </div>
                    </div>

                    {/* Quick-Apply Registration Floating Container Card */}
                    <div className="lg:col-span-5 bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-800 border border-slate-100 transform hover:-translate-y-1 transition-transform duration-300 animate-fadeIn delay-200">
                        <div className="mb-6">
                            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                                <FaStore className="text-pink-500" /> Create Vendor Shop
                            </h3>
                            <p className="text-xs text-slate-400 font-semibold mt-1">Get verified and start setting up configurations instantly.</p>
                        </div>
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Mobile Phone Number</label>
                                <input type="tel" placeholder="+92 300 0000000" className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none text-sm font-medium focus:border-orange-500 transition-colors bg-slate-50" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Desired Shop Name</label>
                                <input type="text" placeholder="e.g., Premium Global Tech Store" className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none text-sm font-medium focus:border-orange-500 transition-colors bg-slate-50" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Account Type</label>
                                    <select className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none text-sm font-semibold focus:border-orange-500 transition-colors bg-slate-50 text-slate-600">
                                        <option>Individual</option>
                                        <option>Corporate / LLC</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Primary Category</label>
                                    <select className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none text-sm font-semibold focus:border-orange-500 transition-colors bg-slate-50 text-slate-600">
                                        <option>Electronics</option>
                                        <option>Fashion & Apparel</option>
                                        <option>Home & Living</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5 pt-2">
                                <input type="checkbox" id="terms" className="mt-1 rounded border-slate-300 text-pink-600 focus:ring-pink-500" required />
                                <label htmlFor="terms" className="text-xs text-slate-400 font-medium leading-normal">
                                    I completely read, agree, and pledge adherence to the marketplace operational policy guidelines.
                                </label>
                            </div>
                            <button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white font-black py-3.5 rounded-xl shadow-lg hover:shadow-pink-600/20 transition-all active:scale-[0.98] text-xs uppercase tracking-widest pt-4">
                                Verify & Proceed Setup
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* 📊 ANALYTICS METRIC PANEL MAPPING GRID */}
            <div className="w-[90%] max-w-[1400px] mx-auto -mt-10 relative z-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {metrics.map((item) => (
                        <div key={item.id} className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-5 group hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center text-xl shrink-0 group-hover:bg-pink-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                                {item.icon}
                            </div>
                            <div>
                                <h4 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{item.value}</h4>
                                <p className="text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-wide">{item.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 🛠️ STEP-BY-STEP INTEGRATED INSTRUCTION PIPELINE */}
            <div className="w-[90%] max-w-[1400px] mx-auto py-20 lg:py-28">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                    <span className="text-orange-600 font-black text-xs uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-md">Operational Guide</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">4 Simple Steps to Success</h2>
                    <p className="text-slate-400 font-medium text-sm sm:text-base leading-relaxed">
                        Going live takes only a few quick steps. Follow this straightforward breakdown to immediately begin dispatching logistics.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {steps.map((item, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative overflow-hidden">
                            <div className="absolute top-0 right-0 text-7xl font-black text-slate-50 select-none group-hover:text-pink-50 transition-colors pointer-events-none pr-4 pt-1">
                                {item.step}
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center text-sm font-black mb-6 shadow-md relative z-10">
                                {item.step}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-pink-600 transition-colors relative z-10">
                                {item.title}
                            </h3>
                            <p className="text-xs text-slate-400 font-medium leading-relaxed flex-1 relative z-10">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 🛡️ BENEFITS MATRIX GRID (Features side-by-side presentation layer) */}
            <div className="bg-slate-900 text-white py-20 lg:py-28 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(239,68,68,0.1),transparent_40%)]" />

                <div className="w-[90%] max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-5 space-y-5">
                        <span className="text-yellow-300 font-black text-xs uppercase tracking-widest bg-white/10 px-3 py-1 rounded-md backdrop-blur-sm">Exclusive Seller Privileges</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Why Smart Sellers Choose Our Platform</h2>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed">
                            We equip you with enterprise-grade scaling infrastructure out of the box, letting you focus on product curation while we handle multi-channel logistics.
                        </p>
                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-3 text-sm font-bold text-slate-200">
                                <FaCheckCircle className="text-green-400 shrink-0 text-base" /> Zero hidden multi-vendor platform maintenance fee parameters.
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold text-slate-200">
                                <FaCheckCircle className="text-green-400 shrink-0 text-base" /> Free integrated shipping label printing and pickup mechanisms.
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold text-slate-200">
                                <FaCheckCircle className="text-green-400 shrink-0 text-base" /> Dedicated support managers for high-volume accounts.
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 space-y-3">
                            <FaChartLine className="text-3xl text-yellow-300" />
                            <h4 className="text-lg font-bold">Advanced Analytics Metrics</h4>
                            <p className="text-xs text-slate-400 font-medium leading-relaxed">Monitor inventory, click conversion funnels, buyer retention paths, and regional sales spikes through a real-time tracking interface.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 space-y-3">
                            <FaShieldAlt className="text-3xl text-orange-400" />
                            <h4 className="text-lg font-bold">Secure Fraud Protections</h4>
                            <p className="text-xs text-slate-400 font-medium leading-relaxed">Our system proactively identifies malicious return cycles and fraudulent payments to ensure secure storefront operations.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 space-y-3">
                            <FaBoxOpen className="text-3xl text-red-400" />
                            <h4 className="text-lg font-bold">Fulfillment Services</h4>
                            <p className="text-xs text-slate-400 font-medium leading-relaxed">Store products directly within our centralized fulfillment warehouses to unlock ultra-fast delivery options for your buyers.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 space-y-3">
                            <FaHandshake className="text-3xl text-emerald-400" />
                            <h4 className="text-lg font-bold">E-Commerce University</h4>
                            <p className="text-xs text-slate-400 font-medium leading-relaxed">Access a comprehensive library of video guides and optimization courses designed to help you scale from zero to high-volume sales.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ❓ COLLAPSIBLE ACCORDION FAQ PANEL SECTION */}
            <div className="w-[90%] max-w-[800px] mx-auto py-20 lg:py-28">
                <div className="text-center mb-12 space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
                    <p className="text-slate-400 font-medium text-xs sm:text-sm">Quick answers regarding setup requirements, financial cycles, and operational policies.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => {
                        const isOpen = activeFaq === idx;
                        return (
                            <div key={idx} className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
                                <button
                                    type="button"
                                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-slate-800 hover:bg-slate-50 transition-colors text-sm sm:text-base gap-4"
                                >
                                    <span>{faq.q}</span>
                                    <FaChevronDown className={`text-xs text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-orange-500" : ""}`} />
                                </button>
                                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[200px] border-t border-slate-100" : "max-h-0"}`}>
                                    <p className="px-6 py-4 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed bg-slate-50/50">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 📢 BOTTOM CONVERSION ACTION TRIGGER PANEL BAR */}
            <div className="bg-gradient-to-r from-pink-600 to-red-600 text-white text-center py-16 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                <div className="max-w-xl mx-auto space-y-5 relative z-10">
                    <h2 className="text-3xl font-black tracking-tight">Ready to Scale Your Business?</h2>
                    <p className="text-pink-100 text-sm font-medium leading-relaxed opacity-90">
                        Join thousands of flourishing retail operations. Set up your digital storefront credentials today and transform your revenue horizons.
                    </p>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-white text-pink-600 hover:bg-pink-100 font-black px-8 py-3.5 rounded-xl shadow-2xl active:scale-95 transition-all uppercase text-xs tracking-widest pt-4"
                    >
                        Create Your Account Now
                    </button>
                </div>
            </div>

        </div>
    );
}

export default SellOnDaraz;