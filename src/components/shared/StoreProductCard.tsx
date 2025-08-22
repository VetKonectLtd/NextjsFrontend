"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ButtonBg, Map } from "@/app/assets/icons/vet-vendor";

interface ProductCardProps {
	id: string;
	title: string;
	price: number;
	images: string[];
	rating: number;
	location: string;
	units: number;
	availableUnits?: boolean;
	onViewProduct?: (id: string) => void;
}

const StoreProductCard = ({
	title,
	price,
	images,
	rating,
	location,
	units,
	id,
	availableUnits,
	onViewProduct,
}: ProductCardProps) => {
	const [index, setIndex] = useState(0);

	const handleViewProduct = () => {
		if (onViewProduct && id) {
			onViewProduct(id);
		}
	};

	const nextImage = () => setIndex((prev) => (prev + 1) % images.length);

	// 🔥 Auto-play every 3s
	useEffect(() => {
		const interval = setInterval(() => {
			nextImage();
		}, 3000);
		return () => clearInterval(interval);
	}, [images.length]);

	return (
		<div className="bg-white rounded-2xl shadow-md flex flex-col relative overflow-hidden">
			{/* Image slider */}
			<div className="relative w-full h-[140px]">
				<AnimatePresence initial={false} mode="wait">
					<motion.div
						key={index}
						initial={{ opacity: 0, x: 40 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -40 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="absolute inset-0"
					>
						<Image
							src={images[index]}
							alt={title}
							fill
							className="object-cover"
							onClick={nextImage}
						/>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
					</motion.div>
				</AnimatePresence>

				{/* Rating */}
				<div className="absolute top-2 left-2 text-white text-xs rounded-md px-2 py-1 flex items-center gap-1">
					⭐ {rating} of 5
				</div>

				{/* Price */}
				<div className="absolute bottom-2 right-2 text-white font-bold rounded-md">
					${price.toFixed(2)}
				</div>

				{/* Indicator dots */}
				<div className="absolute bottom-2 left-2 flex justify-center gap-1">
					{images.map((_, i) => (
						<motion.div
							key={i}
							className={`h-2 rounded-full ${
								i === index ? "w-2 bg-white " : "w-2 bg-transparent border"
							}`}
							layout
							transition={{ type: "spring", stiffness: 300, damping: 20 }}
						/>
					))}
				</div>
			</div>

			{/* Details */}
			<div className="p-3">
				<div className="flex">
					<span className="text-sm font-semibold text-gray-900 truncate max-w-[120px]">
						{title.length > 18 ? `${title.slice(0, 18)}...` : title}
					</span>
				</div>
				<span className="flex items-center text-xs text-gray-500 mt-1">
					<Image
						src={Map}
						alt="Location"
						width={10}
						height={10}
						className="mr-2"
					/>
					<span className="ml-1">{location}</span>
				</span>

				<div className="flex items-center justify-between mt-3">
					<span className="text-xs text-gray-55 font-medium">
						{units} Units
					</span>
					<button
						style={{ backgroundImage: `url(${ButtonBg.src})` }}
						onClick={handleViewProduct}
						className="rounded-xl bg-cover bg-center bg-no-repeat p-2 flex items-center justify-center"
					>
						<ArrowRight size={20} color="#fff" />
					</button>
				</div>

				<div className="flex items-center justify-center shadow-md bg-[#F1F1F1] rounded-lg px-4 mt-3 py-2 mb-4">
					<span className="text-gray-55 text-center text-sm">
						{availableUnits ? (
							<div className="flex items-center rounded-lg  text-xs font-medium">
								<span className="w-2 h-2 rounded-full bg-green-500 mr-2 inline-block animate-pulse" />

								<span>Available - ({units} Units)</span>
							</div>
						) : (
							<div className="flex items-center  rounded-lg  text-xs font-medium">
								<span className="w-2 h-2  animate-pulse rounded-full bg-red-700 mr-2 inline-block" />
								<span>Sold Out</span>
							</div>
						)}
					</span>
				</div>
			</div>
		</div>
	);
};

export default StoreProductCard;
