import React, { useState, useEffect, useRef } from "react";
import {
    FaSearch,
    FaShoppingCart,
    FaBars,
    FaTimes,
    FaGlobe,
    FaChevronDown,
    FaUser,
    FaHistory,
    FaQuestionCircle
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "./CartContext";
import logo from "../../assets/abc-logo.png";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const [currentLangName, setCurrentLangName] = useState("English");

    const langDropdownRef = useRef(null);
    const searchRef = useRef(null);
    const navigate = useNavigate();
    const { cartItems } = useCart();

    const languages = [
        { code: "en", name: "English", flag: "🇬🇧" },
        { code: "ur", name: "اردو (Urdu)", flag: "🇵🇰" },
        { code: "ar", name: "العربية (Arabic)", flag: "🇸🇦" },
        { code: "zh-CN", name: "简体中文 (Chinese)", flag: "🇨🇳" },
        { code: "es", name: "Español (Spanish)", flag: "🇪🇸" },
        { code: "fr", name: "Français (French)", flag: "🇫🇷" }
    ];

    /* ================= GOOGLE TRANSLATE & CLICK OUTSIDE ================= */
    useEffect(() => {
        const existingScript = document.getElementById("google-translate-script");

        if (!existingScript) {
            const script = document.createElement("script");
            script.id = "google-translate-script";
            script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
        }

        window.googleTranslateElementInit = () => {
            if (window.google?.translate) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: "en",
                        includedLanguages: "en,ur,ar,zh-CN,es,fr",
                        autoDisplay: false
                    },
                    "google_translate_element"
                );
            }
        };

        const handleClickOutside = (e) => {
            if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
                setLangDropdownOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /* ================= FETCH PRODUCTS ================= */
    useEffect(() => {
        fetch("http://localhost:5000/api/mainpages")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    /* ================= SEARCH FILTER ================= */
    const filteredProducts =
        searchTerm.trim() === ""
            ? []
            : products.filter((item) => {
                const term = searchTerm.toLowerCase();
                return (
                    item.title?.toLowerCase().includes(term) ||
                    item.category?.toLowerCase().includes(term) ||
                    item.description?.toLowerCase().includes(term)
                );
            });

    /* ================= SEARCH ACTION ================= */
    const handleSearch = () => {
        if (!searchTerm.trim()) return;
        navigate(`/search/${encodeURIComponent(searchTerm.trim())}`);
        setShowSuggestions(false);
    };

    /* ================= LANGUAGE CHANGE ================= */
    const changeLanguage = (langCode, langName) => {
        document.cookie = `googtrans=/en/${langCode}; path=/;`;
        setCurrentLangName(langName);
        setLangDropdownOpen(false);
        window.location.reload();
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-pink-600 shadow-lg border-b border-pink-700 antialiased">
            {/* Hidden Google Translate Target */}
            <div id="google_translate_element" className="hidden" />

            {/* ================= UTILITY TOP BAR ================= */}
            <div className="bg-pink-700 text-white text-xs font-medium border-b border-pink-800/50 hidden lg:block">
                <div className="w-[92%] max-w-[1400px] mx-auto flex justify-end gap-6 py-2 items-center">
                    <Link to="/orders" className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
                        <FaHistory size={12} /> Order History
                    </Link>
                    <Link to="/help-and-support" className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
                        <FaQuestionCircle size={12} /> Help
                    </Link>
                    <div className="h-4 w-[1px] bg-pink-500/50 self-center" />
                    <Link to="/login" className="opacity-90 hover:opacity-100 transition-opacity">Login</Link>
                    <Link to="/register" className="bg-white/10 px-2.5 py-0.5 rounded hover:bg-white/20 transition-all">Signup</Link>

                    {/* Language Dropdown */}
                    <div ref={langDropdownRef} className="relative ml-2">
                        <button
                            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                            className="flex items-center gap-1.5 bg-pink-800/60 px-2.5 py-1 rounded border border-pink-500/30 hover:bg-pink-800 transition-all"
                        >
                            <FaGlobe size={11} />
                            <span>{currentLangName}</span>
                            <FaChevronDown size={9} className={`transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} />
                        </button>

                        {langDropdownOpen && (
                            <div className="absolute right-0 mt-1.5 bg-white text-slate-800 rounded-xl shadow-xl w-48 py-1 border border-slate-100 animate-fadeIn z-50">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code, lang.name)}
                                        className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-slate-50 flex items-center gap-2.5 transition-colors text-slate-700 hover:text-pink-600"
                                    >
                                        <span className="text-base">{lang.flag}</span>
                                        <span>{lang.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ================= MAIN NAVIGATION BAR ================= */}
            <div className="w-[92%] max-w-[1400px] mx-auto py-2 sm:py-3">
                <div className="flex items-center justify-between gap-6">

                    {/* Brand Logo Container - Expanded height boundaries */}
                    <div className="flex items-center flex-shrink-0 relative h-12 md:h-16">
                        <img
                            src={logo}
                            alt="Brand Logo"
                            /* - 'absolute' lets the logo ignore the navbar container height
                               - 'top-1/2 -translate-y-1/2' keeps it vertically dead-centered
                               - 'h-24 md:h-32' makes the graphic huge
                            */
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-20 sm:h-24 md:h-28 w-auto object-contain cursor-pointer transition-transform duration-200 active:scale-95 max-w-[180px] md:max-w-[240px]"
                            onClick={() => navigate("/home")}
                        />
                        {/* This ghost spacer prevents the search bar from sliding left over our absolute logo */}
                        <div className="w-[120px] sm:w-[150px] md:w-[180px]" />
                    </div>

                    {/* Premium Intelligent Search Bar */}
                    <div ref={searchRef} className="relative flex-1 max-w-[650px] hidden md:block">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSearch();
                            }}
                            className="relative flex items-center bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-white/40 transition-all"
                        >
                            <input
                                type="text"
                                value={searchTerm}
                                onFocus={() => setShowSuggestions(true)}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setShowSuggestions(true);
                                }}
                                placeholder="Search premium products, brands and categories..."
                                className="w-full pl-4 pr-12 py-3 font-medium text-sm text-slate-800 bg-white placeholder-slate-400 focus:outline-none"
                            />

                            {/* Clear Input Option */}
                            {searchTerm && (
                                <button
                                    type="button"
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-16 text-slate-400 hover:text-slate-600 p-1 transition-colors"
                                >
                                    <FaTimes size={14} />
                                </button>
                            )}

                            <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white h-full absolute right-0 px-5 flex items-center justify-center transition-colors">
                                <FaSearch size={14} />
                            </button>
                        </form>

                        {/* Search Suggestions Panel */}
                        {showSuggestions && searchTerm.trim() !== "" && (
                            <div className="absolute left-0 right-0 bg-white mt-2 rounded-2xl shadow-2xl border border-slate-100 max-h-[380px] overflow-y-auto z-50 py-2">
                                {filteredProducts.length > 0 ? (
                                    <>
                                        <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-50">Products Found</div>
                                        {filteredProducts.slice(0, 6).map((item) => (
                                            <div
                                                key={item._id}
                                                onClick={() => {
                                                    navigate(`/product/${item._id}`);
                                                    setSearchTerm("");
                                                    setShowSuggestions(false);
                                                }}
                                                className="flex items-center gap-3.5 px-4 py-2.5 hover:bg-slate-50 cursor-pointer transition-colors group"
                                            >
                                                <div className="w-11 h-11 bg-slate-50 rounded-lg overflow-hidden border border-slate-100 flex-shrink-0">
                                                    <img
                                                        src={item.url || "/no-image.png"}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                        onError={(e) => { e.target.src = "/no-image.png"; }}
                                                    />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-sm text-slate-800 truncate group-hover:text-pink-600 transition-colors">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-xs text-slate-400 font-medium capitalize mt-0.5">
                                                        {item.category || "General"}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <div className="p-6 text-center text-slate-400 text-sm font-medium">
                                        No matches found for <span className="text-slate-700 font-semibold">"{searchTerm}"</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Hand Controls Actions */}
                    <div className="flex items-center gap-3 sm:gap-5">
                        {/* Interactive Cart Button */}
                        <button
                            className="text-white relative p-2.5 rounded-full hover:bg-white/10 transition-all group flex items-center justify-center"
                            onClick={() => navigate("/cart")}
                            aria-label="Shopping Cart"
                        >
                            <FaShoppingCart size={22} className="group-hover:scale-105 transition-transform" />
                            {cartItems.length > 0 && (
                                <span className="absolute top-0 right-0 bg-white text-pink-600 text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center shadow-md animate-pulse">
                                    {cartItems.length}
                                </span>
                            )}
                        </button>

                        {/* Mobile Navigation Toggle Trigger */}
                        <button
                            className="lg:hidden text-white p-2.5 rounded-full hover:bg-white/10 transition-all text-xl"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ================= MOBILE EXPANDED NAVIGATION DRAWER ================= */}
            {menuOpen && (
                <div className="lg:hidden bg-pink-700 border-t border-pink-800 text-white animate-slideDown">
                    <div className="px-6 py-4 space-y-4 font-semibold text-sm">
                        {/* Mobile Interactive Search Module */}
                        <div className="md:hidden relative pb-2">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSearch();
                                    setMenuOpen(false);
                                }}
                                className="flex bg-white rounded-lg overflow-hidden border border-slate-200"
                            >
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full px-3 py-2.5 text-slate-800 text-xs bg-white focus:outline-none"
                                />
                                <button type="submit" className="bg-slate-900 px-4 text-white text-xs">
                                    <FaSearch />
                                </button>
                            </form>
                        </div>

                        <Link to="/orders" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 py-2 border-b border-pink-600/30">
                            <FaHistory size={14} /> Order History
                        </Link>
                        <Link to="/login" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 py-2 border-b border-pink-600/30">
                            <FaUser size={14} /> Login
                        </Link>
                        <Link to="/register" onClick={() => setMenuOpen(false)} className="block bg-white text-pink-700 text-center py-2.5 rounded-xl mt-2 font-bold shadow-md">
                            Create Account
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;