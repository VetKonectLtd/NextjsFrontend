"use client";
import { useState } from "react";
import {
	ChevronLeft,
	Search,
	SlidersVertical,
	MessageCircle,
	Heart,
	Share2,
	MessagesSquare,
	ThumbsUp,
	Eye,
	Send,
	ArrowRight,
	ArrowLeft,
	X,
	EllipsisVertical,
	ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Hand } from "@/app/assets/icons";
import { BlogImage, Vet1, Vet2 } from "@/app/assets/images";
import { ButtonBg, Dog } from "@/app/assets/icons/vet-vendor";
import MobileComments from "@/components/blog/MobileComments";

// --- Blog Data ---
const blogPosts = [
	{
		id: 1,
		title: "Anti-Microbial Resistance",
		image: BlogImage,
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
		likes: 20,
		shares: 13,
		author: "Dr. Shadrach",
		time: "12 mins ago",
		views: 3,
		commentsList: [
			{
				id: 1,
				avatar: Vet1,
				name: "Jade Cosgrove",
				text: "Great insights! Really helpful.",
				time: "10 Apr",
			},
			{
				id: 2,
				avatar: Vet2,
				name: "Tola Williams",
				text: "I agree, this is a huge concern.",
				time: "11 Apr",
			},
		],
	},
	{
		id: 2,
		title: "Anthrax Outbreak",
		image: Dog,
		content:
			"Full Anthrax blog post goes here. More detailed info about the outbreak...",
		likes: 15,
		shares: 9,
		author: "Dr. Shadrach",
		time: "2 hrs ago",
		views: 2,
		commentsList: [],
	},
];

// --- Hot News ---
const hotNews = [
	{
		id: "1",
		title: "Avian Flu Alert",
		image: BlogImage,
		content:
			"Avian flu detected in multiple regions. Authorities are urging farmers...",
		likes: 10,
		shares: 5,
		author: "Dr. Hope",
		time: "30 mins ago",
		views: 5,
		commentsList: [],
	},
	{
		id: "2",
		title: "Swine Fever Update",
		image: BlogImage,
		content:
			"Swine fever cases rising globally. Precautionary measures recommended...",
		likes: 12,
		shares: 7,
		author: "Dr. Kelvin",
		time: "1 hr ago",
		views: 8,
		commentsList: [],
	},
	{
		id: "2",
		title: "Swine Fever Update",
		image: BlogImage,
		content:
			"Swine fever cases rising globally. Precautionary measures recommended...",
		likes: 12,
		shares: 7,
		author: "Dr. Kelvin",
		time: "1 hr ago",
		views: 8,
		commentsList: [],
	},
];

