import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Plus, Package, Star, AlertCircle, Loader2, TrendingUp, Box } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SellerProducts() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get("http://localhost:5000/api/product");
            setProducts(res.data || []);
            setError(null);
        } catch (err) {
            console.log(err);
            setError("Products load karne mein masla aa raha hai.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/product/${id}`);
            // IMPORTANT: update UI instantly
            setProducts((prev) => prev.filter((item) => item._id !== id));
        } catch (err) {
            console.log("Delete error:", err.response?.data || err.message);
            alert("Failed to delete the product.");
        }
    };

    const getImageUrl = (product) => {
        if (product.image) {
            return product.image.startsWith("http")
                ? product.image
                : `http://localhost:5000${product.image}`;
        }
        if (product.url) {
            return product.url;
        }
        return "/fallback.png"; // Changed to a generic fallback name
    };

    // Calculate Total Stock for Dashboard Metrics
    const totalStock = products.reduce((acc, item) => acc + (Number(item.stock) || 0), 0);

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Dashboard Header & Metrics */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
                            <Package className="text-pink-600 w-8 h-8" />
                            Inventory Management
                        </h1>
                        <p className="text-slate-500 mt-1 text-sm font-medium">
                            Manage your active store products and stock levels
                        </p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="hidden sm:flex flex-col items-end mr-4 border-r border-slate-200 pr-6">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Items</span>
                            <span className="text-xl font-black text-slate-800">{products.length}</span>
                        </div>
                        <button
                            onClick={() => navigate("/seller/products")}
                            className="w-full md:w-auto bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold shadow-lg shadow-pink-200 transition-all active:scale-95"
                        >
                            <Plus size={20} strokeWidth={2.5} />
                            Add New Product
                        </button>
                    </div>
                </div>

                {/* Status Handling: Loading */}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
                        <p className="text-slate-500 font-medium">Loading your inventory...</p>
                    </div>
                )}

                {/* Status Handling: Error */}
                {!isLoading && error && (
                    <div className="bg-red-50 text-red-600 p-6 rounded-2xl flex items-center justify-center gap-3 border border-red-100">
                        <AlertCircle className="w-6 h-6" />
                        <span className="font-semibold">{error}</span>
                    </div>
                )}

                {/* Status Handling: Empty State */}
                {!isLoading && !error && products.length === 0 && (
                    <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                            <Box className="w-10 h-10 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">No products found</h3>
                        <p className="text-slate-500 max-w-sm mb-6">
                            Your store is currently empty. Start adding products to see them appear in your inventory grid.
                        </p>
                        <button
                            onClick={() => navigate("/seller/products")}
                            className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors"
                        >
                            <Plus size={18} /> Add First Product
                        </button>
                    </div>
                )}

                {/* Product Grid */}
                {!isLoading && !error && products.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((item) => {
                            const isLowStock = item.stock < 5;
                            const isOutOfStock = item.stock == 0;

                            return (
                                <div
                                    key={item._id}
                                    className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col relative"
                                >
                                    {/* Image Wrapper */}
                                    <div className="relative w-full h-56 bg-slate-100 overflow-hidden">
                                        <img
                                            src={getImageUrl(item)}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => { e.target.src = "/fallback.png"; }}
                                        />

                                        {/* Stock Badge Over Image */}
                                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                                            {isOutOfStock ? (
                                                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">Out of Stock</span>
                                            ) : isLowStock ? (
                                                <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">Low Stock</span>
                                            ) : null}
                                        </div>

                                        {/* Action Buttons (Visible on hover on desktop) */}
                                        <div className="absolute top-3 right-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => deleteProduct(item._id)}
                                                className="bg-white/90 hover:bg-red-500 text-red-500 hover:text-white p-2 rounded-full shadow-md backdrop-blur-sm transition-colors"
                                                title="Delete Product"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start gap-2 mb-2">
                                            <h3 className="font-bold text-slate-800 text-base leading-tight line-clamp-2" title={item.title}>
                                                {item.title}
                                            </h3>
                                        </div>

                                        <div className="mt-auto pt-4 space-y-3">
                                            {/* Price & Rating Row */}
                                            <div className="flex items-center justify-between">
                                                <p className="text-xl font-black text-pink-600">
                                                    Rs {Number(item.price).toLocaleString()}
                                                </p>
                                                <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-md text-sm font-bold">
                                                    <Star size={14} className="fill-amber-500" />
                                                    {item.rating || "0.0"}
                                                </div>
                                            </div>

                                            {/* Stock Info */}
                                            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                                <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                                                    <Box size={14} />
                                                    Stock: <span className={isOutOfStock ? "text-red-500 font-bold" : "text-slate-800"}>{item.stock || 0}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md">
                                                    <TrendingUp size={12} /> Active
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SellerProducts;