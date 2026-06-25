import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Category() {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/category");

                if (!res.ok) throw new Error("Unable to load categories");

                const data = await res.json();
                setCategory(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleClick = (id) => {
        navigate(`/category/${id}`);
    };

    if (loading) {
        return (
            <div className="py-12 text-center text-gray-500">
                Loading categories...
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-12 text-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <section className="bg-gradient-to-b from-gray-50 to-white py-12">
            <div className="w-[95%] md:w-[90%] mx-auto">

                <div className="mb-10 text-left">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Shop by Category
                    </h2>
                </div>

                <div className="grid grid-cols-2 shadow-lg sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-1">

                    {category.map((item) => (
                        <div
                            key={item._id}
                            onClick={() => handleClick(item._id)}
                            className="group cursor-pointer bg-white overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        >
                            {/* IMAGE WRAPPER */}
                            <div className="relative w-full aspect-square overflow-hidden bg-gray-100">

                                {/* Image */}
                                <img
                                    src={item.url}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />

                            </div>

                            {/* TEXT SECTION */}
                            <div className="p-4 text-center">

                                <h4 className="text-sm font-semibold text-gray-800 group-hover:text-pink-500 transition">
                                    {item.title}
                                </h4>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Category;