import React, { useEffect, useState } from "react";
import {
    GiFastBackwardButton,
    GiFastForwardButton,
} from "react-icons/gi";

import { useNavigate } from "react-router-dom";

function MainPage() {
    const [images, setImages] = useState([]);
    const [current, setCurrent] = useState(0);
    const [hover, setHover] = useState(false);

    const navigate = useNavigate();

    // 🔥 Fetch images
    useEffect(() => {
        fetch("http://localhost:5000/api/images")
            .then((res) => res.json())
            .then((data) => {
                setImages(data || []);
            })
            .catch((err) => console.log(err));
    }, []);

    // ➡️ Next Slide
    const nextSlide = () => {
        setCurrent((prev) =>
            images.length ? (prev + 1) % images.length : 0
        );
    };

    // ⬅️ Previous Slide
    const prevSlide = () => {
        setCurrent((prev) =>
            images.length
                ? prev === 0
                    ? images.length - 1
                    : prev - 1
                : 0
        );
    };

    // 🔁 Auto Slide
    useEffect(() => {
        if (hover || images.length === 0) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, [hover, images]);

    return (
        <div className="w-full">

            {/* ================= SLIDER ================= */}

            <div
                className="relative w-full h-[400px] overflow-hidden group"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >

                {/* Images */}
                {images.map((img, index) => (
                    <img
                        key={img._id || index}
                        src={img.url}
                        alt="banner"
                        onClick={() => navigate(`/banner/${img._id}`)}
                        className={`absolute w-full h-full object-cover transition-all duration-700 cursor-pointer ${current === index
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-105"
                            }`}
                    />
                ))}

                {/* Left Button */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/40 p-3 rounded-full opacity-0 group-hover:opacity-100"
                >
                    <GiFastBackwardButton />
                </button>

                {/* Right Button */}
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/40 p-3 rounded-full opacity-0 group-hover:opacity-100"
                >
                    <GiFastForwardButton />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 w-full flex justify-center gap-2">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`h-2 w-2 rounded-full cursor-pointer transition-all ${current === index
                                ? "bg-white w-5"
                                : "bg-gray-400"
                                }`}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}

export default MainPage;