import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    "http://localhost:5000/api/product"
                );

                if (!response.ok) {
                    throw new Error(
                        `Server Error: ${response.status}`
                    );
                }

                const data = await response.json();

                setProducts(
                    Array.isArray(data)
                        ? data
                        : data.products || []
                );

            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const visibleProducts = showAll
        ? products
        : products.slice(0, 10);

    const handleClick = (id) => {
        navigate(`/product/${id}`);
    };

    if (loading) {
        return (
            <div className="py-20 text-center text-gray-500 text-lg">
                Loading Products...
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-xl mx-auto mt-10 p-6 bg-red-50 border border-red-200 rounded-xl">
                <h2 className="text-red-600 font-bold mb-2">
                    Failed to Load Products
                </h2>

                <p className="text-red-500 text-sm">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-10 px-4 md:px-12">

            {/* Heading */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Featured Products
                </h1>
            </div>

            {/* No Products */}
            {products.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border text-center text-gray-400 max-w-md mx-auto">
                    No products available.
                </div>
            ) : (
                <>
                    {/* Product Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

                        {visibleProducts.map((item) => (
                            <div
                                key={item._id}
                                onClick={() => handleClick(item._id)}
                                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
                            >
                                {/* Product Image */}
                                <div className="relative overflow-hidden bg-gray-100">

                                    <img
                                        src={
                                            item.image
                                                ? `http://localhost:5000${item.image}`
                                                : item.url
                                                    ? item.url
                                                    : "/no-image.png"
                                        }
                                        alt={item.title}
                                        className="w-full h-52 object-cover group-hover:scale-110 transition duration-300"
                                        onError={(e) => {
                                            e.target.src = "/no-image.png";
                                        }}
                                    />


                                    {/* Badge */}
                                    <span className="absolute top-2 left-2 bg-pink-500 text-white text-[10px] px-2 py-1 rounded font-bold uppercase">
                                        New
                                    </span>

                                    {item.discount > 0 && (
                                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">
                                            -{item.discount}%
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4">

                                    <h2 className="text-sm font-semibold text-gray-800 line-clamp-2 h-10 group-hover:text-pink-500 transition">
                                        {item.title}
                                    </h2>

                                    <div className="mt-3">

                                        <div className="flex items-center gap-2">

                                            <span className="text-lg font-bold text-emerald-600">
                                                Rs {item.price}
                                            </span>

                                            {item.oldPrice >
                                                item.price && (
                                                    <span className="text-xs text-gray-400 line-through">
                                                        Rs {item.oldPrice}
                                                    </span>
                                                )}
                                        </div>
                                    </div>

                                    <button
                                        className="mt-4 w-full py-2 border border-pink-500 text-pink-500 rounded-lg text-sm font-semibold hover:bg-pink-500 hover:text-white transition"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>

                    {/* Show More Button At Bottom */}
                    {products.length > 10 && (
                        <div className="flex justify-center mt-10">

                            <button
                                onClick={() =>
                                    setShowAll(!showAll)
                                }
                                className="px-8 py-3 bg-pink-500 text-white rounded-full font-semibold shadow-lg hover:bg-pink-600 transition-all duration-300"
                            >
                                {showAll
                                    ? "Show Less"
                                    : "Show More Products"}
                            </button>

                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Product;