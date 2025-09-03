"use client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PetCard from "@/components/AnimalOwner/PetCard";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FarmCard from "@/components/AnimalOwner/FarmCard";
import { Dog } from "@/app/assets/icons/vet-vendor";
import ForumChatCard from "@/components/ChatForum/ForumChatCard";
import DirectMessage from "@/components/ChatForum/DirectMessage";

// 👇 Mock data arrays
const pets = [
	{
		name: "Kora",
		image: Dog.src,
		species: "Dog",
		breed: "Rottweiler",
		sex: "Male",
		age: 2,
	},
	{
		name: "Mimi",
		image: Dog.src,
		species: "Cat",
		breed: "Persian",
		sex: "Female",
		age: 1,
	},
];

const farms = [
	{
		name: "Adibala Poultry",
		image: Dog.src,
		location: "201, Huston Texas, United States",
		numOfWorkers: "20",
		typeOfLivestock: "Birds",
		numOfLivestock: "200",
		sex: "Female",
		age: 4,
	},
];

const ChatForum = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const initialTab = searchParams.get("tab") || "chat";
	const [tab, setTab] = useState(initialTab);

	useEffect(() => {
		const urlTab = searchParams.get("tab");
		if (urlTab && urlTab !== tab) {
			setTab(urlTab);
		}
	}, [searchParams]);

	const handleTabChange = (value: string) => {
		setTab(value);
		router.replace(`?tab=${value}`);
	};

	return (
		<div className=" w-11/12 mt-3 m-auto">
			<Link
				href="/dashboard/chat-forum/add-chat"
				className="flex items-center justify-between w-full border-2 pl-2 bg-white border-green-50 rounded-xl p-2 mb-6 transition"
			>
				<span className="text-gray-55 text-sm font-bold">
					Add to Forum Chat
				</span>
				<div className="w-8 h-8 flex items-center justify-center bg-green-50 text-white rounded-xl text-xl">
					<PlusIcon className="w-5 h-5 font-bold text-white " />
				</div>
			</Link>

			<div className="min-h-screen bg-white py-3 shadow-md rounded-xl border border-gray-200">
				{/* Tabs Header */}
				<Tabs
					defaultValue={tab}
					onValueChange={handleTabChange}
					className="w-full"
				>
					<TabsList className="mb-4 bg-transparent">
						<TabsTrigger
							className="data-[state=active]:font-bold text-lg data-[state=active]:bg-transparent data-[state=active]:shadow-none font-normal"
							value="chat"
						>
							Forum Chat
						</TabsTrigger>
						<TabsTrigger
							className="data-[state=active]:font-bold text-lg data-[state=active]:bg-transparent data-[state=active]:shadow-none font-normal"
							value="message"
						>
							Direct Messaging
						</TabsTrigger>
					</TabsList>

					{/* Pets Tab */}
					<TabsContent value="chat">
                            <ForumChatCard />
					</TabsContent>

					{/* Livestock Tab */}
					<TabsContent value="message">
						<DirectMessage/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default ChatForum;
