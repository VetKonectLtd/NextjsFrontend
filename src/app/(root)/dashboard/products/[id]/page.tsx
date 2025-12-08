"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
	ArrowLeft,
	ChevronLeft,
	ChevronRight,
	Edit,
	Star,
	Info,
	Minus,
	Plus,
} from "lucide-react";
import { Map } from "@/app/assets/icons/vet-vendor";
import ProductCard from "@/components/vet-vendor/ProductCard";
import { usePaymentService } from "@/services/paymentService";
import { useAuthService } from "@/services/authService";
import { useProductService } from "@/services/productService";
import ProductSkeleton from "@/components/shared/ProductSkeleton";

export default function ProductDetailsPage({
	params,
}: {
	params: { id: string };
}) {
	const router = useRouter();
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [units, setUnits] = useState(1);
	const { useCurrentUser } = useAuthService();
	const { useGetRelatedProduct, useGetProductById } = useProductService();
	const { useOrderPayment, usePayment } = usePaymentService();
	const user = useCurrentUser(true);
	const userId = (user?.data as any)?.profile?.user_id;

	const orderPayment = useOrderPayment();
	const paymentMutation = usePayment();

	const productData: any = useGetProductById(true, params.id);
	const product = productData.data?.product;
	const relatedProductsData = useGetRelatedProduct(true, params.id);
	const relatedProducts =
		(relatedProductsData.data as Record<string, any>)?.products?.data || [];

	if (productData.isLoading) {
		return <ProductSkeleton />;
	}

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

	const incrementUnits = () => {
		if (units < product.available_unit) {
			setUnits(units + 1);
		}
	};

	const decrementUnits = () => {
		if (units > 1) {
			setUnits(units - 1);
		}
	};

	const handlePayment = () => {
		if (product.product_type === 1) {
			orderPayment.mutate(
				{
					merchant_user_id: product?.user_id,
					product_id: product.id,
					quantity: units,
				},
				{
					onSuccess: (data: any) => {
						if (data?.authorization_url) {
							window.location.href = data.authorization_url;
						}
					},
				},
			);
		} else {
			paymentMutation.mutate(
				{
					merchant_user_id: product?.user_id,
					product_id: product.id,
					quantity: units,
				},
				{
					onSuccess: () => {
						router.replace("/dashboard/messages");
					},
				},
			);
		}
	};

	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				size={14}
				className={
					i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
				}
			/>
		));
	};

	return (
		<div className="w-11/12 m-auto">
			{/* Header */}
			<div className="px-4 py-4 flex items-center mb-6">
				<button
					onClick={handleBack}
					className="flex items-center justify-center w-10 h-10 bg-white rounded-full mr-2 shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-600 hover:text-gray-800"
				>
					<ArrowLeft size={20} />
				</button>
				<span className="text-sm font-medium">Back</span>
			</div>

			{/* Image Carousel */}
			{product?.images_url?.length > 0 && (
				<div className="relative h-64 md:h-[350px] lg:h-[350px] bg-gray-900 rounded-t-2xl overflow-hidden">
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
						<button className="bg-white rounded-full p-2 shadow-lg">
							{/* <Edit size={16} className="text-gray-600" /> */}
						</button>

						{/* Carousel Indicators */}
						<div className="flex items-center space-x-2">
							{product?.images_url.map((_: any, index: any) => (
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
							₦ {Number(product?.price).toFixed(2)}
						</div>
					</div>
				</div>
			)}

			{/* Product Info */}
			<div className="bg-white px-4 py-4">
				<h1 className="text-lg font-semibold text-gray-900 mb-2">
					{product?.product_name}
				</h1>

				<div className="flex items-center text-gray-500 mb-4">
					<Image
						src={Map}
						alt="Location"
						width={10}
						height={10}
						className="mr-2"
					/>
					<span className="text-sm">{product?.location}</span>
				</div>

				{/* About */}
				<div className="mb-6">
					<h3 className="text-base font-semibold text-gray-900 mb-2">About</h3>
					<p className="text-sm text-gray-600 leading-relaxed">
						{product?.description}
					</p>
				</div>

				{/* Disclaimer */}
				<div className="mb-6">
					<div className="flex items-center mb-2">
						<h3 className="text-base font-semibold text-gray-900">
							Disclaimer
						</h3>
						<Info size={16} className="ml-2 text-gray-400" />
					</div>
					<p className="text-sm text-gray-600 leading-relaxed">
						Dear wonderful users, this is just to let you know that you are
						fully responsible for the products you purchase on the platform. The
						delivery timeline, location is to be communicated with the seller.
						However, your money is safe until transaction has been completed.
					</p>
				</div>

				{/* Reviews */}
				<div className="mb-6">
					<h3 className="text-base font-semibold text-gray-900 mb-3">
						Reviews
					</h3>
					{product?.ratings?.length === 0 ? (
						<p className="text-sm text-gray-500">
							No reviews yet. Be the first to leave a review!
						</p>
					) : (
						<div className="w-full overflow-x-scroll">
							<div className="flex space-x-4 pb-2">
								{product?.ratings.map((review: any) => (
									<div
										key={review.id}
										className="flex-shrink-0 w-full bg-gray-50 rounded-lg p-4"
									>
										<div className="flex items-center justify-between mb-2">
											<span className="font-medium text-sm text-gray-900">
												{review.user.first_name} {review.user.last_name}
											</span>
											<div className="flex items-center">
												{renderStars(review.rating)}
											</div>
										</div>
										<p className="text-sm text-gray-600 leading-relaxed">
											{review.comment}
										</p>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Tags */}
				<div className="mb-6">
					<div className="flex flex-wrap gap-2">
						{product?.tags.map((tag: any, index: any) => (
							<span
								key={index}
								className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
							>
								{tag.name}
							</span>
						))}
					</div>
				</div>

				{/* Units and Controls */}
				<div className="flex items-center justify-between mb-6">
					<span className="text-base font-medium text-gray-900">Units</span>
					<div className="flex items-center space-x-3">
						<button
							onClick={decrementUnits}
							disabled={units <= 1}
							className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
						>
							<Minus size={16} />
						</button>
						<span className="text-lg font-medium w-8 text-center">{units}</span>
						<button
							onClick={incrementUnits}
							disabled={units >= product?.available_unit}
							className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
						>
							<Plus size={16} />
						</button>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="space-y-3 mb-8">
					{product?.available_unit == 0 ? (
						<div className="flex items-center  rounded-lg  text-xs font-medium">
							<span className="w-2 h-2  animate-pulse rounded-full bg-red-700 mr-2 inline-block" />
							<span>Sold Out</span>
						</div>
					) : (
						<button className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium">
							Available - ({product?.available_unit} Units)
						</button>
					)}
					<button
						onClick={handlePayment}
						className="w-full py-3 bg-green-600 text-white rounded-lg font-medium"
					>
						Proceed to Payment
					</button>
				</div>

				{/* Similar Products */}
				<div>
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Similar Products
					</h3>
					{relatedProducts.length === 0 ? (
						<div className="w-full py-10 flex flex-col items-center justify-center text-gray-500">
							<p className="text-sm">No similar products found</p>
						</div>
					) : (
						<div className="grid grid-cols-4 gap-4">
							{relatedProducts.map((product: any) => (
								<ProductCard
									key={product.id}
									id={product.id}
									product_name={product.product_name}
									price={product.price}
									images_url={product.images_url}
									average_rating={product.average_rating}
									seller={product.seller}
									location={product.location}
									availability={product.availability}
									onViewProduct={(id) =>
										router.push(`/dashboard/products/${id}`)
									}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
