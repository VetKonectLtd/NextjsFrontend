"use client";
import Image from "next/image";
import { ArrowLeft, Send } from "lucide-react";
import MessageDropdown from "./MessageDropdown";
import { User } from "@/app/assets/icons";
import { directMessageService } from "@/services/directMessageService";
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
	message,
	onBack,
	onMessageChange,
	onOpenVetDetails,
}: ChatWindowProps) {
	const { useGetReceivedMessage, useGetSentMessage, useSendMessage } =
		directMessageService();

	const { data: receivedMessages = [] }:any = useGetReceivedMessage(true);
const { data: sentMessages = [] }:any = useGetSentMessage(true);

const allMessages = [...receivedMessages, ...sentMessages]

	return (
		<div className="bg-white md:col-span-1 col-span-4 rounded-2xl shadow-md w-full max-w-sm flex flex-col overflow-hidden border border-gray-200">
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
								src={selectedVet?.user?.profile_image || DEFAULT_AVATAR}
								alt={selectedVet?.user?.name}
								width={40}
								height={40}
								className="object-cover w-full h-full"
							/>
						</div>
						<div>
							<h2 className="font-semibold text-sm">
								{selectedVet?.user.name}
							</h2>
							<p className="text-xs text-gray-500">{selectedVet?.role}</p>
						</div>
					</div>
				</div>
			</div>

			{/* Messages */}
			<div className="flex-1 overflow-y-auto p-3 space-y-4 bg-gray-50">
				{selectedVet ? (
					allMessages.map((msg, idx) => (
						<div
							key={idx}
							className={`flex ${msg.senderId === selectedVet.id ? "justify-start" : "justify-end"}`}
						>
							<div
								className={`${
									msg.senderId === selectedVet.id
										? "bg-gray-800 text-white rounded-bl-none"
										: "bg-gray-100 text-gray-800 rounded-br-none"
								} text-sm px-3 py-2 rounded-xl max-w-[80%]`}
							>
								{msg.type === "image" ? (
									<Image
										src={msg.content}
										alt="sent image"
										width={200}
										height={200}
										className="rounded-lg"
									/>
								) : (
									msg.content
								)}
							</div>
						</div>
					))
				) : (
					<p className="text-center text-gray-500 text-sm mt-10">
						Select a vet to start chatting
					</p>
				)}
			</div>

			{/* Input */}
			<div className="p-3 border-t border-gray-200 flex items-center gap-2 relative bg-white">
				<MessageDropdown />
				<input
					type="text"
					placeholder="Type a message..."
					value={message}
					onChange={(e) => onMessageChange(e.target.value)}
					className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
				/>
				<button className="bg-primary-400 p-2 rounded-2xl hover:bg-primary-400 transition">
					<Send className="w-4 h-4 text-white" />
				</button>
			</div>
		</div>
	);
}
