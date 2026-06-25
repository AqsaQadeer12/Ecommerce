import React from 'react';

function Footer() {
    const currentYear = new Date().getFullYear();

    const customerCareLinks = [
        { label: "Help Center", href: "#" },
        { label: "How to Buy", href: "#" },
        { label: "Corporate & Bulk Purchasing", href: "#" },
        { label: "Return & Refund", href: "#" },
        { label: "Shopping Hub Shop", href: "#" },
        { label: "Contact Us", href: "#" },
        { label: "Purchase Protection", href: "#" },
        { label: "Shopping Hub Pick up Points", href: "#" }
    ];

    const companyLinks = [
        { label: "About Us", href: "#" },
        { label: "Digital Payments", href: "#" },
        { label: "Shopping Hub Donates", href: "#" },
        { label: "Terms & Conditions", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Online Shopping App", href: "#" },
        { label: "Online Grocery Shopping", href: "#" },
        { label: "Shopping Hub Exclusive", href: "#" },
        { label: "Shopping Hub University", href: "#" },
        { label: "Sell On Shopping Hub", href: "#" },
        { label: "Join Shopping Hub Affiliate Program", href: "#" }
    ];

    const internationalCountries = [
        { name: "Pakistan", flag: "https://img.lazcdn.com/us/domino/1fe7d756-2469-4d8e-82b2-d5eb7cbad875_PK-84-84.png" },
        { name: "Bangladesh", flag: "https://img.lazcdn.com/us/domino/05a4ef2c-095c-407d-9295-aa45b5412de0_PK-84-84.png" },
        { name: "Sri Lanka", flag: "https://img.lazcdn.com/us/domino/5536488d-c32a-44eb-8307-ed6651d907da_PK-84-84.png" },
        { name: "Myanmar", flag: "https://img.lazcdn.com/us/domino/8896f696-b36f-4cb1-8576-2e86eed05046_PK-84-84.png" },
        { name: "Nepal", flag: "https://img.lazcdn.com/us/domino/39f7f111-619f-47cd-993c-a551aaed15fd_PK-86-86.png" }
    ];

    return (
        <footer className="w-full bg-white text-slate-600 font-sans antialiased border-t border-slate-200">

            {/* Top Link Columns Block */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

                    {/* Column 1: Customer Care */}
                    <div className="text-left">
                        <h3 className="text-xs font-bold text-slate-900 tracking-widest uppercase mb-4">
                            Customer Care
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            {customerCareLinks.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.href} className="hover:text-pink-600 hover:underline underline-offset-4 transition-all duration-150 block">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 2: Categories / Corporate */}
                    <div className="text-left">
                        <h3 className="text-xs font-bold text-slate-900 tracking-widest uppercase mb-4">
                            Shopping Hub & Categories
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            {companyLinks.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.href} className="hover:text-pink-600 hover:underline underline-offset-4 transition-all duration-150 block">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: App Download */}
                    <div className="text-left flex flex-col space-y-5">
                        <div>
                            <h3 className="text-xs font-bold text-slate-900 tracking-widest uppercase mb-3">
                                Experience App
                            </h3>
                            <div className="border border-slate-100 bg-slate-50/70 p-4 rounded-xl">
                                <span className="text-pink-600 font-bold text-base block mb-0.5">
                                    Happy Shopping
                                </span>
                                <span className="text-xs text-slate-400 block">
                                    Download our optimized mobile platform.
                                </span>
                            </div>
                        </div>

                        {/* Functional Link Buttons redirecting to stores */}
                        <div className="flex flex-col gap-2">
                            <a
                                href="https://apps.apple.com/app/daraz-online-shopping-app/id978058047"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col justify-center items-center bg-slate-900 hover:bg-slate-800 text-white py-2 px-4 rounded-lg transition-colors border border-slate-950 shadow-sm group"
                            >
                                <span className="text-[10px] text-slate-400 uppercase tracking-tight block leading-none font-medium">Download on the</span>
                                <span className="text-sm font-semibold tracking-wide block leading-tight mt-0.5 group-hover:text-pink-400 transition-colors">App Store</span>
                            </a>
                            <a
                                href="https://play.google.com/store/apps/details?id=com.daraz.android"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col justify-center items-center bg-slate-900 hover:bg-slate-800 text-white py-2 px-4 rounded-lg transition-colors border border-slate-950 shadow-sm group"
                            >
                                <span className="text-[10px] text-slate-400 uppercase tracking-tight block leading-none font-medium">Get it on</span>
                                <span className="text-sm font-semibold tracking-wide block leading-tight mt-0.5 group-hover:text-pink-400 transition-colors">Google Play</span>
                            </a>
                        </div>
                    </div>

                    {/* Column 4: Compliance & Verifications */}
                    <div className="text-left">
                        <h3 className="text-xs font-bold text-slate-900 tracking-widest uppercase mb-4">
                            Corporate Verification
                        </h3>
                        <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 space-y-3.5 text-xs">
                            <div className="flex flex-col gap-1 border-b border-slate-200/60 pb-2">
                                <span className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">NTN Registered Portfolio</span>
                                <span className="font-mono text-slate-800 font-bold tracking-wider">4012118-6</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">STRN Registered Portfolio</span>
                                <span className="font-mono text-slate-800 font-bold tracking-wider">1700401211818</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Tier: Regional Network & Legal Details */}
            <div className="w-full bg-slate-50 border-t border-slate-200/60 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                    {/* International Network with Flags */}
                    <div className="text-left">
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-3">
                            Shopping Hub International Network
                        </span>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                            {internationalCountries.map((country, idx) => (
                                <div key={idx} className="flex items-center gap-2 group cursor-default">
                                    <img
                                        src={country.flag}
                                        alt={`${country.name} Flag`}
                                        className="h-5 w-5 object-cover rounded-full border border-slate-200 shadow-sm transition-transform duration-150 group-hover:scale-105"
                                    />
                                    <span className="text-xs font-medium text-slate-500 group-hover:text-pink-600 transition-colors duration-150">
                                        {country.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Clean Copyright Line */}
                    <div className="text-xs text-slate-400 font-medium md:self-end text-left md:text-right">
                        &copy; {currentYear} Shopping Hub Marketplaces. All rights reserved.
                    </div>

                </div>
            </div>

        </footer>
    );
}

export default Footer;