const Blog = () => {
	const [activePost, setActivePost] = useState(blogPosts[0]);
	const [activeIndex, setActiveIndex] = useState(0);
	const [showFull, setShowFull] = useState(true);
	const [showComments, setShowComments] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const next = () => {
		if (currentIndex < hotNews.length - 1) {
			setCurrentIndex(currentIndex + 1);
		}
	};

	const prev = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	const handleNext = () => {
		// Only cycle through blogPosts, not hotNews
		const nextIndex = (activeIndex + 1) % blogPosts.length;
		setActiveIndex(nextIndex);
		setActivePost(blogPosts[nextIndex]);
		setShowFull(true);
		setShowComments(false);
	};

	const handlePrev = () => {
		const prevIndex = (activeIndex - 1 + blogPosts.length) % blogPosts.length;
		setActiveIndex(prevIndex);
		setActivePost(blogPosts[prevIndex]);
		setShowFull(true);
		setShowComments(false);
	};

	return (
		<div className="w-11/12 mt-3 m-auto">
			<div className="min-h-screen bg-white py-2 px-5 shadow-md rounded-xl border border-gray-200">
				{/* Blog Header */}
				<h2 className="text-gray-700 text-lg mb-2 font-semibold">Blog</h2>

				{/* Search Bar */}
				<div className="flex flex-row items-center md:gap-7 gap-2 w-full mb-5">
					<div className="flex items-center w-full shadow-sm rounded-xl border border-gray-200 overflow-hidden bg-white">
						<input
							type="text"
							placeholder="Type in your keyword here"
							className="flex-1 md:px-4 px-2 py-2 text-gray-700 focus:outline-none"
						/>
						<button className="flex items-center md:py-2 py-3 md:px-4 h-full justify-center pl-1 pr-2 bg-primary-400 text-white">
							<Search className="w-5 h-5" />
							<span className="ml-2 hidden md:inline">Search</span>
						</button>
					</div>
					<button className="bg-white shadow-md rounded-xl border border-gray-200 p-3">
						<SlidersVertical className="h-4 w-4" />
					</button>
				</div>

				{/* Blog Section */}
				<div className="grid grid-cols-3 gap-4 pb-2">
					{/* Left Card (Blog Post) */}
					<div className="md:col-span-2 col-span-3">
						<AnimatePresence mode="wait">
							<motion.div
								key={activePost.id}
								initial={{ opacity: 0, x: -50 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 50 }}
								transition={{ duration: 0.4 }}
								className="w-full  py-5 px-3 bg-white shadow-md rounded-xl border border-gray-200"
							>
								<Image
									src={activePost.image}
									alt={activePost.title}
									width={400}
									height={400}
									className="rounded-lg w-full h-52 object-cover mb-4"
								/>
								<div className="flex text-gray-55 justify-between mb-4">
									<div>
										<h3 className="font-semibold text-sm md:text-lg">
											{activePost.title}
										</h3>
										<h2 className="font-normal text-xs">
											Author. {activePost.author}
										</h2>
									</div>
									<p className="md:text-sm text-xs text-gray-55">
										{activePost.time}
									</p>
								</div>

								<p className="text-gray-55 font-normal text-sm cursor-pointer hover:text-gray-600 mb-4">
									{showFull ? (
										<span>
											{activePost.content.slice(0, 150)}
											<span
												className="ml-1"
												onClick={() => setShowFull(!showFull)}
											>
												...see more
											</span>{" "}
										</span>
									) : (
										<span>
											{activePost.content}{" "}
											<span
												className="ml-1"
												onClick={() => setShowFull(!showFull)}
											>
												...see less
											</span>
										</span>
									)}
								</p>

								{/* Actions */}
								<div className="flex md:justify-end justify-start gap-4 items-center text-sm">
									<div className="flex items-center">
										<span className="bg-white border hover:border-gray-55 border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
											<Eye size={14} color="#1D2432" />
										</span>
										<span className="ml-1 flex gap-2 md:text-sm text-xs text-gray-55 font-medium">
											{activePost.views}{" "}
											<span className="hidden md:block">Views</span>
										</span>
									</div>
									<div
										onClick={() => setShowComments(true)}
										className="flex items-center"
									>
										<span className="bg-white border hover:border-gray-55 border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
											<MessagesSquare size={14} color="#1D2432" />
										</span>
										<span className="ml-1 flex gap-2 md:text-sm text-xs text-gray-55 font-medium">
											{activePost.commentsList.length}{" "}
											<span className="hidden md:block">Comments</span>
										</span>
									</div>
									<div className="flex items-center">
										<span className="bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
											<ThumbsUp size={14} color="#1D2432" />
										</span>
										<span className="ml-1 flex gap-2 text-sm text-gray-55 font-medium">
											{activePost.likes}{" "}
											<span className="hidden md:block">Likes</span>
										</span>
									</div>

									<div className="flex items-center">
										<span className="bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
											<Share2 size={14} color="#1D2432" />
										</span>
										<span className="ml-1 flex gap-2 text-sm text-gray-55 font-medium">
											{activePost.shares}{" "}
											<span className="hidden md:block">Shares</span>
										</span>
									</div>
								</div>
							</motion.div>
						</AnimatePresence>
						<div className="m-auto mt-7 flex items-center gap-3 justify-center">
							<span
								onClick={handlePrev}
								className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center"
							>
								<ArrowLeft size={12} color="#1D2432" />
							</span>
							<span
								onClick={handleNext}
								className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center"
							>
								<ArrowRight size={12} color="#1D2432" />
							</span>
						</div>
					</div>

					{/* Right Card (Comments / Empty State) */}
					<div className="w-full md:block hidden relative md:col-span-1 col-span-3 px-4 py-4 h-[500px] bg-white shadow-md rounded-lg border border-gray-225">
						{!showComments ? (
							<div className="flex text-center flex-col items-center pt-40 justify-center">
								<div className="w-15 h-15 mb-3 m-auto">
									<Image
										src={Hand}
										alt={"Messages"}
										width={80}
										height={80}
										className="object-cover w-full h-full"
									/>
								</div>
								<p className="text-gray-55 font-medium text-sm">
									Tap Comment on a Blog to drop your comments
								</p>
							</div>
						) : (
							<div>
								<h4 className="font-semibold mb-4">Comments</h4>
								<div className="space-y-4 mb-4 max-h-[400px] scrollbar-hide overflow-y-auto">
									{activePost.commentsList.length > 0 ? (
										activePost.commentsList.map((c) => (
											<div key={c.id} className="pb-2">
												<div className="flex justify-between">
													<div className="flex w-full mb-2 items-center gap-2">
														<div className="w-10 h-10 rounded-full border border-gray-225 overflow-hidden">
															<Image
																src={c?.avatar || "/default-vet.png"}
																alt={c?.name || "Vet"}
																width={40}
																height={40}
																className="object-cover w-full h-full"
															/>
														</div>
														<div className="flex items-start text-left flex-col text-gray-55">
															<p className="text-sm font-semibold">{c.name}</p>
															<p className="text-xs text-gray-55">{c.time}</p>
														</div>
													</div>
													<button className="">
														<EllipsisVertical className="w-4 h-4" />
													</button>
												</div>
												<p className="text-sm text-gray-600">{c.text}</p>
											</div>
										))
									) : (
										<p className="text-sm text-gray-500">No comments yet</p>
									)}
								</div>

								{/* Input */}
								<div className="flex absolute bottom-0 w-full left-0 border-t border-gray-225 right-0">
									<input
										type="text"
										placeholder="Write a comment..."
										className="flex-1  rounded-bl-xl outline-none  px-3 py-3 text-sm"
									/>
									<button
										style={{ backgroundImage: `url(${ButtonBg.src})` }}
										className="px-3 py-2 bg-no-repeat bg-contain bg-primary-400 text-white rounded-xl"
									>
										<Send className="w-5 h-5" />
									</button>
								</div>
							</div>
						)}
					</div>

					{/* Mobile Comments Drawer */}
					<MobileComments
						showComments={showComments}
						setShowComments={setShowComments}
						activePost={activePost}
					/>
				</div>

				{/* Hot News Section */}
				<h3 className="font-semibold text-2xl pb-7 pt-12">Hot News</h3>
				<div className="overflow-hidden">
					<AnimatePresence mode="wait">
						<motion.div
							className="flex gap-4"
							initial={{ opacity: 0, x: -50 }}
							key={currentIndex}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 50 }}
								transition={{ duration: 0.4 }}
						>
							{hotNews.map((news: any) => (
								<div
									key={news.id}
									className="w-full md:w-1/2 flex-shrink-0 bg-white grid grid-cols-2 p-2 border rounded-lg shadow-md cursor-pointer hover:shadow-lg"
								>
									<div className="h-36">
										<Image
											src={news.image}
											alt={news.title}
											width={400}
											height={200}
											className="rounded-md w-full h-full object-cover mb-2"
										/>
									</div>
									<div className="ml-3">
										<div className="flex justify-between items-center mb-3">
											<h4 className="font-semibold md:text-lg text-sm">
												{news.title}
											</h4>
											<span
												onClick={() => {
													setActivePost(news);
													setShowFull(true);
													setShowComments(false);
												}}
												className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-1 flex items-center justify-center"
											>
												<ArrowUpRight size={12} color="#1D2432" />
											</span>
										</div>
										<p className="md:text-sm text-xs font-normal text-gray-55">
											{news.content.slice(0, 100)}...
										</p>
									</div>
								</div>
							))}
						</motion.div>
					</AnimatePresence>

					<div className="m-auto mt-7 flex items-center gap-3 justify-center">
						<button
							onClick={prev}
							disabled={currentIndex === 0}
							className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center disabled:opacity-50"
						>
							<ArrowLeft size={12} color="#1D2432" />
						</button>
						<button
							onClick={next}
							disabled={currentIndex >= hotNews.length - 1}
							className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center disabled:opacity-50"
						>
							<ArrowRight size={12} color="#1D2432" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Blog;
