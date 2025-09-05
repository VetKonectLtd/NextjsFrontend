// components/AnimalOwner/DirectMessage.tsx
"use client";

import {
	ChevronLeft,
	PlusIcon,
	Search,
	SlidersHorizontal,
	SlidersVertical,
} from "lucide-react";
import ChatBox from "./ChatBox";
import { Vet1, Vet2, Vet3, Vet4 } from "@/app/assets/images";
import Image from "next/image";
import { useState } from "react";

const DirectMessage = () => {
	const messages = [
		{
			id: 1,
			name: "Dolapo Adaba",
			text: "I need to get an Accommodation here",
			time: "20 mins ago",
			unread: 2,
			avatar: Vet1,
		},
		{
			id: 2,
			name: "Paul Huston",
			text: "Can you assist with an accommodation",
			time: "Today",
			unread: 2,
			avatar: Vet2,
		},
		{
			id: 3,
			name: "Kristine Joel",
			text: "Can you assist with an accommodation",
			time: "Yesterday",
			unread: 2,
			avatar: Vet3,
		},
		{
			id: 4,
			name: "Dority Hanger",
			text: "I need to get an Accommodation here",
			time: "Jan 20",
			unread: 0,
			avatar: Vet4,
		},
	];

	const [selectedVet, setSelectedVet] = useState<any | null>(null);

	return (
		<div className="px-4">
			{/* Search Bar */}
			<div className="flex flex-row items-center md:gap-7 gap-2 w-full  mb-6">
				<div className="flex items-center w-full shadow-sm rounded-xl border border-gray-200 overflow-hidden bg-white">
					<input
						type="text"
						placeholder="Type in your keyword here"
						className="flex-1 px-4 py-2 text-gray-55 focus:outline-none"
					/>
					<button className="flex items-center md:py-2 py-3 md:px-4 h-full justify-center pl-1 pr-2 bg-primary-400 text-white">
						<Search className="w-5 h-5" />
						<span className="ml-2 hidden md:inline">Search</span>
					</button>
				</div>

				<div className="flex items-center">
					<button className="bg-white shadow-md rounded-xl border border-gray-200 p-3">
						<SlidersVertical className="h-4 w-4" />
					</button>
				</div>
			</div>

			<div className="flex mb-3">
				<button className="px-4 py-2 text-sm font-medium">
					Sents
				</button>
				<button className="px-4 py-2 text-sm font-medium text-gray-500">
					Received
				</button>
				<button className="px-4 py-2 text-sm font-medium text-gray-500">
					<SlidersHorizontal size={16} />
				</button>
			</div>

			<div className="grid grid-cols-2 gap-4">
				{/* Left: Messages List */}
				<div
					className={`
						bg-white md:col-span-1 col-span-2
						${selectedVet ? "hidden md:block" : "block"}
					`}
				>
					<div className="space-y-3">
						{messages.map((msg) => (
							<div
								key={msg.id}
								onClick={() => setSelectedVet(msg)}
								className="flex items-center justify-between p-2 border bg-white border-gray-225 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer"
							>
								<div className="flex items-center">
									<div className="w-10 h-10 mr-3 rounded-full border shadow-sm border-gray-225 overflow-hidden">
										<Image
											src={msg?.avatar || "/default-vet.png"}
											alt={msg?.name || "Vet"}
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
								<div className="text-right flex items-center">
									<p className="text-xs mr-2 bg-gray-225 px-2 py-1 rounded-full text-gray-55">
										{msg.time}
									</p>
									{msg.unread > 0 && (
										<span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
											{msg.unread}
										</span>
									)}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Right: Chat Box */}
				<div
					className={`md:col-span-1 ${selectedVet ? "block" : "hidden md:block"} col-span-2`}
				>
					<div
						onClick={() => setSelectedVet(null)}
						className="flex items-center md:hidden text-sm mb-4 text-gray-55 hover:text-green-50"
					>
						<span className="bg-white border cursor-pointer text-gray-500 border-gray-225 shadow-md rounded-full p-1 mr-2">
							<ChevronLeft className="w-5 h-5" />
						</span>{" "}
						Back
					</div>
					<ChatBox selectedVet={selectedVet} />
				</div>
			</div>
		</div>
	);
};

export default DirectMessage;
