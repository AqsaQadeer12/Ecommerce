import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FlashSale() {
    const [sale, setSale] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/flash-sale")
            .then((res) => res.json())
            .then((data) => setSale(data))
            .catch((err) => console.log(err));
    }, []);

    const items = showAll ? sale : sale.slice(0, 5);

    return (
        <section className="bg-gradient-to-b from-gray-100 to-white py-10">
            <div className="w-[95%] max-w-[1400px] mx-auto">

                {/* HEADER */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-800">
                            Flash Sale
                        </h2>
                        <p className="text-sm text-gray-500">
                            Grab the best deals before time runs out
                        </p>
                    </div>

                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-6 py-2 rounded-full border border-pink-500 text-pink-600 font-semibold
                        hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-sm"
                    >
                        {showAll ? "Show Less" : "View All Deals"}
                    </button>
                </div>

                {/* CONTAINER */}
                <div className="bg-white rounded-2xl shadow-lg p-5">

                    {/* GRID */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

                        {items.map((item) => (
                            <div
                                key={item._id}
                                onClick={() => navigate(`/product/${item._id}`)}
                                className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden
                                hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
                            >

                                {/* IMAGE SECTION */}
                                <div className="relative aspect-square bg-gray-50 overflow-hidden">

                                    {/* Flash badge */}
                                    <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full z-10 shadow">
                                        FLASH DEAL
                                    </span>

                                    {/* Discount badge (fake example if you have discount later) */}
                                    <span className="absolute top-2 right-2 bg-pink-500 text-white text-[10px] px-2 py-1 rounded-full z-10">
                                        HOT
                                    </span>

                                    <img
                                        src={item.url}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />

                                    {/* overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
                                </div>

                                {/* CONTENT */}
                                <div className="p-4 flex flex-col flex-grow">

                                    {/* TITLE */}
                                    <h4 className="text-sm font-semibold text-gray-700 line-clamp-2 min-h-[42px]">
                                        {item.title}
                                    </h4>

                                    {/* PRICE */}
                                    <div className="mt-2 flex items-center justify-between">
                                        <p className="text-pink-600 font-bold text-lg">
                                            Rs. {item.price}
                                        </p>

                                        {/* fake strike price style for premium look */}
                                        <p className="text-gray-400 text-xs line-through">
                                            Rs. {Math.round(item.price * 1.3)}
                                        </p>
                                    </div>

                                    {/* CTA */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/product/${item._id}`);
                                        }}
                                        className="mt-4 w-full bg-gradient-to-r from-pink-500 to-pink-800 text-white
                                        py-2 rounded-lg font-medium hover:from-pink-600 hover:to-pink-800
                                        transition-all duration-300 shadow-md"
                                    >
                                        View Product
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FlashSale;