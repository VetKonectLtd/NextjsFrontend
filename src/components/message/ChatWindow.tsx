"use client";
import Image from "next/image";
import { ArrowLeft, Send } from "lucide-react";
import MessageDropdown from "./MessageDropdown";

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
								src={selectedVet?.avatar || "/default-vet.png"}
								alt={selectedVet?.name}
								width={40}
								height={40}
								className="object-cover w-full h-full"
							/>
						</div>
						<div>
							<h2 className="font-semibold text-sm">{selectedVet?.name}</h2>
							<p className="text-xs text-gray-500">{selectedVet?.role}</p>
						</div>
					</div>
				</div>
			</div>

			{/* Messages */}
			<div className="flex-1 overflow-y-auto p-3 space-y-4 bg-gray-50">
				{selectedVet ? (
					<>
						<div className="flex justify-end">
							<div className="bg-gray-100 text-gray-800 text-sm px-3 py-2 rounded-xl rounded-br-none max-w-[80%]">
								Hi {selectedVet.name.split(" ")[0]}, I’m interested in your
								services.
							</div>
						</div>

						<div className="flex">
							<div className="bg-gray-800 text-white text-sm px-3 py-2 rounded-xl rounded-bl-none max-w-[80%]">
								Sure! Let’s discuss more.
							</div>
						</div>
					</>
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
