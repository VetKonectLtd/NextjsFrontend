"use client";
import { useState } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import VetDetails from "./VetDetails";
import { directMessageService } from "@/services/directMessageService";
import ChatListSkeleton from "./ChatListSkeleton";

export default function DirectMessage() {
	const { useGetChatList } = directMessageService();

	const getChatList = useGetChatList(true);

	const messages: any = getChatList.data || [];

	const [selectedVet, setSelectedVet] = useState<any | null>(null);
	const [showChat, setShowChat] = useState(false);
	const [showDetails, setShowDetails] = useState(false);
	const [message, setMessage] = useState("");
	const [selectedAction, setSelectedAction] = useState("product");

	const handleContact = (id: string, type: string) => setSelectedAction(type);

	return (
		<div className="min-h-screen ">
			{/* GRID LAYOUT FOR DESKTOP */}
			<div className="hidden md:grid md:grid-cols-3 gap-4">
				{!messages.length ? (
					<ChatListSkeleton />
				) : (
					<ChatList
						messages={messages}
						selectedVet={selectedVet}
						onSelectVet={(vet) => setSelectedVet(vet)}
					/>
				)}

				{selectedVet ? (
					<>
						<ChatWindow
							selectedVet={selectedVet}
							message={message}
							key={selectedVet.id}
							onBack={() => {}}
							onMessageChange={setMessage}
							onOpenVetDetails={() => {}}
						/>
						<VetDetails
							selectedVet={selectedVet}
							selectedAction={selectedAction}
							onBack={() => {}}
							handleContact={handleContact}
						/>
					</>
				) : (
					<div className="col-span-2 flex items-center justify-center">
						<p className="text-gray-500">Select a chat to start messaging</p>
					</div>
				)}
			</div>

			{/* RESPONSIVE MOBILE VIEW */}
			<div className="md:hidden flex flex-col">
				{/* Chat List (default view) */}
				{!showChat &&
					!showDetails &&
					(!messages.length ? (
						<ChatListSkeleton />
					) : (
						<ChatList
							messages={messages}
							selectedVet={selectedVet}
							onSelectVet={(vet) => {
								setSelectedVet(vet);
								setShowChat(true);
							}}
						/>
					))}

				{/* Chat Window (middle card) */}
				{showChat && !showDetails && (
					<ChatWindow
						selectedVet={selectedVet}
						message={message}
						onBack={() => setShowChat(false)}
						onMessageChange={setMessage}
						onOpenVetDetails={() => setShowDetails(true)}
					/>
				)}

				{/* Vet Details (right card) */}
				{showDetails && (
					<VetDetails
						selectedVet={selectedVet}
						selectedAction={selectedAction}
						onBack={() => setShowDetails(false)}
						handleContact={handleContact}
					/>
				)}
			</div>
		</div>
	);
}
