"use client";

import {
	Eye,
	MessagesSquare,
	PlusIcon,
	Search,
	Send,
	Share2,
	ThumbsUp,
	X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForumService } from "@/services/forumService";
import { ForumChat } from "@/types";
import { formatRole, timeAgo } from "../shared/TimeFormat";
import ForumPostSkeleton from "./ForumPostSkeleton";
import EmptyState from "../shared/EmptyState";
import { Hand, User, Down } from "@/app/assets/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";
import FilterDropdownMenu from "./DropdownMenu";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { forumCategories } from "./forumCategories";

const DEFAULT_AVATAR = User;

const ForumChatCard = () => {
	const [activePost, setActivePost] = useState<string | null>(null);
	const [selectedPost, setSelectedPost] = useState<any | null>(null);
	const [page, setPage] = useState(1);
	const [allPosts, setAllPosts] = useState<ForumChat[]>([]);
	const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
	const [visibilityFilter, setVisibilityFilter] = useState<string>("");
	const [searchHistory, setSearchHistory] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState("");

	const {
		useLikeForum,
		useGetAllForumChat,
		useGetForumByVisibility,
		useDeleteForum,
	} = useForumService();

	const router = useRouter();

	// Paginated fetch
	const getAllForum = useGetAllForumChat(true, page);
	const getForumByVisibility = useGetForumByVisibility(
		!!visibilityFilter,
		visibilityFilter,
	);

	const likeMutation = useLikeForum(activePost || "");

	// When visibility changes, reset pagination and posts
	useEffect(() => {
		setPage(1);
		setAllPosts([]);
		if (visibilityFilter) {
			getForumByVisibility.refetch();
		}
	}, [visibilityFilter]);

	// Combine posts as pages load
	useEffect(() => {
		const newData = visibilityFilter
			? (getForumByVisibility.data as any)?.data
			: (getAllForum.data as any)?.chats?.data;

		if (Array.isArray(newData)) {
			// setAllPosts((prev) => {
			// 	const newUnique = newData.filter(
			// 		(p: ForumChat) => !prev.some((old) => old.id === p.id),
			// 	);
			// 	return [...prev, ...newUnique];
			// });
			setAllPosts(newData);
		}
	}, [getAllForum.data, getForumByVisibility.data]);

	useEffect(() => {
		if (allPosts.length > 0) {
			const initialLikes: { [key: string]: boolean } = {};
			allPosts.forEach((post) => {
				initialLikes[post.id] = post.has_liked ?? false;
			});
			setLikedPosts(initialLikes);
		}
	}, [allPosts]);

	// Handle open post
	const handleOpenPost = (post: ForumChat) => {
		setSelectedPost(post);
		const slug = slugify(post.slug);
		router.push(`/dashboard/chat-forum/${post.id}/${slug}`);
	};

	// Handle search
	const handleSearch = () => {
		if (!searchTerm.trim()) return;
		const updated = [
			searchTerm,
			...searchHistory.filter((t) => t !== searchTerm),
		].slice(0, 5);
		setSearchHistory(updated);
		localStorage.setItem("forumSearchHistory", JSON.stringify(updated));
	};

	// Load More logic
	const handleLoadMore = () => {
		const nextPage = (getAllForum.data as any)?.chats?.next_page_url;
		if (nextPage) setPage((prev) => prev + 1);
	};

	const isLoading = getAllForum.isLoading && page === 1;

	const postsToRender = allPosts.filter((post) => {
		const term = searchTerm.toLowerCase();
		return (
			post.title.toLowerCase().includes(term) ||
			post.category.toLowerCase().includes(term) ||
			post.content.toLowerCase().includes(term)
		);
	});

	// Handle like
	const handleLike = (postId: any) => {
		setActivePost(postId);
		setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
		likeMutation.mutate(postId, {
			onSuccess: () => {
				getAllForum.refetch();
			},
		});
	};

	return (
		<div>
			{/* Search Bar */}
			<div className="flex flex-row items-center md:gap-7 gap-2 w-full mb-6">
				<div className="flex items-center w-full shadow-sm rounded-xl border border-gray-200 overflow-hidden bg-white">
					<input
						type="text"
						placeholder="Type in your keyword here"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleSearch()}
						className="flex-1 px-4 py-2 text-gray-55 focus:outline-none"
					/>
					<button
						onClick={handleSearch}
						className="flex items-center md:py-3 py-3 rounded-r-xl md:px-4 h-full justify-center pl-1 pr-2 bg-primary-400 text-white"
					>
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

			{/* Search Tags */}

			<div className="flex items-center justify-between mb-4">
				<div
					className="
			flex flex-wrap gap-2 pb-4 
			w-full
		 md:overflow-x-visible 
			overflow-x-auto scrollbar-hide
		"
				>
					{forumCategories.map((category) => (
						<span
							key={category}
							onClick={() => setSearchTerm(category)}
							className="
					px-3 py-1 text-sm bg-white border border-gray-200 
					shadow-sm text-gray-700 rounded-full cursor-pointer 
					transition whitespace-nowrap hover:bg-gray-100
				"
						>
							{category}
						</span>
					))}
				</div>
			</div>

			{/* Posts */}
			{isLoading ? (
				Array.from({ length: 2 }).map((_, i) => <ForumPostSkeleton key={i} />)
			) : postsToRender.length > 0 ? (
				<>
					{postsToRender.map((post) => (
						<div
							key={post.id}
							className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm"
						>
							{/* Header */}
							<div className="flex justify-between items-center mb-3">
								<div className="items-center flex">
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
								</div>
								<div className="flex justify-between items-center">
									<div className="ml-auto mr-3 text-nowrap md:text-xs text-[10px] px-2 py-1 border border-gray-225 rounded-full bg-gray-100 text-gray-55">
										{timeAgo(post.created_at)}
									</div>
								</div>
							</div>

							{/* Body */}
							{post?.image_url && (
								<Dialog>
									<DialogTrigger asChild>
										<div
											className="bg-center bg-no-repeat bg-cover h-40 mb-3 cursor-pointer rounded-md"
											style={{ backgroundImage: `url(${post.image_url})` }}
										/>
									</DialogTrigger>
									<DialogContent className="max-w-3xl p-0 bg-transparent border-none shadow-none flex justify-center items-center">
										<img
											src={post.image_url}
											alt="Full Image"
											className="w-full h-auto max-h-[90vh] object-contain rounded-md"
										/>
									</DialogContent>
								</Dialog>
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
										onClick={() => handleLike(post.id)}
										className={`bg-white border cursor-pointer shadow-md rounded-full p-2 flex items-center justify-center transition-transform ${
											likedPosts[post.id]
												? "border-primary-400"
												: "border-gray-225"
										}`}
									>
										<ThumbsUp
											size={14}
											color={likedPosts[post.id] ? "#0BA02C" : "#1D2432"}
											fill={likedPosts[post.id] ? "#0BA02C" : "none"}
										/>
									</span>
									<span className="ml-1 md:text-sm flex gap-2 text-xs text-gray-55 font-medium">
										{post.likes_count}
										<span className="hidden md:block">Likes</span>
									</span>
								</div>

								<div className="flex items-center">
									<span className="bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
										<Share2 size={14} color="#1D2432" />
									</span>
									<span className="ml-1 md:text-sm flex gap-2 text-xs text-gray-55 font-medium">
										{post.shares_count}
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
					))}

					{/* Load More */}
					{(getAllForum.data as any)?.chats?.next_page_url && (
						<div className="m-auto w-1/3 justify-center flex">
							<button
								onClick={handleLoadMore}
								disabled={getAllForum.isFetching}
								className="mt-6 flex items-center py-2 px-3 bg-gray-225 font-bold text-gray-55 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
							>
								{getAllForum.isFetching ? "Loading..." : "Load more"}
								<Image
									src={Down}
									alt="down"
									width={120}
									height={120}
									className="h-5 w-5 ml-3 animate-bounce object-cover"
								/>
							</button>
						</div>
					)}
				</>
			) : (
				<EmptyState
					title="Hey! User"
					description="Kindly click on the button above to start a forum chat"
					image={Hand}
				/>
			)}
		</div>
	);
};

export default ForumChatCard;
