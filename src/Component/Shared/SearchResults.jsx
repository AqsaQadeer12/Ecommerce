import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SearchResults() {
    const { keyword } = useParams();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/mainpages")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const filteredProducts = products.filter((item) =>
        item.title?.toLowerCase().includes(keyword.toLowerCase()) ||
        item.category?.toLowerCase().includes(keyword.toLowerCase()) ||
        item.description?.toLowerCase().includes(keyword.toLowerCase())
    );

    if (loading) {
        return (
            <div className="text-center py-20 text-xl">
                Loading...
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">
                Search Results for "{keyword}"
            </h2>

            {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-10 text-center">
                    <h3 className="text-xl font-semibold text-gray-700">
                        No Product Found
                    </h3>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            onClick={() => navigate(`/product/${product._id}`)}
                            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition"
                        >
                            <img
                                src={product.url}
                                alt={product.title}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-4">
                                <h3 className="font-bold text-lg line-clamp-2">
                                    {product.title}
                                </h3>

                                <p className="text-pink-600 font-bold mt-2">
                                    Rs. {product.price}
                                </p>

                                <p className="text-gray-500 text-sm mt-2">
                                    {product.category}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchResults;