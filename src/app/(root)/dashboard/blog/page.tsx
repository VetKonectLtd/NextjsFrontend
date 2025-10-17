"use client";

import { useEffect, useState } from "react";
import {
	Search,
	SlidersVertical,
	Share2,
	MessagesSquare,
	ThumbsUp,
	Eye,
	ArrowRight,
	ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Hand } from "@/app/assets/icons";
import MobileDrawal from "@/components/blog/MobileDrawal";
import HotNews from "@/components/blog/HotNews";
import CommentSection from "@/components/blog/CommentSection";
import { useBlogService } from "@/services/blogServie";
import { BlogChat } from "@/types";
import { timeAgo } from "@/components/shared/TimeFormat";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Blog = () => {
	const [showFull, setShowFull] = useState(true);
	const [showComments, setShowComments] = useState(false);
	const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
	const [likedBlog, setLikedBlog] = useState<{ [key: string]: boolean }>({});
	const [likeTarget, setLikeTarget] = useState<string | " ">("");
	const {
		useGetAllBlog,
		useGetTrendingBlog,
		useToggleBlogLike,
		useGetShareBlog,
	} = useBlogService();

	const getTrendingBlog = useGetTrendingBlog();
	const getAllBlog = useGetAllBlog(true);
	const likeBlogMutation = useToggleBlogLike(likeTarget);

	const hotNewsData: any = Array.isArray(getTrendingBlog.data?.data)
		? getTrendingBlog.data.data
		: [];
	const hotNews = hotNewsData.slice(0, 3); // Display only top 3 hot news
	

	const blogPosts: BlogChat[] = Array.isArray(getAllBlog.data?.data)
		? getAllBlog.data.data
		: [];
console.log(blogPosts);
	
	const [activeIndex, setActiveIndex] = useState(0);
	const [activePost, setActivePost] = useState<any>(blogPosts[0]);

	useEffect(() => {
		if (blogPosts.length > 0) {
			setActivePost(blogPosts[0]);
		}
	}, [blogPosts]);

	useEffect(() => {
		const initialLikes: { [key: string]: boolean } = {};
		initialLikes[activePost?.id] = activePost?.has_liked ?? false;
		setLikedBlog(initialLikes);
	}, [activePost]);

	const toggleDropdown = (id: string) => {
		setOpenDropdownId((prev) => (prev === id ? null : id));
	};


	const handleLike = (postId: any) => {
		setLikeTarget(postId);
		console.log(postId);
		setLikedBlog((prev) => ({ ...prev, [postId]: !prev[postId] }));

		likeBlogMutation.mutate(postId, {
			onSuccess: () => {
				getAllBlog.refetch();
			},
		});
	};

	const handleNext = () => {
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
								key={activePost?.id}
								initial={{ opacity: 0, x: -50 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 50 }}
								transition={{ duration: 0.4 }}
								className="w-full  py-5 px-3 bg-white shadow-md rounded-xl border border-gray-200"
							>
								{activePost?.picture_url ? (
									<Dialog>
										<DialogTrigger asChild>
											<div
												className="bg-center bg-no-repeat bg-cover h-40 mb-3 cursor-pointer rounded-md"
												style={{
													backgroundImage: `url(${activePost?.picture_url})`,
												}}
											/>
										</DialogTrigger>
										<DialogContent className="max-w-3xl p-0 bg-transparent border-none shadow-none flex justify-center items-center">
											<Image
												src={activePost?.picture_url}
												alt={activePost?.title}
												width={400}
												height={400}
												className="rounded-lg w-full h-52 object-cover mb-4"
											/>
										</DialogContent>
									</Dialog>
								) : (
									<div className="bg-primary-400 h-40 mb-3 rounded-md" />
								)}
								<div className="flex text-gray-55 justify-between mb-4">
									<div>
										<h3 className="font-semibold capitalize text-sm md:text-lg">
											{activePost?.title}
										</h3>
										<h2 className="font-normal capitalize text-xs">
											Author. {activePost?.author.name}
										</h2>
									</div>
									<p className="md:text-sm text-xs text-gray-55">
										{timeAgo(activePost?.created_at)}
									</p>
								</div>

								<p className="text-gray-55 font-normal text-sm cursor-pointer hover:text-gray-600 mb-4">
									{showFull ? (
										<span>
											{activePost?.content.slice(0, 150)}
											<span
												className="ml-1"
												onClick={() => setShowFull(!showFull)}
											>
												...see more
											</span>{" "}
										</span>
									) : (
										<span>
											{activePost?.content}{" "}
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
											{activePost?.views_count}{" "}
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
											{activePost?.comments_count}
											<span className="hidden md:block">Comments</span>
										</span>
									</div>
									<div className="flex items-center">
										<span
											onClick={() => handleLike(activePost?.id)}
											className="bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center"
										>
											<ThumbsUp
												size={14}
												color={
													likedBlog[activePost?.id] ? "#0BA02C" : "#1D2432"
												}
												fill={likedBlog[activePost?.id] ? "#0BA02C" : "none"}
											/>
										</span>
										<span className="ml-1 flex gap-2 text-sm text-gray-55 font-medium">
											{activePost?.likes_count}
											<span className="hidden md:block">Likes</span>
										</span>
									</div>

									<div className="flex items-center">
										<span className="bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
											<Share2 size={14} color="#1D2432" />
										</span>
										<span className="ml-1 flex gap-2 text-sm text-gray-55 font-medium">
											{activePost?.shares_count}{" "}
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
							<CommentSection
								id={activePost.id}
								openDropdownId={openDropdownId}
								toggleDropdown={toggleDropdown}
								setOpenDropdownId={setOpenDropdownId}
							/>
						)}
					</div>

					{/* Mobile Comments Drawer */}
					<MobileDrawal
						toggleDropdown={toggleDropdown}
						showComments={showComments}
						setShowComments={setShowComments}
						id={activePost?.id}
						openDropdownId={openDropdownId}
						setOpenDropdownId={setOpenDropdownId}
					/>
				</div>

				{/* Hot News Section */}
				<h3 className="font-semibold text-2xl pb-7 pt-12">Hot News</h3>
				{
					hotNews.length === 0 && (<p className="text-gray-55 font-medium text-sm">
						No trending blog available
					</p>
					)
				}
				<HotNews
					news={hotNews}
					setShowFull={setShowFull}
					setActivePost={setActivePost}
					setShowComments={setShowComments}
				/>
			</div>
		</div>
	);
};

export default Blog;
