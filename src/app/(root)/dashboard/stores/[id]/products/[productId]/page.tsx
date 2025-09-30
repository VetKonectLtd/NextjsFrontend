"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Map } from "@/app/assets/icons/vet-vendor";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProductService } from "@/services/productService";
import Link from "next/link";


const ProductDetailsPage = ({ params }: { params: { productId: string, id:string } }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const router = useRouter();
	const {useGetProductById}= useProductService();

	const productDat: any = useGetProductById(true, params.productId);
	const product = productDat.data?.product;
	
	const handleBack = () => {
		router.back();
	};

	const nextImage = () => {
		setCurrentImageIndex((prev) =>
			prev === product.images_url.length - 1 ? 0 : prev + 1,
		);
	};

	const prevImage = () => {
		setCurrentImageIndex((prev) =>
			prev === 0 ? product.images_url.length - 1 : prev - 1,
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
									src={product?.images_url[currentImageIndex]}
									alt={product?.product_name}
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
							<Link href={`/dashboard/stores/${params.id}/edit/${product?.id}`} className="bg-white rounded-full p-2 shadow-lg">
								<Edit size={16} className="text-gray-600" />
							</Link>

							{/* Carousel Indicators */}
							<div className="flex items-center space-x-2">
								{product?.images_url.map((_:any, index:any) => (
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
								${Number(product?.price).toFixed(2)}
							</div>
						</div>
					</div>

					<div className="px-6 py-4">
						<h2 className="font-bold text-xl mb-1">{product?.product_name}</h2>
						<div className="flex items-center gap-2 mb-2">
							<Image
								src={Map}
								alt="Location"
								width={20}
								height={20}
								className="mr-2"
							/>
							<span className="ml-1"> {product?.location}</span>
						</div>
						<p className="text-gray-500 text-sm mb-4">{product?.description}</p>
						<div className="flex flex-wrap gap-2 mb-4">
							<div className="flex flex-wrap gap-2">
								{product?.tags.map((tag:any) => (
									<span
										key={tag.id}
										className="bg-white border text-gray-500 cursor-pointer px-3 py-1 text-xs border-gray-225 shadow-md rounded-full"
									>
										{tag.name}
									</span>
								))}
							</div>
						</div>
						<div className="flex items-center justify-center bg-[#F1F1F1] rounded-lg px-4 py-2 mb-4">
							<span className="text-gray-55 text-center text-sm">
								{product?.availability ? (
									<div className="flex items-center rounded-lg  text-xs font-medium">
										<span className="w-2 h-2 rounded-full bg-green-500 mr-2 inline-block animate-pulse" />

										<span>Available - {product?.available_unit} Units</span>
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
