import React, { useState } from "react";
import {
    FaSearch, FaQuestionCircle, FaTruck, FaUndoAlt,
    FaWallet, FaUserCog, FaShieldAlt, FaComments,
    FaEnvelope, FaPhoneAlt, FaChevronDown
} from "react-icons/fa";

function HelpAndSupport() {
    const [activeFaq, setActiveFaq] = useState(null);

    const supportCategories = [
        { id: 1, title: "Shipping & Delivery", icon: <FaTruck />, desc: "Track packages, check dispatch parameters, or view delivery times." },
        { id: 2, title: "Returns & Refunds", icon: <FaUndoAlt />, desc: "Initiate return requests, check dynamic refund cycles, and print shipping labels." },
        { id: 3, title: "Payments & Wallet", icon: <FaWallet />, desc: "Manage saved credit cards, bank connections, or voucher issues." },
        { id: 4, title: "Account & Security", icon: <FaUserCog />, desc: "Update configuration profiles, password criteria, and verification setups." },
        { id: 5, title: "Seller Support", icon: <FaShieldAlt />, desc: "Resolve store registration blocks, dashboard tool questions, and fee setups." },
    ];

    const trendingFaqs = [
        { q: "How long does it take for my order to arrive?", a: "Standard marketplace fulfillment delivery takes 2-5 business days depending on your location and the regional dispatch pipeline center." },
        { q: "What is your package return policy timeframe?", a: "Items can be comfortably returned completely free inside a 7-day baseline window upon delivery confirmation checkpoints if they remain pristine and sealed." },
        { q: "How do I securely track an active shipped package?", a: "Navigate straight into your Account Order History panel block and click the specific tracking number map string link to open real-time location metrics." }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800">

            {/* 🔍 HERO SEARCH BAR SECTION */}
            <div className="bg-gradient-to-r from-pink-600 via-pink-500 to-red-600 text-white py-16 lg:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(254,240,138,0.1),transparent_40%)]" />

                <div className="w-[90%] max-w-[800px] mx-auto text-center relative z-10 space-y-6">
                    <span className="bg-white/10 backdrop-blur-sm text-yellow-200 text-xs font-bold tracking-widest px-3 py-1.5 rounded-full border border-white/10 uppercase">
                        24/7 Digital Support Hub
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">How can we help you today?</h1>
                    <p className="text-pink-100 text-sm sm:text-base opacity-90 max-w-xl mx-auto">
                        Search tracking timelines, store refund operations, or open support channel communication structures instantly.
                    </p>

                    {/* Big Search Input */}
                    <div className="relative max-w-2xl mx-auto pt-2">
                        <input
                            type="text"
                            placeholder="Type keywords like 'refund', 'tracking', or 'payout'..."
                            className="w-full py-4 pl-6 pr-14 rounded-2xl outline-none text-slate-800 bg-white placeholder-slate-400 text-sm sm:text-base shadow-2xl focus:ring-4 focus:ring-pink-500/20 transition-all"
                        />
                        <button className="absolute right-2 top-[14px] p-3.5 bg-pink-600 rounded-xl text-white hover:bg-pink-700 active:scale-95 transition-all shadow-md">
                            <FaSearch className="text-sm" />
                        </button>
                    </div>
                </div>
            </div>

            {/* 🛠️ SELF-SERVICE CATEGORIES GRID */}
            <div className="w-[90%] max-w-[1400px] mx-auto py-16">
                <div className="mb-10 text-center lg:text-left">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Browse Help Topics</h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-semibold mt-1">Select an active category node below to solve target account setup configurations.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {supportCategories.map((cat) => (
                        <div key={cat.id} className="bg-white p-6 rounded-3xl border border-slate-200/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center text-xl shrink-0 group-hover:bg-pink-600 group-hover:text-white transition-all duration-300 shadow-inner mb-5">
                                {cat.icon}
                            </div>
                            <h3 className="text-base font-bold text-slate-900 group-hover:text-pink-600 transition-colors mb-2">
                                {cat.title}
                            </h3>
                            <p className="text-xs text-slate-400 font-medium leading-relaxed flex-1">
                                {cat.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ❓ EXPANDABLE TRENDING FAQS */}
            <div className="bg-slate-100/60 border-y border-slate-200/50 py-16">
                <div className="w-[90%] max-w-[800px] mx-auto">
                    <div className="text-center mb-10 space-y-2">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Trending Questions</h2>
                        <p className="text-slate-400 font-semibold text-xs sm:text-sm">Quick reference updates from users resolution pipelines.</p>
                    </div>

                    <div className="space-y-4">
                        {trendingFaqs.map((faq, idx) => {
                            const isOpen = activeFaq === idx;
                            return (
                                <div key={idx} className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
                                    <button
                                        type="button"
                                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                                        className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-slate-800 hover:bg-slate-50 transition-colors text-sm sm:text-base gap-4"
                                    >
                                        <span className="flex items-center gap-2.5">
                                            <FaQuestionCircle className="text-pink-500 shrink-0 text-sm" />
                                            {faq.q}
                                        </span>
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
            </div>

            {/* 📞 DUAL PLACEMENT ASSISTANCE LAYER (Contact Form + Quick Connect Buttons) */}
            <div className="w-[90%] max-w-[1400px] mx-auto py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                {/* Left: Quick Channels Info Card */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="space-y-2">
                        <span className="text-pink-600 font-black text-xs uppercase tracking-widest bg-pink-50 px-3 py-1 rounded-md">Still Need Assistance?</span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Connect with our support team</h2>
                        <p className="text-slate-400 font-medium text-xs sm:text-sm leading-relaxed">
                            If your query falls completely outside standard baseline definitions, route a configuration signal directly onto our operational agents.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/50 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg shrink-0"><FaComments /></div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">Live Chat Help Matrix</h4>
                                <p className="text-xs text-slate-400 font-medium mt-0.5">Average wait threshold: ~2 minutes</p>
                            </div>
                            <button className="ml-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors">Chat Now</button>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200/50 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg shrink-0"><FaPhoneAlt /></div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">Hotline Center Line</h4>
                                <p className="text-xs text-slate-400 font-medium mt-0.5">+92 (21) 111-132729 (09 AM - 09 PM)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Premium Dynamic Form Area */}
                <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-slate-100">
                    <div className="mb-6">
                        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                            <FaEnvelope className="text-orange-500" /> Submit a Support Ticket
                        </h3>
                        <p className="text-xs text-slate-400 font-semibold mt-1">We typically map tracking responses straight to inbox channels inside 12 hours.</p>
                    </div>

                    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Your Registered Name</label>
                                <input type="text" placeholder="e.g., Muhammad Ali" className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none text-sm font-medium focus:border-orange-500 transition-colors bg-slate-50" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Destination Address</label>
                                <input type="email" placeholder="ali@example.com" className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none text-sm font-medium focus:border-orange-500 transition-colors bg-slate-50" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Order ID reference (Optional)</label>
                                <input type="text" placeholder="e.g., #124958104" className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none text-sm font-medium focus:border-orange-500 transition-colors bg-slate-50" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Problem Core Segment</label>
                                <select className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none text-sm font-semibold focus:border-orange-500 transition-colors bg-slate-50 text-slate-600">
                                    <option>Delivery Delay Verification</option>
                                    <option>Damaged Item Return Filing</option>
                                    <option>B2B Vendor Dashboard Issue</option>
                                    <option>Payment Gateway Error State</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Elaborate Your Problem Specifics</label>
                            <textarea rows="4" placeholder="Please supply complete mapping tracking codes or visual discrepancy notes..." className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none text-sm font-medium focus:border-orange-500 transition-colors bg-slate-50 resize-none"></textarea>
                        </div>

                        <button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white font-black py-3.5 rounded-xl shadow-lg hover:shadow-pink-600/20 transition-all active:scale-[0.98] text-xs uppercase tracking-widest pt-4">
                            Dispatch Help Message Ticket
                        </button>
                    </form>
                </div>

            </div>

        </div>
    );
}

export default HelpAndSupport;