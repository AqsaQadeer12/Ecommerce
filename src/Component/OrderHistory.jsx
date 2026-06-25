import React, { useEffect, useState } from "react";
import {
    ShoppingBag,
    Calendar,
    User,
    Phone,
    Receipt,
    Package,
    ChevronRight
} from "lucide-react";

function OrderHistory() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        try {
            const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
            setOrders(savedOrders);
        } catch (error) {
            console.error("Failed to parse orders from localStorage:", error);
            setOrders([]);
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-50/60 py-12 text-slate-800 antialiased">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">

                {/* Header Section */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            Order History
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Review and manage your historical store sales and customer dispatches.
                        </p>
                    </div>
                    <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200">
                        Total Orders: {orders.length}
                    </span>
                </div>

                {/* Main Content Conditional Render */}
                {orders.length === 0 ? (
                    /* Beautiful Empty State */
                    <div className="bg-white border border-slate-100 p-12 rounded-2xl shadow-sm text-center flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-4 border border-slate-100">
                            <ShoppingBag size={28} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No Orders Placed Yet</h3>
                        <p className="text-sm text-slate-500 max-w-sm mt-1 mb-6">
                            When customers purchase items from your inventory engine, their invoices and logs will populate right here.
                        </p>
                    </div>
                ) : (
                    /* Order List Stream */
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                            >
                                {/* Card Sub-Header */}
                                <div className="bg-slate-50/70 px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-600 hidden sm:block">
                                            <Receipt size={16} />
                                        </div>
                                        <div>
                                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Invoice Reference</span>
                                            <span className="font-mono text-sm font-bold text-slate-700">#{order.id}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-slate-500 bg-white border border-slate-100 px-3 py-1.5 rounded-xl text-xs font-medium shadow-sm">
                                        <Calendar size={14} className="text-slate-400" />
                                        <span>{order.date || "Date Unspecified"}</span>
                                    </div>
                                </div>

                                {/* Card Body Split Grid */}
                                <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">

                                    {/* Left Side: Meta Info */}
                                    <div className="md:col-span-5 space-y-4 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
                                        <div>
                                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">Customer Profile</span>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm text-slate-800 font-medium">
                                                    <User size={15} className="text-slate-400 shrink-0" />
                                                    <span>{order.customer?.name || "Anonymous Guest"}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    <Phone size={14} className="text-slate-400 shrink-0" />
                                                    <span>{order.customer?.phone || "No Phone Registered"}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Total Transaction</span>
                                            <div className="text-2xl font-black tracking-tight text-slate-900">
                                                Rs. {Number(order.total).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side: Items Purchased Table Line items */}
                                    <div className="md:col-span-7 flex flex-col justify-between">
                                        <div>
                                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">Manifest Summary</span>
                                            <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto pr-1">
                                                {order.items?.map((item, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex justify-between items-center py-2.5 text-sm group first:pt-0"
                                                    >
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <Package size={14} className="text-slate-300 group-hover:text-pink-500 transition-colors shrink-0" />
                                                            <p className="font-medium text-slate-700 truncate">
                                                                {item.title}
                                                                <span className="text-xs text-slate-400 font-normal ml-1.5">
                                                                    × {item.quantity}
                                                                </span>
                                                            </p>
                                                        </div>

                                                        <span className="font-semibold text-slate-900 pl-4 shrink-0">
                                                            Rs. {((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

export default OrderHistory;