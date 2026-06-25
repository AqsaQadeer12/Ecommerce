import React, { useState } from "react";
import { useCart } from "./CartContext";

function Cart() {
    const { cartItems, removeFromCart, totalPrice, clearCart } = useCart();

    const [showCheckout, setShowCheckout] = useState(false);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "",
        payment: "cod"
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">

            <div className="max-w-6xl mx-auto px-4">

                {/* HEADER */}
                <h1 className="text-3xl font-bold text-gray-700 mb-8">
                    Shopping Cart
                </h1>

                {/* EMPTY CART */}
                {cartItems.length === 0 ? (
                    <div className="bg-white p-10 rounded-xl shadow text-center">
                        <h2 className="text-xl font-semibold text-gray-600">
                            Your Cart is Empty
                        </h2>
                    </div>
                ) : (
                    <>
                        {/* CART ITEMS */}
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
                                >
                                    <div className="flex gap-4">

                                        <img
                                            src={item.url}
                                            alt={item.title}
                                            className="w-24 h-24 object-cover rounded"
                                        />

                                        <div>
                                            <h3 className="font-semibold">
                                                {item.title}
                                            </h3>

                                            <p className="text-gray-600">
                                                Rs. {item.price}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* SUMMARY */}
                        <div className="bg-white mt-6 p-6 rounded-xl shadow">

                            <div className="flex justify-between">
                                <h2 className="text-xl font-bold">Total</h2>
                                <h2 className="text-xl font-bold text-orange-500">
                                    Rs. {totalPrice}
                                </h2>
                            </div>

                            <div className="flex gap-4 mt-5">

                                <button
                                    onClick={() => setShowCheckout(true)}
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded"
                                >
                                    Checkout
                                </button>

                                <button
                                    onClick={clearCart}
                                    className="flex-1 bg-gray-700 hover:bg-gray-800 text-white py-3 rounded"
                                >
                                    Clear Cart
                                </button>

                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* ================= CHECKOUT MODAL ================= */}
            {showCheckout && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl max-h-[90vh] flex flex-col">

                        {/* HEADER */}
                        <div className="p-6 border-b">
                            <h2 className="text-2xl font-bold text-center">
                                Checkout
                            </h2>
                        </div>

                        {/* SCROLLABLE CONTENT */}
                        <div className="p-6 space-y-4 overflow-y-auto">

                            {/* USER INFO */}
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="w-full border p-3 rounded"
                            />

                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="w-full border p-3 rounded"
                            />

                            <textarea
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="Full Address"
                                className="w-full border p-3 rounded"
                            />

                            {/* PAYMENT METHOD */}
                            <select
                                name="payment"
                                value={form.payment}
                                onChange={handleChange}
                                className="w-full border p-3 rounded"
                            >
                                <option value="cod">Cash on Delivery</option>
                                <option value="card">Debit / Credit Card</option>
                                <option value="jazzcash">JazzCash</option>
                                <option value="easypaisa">EasyPaisa</option>
                            </select>

                            {/* CARD */}
                            {form.payment === "card" && (
                                <div className="border p-4 rounded bg-gray-50 space-y-3">

                                    <div className="flex gap-3 items-center">
                                        <img src="./VISA.png" className="h-6" alt="visa" />
                                        <img src="./MasterCard.png" className="h-6" alt="mastercard" />
                                    </div>

                                    <input
                                        placeholder="Card Number"
                                        className="w-full border p-3 rounded"
                                    />

                                    <div className="flex gap-3">
                                        <input
                                            placeholder="MM/YY"
                                            className="w-1/2 border p-3 rounded"
                                        />
                                        <input
                                            placeholder="CVV"
                                            className="w-1/2 border p-3 rounded"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* JAZZCASH */}
                            {form.payment === "jazzcash" && (
                                <div className="border p-4 rounded bg-gray-50 space-y-3">

                                    <div className="flex items-center gap-3">
                                        <img src="./JazzCash.png" className="h-8" alt="jazzcash" />
                                        <span className="font-semibold">JazzCash Payment</span>
                                    </div>

                                    <input
                                        placeholder="JazzCash Mobile Number"
                                        className="w-full border p-3 rounded"
                                    />

                                    <input
                                        placeholder="Account Holder Name"
                                        className="w-full border p-3 rounded"
                                    />
                                </div>
                            )}

                            {/* EASYPAISA */}
                            {form.payment === "easypaisa" && (
                                <div className="border p-4 rounded bg-gray-50 space-y-3">

                                    <div className="flex items-center gap-3">
                                        <img src="./EasyPaisa.jpg" className="h-8" alt="easypaisa" />
                                        <span className="font-semibold">EasyPaisa Payment</span>
                                    </div>

                                    <input
                                        placeholder="EasyPaisa Mobile Number"
                                        className="w-full border p-3 rounded"
                                    />

                                    <input
                                        placeholder="Account Holder Name"
                                        className="w-full border p-3 rounded"
                                    />
                                </div>
                            )}

                            <div className="bg-gray-100 p-3 rounded text-sm">
                                🚚 Delivery: 3–5 Working Days
                            </div>
                        </div>

                        {/* FIXED BUTTONS (IMPORTANT) */}
                        <div className="p-6 border-t flex gap-3 bg-white">

                            <button
                                onClick={() => setShowCheckout(false)}
                                className="flex-1 bg-gray-500 text-white py-3 rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => {
                                    const newOrder = {
                                        id: Date.now(),
                                        items: cartItems,
                                        total: totalPrice,
                                        customer: form,
                                        date: new Date().toLocaleString()
                                    };

                                    const existingOrders =
                                        JSON.parse(localStorage.getItem("orders")) || [];

                                    localStorage.setItem(
                                        "orders",
                                        JSON.stringify([...existingOrders, newOrder])
                                    );

                                    alert("Order Placed Successfully!");
                                    clearCart();
                                    setShowCheckout(false);
                                }}
                                className="flex-1 bg-orange-500 text-white py-3 rounded"
                            >
                                Place Order
                            </button>

                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}



export default Cart;