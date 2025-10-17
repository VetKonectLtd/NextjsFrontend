"use client";

import {
	Eye,
	MessagesSquare,
	PlusIcon,
	Search,
	Send,
	Share2,
	SlidersVertical,
	ThumbsUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForumService } from "@/services/forumService";
import { ForumChat } from "@/types";
import { formatRole, timeAgo } from "../shared/TimeFormat";
import ForumPostSkeleton from "./ForumPostSkeleton";
import EmptyState from "../shared/EmptyState";
import { Hand, User } from "@/app/assets/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";
import { useAuthService } from "@/services/authService";
import FilterDropdownMenu from "./DropdownMenu";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
const DEFAULT_AVATAR = User;

const ForumChatCard = () => {
	const [activePost, setActivePost] = useState<string | null>(null);
	const [selectedPost, setSelectedPost] = useState<any | null>(null);
	const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
	const [visibilityFilter, setVisibilityFilter] = useState<string>("");
	const { useCurrentUser } = useAuthService();
	const { data: user } = useCurrentUser(true);

	const [likeTarget, setLikeTarget] = useState<string | " ">("");
	const [searchTerm, setSearchTerm] = useState("");
	const { useLikeForum, useGetAllForumChat, useGetForumByVisibility } =
		useForumService();
	const router = useRouter();
	const getAllForum = useGetAllForumChat(true);
	const getForumByVisibility = useGetForumByVisibility(  visibilityFilter !== "", visibilityFilter);
	const likeMutattion = useLikeForum(likeTarget);

	console.log("visibilityFilter:::::;", getForumByVisibility.data);

	const posts =
			 Array.isArray((getAllForum?.data as any)?.chats?.data)
				? (getAllForum?.data as any)?.chats?.data
				: [];

	const filteredPosts = posts.filter((post: ForumChat) => {
		const titleMatch = post.title
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		return titleMatch;
	});

	useEffect(() => {
		if (posts.length > 0) {
			const initialLikes: { [key: string]: boolean } = {};

			posts.forEach((post: ForumChat) => {
				initialLikes[post.id] = post.has_liked ?? false;
			});
			setLikedPosts(initialLikes);
		}
	}, [posts]);

	const handleLike = (postId: any) => {
		setLikeTarget(postId);
		setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));

		likeMutattion.mutate(postId, {
			onSuccess: () => {
				getAllForum.refetch();
			},
		});
	};

	const handleOpenPost = (post: ForumChat) => {
		setSelectedPost(post);
		const slug = slugify(post.slug);
		router.push(`/dashboard/chat-forum/${post.id}/${slug}`);
	};

	useEffect(() => {
		if (selectedPost) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, [selectedPost]);

	return (
		<>
			<div>
				{/* Search Bar */}
				<div className="flex flex-row items-center md:gap-7 gap-2 w-full  mb-6">
					<div className="flex items-center w-full shadow-sm rounded-xl border border-gray-200 overflow-hidden bg-white">
						<input
							type="text"
							placeholder="Type in your keyword here"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="flex-1 px-4 py-1 text-gray-55 focus:outline-none"
						/>
						<button className="flex items-center md:py-2 py-2 md:px-4 h-full justify-center pl-1 pr-2 bg-primary-400 text-white">
							<Search className="w-5 h-5" />
							<span className="ml-2 hidden md:inline">Search</span>
						</button>
					</div>

					<div className="flex items-center gap-7">
						<FilterDropdownMenu setVisibilityFilter={setVisibilityFilter} />

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
						{getAllForum.isLoading ? (
							Array.from({ length: 2 }).map((_, i) => (
								<ForumPostSkeleton key={i} />
							))
						) : filteredPosts.length > 0 ? (
							filteredPosts.map((post: ForumChat) => (
								<div
									key={post.id}
									className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm"
								>
									{/* Header */}
									<div className="flex items-center mb-3">
										<div className="w-10 h-10 rounded-full border overflow-hidden border-gray-225 bg-gray-300 mr-3">
											<Image
												src={post.author.image || DEFAULT_AVATAR}
												alt={"Vet"}
												width={40}
												height={40}
												className="object-cover w-full h-full"
											/>
										</div>
										<div>
											<h3 className="font-semibold text-gray-800">
												{post.author.name}
											</h3>
											<p className="text-sm text-gray-500">
												{formatRole(post.author.active_role)}
											</p>
										</div>
										<span className="ml-auto md:text-xs text-[10px] px-2 py-1 border border-gray-225 rounded-full bg-gray-100 text-gray-55">
											{timeAgo(post.created_at)}
										</span>
									</div>

									{/* Post Body */}
									{post?.image_url ? (
										<Dialog>
											<DialogTrigger asChild>
												<div
													className="bg-center bg-no-repeat bg-cover h-40 mb-3 cursor-pointer rounded-md"
													style={{ backgroundImage: `url(${post?.image_url})` }}
												/>
											</DialogTrigger>
											<DialogContent className="max-w-3xl p-0 bg-transparent border-none shadow-none flex justify-center items-center">
												<img
													src={post?.image_url}
													alt="Full Image"
													className="w-full h-auto max-h-[90vh] object-contain rounded-md"
												/>
											</DialogContent>
										</Dialog>
									) : (
										<div className="bg-primary-400 h-40 mb-3 rounded-md" />
									)}
									<h4 className="font-semibold capitalize text-gray-55 text-lg">
										{post.title}
									</h4>
									<p className="text-gray-55 text-sm mb-3">
										{post.content.length <= 200 ? (
											post.content
										) : (
											<>
												{post.content.slice(0, 200)}...
												<span
													onClick={() => handleOpenPost(post)}
													className="text-green-50 cursor-pointer"
												>
													{" "}
													see more
												</span>
											</>
										)}
									</p>

									{/* Actions */}
									<div className="flex md:justify-end justify-start gap-4 items-end text-sm">
										<div className="flex items-center">
											<span className="bg-white border hover:border-gray-55 border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
												<Eye size={14} color="#1D2432" />
											</span>
											<span className="ml-1 flex gap-2 md:text-sm text-xs text-gray-55 font-medium">
												{post.views_count}
												<span className="hidden md:block">Views</span>
											</span>
										</div>

										<div
											className="flex items-center cursor-pointer"
											onClick={() =>
												setActivePost(activePost === post.id ? null : post.id)
											}
										>
											<span
												onClick={() => handleOpenPost(post)}
												className="bg-white border hover:border-gray-55 border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center"
											>
												<MessagesSquare size={14} color="#1D2432" />
											</span>
											<span className="ml-1 md:text-sm flex gap-2 text-xs text-gray-55 font-medium">
												{post.comments_count}
												<span className="hidden md:block">Comments</span>
											</span>
										</div>

										<div className="flex items-center">
											<span
												onClick={() => handleLike(post?.id)}
												className={`bg-white border cursor-pointer shadow-md rounded-full p-2 flex items-center justify-center transition-transform  ${likedPosts[post.id] ? "border-primary-400" : "border-gray-225"}`}
											>
												<ThumbsUp
													size={14}
													color={likedPosts[post.id] ? "#0BA02C" : "#1D2432"}
													fill={likedPosts[post.id] ? "#0BA02C" : "none"}
												/>
											</span>
											<span className="ml-1 md:text-sm flex gap-2 text-xs text-gray-55 font-medium">
												{post.likes_count}{" "}
												<span className="hidden md:block">Likes</span>
											</span>
										</div>

										<div className="flex items-center">
											<span className="bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
												<Share2 size={14} color="#1D2432" />
											</span>
											<span className="ml-1 md:text-sm flex gap-2 text-xs text-gray-55 font-medium">
												{post?.shares_count}
											</span>
										</div>
										<div className="flex items-center">
											<span
												onClick={() => handleOpenPost(post)}
												className="ml-3 bg-primary-400 border cursor-pointer border-white rounded-xl p-2 font-semibold"
											>
												<Send size={14} className="text-white" />
											</span>
										</div>
									</div>
								</div>
							))
						) : posts.length > 0 ? (
							<p className="text-gray-500 text-center py-6 font-medium">
								No forum chats match "
								<span className="text-primary-400">{searchTerm}</span>"
							</p>
						) : (
							<EmptyState
								title="Hey! User"
								description="Kindly click on the button above to start a forum chat"
								image={Hand}
							/>
						)}
					</>
				)}
			</div>
		</>
	);
};

export default ForumChatCard;
