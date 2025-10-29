"use client";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Warning } from "@/app/assets/icons";
import { Dog } from "@/app/assets/icons/vet-vendor";

export default function OrderDetailsPage() {
	const router = useRouter();
	const params = useParams();

	const orders = [
		{
			id: "PD092201a",
			product_name: "Dog Mouth Guard & Belt",
			price: 7.99,
			location: "Lagos, Nigeria",
			payment_method: "Bank Transfer",
			status: "Delivered",
			current_step: 4, // corresponds to the index in progressSteps
			description:
				"on deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia.",

			images_url: [
				"https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
				"https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
				"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
			],
		},
	];

	// Get current order by ID
	const product = orders.find((o) => o.id === params?.id) || orders[0];
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const nextImage = () =>
		setCurrentImageIndex((prev) =>
			prev === product.images_url.length - 1 ? 0 : prev + 1,
		);

	const prevImage = () =>
		setCurrentImageIndex((prev) =>
			prev === 0 ? product.images_url.length - 1 : prev - 1,
		);

	const progressSteps = [
		"Payment initiated",
		"Pending confirmation",
		"Processing product(s)",
		"In Transit",
		"Delivered",
		"Delivery confirmed",
	];

	const currentStep = product.current_step;

	return (
		<main className="w-11/12 m-auto min-h-screen">
			<div className="flex cursor-pointer items-center py-3" onClick={() => router.back()}>
				<button className="bg-white p-1 mr-3 rounded-full shadow-md border border-gray-225">
					<ChevronLeft size={20} className="text-gray-600" />
				</button>
				<span>Order Details</span>
			</div>

			<div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
				{/* Header Image */}
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
								src={product.images_url[currentImageIndex]}
								alt={product.product_name}
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
						className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl"
					>
						<ChevronLeft size={20} className="text-gray-600" />
					</motion.button>

					<motion.button
						onClick={nextImage}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl"
					>
						<ChevronRight size={20} className="text-gray-600" />
					</motion.button>

					{/* Indicators + Price */}
					<div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-4">
						<div className="flex items-center space-x-2">
							{product.images_url.map((_, index) => (
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
						<div className="text-white text-xl font-bold">
							${product.price.toFixed(2)}
						</div>
					</div>
				</div>

				{/* Content */}
				<div className="p-6 space-y-4">
					<h2 className="text-lg font-semibold text-gray-800">
						{product.product_name} - {product.id}
					</h2>
					<p className="text-sm text-gray-500">📍 {product.location}</p>

					<div>
						<h3 className="font-semibold text-gray-800 text-sm mb-1">
							Product Description:
						</h3>
						<p className="text-sm text-gray-600">{product.description}</p>
					</div>

					<div>
						<h3 className="font-semibold text-gray-800 text-sm mb-1">
							Payment Method:
						</h3>
						<p className="text-sm text-gray-600">{product.payment_method}</p>
					</div>

					<div>
						<h3 className="font-semibold text-gray-800 text-sm mb-1">
							Order Status:
						</h3>
						<p className="text-xs text-gray-500 mb-4">
							Please only click on the radio button only when the action is
							currently ongoing or has been carried out.
						</p>

						{/* Progress Bar */}
						<div className="relative w-full">
							<div className="absolute top-2 left-[calc(5%)] right-[calc(5%)] h-1 bg-gray-200"></div>
							<div
								className="absolute top-2 left-[calc(5%)] h-1 bg-green-600 transition-all duration-500"
								style={{
									width: `${(currentStep / (progressSteps.length - 1)) * 90}%`, // use 90% since we removed the side spacing
								}}
							></div>

							<div className="flex justify-between relative z-10">
								{progressSteps.map((step, index) => (
									<div
										key={index}
										className="flex flex-col items-center text-center w-full"
									>
										<div
											className={`w-5 h-5 rounded-full border-2 ${
												index <= currentStep
													? "bg-green-600 border-green-600"
													: "bg-white border-gray-300"
											}`}
										></div>
										<span
											className={`text-xs mt-2 ${
												index <= currentStep
													? "text-green-700 font-medium"
													: "text-gray-500"
											}`}
										>
											{step}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Warning */}
					<div className="text-gray-55 gap-3 flex items-center text-xs py-5">
						<Image
							src={Warning}
							alt="warning"
							width={20}
							height={20}
							className="object-cover"
						/>
						Please note, following the above steps guarantees your payment to be
						released. Also, ensure your customer clicks on “Delivery confirmed”
						after delivering the good(s).
					</div>

					{/* Buttons */}
					<div className="flex flex-col gap-6 mt-6">
						<button className="w-full bg-[#F1F1F0] text-gray-55 rounded-lg py-2 font-semibold text-md">
							Cancel Order
						</button>
						<button className="w-full bg-primary-400 text-white rounded-lg py-2 font-semibold text-md">
							Buy Again
						</button>
					</div>

					<p className="text-xs text-gray-55 mt-6">
						<span className="font-medium">Return Policy:</span> You can only
						reach out to the customer support and the seller within 24 hours
						after the goods have been delivered to lodge a complaint and ask for
						a refund.
					</p>
				</div>
			</div>
		</main>
	);
}
