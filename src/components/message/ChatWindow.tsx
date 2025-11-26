"use client";
import Image from "next/image";
import { ArrowLeft, ImageIcon, Send } from "lucide-react";
import MessageDropdown from "./MessageDropdown";
import { Clock, User } from "@/app/assets/icons";
import { directMessageService } from "@/services/directMessageService";
import { useAuthService } from "@/services/authService";
import { formatRole } from "../shared/TimeFormat";
import { useEffect, useRef, useState } from "react";
import AppointmentDetails from "./AppointmentDetails";
import { useForm } from "react-hook-form";
import { MessageFormData } from "@/types";
import { toast } from "sonner";
import OrderDetailsModal from "./OrderDetailsModal";
const DEFAULT_AVATAR = User;

interface ChatWindowProps {
	selectedVet: any;
	message: string;
	onBack: () => void;
	onMessageChange: (val: string) => void;
	onOpenVetDetails: () => void;
}

export default function ChatWindow({
	selectedVet,
	onBack,
	onMessageChange,
	onOpenVetDetails,
}: ChatWindowProps) {
	const {
		useGetCancelAppointment,
		useSendMessage,
		useGetMessage,
	} = directMessageService();
	const { useCurrentUser } = useAuthService();
	const [openAppointmentModal, setOpenAppointmentModal] = useState(false);
	const [selectedAppointment, setSelectedAppointment] = useState<string>("");
	const [cancelAppointmentId, setCancelAppointmentId] = useState<string>("");
	const [previews, setPreviews] = useState<string[]>([]);
	const [openOrderModal, setOpenOrderModal] = useState(false);
	const [selectedOrderUrl, setSelectedOrderUrl] = useState<string>("");
	const messagesEndRef = useRef<HTMLDivElement | null>(null);
	const user = useCurrentUser(true);
	const currentUserId = (user as Record<string, any>).data?.profile?.user_id;
	const { data: messageData, refetch } = useGetMessage(true, selectedVet?.id);
	const { refetch: cancelAppointment } = useGetCancelAppointment(
		false,
		cancelAppointmentId,
	);
	const sendMessage = useSendMessage();
	const allMessages: any = messageData ?? [];

	const { register, handleSubmit, getValues, setValue } =
		useForm<MessageFormData>();

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		const allowedFiles = files;

		allowedFiles.forEach((file) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviews((prev) => [...prev, reader.result as string]);
			};
			reader.readAsDataURL(file);
		});
		setValue("images", [...allowedFiles], {
			shouldValidate: true,
		});
	};

	const handleRemoveImage = (idx: number) => {
		setPreviews((prev) => prev.filter((_, i) => i !== idx));
		const existingImages = getValues("images") || [];
		const updatedImages = existingImages.filter((_, i) => i !== idx);
		setValue("images", updatedImages, { shouldValidate: true });
	};

	const scrollToBottom = () => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [allMessages]);

	useEffect(() => {
		if (selectedVet?.id) {
			refetch();
		}
	}, [selectedVet?.id]);

	useEffect(() => {
		let channel: any;

		(async () => {
			if (typeof window === "undefined" || !selectedVet?.id) return;

			const { default: echo } = await import("@/lib/echo");
			if (!echo) {
				console.error("Echo not initialized");
				return;
			}

			const ids = [currentUserId, selectedVet.id].sort((a, b) => a - b);
			channel = echo.private(`direct-chat.${ids[0]}.${ids[1]}`);

			channel.listen("direct-message.sent", (event: any) => {
				console.log("New message:", event.message);
				refetch();
			});
		})();

		return () => {
			if (channel) {
				channel.stopListening("direct-message.sent");
				console.log("Unsubscribed from channel");
			}
		};
	}, [selectedVet?.id, currentUserId]);

	const handleCancelAppointment = (appointmentId: string) => async () => {
		setCancelAppointmentId(appointmentId);
		setTimeout(async () => {
			try {
				const res = await cancelAppointment();
				if (res?.data) {
					toast.success("Appointment cancelled successfully");
					refetch();
				}
			} catch (error) {
				toast.error("Failed to cancel appointment");
			}
		}, 0);
	};

	const handleViewAppointmentDetails = (appointment: any) => {
		setSelectedAppointment(appointment);
		setOpenAppointmentModal(true);
	};

	const handleSendMessage = (data: any) => {
		if (!data.content && !data.images) return;
		const formData: any = new FormData();
		formData.append("content", data.content);
		formData.append("receiver_id", selectedVet?.id);

		data.images?.forEach((file: any) => formData.append("images[]", file));

		sendMessage.mutate(formData, {
			onSuccess: (res) => {
				refetch();
				setValue("content", "");
				setValue("images", []);
				setPreviews([]);
			},
		});
	};

	const handleViewOrder = (url: string) => {
		console.log("Order Details:", url);
		const relativeUrl = new URL(url).pathname.replace("/api", "");
		setSelectedOrderUrl(relativeUrl);
		setOpenOrderModal(true);
	};

	console.log("Selected Vet in ChatWindow:", allMessages);

	return (
		<div className="bg-white min-h-[85vh] max-h-[85vh] md:col-span-1 col-span-4 rounded-2xl md:shadow-md w-full md:max-w-sm flex flex-col overflow-hidden md:border border-gray-200">
			{/* Header */}
			<div className="flex items-center justify-between p-3 border-b border-gray-100">
				<div className="flex items-center gap-2">
					<button onClick={onBack} className="md:hidden">
						<ArrowLeft className="w-5 h-5 text-gray-600" />
					</button>
					<div
						onClick={onOpenVetDetails}
						className="flex items-center gap-2 cursor-pointer"
					>
						<div className="w-10 h-10 rounded-full border-2 shadow-sm border-[#52CE06] overflow-hidden">
							<Image
								src={selectedVet?.profile_image || DEFAULT_AVATAR}
								alt={selectedVet?.name}
								width={40}
								height={40}
								className="object-cover w-full h-full"
							/>
						</div>
						<div>
							<h2 className="font-semibold text-sm">{selectedVet?.name}</h2>
							<p className="text-xs text-gray-500">
								{formatRole(selectedVet?.role)}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Messages */}
			<div className="flex-1 h-full scrollbar-hide overflow-y-auto p-3 space-y-4 bg-gray-50">
				{selectedVet ? (
					allMessages.map((msg: any, idx: any) => {
						const isMe = msg?.sender_id === currentUserId;

						return (
							<div
								key={idx}
								className={`flex ${isMe ? "justify-end" : "justify-start"}`}
							>
								<div
									className={`${
										isMe
											? "bg-gray-100 text-gray-800 rounded-br-none"
											: "bg-gray-800 text-white rounded-bl-none"
									} text-sm px-2 py-2 rounded-xl max-w-[70%]`}
								>
									{/* ✅ Appointment type */}
									{msg?.type === "appointment" ? (
										<div className="bg-white border border-gray-225 rounded-xl p-5 flex flex-col items-center shadow-md">
											{/* Icon */}
											<div className="w-10 h-10 flex items-center justify-center rounded-full mb-2">
												<Image
													src={Clock.src}
													alt="Appointment Icon"
													width={120}
													height={120}
													className="w-full h-full object-cover"
												/>
											</div>

											{/* Text */}
											<p className="text-gray-800 font-medium text-sm mb-3">
												Appointment booked
											</p>
											<AppointmentDetails
												openAppointmentModal={openAppointmentModal}
												setOpenAppointmentModal={setOpenAppointmentModal}
												selectedVet={selectedVet}
												selectedAppointment={selectedAppointment}
											/>

											{/* Buttons */}
											<div className="flex flex-col gap-2 w-full">
												<button
													onClick={() =>
														handleViewAppointmentDetails(
															msg.meta.appointment_id,
														)
													}
													className="w-full bg-white border border-primary-400 text-gray-600 font-medium hover:text-primary-400 text-xs py-3 px-5 rounded-md hover:bg-gray-50"
												>
													View Details
												</button>
												<button
													onClick={handleCancelAppointment(
														msg.meta.appointment_id,
													)}
													className="w-full bg-white border border-primary-400 text-gray-600 font-medium text-xs hover:text-primary-400 py-3 px-5 rounded-md hover:bg-gray-50"
												>
													Cancel appointment
												</button>
											</div>
										</div>
									) : msg?.type === "order" ? (
										<div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 w-[180px]">
											{/* Product Image Placeholder (since backend sends no image) */}
											<div className="w-full h-[120px] relative">
												<Image
													src={msg.product_image_urls[0]} // You can replace with a static image OR remove
													alt="Order Item"
													fill
													className="object-cover"
												/>
											</div>

											{/* Order Title (backend gives only text inside msg.content) */}
											<div className="p-3 text-gray-900">
												<p className="text-sm font-medium truncate">
													{msg.content}
												</p>
											</div>

											{/* Buttons */}
											<div className="flex flex-col gap-2 p-3">
												{/* View Order Details */}
												<OrderDetailsModal
													open={openOrderModal}
													setOpen={setOpenOrderModal}
													orderUrl={selectedOrderUrl}
												/>

												<button
													onClick={() => handleViewOrder(msg.meta.view_url)}
													className="w-full bg-white border border-primary-400 text-gray-600 font-medium hover:text-primary-400 text-xs py-3 px-5 rounded-md hover:bg-gray-50"
												>
													Order Details
												</button>
											</div>
										</div>
									) : (
										<div className="space-y-1">
											{/* If there are images */}
											{msg.image_urls.length === 1 ? (
												<div
													className={`relative ${msg.content.length > 20 ? "w-full" : "w-[110px]"} h-[110px] rounded-lg overflow-hidden`}
												>
													<Image
														src={msg.image_urls[0]}
														alt="sent"
														fill
														className="object-cover"
													/>
												</div>
											) : (
												<div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
													{msg.image_urls.map((imgUrl: string, i: number) => (
														<div
															key={i}
															className="relative w-[110px] h-[110px]"
														>
															<Image
																src={imgUrl}
																alt={`sent-${i}`}
																fill
																className="rounded-lg object-cover"
															/>
														</div>
													))}
												</div>
											)}
											{/* If there’s text */}
											{msg?.content && (
												<p
													className={`${isMe ? "text-gray-800" : "text-white"}`}
												>
													{msg.content}
												</p>
											)}
										</div>
									)}
								</div>
							</div>
						);
					})
				) : (
					<p className="text-center text-gray-500 text-sm mt-10">
						Select a vet to start chatting
					</p>
				)}
				<div ref={messagesEndRef} />
			</div>

			{/* Input */}
			<div className="flex gap-2 overflow-x-auto  scrollbar-hide">
				{previews.map((img, idx) => (
					<div
						key={idx}
						className="relative flex items-center w-fit  my-4 md:my-2"
					>
						<div className="w-[80px] h-[50px] border-2 border-gray-200 rounded-md overflow-hidden flex items-center justify-center mb-1">
							<Image
								src={img}
								alt={`Preview ${idx + 1}`}
								width={100}
								height={70}
								className="object-cover w-full h-full"
							/>
						</div>
						<button
							type="button"
							onClick={() => handleRemoveImage(idx)}
							className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full md:w-6 w-4 h-4 md:h-6 flex items-center justify-center"
						>
							✕
						</button>
					</div>
				))}
			</div>

			<div className="p-3 sticky bottom-0 border-t border-gray-200 flex items-center gap-2 md:relative bg-white">
				<MessageDropdown
					receiverId={selectedVet?.id}
					refetch={refetch}
					handleImageUpload={handleImageUpload}
				/>

				<input
					type="text"
					placeholder="Type your message..."
					{...register("content")}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							handleSubmit(handleSendMessage)();
						}
					}}
					className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
				/>
				<button
					onClick={handleSubmit(handleSendMessage)}
					className="bg-primary-400 p-2 rounded-2xl hover:bg-primary-400 transition"
				>
					<Send className="w-4 h-4 text-white" />
				</button>
			</div>
		</div>
	);
}
