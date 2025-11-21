"use client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import ForumChatCard from "@/components/ChatForum/ForumChatCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MyForumChat from "@/components/ChatForum/MyForumChat";
import { useRouter, useSearchParams } from "next/navigation";

const ChatForum = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const currentTab = searchParams.get("tab") || "forum";

	const handleTabChange = (value: string) => {
		router.push(`?tab=${value}`, { scroll: false });
	};

	return (
		<div className="md:w-11/12 w-full md:p-0 p-4 mt-3 m-auto">
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

			<div className="bg-white md:px-6 px-3 py-3 shadow-md rounded-xl border border-gray-200">
				<div className="w-full ">
					<Tabs
						value={currentTab}
						onValueChange={handleTabChange}
						className="w-full"
					>
						<TabsList className="bg-transparent px-0 mb-4">
							<TabsTrigger
								value="forum"
								className="data-[state=active]:text-black data-[state=active]:font-bold text-gray-400 text-lg px-0 mr-6 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
							>
								Forum Chat
							</TabsTrigger>

							<TabsTrigger
								value="mypost"
								className="data-[state=active]:text-black data-[state=active]:font-bold text-gray-400 text-lg px-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
							>
								My Post
							</TabsTrigger>
						</TabsList>

						<TabsContent value="forum">
							<ForumChatCard />
						</TabsContent>

						<TabsContent value="mypost">
							<MyForumChat />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default ChatForum;
