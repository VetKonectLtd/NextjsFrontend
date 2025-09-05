"use client";

import { Vet1, Vet2, Vet3, Vet4 } from "@/app/assets/images";
import {
	Mail,
	MessagesSquare,
	PlusIcon,
	Search,
	Send,
	Share2,
	SlidersVertical,
	ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import PostDetail from "./PostDetails";

const ForumChatCard = () => {
	const [activePost, setActivePost] = useState<number | null>(null);
	const [selectedPost, setSelectedPost] = useState<any | null>(null);

	useEffect(() => {
		if (selectedPost) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, [selectedPost]);

	// Mock posts
	const posts = [
		{
			id: 1,
			author: "Dr. Amechi Anayor",
			role: "Veterinarian",
			avatar: Vet1,
			time: "20 mins ago",
			title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
			likes: 3,
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam...",
			comments: [
				{
					id: 1,
					author: "Grace Jonesse",
					role: "Veterinarian",
					avatar: Vet2,
					text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
					time: "Today 12:29 PM CET",
				},
				{
					id: 2,
					author: "Good Sliron",
					role: "Veterinarian",
					avatar: Vet3,
					text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
					time: "Today 12:29 PM CET",
				},
			],
		},
		{
			id: 2,
			author: "Dr. Paul Smith",
			role: "Veterinarian",
			avatar: Vet2,
			time: "1 hr ago",
			title: "How to treat poultry infections effectively?",
			likes: 3,
			content:
				"I've been facing some recurring issues in poultry health management...",
			comments: [
				{
					id: 1,
					author: "Dr. Angela White",
					role: "Veterinarian",
					avatar: Vet4,
					text: "I think proper vaccination and monitoring can help a lot...",
					time: "Today 1:00 PM CET",
				},
			],
		},
		{
			id: 3,
			author: "Dr. Kristine Joel",
			role: "Vet Clinic Owner",
			avatar: Vet3,
			time: "Yesterday",
			title: "Best practices for dog vaccination schedules",
			likes: 3,
			content:
				"Could someone share recommended dog vaccination timelines that work well?",
			comments: [],
		},
		{
			id: 4,
			author: "Dr. Dority Hanger",
			role: "Veterinarian",
			avatar: Vet4,
			time: "Jan 20",
			title: "Challenges in fish feeding",
			content: "What are the best feeds for tropical fish farms?",
			comments: [],
		},
	];

	return (
		<>
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

					<div className="flex items-center gap-7">
						<button className="bg-white shadow-md rounded-xl border border-gray-200 p-3">
							<SlidersVertical className="h-4 w-4" />
						</button>

						<div className="w-9 h-9 md:flex hidden items-center justify-center bg-green-50 text-white rounded-xl text-xl">
							<PlusIcon className="w-10 h-10 font-bold text-white " />
						</div>
					</div>
				</div>

				{/* Tags */}
				{!selectedPost && (
					<>
						
							<div className="flex pb-6 md:max-w-full max-w-xs  overflow-x-auto scrollbar-hide md:overflow-hidden md:gap-3">
								{[
									"Dogs",
									"Poultry",
									"Vet Clinics",
									"Vet Store",
									"Vaccination",
									"Dog Treatment",
									"Fish Feeding",
								].map((tag) => (
									<span
										key={tag}
										className="px-3 py-1 text-sm bg-white border border-gray-225 shadow-md text-gray-700 text-center rounded-full cursor-pointer transition whitespace-nowrap mr-2 md:mr-0"
									>
										{tag}
									</span>
								))}
							</div>
				

						{/* Posts */}
						{posts.map((post) => (
							<div
								key={post.id}
								className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm"
							>
								{/* Header */}
								<div className="flex items-center mb-3">
									<div className="w-10 h-10 rounded-full border overflow-hidden border-gray-225 bg-gray-300 mr-3">
										<Image
											src={post.avatar}
											alt={"Vet"}
											width={40}
											height={40}
											className="object-cover w-full h-full"
										/>
									</div>
									<div>
										<h3 className="font-semibold text-gray-800">
											{post.author}
										</h3>
										<p className="text-sm text-gray-500">{post.role}</p>
									</div>
									<span className="ml-auto text-xs px-3 py-1 border border-gray-225 rounded-full bg-gray-100 text-gray-55">
										{post.time}
									</span>
								</div>

								{/* Post Body */}
								<div className="bg-primary-400 h-40 mb-3"></div>
								<h4 className="font-semibold text-gray-55 text-lg">
									{post.title}
								</h4>
								<p className="text-gray-55 text-sm mb-3">
									{post.content}
									<span className="text-green-50 cursor-pointer">
										{" "}
										see more
									</span>
								</p>

								{/* Actions */}
								<div className="flex md:justify-end justify-start gap-4 items-end text-sm">
									<div
										className="flex items-center cursor-pointer"
										onClick={() =>
											setActivePost(activePost === post.id ? null : post.id)
										}
									>
										<span
											onClick={() => setSelectedPost(post)}
											className="bg-white border hover:border-gray-55 border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center"
										>
											<MessagesSquare size={14} color="#1D2432" />
										</span>
										<span className="ml-1 md:text-sm flex gap-2 text-xs text-gray-55 font-medium">
											{post.comments.length} 
											<span className="hidden md:block">Comments</span>
										</span>
									</div>

									<div className="flex items-center">
										<span className="bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
											<ThumbsUp size={14} color="#1D2432" />
										</span>
										<span className="ml-1 md:text-sm flex gap-2 text-xs text-gray-55 font-medium">
											{post.likes} <span className="hidden md:block">Likes</span>
										</span>
									</div>

									<div className="flex items-center">
										<span className="bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
											<Share2 size={14} color="#1D2432" />
										</span>
										<span
											onClick={() => setSelectedPost(post)}
											className="ml-3 bg-primary-400 border cursor-pointer border-white rounded-xl p-2 font-semibold"
										>
											<Send size={14} className="text-white" />
										</span>
									</div>
								</div>
							</div>
						))}
					</>
				)}
			</div>

			{/* Post Detail */}

			{selectedPost && (
				<PostDetail post={selectedPost} onClose={() => setSelectedPost(null)} />
			)}
		</>
	);
};

export default ForumChatCard;
