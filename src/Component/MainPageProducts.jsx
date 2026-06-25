import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MainPageProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const shuffleArray = (array) => {
            const shuffled = [...array];

            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));

                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };

        const fetchProducts = async () => {
            try {
                setLoading(true);

                const res = await fetch(
                    "http://localhost:5000/api/mainpages"
                );
                if (!res.ok)
                    throw new Error("Failed to load products");
                const data = await res.json();
                setProducts(shuffleArray(data));

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const visibleProducts = showAll ? products : products.slice(0, 15);

    const handleClick = (id) => {
        navigate(`/product/${id}`);
    };

    if (loading) {
        return (
            <div className="p-10 text-center text-gray-500">
                Loading amazing products...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-10 text-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-10 px-4 md:px-12">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-600">
                    TOP SALE ON DARAZ
                </h1>

                {products.length > 15 && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-5 py-2 rounded-full bg-pink-500 text-white font-medium shadow-md hover:bg-pink-600 transition"
                    >
                        {showAll ? "Show Less" : "Show More"}
                    </button>
                )}
            </div>

            {/* Product Grid */}
            {products.length === 0 ? (
                <p className="text-gray-500">No products available</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

                    {visibleProducts.map((item) => (
                        <div
                            key={item._id}
                            onClick={() => handleClick(item._id)}
                            className="bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden group"
                        >

                            {/* IMAGE */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={item.url}
                                    alt={item.title}
                                    className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/300";
                                    }}
                                />

                                {/* Small badge (professional ecom feel) */}
                                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                    New
                                </span>
                            </div>

                            {/* CONTENT */}
                            <div className="p-3">

                                {/* Title */}
                                <h2 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-pink-500 transition">
                                    {item.title}
                                </h2>

                                {/* Price */}
                                <p className="mt-2 text-lg font-bold text-green-600">
                                    Rs {item.price}
                                </p>

                                {/* Button-like hint */}
                                <div className="mt-3">
                                    <button className="w-full py-1.5 text-sm border border-pink-500 text-pink-500 rounded-md hover:bg-pink-500 hover:text-white transition">
                                        View Details
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}
export default MainPageProducts;