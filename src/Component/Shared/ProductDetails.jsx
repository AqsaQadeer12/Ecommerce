import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Star,
    Heart,
    ShoppingCart,
    Truck,
    ShieldCheck,
    RotateCcw,
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Trash2
} from "lucide-react";
import { useCart } from "./CartContext";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    // Image Gallery & Action States
    const [allImages, setAllImages] = useState([]);
    const [activeImage, setActiveImage] = useState("/no-image.png");
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [sourceUrl, setSourceUrl] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    // Magnifier States
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });

    const rating = product?.rating || 4.5;

    // SAFE IMAGE HELPER
    const getImageUrl = (img, fallback = "/no-image.png") => {
        if (!img) return fallback;
        if (typeof img !== "string") return fallback;

        let clean = img.replace(/^["'\[\]]+|["'\[\]]+$/g, "").trim();
        if (!clean) return fallback;
        if (clean.startsWith("http")) return clean;

        return `http://localhost:5000${clean.startsWith("/") ? clean : "/" + clean}`;
    };

    // EXTRACT ALL IMAGES
    const extractImages = (prod) => {
        if (!prod) return ["/no-image.png"];
        let list = [];

        if (Array.isArray(prod.images) && prod.images.length > 0) {
            list = prod.images;
        } else if (Array.isArray(prod.image)) {
            list = prod.image;
        } else if (typeof prod.image === "string") {
            try {
                const parsed = JSON.parse(prod.image);
                list = Array.isArray(parsed) ? parsed : [prod.image];
            } catch {
                list = [prod.image];
            }
        } else if (prod.url) {
            list = [prod.url];
        }

        const processedImages = list.map(img => getImageUrl(img)).filter(Boolean);
        return processedImages.length > 0 ? processedImages : ["/no-image.png"];
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const urls = [
                    `http://localhost:5000/api/product/${id}`,
                    `http://localhost:5000/api/flash-sale/${id}`,
                    `http://localhost:5000/api/mainpages/${id}`,
                ];

                let data = null;
                let matchedUrl = "";

                for (const url of urls) {
                    const res = await fetch(url);
                    if (res.ok) {
                        data = await res.json();
                        matchedUrl = url;
                        break;
                    }
                }

                if (data) {
                    setProduct(data);
                    setSourceUrl(matchedUrl);
                    const images = extractImages(data);
                    setAllImages(images);
                    setActiveImage(images[0]);
                } else {
                    setProduct(null);
                }
            } catch (err) {
                console.error(err);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const deleteProduct = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product permanently?");
        if (!confirmDelete) return;

        try {
            setIsDeleting(true);
            const res = await fetch(sourceUrl, { method: "DELETE" });

            if (res.ok) {
                alert("Product deleted successfully!");
                navigate("/");
            } else {
                const errData = await res.json().catch(() => ({}));
                alert(errData.message || "Failed to delete the product.");
            }
        } catch (err) {
            console.error("Delete request error:", err);
            alert("Server connection issue. Could not delete product.");
        } finally {
            setIsDeleting(false);
        }
    };

    const increaseQty = () => setQuantity((q) => Math.min(q + 1, Number(product?.stock) || 10));
    const decreaseQty = () => setQuantity((q) => Math.max(q - 1, 1));

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        setPosition({
            x: e.clientX - left,
            y: e.clientY - top,
            width,
            height,
        });
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-4 border-pink-100 border-t-pink-500 rounded-full animate-spin"></div>
                    <div className="text-pink-600 font-semibold tracking-wide animate-pulse">Loading Premium Product...</div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">Product Unavailable</h2>
                <p className="text-slate-500 mt-2 max-w-sm">This item might have been moved, deleted or temporarily unlisted by the seller.</p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-6 px-8 py-3.5 bg-gradient-to-r from-pink-600 to-rose-500 text-white rounded-xl font-bold shadow-lg shadow-pink-500/20 hover:opacity-90 transition-all"
                >
                    Return to Shop
                </button>
            </div>
        );
    }

    return (
        <section className="bg-[#F8FAFC] min-h-screen py-8 lg:py-12 text-slate-800 antialiased">
            <div className="w-[92%] max-w-[1340px] mx-auto space-y-6">

                {/* TOP BAR */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="group px-4 py-2.5 bg-white text-slate-600 border border-slate-200 rounded-xl shadow-sm hover:text-pink-600 hover:border-pink-200 transition-all flex items-center gap-2 font-semibold text-sm"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back
                    </button>

                    <button
                        onClick={deleteProduct}
                        disabled={isDeleting}
                        className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl flex items-center gap-2 font-bold text-sm transition-all border border-red-200 disabled:opacity-50"
                    >
                        <Trash2 size={16} />
                        {isDeleting ? "Deleting..." : "Delete Product"}
                    </button>
                </div>

                {/* MAIN GRID */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-10 p-6 lg:p-10">

                    {/* LEFT COLUMN: MULTI-IMAGE GALLERY */}
                    <div className="lg:col-span-6 flex flex-col-reverse md:flex-row gap-4 h-fit">
                        {allImages.length > 1 && (
                            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[500px] no-scrollbar py-1">
                                {allImages.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveImage(img)}
                                        className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 bg-slate-50 transition-all p-0.5 ${activeImage === img ? "border-pink-500 shadow-md ring-2 ring-pink-500/10" : "border-slate-200 hover:border-slate-400"}`}
                                    >
                                        <img src={img} alt={`Thumb ${index}`} className="w-full h-full object-cover rounded-lg" onError={(e) => { e.target.src = "/no-image.png"; }} />
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="relative flex-1 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden cursor-crosshair group h-[400px] sm:h-[500px]">
                            <img
                                src={activeImage}
                                alt={product.title}
                                className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.01]"
                                onMouseEnter={() => setShowMagnifier(true)}
                                onMouseLeave={() => setShowMagnifier(false)}
                                onMouseMove={handleMouseMove}
                                onError={(e) => { e.target.src = "/no-image.png"; }}
                            />

                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md transition-all active:scale-90 z-10"
                            >
                                <Heart size={18} className={`transition-colors ${isWishlisted ? "fill-pink-500 text-pink-500" : "text-slate-400 hover:text-pink-500"}`} />
                            </button>

                            {showMagnifier && (
                                <div
                                    className="absolute w-[150px] h-[150px] rounded-full border border-slate-300 shadow-xl bg-white/5 pointer-events-none backdrop-blur-[0.5px]"
                                    style={{ left: position.x - 75, top: position.y - 75 }}
                                />
                            )}
                        </div>

                        {showMagnifier && (
                            <div
                                className="hidden lg:block absolute top-[180px] right-[5%] xl:right-[10%] w-[500px] h-[500px] border border-slate-200 rounded-2xl shadow-2xl bg-white z-50 overflow-hidden"
                                style={{
                                    backgroundImage: `url(${activeImage})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: `${position.width * 2.5}px ${position.height * 2.5}px`,
                                    backgroundPosition: `-${position.x * 2.5 - 250}px -${position.y * 2.5 - 250}px`,
                                }}
                            />
                        )}
                    </div>

                    {/* RIGHT COLUMN: DESCRIPTION & SPECS */}
                    <div className="lg:col-span-6 flex flex-col justify-between">
                        <div>
                            <span className="inline-flex bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-pink-100">
                                {product.discount ? `${product.discount}% OFF` : 'In Stock'}
                            </span>

                            <h1 className="text-2xl sm:text-3xl font-black mt-4 text-slate-800 leading-tight">
                                {product.title}
                            </h1>

                            <div className="flex items-center gap-2 mt-3.5">
                                <div className="flex text-amber-400 gap-0.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={16}
                                            className={rating >= star ? "fill-amber-400" : "text-slate-200"}
                                        />
                                    ))}
                                </div>
                                <span className="text-slate-400 text-xs font-semibold border-l pl-2 border-slate-200">
                                    {product.reviews || 84} Verified Reviews
                                </span>
                            </div>

                            <div className="mt-5 flex items-baseline gap-3 bg-slate-50 px-5 py-4 rounded-xl border border-slate-100 w-fit">
                                <span className="text-3xl font-black text-pink-600 tracking-tight">
                                    Rs {Number(product.price || 0).toLocaleString()}
                                </span>
                                {product.oldPrice && (
                                    <span className="text-sm font-semibold text-slate-400 line-through">
                                        Rs {Number(product.oldPrice).toLocaleString()}
                                    </span>
                                )}
                            </div>

                            <p className="mt-5 text-slate-600 leading-relaxed text-sm sm:text-base">
                                {product.description || "Experience top tier premium build quality with ergonomics engineered for professional productivity and casual longevity."}
                            </p>

                            <div className="grid grid-cols-3 gap-3 my-6 border-y border-slate-100 py-4 text-center">
                                <div className="flex flex-col items-center gap-1.5">
                                    <div className="bg-slate-50 p-2.5 rounded-full text-slate-700 border border-slate-100"><Truck size={18} /></div>
                                    <span className="text-[11px] font-bold text-slate-500 leading-tight">Secure Shipping</span>
                                </div>
                                <div className="flex flex-col items-center gap-1.5">
                                    <div className="bg-slate-50 p-2.5 rounded-full text-slate-700 border border-slate-100"><ShieldCheck size={18} /></div>
                                    <span className="text-[11px] font-bold text-slate-500 leading-tight">Genuine Product</span>
                                </div>
                                <div className="flex flex-col items-center gap-1.5">
                                    <div className="bg-slate-50 p-2.5 rounded-full text-slate-700 border border-slate-100"><RotateCcw size={18} /></div>
                                    <span className="text-[11px] font-bold text-slate-500 leading-tight">7 Days Return</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Interface */}
                        <div className="space-y-5">
                            <div>
                                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Select Quantity</span>
                                <div className="flex items-center border border-slate-200 rounded-xl w-fit bg-white shadow-sm overflow-hidden">
                                    <button onClick={decreaseQty} className="px-4 py-2 hover:bg-slate-50 font-bold text-slate-500 text-lg transition-colors">-</button>
                                    <span className="w-10 text-center font-bold text-sm text-slate-800">{quantity}</span>
                                    <button onClick={increaseQty} className="px-4 py-2 hover:bg-slate-50 font-bold text-slate-500 text-lg transition-colors">+</button>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => addToCart(product, quantity)}
                                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all shadow-sm active:scale-[0.99]"
                                >
                                    <ShoppingCart size={16} /> Add To Cart
                                </button>

                                {/* UPDATED BUTTON */}
                                <button
                                    onClick={() => {
                                        addToCart(product, quantity);
                                        navigate("/cart");
                                    }}
                                    className="flex-1 bg-gradient-to-r from-pink-600 to-rose-500 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-pink-500/10 hover:opacity-95 transition-all active:scale-[0.99]"
                                >
                                    Buy It Now
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}

export default ProductDetails;