import React, { useState } from "react";
import { Calendar, User, ShoppingBag, ArrowUpRight, Clock, CheckCircle, AlertCircle, Search } from "lucide-react";

function OrdersDashboard() {
    // Current Active Tab tracking filter state
    const [activeTab, setActiveTab] = useState("upcoming");
    const [searchQuery, setSearchQuery] = useState("");

    // Comprehensive Mock Data structured exactly how raw backends deliver vectors
    const orderDataset = [
        { id: "DZ-99401", customer: "Zainab Ahmed", date: "2026-06-07", item: "Wireless Earbuds Pro", price: "PKR 3,450", type: "upcoming", itemsCount: 1 },
        { id: "DZ-99402", customer: "Muhammad Bilal", date: "2026-06-06", item: "Mechanical Gaming Keyboard", price: "PKR 7,800", type: "upcoming", itemsCount: 2 },
        { id: "DZ-99388", customer: "Ayesha Khan", date: "2026-06-04", item: "Ergonomic Office Chair", price: "PKR 18,500", type: "pending", itemsCount: 1 },
        { id: "DZ-99372", customer: "Omar Farooq", date: "2026-06-02", item: "UltraWide 4K Monitor", price: "PKR 64,000", type: "delivered", itemsCount: 1 },
        { id: "DZ-99351", customer: "Sana Malik", date: "2026-05-29", item: "Leather Crossbody Bag", price: "PKR 4,200", type: "delivered", itemsCount: 3 },
        { id: "DZ-99399", customer: "Hamza Ali", date: "2026-06-05", item: "High-Speed Type-C Cable", price: "PKR 950", type: "pending", itemsCount: 5 }
    ];

    // Filter management system sorting datasets Chronologically (Latest Date First)
    const filteredOrders = orderDataset
        .filter(order => order.type === activeTab)
        .filter(order => order.customer.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    // Functional Tab Configuration Array
    const tabConfig = [
        { key: "upcoming", label: "Upcoming Orders", icon: Clock, color: "bg-blue-500 text-blue-600" },
        { key: "pending", label: "Pending / Due", icon: AlertCircle, color: "bg-amber-500 text-amber-600" },
        { key: "delivered", label: "Delivered", icon: CheckCircle, color: "bg-emerald-500 text-emerald-600" }
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* 📋 Section Title and Subtitle */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-800 tracking-tight">Store Logistics & Orders</h1>
                    <p className="text-xs sm:text-sm text-gray-400">Track distribution nodes, manage impending deliveries, and review customer vectors.</p>
                </div>

                {/* 🔍 Search Bar & Controls */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by customer name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:border-pink-500 transition-colors"
                        />
                    </div>
                    <span className="text-xs font-semibold text-gray-400">
                        Showing {filteredOrders.length} entries sorted by date
                    </span>
                </div>

                {/* 🗂️ Interactive Segmentation Tabs */}
                <div className="grid grid-cols-3 gap-2 bg-gray-100 p-1.5 rounded-2xl max-w-2xl">
                    {tabConfig.map((tab) => {
                        const TabIcon = tab.icon;
                        const isSelected = activeTab === tab.key;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${isSelected
                                    ? "bg-white text-gray-800 shadow-md scale-[1.02]"
                                    : "text-gray-500 hover:text-gray-800 hover:bg-white/40"
                                    }`}
                            >
                                <TabIcon className={`w-4 h-4 ${isSelected ? "text-pink-500" : ""}`} />
                                <span className="hidden sm:inline">{tab.label}</span>
                                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                            </button>
                        );
                    })}
                </div>

                {/* 📄 Dynamic Table / Cards Display Area */}
                {filteredOrders.length > 0 ? (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

                        {/* Desktop View Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                        <th className="py-4 px-6">Order ID</th>
                                        <th className="py-4 px-6">Customer & Date</th>
                                        <th className="py-4 px-6">Product Details</th>
                                        <th className="py-4 px-6">Total Billing</th>
                                        <th className="py-4 px-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                                    {filteredOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50/40 transition-colors group">
                                            <td className="py-4 px-6 font-bold text-gray-800">{order.id}</td>
                                            <td className="py-4 px-6">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-gray-700 flex items-center gap-1.5">
                                                        <User className="w-3.5 h-3.5 text-gray-400" /> {order.customer}
                                                    </span>
                                                    <span className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                                                        <Calendar className="w-3.5 h-3.5" /> {order.date}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-800">{order.item}</span>
                                                    <span className="text-xs text-gray-400">{order.itemsCount}x Unit{order.itemsCount > 1 ? "s" : ""}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 font-black text-gray-800">{order.price}</td>
                                            <td className="py-4 px-6 text-right">
                                                <button className="inline-flex items-center gap-1 text-xs font-bold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100/80 px-3 py-1.5 rounded-lg transition-all">
                                                    <span>Manage</span>
                                                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile View Responsive Cards */}
                        <div className="block md:hidden divide-y divide-gray-100">
                            {filteredOrders.map((order) => (
                                <div key={order.id} className="p-4 space-y-3 hover:bg-gray-50/50 transition-colors">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold px-2 py-1 bg-gray-100 rounded-md text-gray-700">{order.id}</span>
                                        <span className="text-xs font-semibold text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> {order.date}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-gray-800 flex items-center gap-2">
                                            <User className="w-4 h-4 text-gray-400" /> {order.customer}
                                        </h4>
                                        <p className="text-xs text-gray-500 pl-6">{order.item} ({order.itemsCount}x)</p>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-base font-black text-gray-800">{order.price}</span>
                                        <button className="text-xs font-bold text-white bg-pink-500 px-4 py-2 rounded-xl shadow-sm shadow-pink-500/10">
                                            Manage Order
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                ) : (
                    /* Empty State Feedback Graphic Grid */
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center max-w-md mx-auto space-y-3">
                        <div className="w-12 h-12 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center mx-auto">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">No Orders Found</h3>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Aapki select ki hui category ({activeTab}) mein koi records mojud nahi hain ya aapki criteria filter matching state khali hai.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}

export default OrdersDashboard;