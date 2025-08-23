"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Map, Shop, Dog } from "@/app/assets/icons/vet-vendor";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import { useRouter } from "next/navigation";

const productData = {
	id: "1",
	name: "Dog Mouth Guard & Belt - PD092201a",
	location: "Lagos, Nigeria",
	price: 7.99,
	images: [
		"https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
		"https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
		"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
	],
	about:
		"Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia.",
	disclaimer:
		"Dear wonderful users, this is just to let you know that you are fully responsible for the products you purchase on the platform. The delivery timeline, location is to be communicated with the seller. However, your money is safe until transaction has been completed.",
	availableUnits: 20,
	tags: ["Dog Kits", "Puppy", "Golden Retrieval", "Buy Dog Puppy"],
	reviews: [
		{
			id: 1,
			name: "Adedunwa",
			rating: 5,
			comment:
				"Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
		},
		{
			id: 2,
			name: "John Smith",
			rating: 4,
			comment:
				"Great product, very satisfied with the quality and delivery time.",
		},
		{
			id: 3,
			name: "Sarah Johnson",
			rating: 5,
			comment: "Excellent quality and fast shipping. Highly recommended!",
		},
		{
			id: 4,
			name: "Mike Brown",
			rating: 4,
			comment: "Good value for money. Product works as expected.",
		},
	],
};

const ProductDetailsPage = () => {
	const [images] = useState([Shop.src, Dog.src]);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const router = useRouter();

	const handleBack = () => {
		router.back();
	};

	const nextImage = () => {
		setCurrentImageIndex((prev) =>
			prev === productData.images.length - 1 ? 0 : prev + 1,
		);
	};

	const prevImage = () => {
		setCurrentImageIndex((prev) =>
			prev === 0 ? productData.images.length - 1 : prev - 1,
		);
	};

	return (
		<div className="w-11/12 m-auto mt-3">
			<div
				onClick={handleBack}
				className="flex items-center text-sm mb-4 text-gray-55 hover:text-green-50"
			>
				<span className="bg-white border cursor-pointer text-gray-500 border-gray-225 shadow-md rounded-full p-1 mr-2">
					<ChevronLeft className="w-5 h-5" />
				</span>{" "}
				Back
			</div>
			<div className="min-h-screen py-2">
				<div className="w-full max-w-6xl shadow-md border rounded-2xl border-gray-225 bg-white">
					{/* Image Carousel */}
					<div className="relative h-64 bg-gray-900 rounded-t-2xl overflow-hidden">
						<AnimatePresence mode="wait">
							<motion.div
								key={currentImageIndex}
								initial={{ opacity: 0, x: 300 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -300 }}
								transition={{ duration: 0.3, ease: "easeInOut" }}
								className="absolute inset-0"
							>
								<Image
									src={productData.images[currentImageIndex]}
									alt={productData.name}
									fill
									className="object-cover"
									priority
								/>
							</motion.div>
						</AnimatePresence>

						{/* Carousel Controls */}
						<motion.button
							onClick={prevImage}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:shadow-xl"
						>
							<ChevronLeft size={20} className="text-gray-600" />
						</motion.button>

						<motion.button
							onClick={nextImage}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:shadow-xl"
						>
							<ChevronRight size={20} className="text-gray-600" />
						</motion.button>

						{/* Overlay Elements */}
						<div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-4">
							{/* Edit Icon */}
							<button className="bg-white rounded-full p-2 shadow-lg">
								<Edit size={16} className="text-gray-600" />
							</button>

							{/* Carousel Indicators */}
							<div className="flex items-center space-x-2">
								{productData.images.map((_, index) => (
									<motion.button
										key={index}
										onClick={() => setCurrentImageIndex(index)}
										whileHover={{ scale: 1.2 }}
										whileTap={{ scale: 0.9 }}
										className={`w-2 h-2 rounded-full transition-all duration-200 ${
											index === currentImageIndex
												? "bg-white scale-125"
												: "bg-white/50 hover:bg-white/75"
										}`}
									/>
								))}
							</div>

							{/* Price */}
							<div className="text-white text-xl font-bold">
								${productData.price.toFixed(2)}
							</div>
						</div>
					</div>

					<div className="px-6 py-4">
						<h2 className="font-bold text-xl mb-1">{productData.name}</h2>
						<div className="flex items-center gap-2 mb-2">
							<Image
								src={Map}
								alt="Location"
								width={20}
								height={20}
								className="mr-2"
							/>
							<span className="ml-1"> {productData.location}</span>
						</div>
						<p className="text-gray-500 text-sm mb-4">{productData.about}</p>
						<div className="flex flex-wrap gap-2 mb-4">
							<div className="flex flex-wrap gap-2">
								{productData.tags.map((tag, index) => (
									<span
										key={index}
										className="bg-white border text-gray-500 cursor-pointer px-3 py-1 text-xs border-gray-225 shadow-md rounded-full"
									>
										{tag}
									</span>
								))}
							</div>
						</div>
						<div className="flex items-center justify-center bg-[#F1F1F1] rounded-lg px-4 py-2 mb-4">
							<span className="text-gray-55 text-center text-sm">
								{productData.availableUnits ? (
									<div className="flex items-center rounded-lg  text-xs font-medium">
										<span className="w-2 h-2 rounded-full bg-green-500 mr-2 inline-block animate-pulse" />

										<span>Available - {productData.availableUnits} Units</span>
									</div>
								) : (
									<div className="flex items-center  rounded-lg  text-xs font-medium">
										<span className="w-2 h-2  animate-pulse rounded-full bg-red-700 mr-2 inline-block" />
										<span>Unavailable</span>
									</div>
								)}
							</span>
						</div>
						<button className="w-full bg-primary-400 text-white rounded-lg py-3 font-semibold text-md">
							Promote Product
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailsPage;
