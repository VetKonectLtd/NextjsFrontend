"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";

const testimonies = [
    {
        id: 1,
        videoId: "z8ESPIEVTlU",
        thumbnail: `https://img.youtube.com/vi/z8ESPIEVTlU/hqdefault.jpg`,
    },
    {
        id: 2,
        videoId: "L4qi_VmAoZQ",
        thumbnail: `https://img.youtube.com/vi/L4qi_VmAoZQ/hqdefault.jpg`,
    },
    {
        id: 3,
        videoId: "cN-nITQj7uk",
        thumbnail: `https://img.youtube.com/vi/cN-nITQj7uk/hqdefault.jpg`,
    },
    {
        id: 4,
        videoId: "herXM1DhqNY",
        thumbnail: `https://img.youtube.com/vi/herXM1DhqNY/hqdefault.jpg`,
    },
    {
        id: 5,
        videoId: "zYC7rZTb_Qc",
        thumbnail: `https://img.youtube.com/vi/zYC7rZTb_Qc/hqdefault.jpg`,
    },
];

export default function TestimonySection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(3);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Update visible count based on screen size
    useEffect(() => {
        const updateVisibleCount = () => {
            if (window.innerWidth < 640) {
                setVisibleCount(1);
            } else if (window.innerWidth < 1024) {
                setVisibleCount(2);
            } else {
                setVisibleCount(3);
            }
        };

        updateVisibleCount();
        window.addEventListener("resize", updateVisibleCount);
        return () => window.removeEventListener("resize", updateVisibleCount);
    }, []);

    // Reset index if it goes out of bounds when resizing
    useEffect(() => {
        const maxIndex = testimonies.length - visibleCount;
        if (currentIndex > maxIndex) {
            setCurrentIndex(Math.max(0, maxIndex));
        }
    }, [visibleCount, currentIndex]);

    const maxIndex = testimonies.length - visibleCount;

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const getVisibleTestimonies = () => {
        const items = [];
        for (let i = 0; i < visibleCount; i++) {
            const index = (currentIndex + i) % testimonies.length;
            items.push({ ...testimonies[index], position: i });
        }
        return items;
    };

    const openVideo = (videoId: string) => setActiveVideo(videoId);
    const closeVideo = () => setActiveVideo(null);

    return (
        <section className="py-16 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-55 mb-4">
                        What Our Users Are Saying
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
                        Hear directly from farmers, pet owners, and veterinarians who have
                        transformed their animal care experience with VetKonect.
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative px-6">
                    {/* Cards */}
                    <div
                        ref={carouselRef}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500"
                    >
                        {getVisibleTestimonies().map((testimony) => (
                            <div
                                key={`${testimony.id}-${testimony.position}`}
                                onClick={() => openVideo(testimony.videoId)}
                                className="relative w-full h-52 sm:h-56 bg-gray-100 rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                {/* Thumbnail */}
                                <img
                                    src={testimony.thumbnail}
                                    alt={`Testimony ${testimony.id}`}
                                    className="w-full h-full object-cover"
                                />

                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />

                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <Play
                                            className="w-7 h-7 text-primary-400 ml-1"
                                            fill="currentColor"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-225 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 hover:border-primary-400 transition z-10"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-55" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-225 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 hover:border-primary-400 transition z-10"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-55" />
                    </button>
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                                idx === currentIndex
                                    ? "bg-primary-400 w-6"
                                    : "bg-gray-300 hover:bg-gray-400 w-2.5"
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Video Modal */}
            {activeVideo && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                    onClick={closeVideo}
                >
                    <div
                        className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeVideo}
                            className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>

                        {/* YouTube Embed */}
                        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                                title="Testimony Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}