"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Warning } from "@/app/assets/icons";
import { useOrderService } from "@/services/orderService";
import { useAuthService } from "@/services/authService";

export default function OrderDetailsPage({
	params,
}: {
	params: { id: string };
}) {
	const router = useRouter();
	const { useCurrentUser } = useAuthService();
	const { useGetOrderById, useTrackOrder, useCancelOrder, useConfirmOrder } =
		useOrderService();
	const { data: ordersData, isLoading } = useGetOrderById(true, params?.id);
	const user = useCurrentUser(true);
	const currentUserId = (user as Record<string, any>).data?.profile?.user_id;

	const order = (ordersData as any)?.order;

	const product = {
		id: order?.tracking_number,
		product_name: order?.items?.product_name,
		price: Number(order?.items?.price),
		location: order?.buyer?.address ?? "Unknown",
		payment_method: order?.payment_method,
		status: order?.status,
		description: order?.items?.product_snapshot?.description,
		images_url: order?.items?.product_snapshot?.images_url ?? [],
		current_step: order?.timeline?.events?.length ?? 0,
	};

	const isBuyer = order?.buyer_user_id === currentUserId;
	const isMerchant = order?.merchant_user_id === currentUserId;

	const [canCancel, setCanCancel] = useState(false);
	const isCanceled =
		product.status?.toLowerCase() === "canceled" ||
		product.status?.toLowerCase() === "cancelled";

	useEffect(() => {
		if (!order?.created_at) return;

		const orderTime = new Date(order.created_at).getTime();
		const now = new Date().getTime();
		const hoursSinceOrder = (now - orderTime) / 1000 / 60 / 60;

		setCanCancel(hoursSinceOrder <= 24);
	}, [order?.created_at]);

	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const nextImage = () =>
		setCurrentImageIndex((prev) =>
			prev === product.images_url.length - 1 ? 0 : prev + 1,
		);
	const prevImage = () =>
		setCurrentImageIndex((prev) =>
			prev === 0 ? product.images_url.length - 1 : prev - 1,
		);

	// Tracking steps in correct chronological order
	const progressSteps = [
		"Payment_Initiated",
		"Pending_Confirmation",
		"Processing",
		"In_Transit",
		"Delivered",
		"delivery_confirmed",
	];

	// Map tracking_status → index
	const trackingStatus = order?.tracking_status ?? "payment_initiated";
	const currentStep = progressSteps.indexOf(trackingStatus);
	console.log(order?.tracking_status, "hello", order)

	// ---- API Mutation Hooks ---- //
	const cancelOrderMutation = useCancelOrder(true, params?.id);
	const confirmOrderMutation = useConfirmOrder(true, params?.id);
	const trackingMutation = useTrackOrder(true, params?.id);

	const handleCancelOrder = async () => {
		if (window.confirm(`Are you sure you want to cancel the order?`)) {
			cancelOrderMutation.mutate({
				onSuccess: () => {},
			});
		}
	};

	const handleConfirmOrder = async () => {
		if (window.confirm(`Are you sure you want to confirm delivery?`)) {
			confirmOrderMutation.mutate({
				onSuccess: () => {},
			});
		}
	};

	const handleAdvanceStep = () => {
		if (currentStep >= progressSteps.length - 1) return;

		const nextStatus = progressSteps[currentStep + 1];

		trackingMutation.mutate(
			{ tracking_status: nextStatus },
			{
				onSuccess: () => {},
			},
		);
	};

	return (
		<main className="w-11/12 m-auto min-h-screen">
			<div
				className="flex cursor-pointer items-center py-3"
				onClick={() => router.back()}
			>
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
							transition={{ duration: 0.3 }}
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
						className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
					>
						<ChevronLeft size={20} className="text-gray-600" />
					</motion.button>

					<motion.button
						onClick={nextImage}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
					>
						<ChevronRight size={20} className="text-gray-600" />
					</motion.button>

					{/* Indicators + Price */}
					<div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-4">
						<div className="flex items-center space-x-2">
							{product.images_url.map((_: any, i: any) => (
								<motion.button
									key={i}
									onClick={() => setCurrentImageIndex(i)}
									className={`w-2 h-2 rounded-full ${
										i === currentImageIndex
											? "bg-white scale-125"
											: "bg-white/50"
									}`}
								/>
							))}
						</div>
						<div className="text-white text-xl font-bold">
							₦{product.price.toLocaleString()}
						</div>
					</div>
				</div>

				{/* Content */}
				<div className="p-6 space-y-4">
					<h2 className="text-lg font-semibold text-gray-800">
						{product.product_name} - {product.id}
					</h2>

					<p className="text-sm text-gray-500">
						Sold by: {order?.merchant?.first_name} {order?.merchant?.last_name}
					</p>

					<div>
						<h3 className="font-semibold text-gray-800 text-sm mb-1">
							Product Description:
						</h3>
						<p className="text-sm text-gray-600">{product?.description}</p>
					</div>

					<div>
						<h3 className="font-semibold text-gray-800 text-sm mb-1">
							Payment Method:
						</h3>
						<p className="text-sm text-gray-600">{product.payment_method}</p>
					</div>

					{/* Progress Steps */}
					<div>
						<h3 className="font-semibold text-gray-800 text-sm mb-2">
							Order Status: {trackingStatus.replace("_", " ")}
						</h3>

						<div className="relative w-full">
							{/* Track Background */}
							<div className="absolute top-2 left-[5%] right-[5%] h-1 bg-gray-200"></div>

							{/* Active Track */}
							<div
								className="absolute top-2 left-[5%] h-1 bg-green-600 transition-all"
								style={{
									width: `${(currentStep / (progressSteps.length - 1)) * 90}%`,
								}}
							></div>

							{/* Step Indicators */}
							<div className="flex justify-between relative z-10">
								{progressSteps.map((step, index) => (
									<div
										key={index}
										className="flex flex-col items-center w-full"
									>
										<div
											className={`w-5 h-5 rounded-full border-2 transition-all ${
												index <= currentStep
													? "bg-green-600 border-green-600"
													: "bg-white border-gray-300"
											}`}
										></div>
										<span
											className={`text-[10px] mt-2 text-center w-16 leading-tight ${
												index <= currentStep
													? "text-green-700"
													: "text-gray-500"
											}`}
										>
											{step.replace("_", " ")}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Warning */}
					<div className="text-gray-55 flex items-center text-xs py-5 gap-3">
						<Image src={Warning} alt="warning" width={20} height={20} />
						Please make sure your customer clicks “Delivery confirmed”.
					</div>

					{/* Buttons */}
					<div className="flex flex-col gap-6 mt-6">
						{isBuyer && trackingStatus === "delivered" && (
							<button
								onClick={handleConfirmOrder}
								disabled={confirmOrderMutation.isPending}
								className="w-full bg-primary-400 text-white rounded-lg py-2 font-semibold"
							>
								{confirmOrderMutation.isPending
									? "Processing..."
									: "Mark as Delivered"}
							</button>
						)}

						{/* Merchant button */}
						{isMerchant && currentStep < progressSteps.length - 1 && (
							<button
								onClick={handleAdvanceStep}
								disabled={trackingMutation.isPending}
								className="w-full mt-4 bg-green-600 text-white rounded-lg py-2 font-semibold"
							>
								{trackingMutation.isPending
									? "Updating..."
									: "Confirm Next Step"}
							</button>
						)}

						{/* Cancel Order (buyer only) */}
						{isBuyer && !isCanceled && canCancel && (
							<button
								onClick={handleCancelOrder}
								disabled={cancelOrderMutation.isPending}
								className="w-full bg-[#F1F1F0] text-gray-55 rounded-lg py-2 font-semibold"
							>
								{cancelOrderMutation.isPending
									? "Cancelling..."
									: "Cancel Order"}
							</button>
						)}

						{/* Contact Support */}
						{isBuyer && !canCancel && !isCanceled && (
							<button className="w-full bg-[#F1F1F0] text-gray-55 rounded-lg py-2 font-semibold">
								Contact Support
							</button>
						)}

						<button className="w-full bg-primary-400 text-white rounded-lg py-2 font-semibold">
							Buy Again
						</button>
					</div>

					<p className="text-xs text-gray-55 mt-6">
						<strong>Return Policy:</strong> Contact support within 24 hours of
						delivery for complaints or refund issues.
					</p>
				</div>
			</div>
		</main>
	);
}
