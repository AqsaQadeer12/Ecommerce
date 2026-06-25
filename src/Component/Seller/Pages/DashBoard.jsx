import React from "react";
import { useNavigate } from "react-router-dom";
import {
    TrendingUp,
    PackagePlus,
    Users,
    ShoppingBag,
    HelpCircle,
    ShieldCheck,
    ArrowUpRight,
    Clock,
    ChevronRight
} from "lucide-react";

function DashBoard() {
    const navigate = useNavigate();

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    const stats = [
        {
            id: 1,
            name: "Total Sales Volume",
            value: "PKR 142,350",
            change: "+12.5%",
            time: "this month",
            icon: TrendingUp,
            color: "text-emerald-600 bg-emerald-50 border-emerald-100",
            path: "/seller/sales-analytics" // Added navigation path
        },
        {
            id: 2,
            name: "Active Store Items",
            value: "48 Products",
            change: "+3 new",
            time: "this week",
            icon: ShoppingBag,
            color: "text-pink-600 bg-pink-50 border-pink-100",
            path: "/seller/all-products"
        },
        {
            id: 3,
            name: "Pending Orders",
            value: "12 Shipments",
            change: "Action required",
            time: "immediate",
            icon: Clock,
            color: "text-amber-600 bg-amber-50 border-amber-100",
            path: "/seller/orders" // Added navigation path matching your existing route
        },
        {
            id: 4,
            name: "Store Visitors",
            value: "2,840 Users",
            change: "+18%",
            time: "vs last week",
            icon: Users,
            color: "text-blue-600 bg-blue-50 border-blue-100",
            path: "/seller/analytics" // Added navigation path
        },
    ];

    const coreFeatures = [
        { title: "Inventory Engine", desc: "Live product management system", icon: PackagePlus, path: "/seller/products" },
        { title: "Seller Protection", desc: "Secure seller system", icon: ShieldCheck, path: "/seller" },
        { title: "Help & Support", desc: "24/7 assistance", icon: HelpCircle, path: "/help-and-support" },
    ];

    const recentOrders = [
        { id: "ORD-9482", customer: "Zainab Ahmed", items: 2, total: "PKR 3,450", status: "Pending", date: "Today, 02:40 PM" },
        { id: "ORD-8391", customer: "Muhammad Ali", items: 1, total: "PKR 1,200", status: "Processing", date: "Today, 11:15 AM" },
        { id: "ORD-7264", customer: "Ayesha Khan", items: 4, total: "PKR 8,900", status: "Shipped", date: "Yesterday" },
    ];

    const statusStyles = {
        Pending: "bg-amber-50 text-amber-700 border-amber-200",
        Processing: "bg-blue-50 text-blue-700 border-blue-200",
        Shipped: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 text-slate-800 antialiased">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">{getGreeting()}, Seller!</h2>
                        <p className="text-sm text-slate-500 mt-0.5">Here is your performance dashboard tracking overview.</p>
                    </div>

                    <button
                        onClick={() => navigate("/seller/products")}
                        className="bg-pink-600 hover:bg-pink-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition shadow-sm shadow-pink-100 flex items-center justify-center gap-2 self-start sm:self-auto"
                    >
                        <span>Manage Products</span>
                        <ChevronRight size={16} />
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((item) => {
                        const Icon = item.icon;
                        const isClickable = !!item.path;

                        return (
                            <div
                                key={item.id}
                                onClick={() => isClickable && navigate(item.path)}
                                className={`bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-200 ${isClickable
                                    ? "cursor-pointer hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 group"
                                    : "cursor-default"
                                    }`}
                            >
                                <div className="flex justify-between items-start">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{item.name}</span>
                                    <div className={`p-2.5 rounded-xl border transition-transform group-hover:scale-105 ${item.color}`}>
                                        <Icon size={18} />
                                    </div>
                                </div>

                                <div className="mt-4 flex items-baseline gap-2">
                                    <h3 className="text-2xl font-bold tracking-tight text-slate-900">{item.value}</h3>
                                </div>

                                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                                    <span className={`font-semibold ${item.change.startsWith("+") || item.change.includes("new") ? "text-emerald-600" : "text-amber-600"
                                        }`}>
                                        {item.change}
                                    </span>
                                    <span className="text-slate-300">•</span>
                                    <span>{item.time}</span>
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Quick Features */}
                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 text-base">Quick Actions</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {coreFeatures.map((f, i) => {
                            const Icon = f.icon;

                            return (
                                <div
                                    key={i}
                                    onClick={() => navigate(f.path)}
                                    className="p-5 bg-slate-50/70 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-100/70 hover:border-slate-200 transition group"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-700 group-hover:text-pink-600 transition">
                                        <Icon size={20} />
                                    </div>
                                    <h4 className="font-semibold text-slate-900 mt-3 group-hover:text-pink-600 transition">{f.title}</h4>
                                    <p className="text-xs text-slate-500 mt-1">{f.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex justify-between items-center p-6 border-b border-slate-100">
                        <div>
                            <h3 className="font-bold text-slate-900 text-base">Recent Orders</h3>
                            <p className="text-xs text-slate-500 mt-0.5">Overview of latest client interactions.</p>
                        </div>

                        <button
                            onClick={() => navigate("/seller/orders")}
                            className="p-2 hover:bg-slate-50 border border-slate-100 rounded-xl transition text-slate-600 hover:text-slate-900"
                        >
                            <ArrowUpRight size={18} />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead>
                                <tr className="text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-50/70 border-b border-slate-100">
                                    <th className="px-6 py-3.5">ID</th>
                                    <th className="px-6 py-3.5">Customer</th>
                                    <th className="px-6 py-3.5">Date</th>
                                    <th className="px-6 py-3.5">Items</th>
                                    <th className="px-6 py-3.5">Status</th>
                                    <th className="px-6 py-3.5 text-right">Total</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {recentOrders.map((o) => (
                                    <tr key={o.id} className="hover:bg-slate-50/50 transition">
                                        <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-600">{o.id}</td>
                                        <td className="px-6 py-4 font-medium text-slate-900">{o.customer}</td>
                                        <td className="px-6 py-4 text-slate-500 text-xs">{o.date}</td>
                                        <td className="px-6 py-4 text-slate-500">{o.items} {o.items > 1 ? "items" : "item"}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[o.status] || "bg-slate-50 text-slate-700"}`}>
                                                {o.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-slate-900 text-right">{o.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default DashBoard;