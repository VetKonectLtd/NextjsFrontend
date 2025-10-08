"use client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import ForumChatCard from "@/components/ChatForum/ForumChatCard";


const ChatForum = () => {

	return (
		<div className="w-11/12 mt-3 m-auto">
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

			<div className="bg-white px-6 py-3 shadow-md rounded-xl border border-gray-200">
			
				<div className="w-full ">
					<div className="font-bold text-lg mb-6">Forum Chat</div>

					{/* Pets Tab */}
					<div>
						<ForumChatCard />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatForum;
