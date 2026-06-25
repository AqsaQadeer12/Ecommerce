import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Upload, Package, Trash2, Camera, X, DollarSign, Percent, Layers, FileText, Loader2, ArrowRight } from "lucide-react";

function SellerProductForm() {
    const [form, setForm] = useState({
        title: "",
        price: "",
        discount: "0",
        description: "",
        stock: "10",
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [loading, setLoading] = useState(false);

    const videoRef = useRef(null);
    const fileInputRef = useRef(null);

    // Live Price Calculation
    const originalPrice = Number(form.price) || 0;
    const discountPercent = Number(form.discount) || 0;
    const finalPrice = originalPrice - (originalPrice * (discountPercent / 100));

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // File Handle Logic
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setIsCameraActive(false);
    };

    // Camera Logic
    const startCamera = async () => {
        setIsCameraActive(true);
        setImagePreview("");
        setImageFile(null);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" }
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            alert("Camera access denied or unavailable.");
            setIsCameraActive(false);
        }
    };

    const capturePhoto = () => {
        const video = videoRef.current;
        if (!video) return;

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0);

        canvas.toBlob((blob) => {
            if (!blob) return;
            const file = new File([blob], `product-capture-${Date.now()}.jpg`, {
                type: "image/jpeg",
            });

            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            stopCamera();
        }, "image/jpeg");
    };

    const stopCamera = () => {
        if (videoRef.current?.srcObject) {
            videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
        }
        setIsCameraActive(false);
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview("");
        stopCamera();
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // Memory Cleanup for Blob URLs
    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
            stopCamera();
        };
    }, [imagePreview]);

    // Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!imageFile) {
            alert("Baraye meharbani product ki tasveer upload karein.");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("title", form.title.trim());
        formData.append("description", form.description.trim());
        formData.append("stock", form.stock);
        formData.append("image", imageFile);

        // Backend Price Logic
        if (discountPercent > 0) {
            formData.append("price", finalPrice.toFixed(0));
            formData.append("oldPrice", originalPrice);
            formData.append("discount", discountPercent);
        } else {
            formData.append("price", originalPrice);
            formData.append("oldPrice", originalPrice);
            formData.append("discount", 0);
        }

        try {
            await axios.post(
                "http://localhost:5000/api/product/add",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            alert("Product Uploaded Successfully! 🎉");

            // Reset Form
            setForm({ title: "", price: "", discount: "0", description: "", stock: "10" });
            removeImage();

        } catch (err) {
            console.error(err);
            alert("Upload failed. Please check your connection or backend server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                {/* Header Section */}
                <div className="bg-gradient-to-r from-pink-600 to-rose-500 px-8 py-6 text-white">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Package className="w-7 h-7" /> Seller Product Studio
                    </h2>
                    <p className="text-pink-100 text-sm mt-1">Add new inventory items to your storefront</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                        {/* LEFT COLUMN: Media Upload */}
                        <div className="lg:col-span-5 space-y-4">
                            <label className="block text-sm font-bold text-gray-700 tracking-wide uppercase">Product Image</label>

                            <div className={`relative w-full aspect-square rounded-2xl border-2 flex flex-col items-center justify-center overflow-hidden transition-all duration-200 ${imagePreview || isCameraActive ? 'border-pink-500 bg-gray-50' : 'border-dashed border-gray-300 hover:border-pink-400 bg-gray-50/50'
                                }`}>

                                {/* Camera Active View */}
                                {isCameraActive && (
                                    <div className="absolute inset-0 bg-black flex flex-col">
                                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 px-4">
                                            <button type="button" onClick={capturePhoto} className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2.5 rounded-xl font-semibold shadow-lg text-sm">Capture</button>
                                            <button type="button" onClick={stopCamera} className="bg-gray-800 hover:bg-gray-700 text-white p-2.5 rounded-xl flex items-center justify-center">
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Image Preview View */}
                                {imagePreview && !isCameraActive && (
                                    <div className="absolute inset-0 group">
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button type="button" onClick={removeImage} className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl shadow-lg transform transition-transform hover:scale-105">
                                                <Trash2 className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Default Upload State */}
                                {!imagePreview && !isCameraActive && (
                                    <div className="text-center p-6 w-full">
                                        <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-500">
                                            <Upload className="w-8 h-8" />
                                        </div>
                                        <p className="text-sm text-gray-500 mb-6">Drag and drop or select a method</p>
                                        <div className="flex flex-col gap-3 w-full max-w-[200px] mx-auto">
                                            <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full bg-white border shadow-sm border-gray-200 text-gray-700 py-2.5 px-4 rounded-xl font-medium hover:bg-gray-50 hover:text-pink-600 transition-colors flex items-center justify-center gap-2 text-sm">
                                                Browse Files
                                            </button>
                                            <button type="button" onClick={startCamera} className="w-full bg-white border shadow-sm border-gray-200 text-gray-700 py-2.5 px-4 rounded-xl font-medium hover:bg-gray-50 hover:text-pink-600 transition-colors flex items-center justify-center gap-2 text-sm">
                                                <Camera className="w-4 h-4" /> Use Camera
                                            </button>
                                        </div>
                                        <input type="file" ref={fileInputRef} accept="image/*" hidden onChange={handleFileChange} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Product Details */}
                        <div className="lg:col-span-7 space-y-6">

                            {/* Title */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Product Title</label>
                                <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g., Men's Classic Leather Watch" className="w-full border border-gray-200 rounded-xl p-3.5 focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-gray-800" />
                            </div>

                            {/* Price Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Price (Rs)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><DollarSign className="h-4 w-4 text-gray-400" /></div>
                                        <input name="price" type="number" min="0" required value={form.price} onChange={handleChange} placeholder="0" className="w-full border border-gray-200 rounded-xl pl-10 p-3.5 focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-gray-800" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Discount (%)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Percent className="h-4 w-4 text-gray-400" /></div>
                                        <input name="discount" type="number" min="0" max="100" value={form.discount} onChange={handleChange} placeholder="0" className="w-full border border-gray-200 rounded-xl pl-10 p-3.5 focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-gray-800" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Stock</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Layers className="h-4 w-4 text-gray-400" /></div>
                                        <input name="stock" type="number" min="0" required value={form.stock} onChange={handleChange} className="w-full border border-gray-200 rounded-xl pl-10 p-3.5 focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all text-gray-800" />
                                    </div>
                                </div>
                            </div>

                            {/* Live Price Widget */}
                            {originalPrice > 0 && (
                                <div className="bg-pink-50 rounded-xl p-4 flex items-center justify-between border border-pink-100">
                                    <span className="text-sm font-semibold text-pink-800">Final Selling Price:</span>
                                    <div className="text-right flex items-center gap-2">
                                        {discountPercent > 0 && (
                                            <span className="text-gray-400 line-through text-sm">Rs {originalPrice}</span>
                                        )}
                                        <span className="text-xl font-bold text-pink-600">Rs {finalPrice.toFixed(0)}</span>
                                    </div>
                                </div>
                            )}

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Description</label>
                                <div className="relative">
                                    <div className="absolute top-4 left-3 pointer-events-none"><FileText className="h-4 w-4 text-gray-400" /></div>
                                    <textarea name="description" required value={form.description} onChange={handleChange} rows="4" placeholder="Detail the features, specifications, and warranty..." className="w-full border border-gray-200 rounded-xl pl-10 p-3.5 focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all resize-none text-gray-800" />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button type="submit" disabled={loading} className={`w-full mt-4 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-pink-500/30 transform transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
                                {loading ? (
                                    <><Loader2 className="w-5 h-5 animate-spin" /> Publishing Product...</>
                                ) : (
                                    <><Package className="w-5 h-5" /> Publish to Store <ArrowRight className="w-4 h-4 ml-1" /></>
                                )}
                            </button>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SellerProductForm;