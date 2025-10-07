"use client";
import { Search } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

interface ChatListProps {
	messages: any[];
	selectedVet: any;
	onSelectVet: (vet: any) => void;
}

export default function ChatList({
	messages,
	selectedVet,
	onSelectVet,
}: ChatListProps) {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredMessages = useMemo(() => {
		return messages.filter((msg) =>
			msg.name.toLowerCase().includes(searchTerm.toLowerCase()),
		);
	}, [searchTerm, messages]);

	return (
		<div
			className={`
        bg-white md:col-span-1 col-span-4 border border-gray-225 rounded-lg shadow-md px-6 py-3
      `}
		>
			<div className="flex mb-2">
				<h3 className="py-2 text-base font-bold text-gray-55">Chats</h3>
			</div>

			<div className="flex items-center w-full bg-white rounded-full shadow-sm border border-gray-200 my-6">
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Search"
					className="flex-1 bg-transparent outline-none text-sm px-4"
				/>
				<button className="bg-gray-500 rounded-r-full px-7 py-2 flex items-center justify-center">
					<Search size={15} color="#fff" />
				</button>
			</div>

			<div className="space-y-3">
				{filteredMessages.length > 0 ? (
					filteredMessages.map((msg) => (
						<div
							key={msg.id}
							onClick={() => onSelectVet(msg)}
							className={`flex items-center justify-between hover:bg-gray-50 cursor-pointer rounded-lg p-2 transition ${
								selectedVet?.id === msg.id ? "bg-gray-100" : ""
							}`}
						>
							<div className="flex items-center">
								<div className="w-12 h-12 mr-3 rounded-full border-2 shadow-sm border-[#52CE06] overflow-hidden">
									<Image
										src={msg.avatar}
										alt={msg.name}
										width={40}
										height={40}
										className="object-cover w-full h-full"
									/>
								</div>
								<div>
									<p className="font-bold text-gray-55">{msg.name}</p>
									<p className="text-sm text-gray-55 font-normal truncate w-40">
										{msg.text}
									</p>
								</div>
							</div>
							<p className="text-xs mr-2 bg-gray-225 px-2 py-1 rounded-full text-gray-55">
								{msg.time}
							</p>
						</div>
					))
				) : (
					<p className="text-gray-400 text-center text-sm py-4">
						No matches found.
					</p>
				)}
			</div>
		</div>
	);
}
