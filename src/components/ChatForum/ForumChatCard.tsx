"use client";

import {
	Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForumService } from "@/services/forumService";
import { ForumChat } from "@/types";
import ForumPostSkeleton from "./ForumPostSkeleton";
import EmptyState from "../shared/EmptyState";
import { Hand, User, Down } from "@/app/assets/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";
import FilterDropdownMenu from "./DropdownMenu";
import { forumCategories } from "./forumCategories";

const DEFAULT_AVATAR = User;

const ForumChatCard = () => {
	// const [activePost, setActivePost] = useState<string | null>(null);
	const [selectedPost, setSelectedPost] = useState<any | null>(null);
	const [page, setPage] = useState(1);
	const [allPosts, setAllPosts] = useState<ForumChat[]>([]);
	// const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
	const [visibilityFilter, setVisibilityFilter] = useState<string>("");
	const [searchHistory, setSearchHistory] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	// const [shareOpen, setShareOpen] = useState(false);
	// const [shareLink, setShareLink] = useState("");

	const {
		useLikeForum,
		useGetAllForumChat,
		useGetForumByVisibility,
	} = useForumService();

	const router = useRouter();

	// Paginated fetch
	const getAllForum = useGetAllForumChat(true, page);
	const getForumByVisibility = useGetForumByVisibility(
		!!visibilityFilter,
		visibilityFilter,
	);
	// const likeMutation = useLikeForum(activePost || "");

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
			setAllPosts((prev) => {
				const newUnique = newData.filter(
					(p: ForumChat) => !prev.some((old) => old.id === p.id),
				);
				return [...prev, ...newUnique];
			});
			// setAllPosts(newData);
		}
	}, [getAllForum.data, getForumByVisibility.data]);

	// useEffect(() => {
	// 	if (allPosts.length > 0) {
	// 		const initialLikes: { [key: string]: boolean } = {};
	// 		allPosts.forEach((post) => {
	// 			initialLikes[post.id] = post.has_liked ?? false;
	// 		});
	// 		setLikedPosts(initialLikes);
	// 	}
	// }, [allPosts]);

	// Handle open post
	const handleOpenPost = (post: ForumChat) => {
		setSelectedPost(post);
		const slug = slugify(post.slug);
		router.push(`/chat-forum/${post.id}/${slug}`);
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
	// const handleLike = (postId: any) => {
	// 	setActivePost(postId);
	// 	setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
	// 	likeMutation.mutate(postId, {
	// 		onSuccess: () => {
	// 			getAllForum.refetch();
	// 		},
	// 	});
	// };

	return (
		<div>
			{/* Search Bar */}
			<div className="flex flex-row items-center md:gap-7 gap-2 w-full mb-6">
				<div className="flex items-center w-full shadow-sm rounded-xl border border-gray-200 overflow-hidden bg-white">
					<input
						type="text"
						placeholder="Search posts, categories..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="flex-1 px-4 py-3 text-sm bg-transparent outline-none"
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
					{/* <div className="w-9 h-9 md:flex hidden items-center justify-center bg-green-50 text-white rounded-xl text-xl">
						<PlusIcon className="w-10 h-10 font-bold text-white " />
					</div> */}
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
				<div>
					{Array.from({ length: 2 }).map((_, i) => <ForumPostSkeleton key={i} />)}
				</div>
			) : postsToRender.length > 0 ? (
				<div className="bg-white border border-gray-225 rounded-lg shadow-sm hover:shadow-md transition">
					{postsToRender.map((post, index) => (
						<div
							key={post.id}
							onClick={() => handleOpenPost(post)}
							className={`
          px-4 py-3 cursor-pointer transition
          hover:bg-[#ececdf]
          ${index % 2 === 0 ? "bg-[#f6f6ef]" : "bg-[#f0f0e6]"}
        `}
						>
							{/* TITLE ROW */}
							<div className="flex flex-wrap items-center gap-1 text-sm">
								<span className="font-semibold text-blue-700">
									{post.category}
								</span>

								<span className="text-gray-500">&gt;</span>

								<span className="font-semibold text-gray-900 hover:underline">
									{post.title}
								</span>
							</div>

							{/* META LINE */}
							<div className="text-xs text-gray-600 mt-1 flex flex-wrap gap-2">
								<span>
									by <span className="font-semibold text-amber-700">
										{post.author?.name || "Admin"}
									</span>
								</span>

								<span>• {post.comments_count || 0} comment</span>
								<span>• {post.views_count || 0} views</span>
								<span>
									• {(() => {
										const createdDate = new Date(post.created_at);
										const now = new Date();

										const isToday =
											createdDate.toDateString() === now.toDateString();

										const isCurrentYear =
											createdDate.getFullYear() === now.getFullYear();

										if (isToday) {
											return createdDate.toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
											});
										}

										return createdDate.toLocaleDateString([], {
											day: "numeric",
											month: "long",
											...(isCurrentYear ? {} : { year: "numeric" }),
										});
									})()}
								</span>


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
				</div>
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
