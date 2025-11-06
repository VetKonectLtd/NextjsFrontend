"use client";

import { useForumService } from "@/services/forumService";
import { motion, AnimatePresence } from "framer-motion";

import {
	MessagesSquare,
	ThumbsUp,
	Share2,
	Send,
	Edit,
	Trash,
	Eye,
	X,
	Loader2,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatRole, timeAgo } from "../shared/TimeFormat";
import { User } from "@/app/assets/icons";
import { useRouter } from "next/navigation";
import { useAuthService } from "@/services/authService";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const DEFAULT_AVATAR = User;

interface PostDetailProps {
	postId: string;
	slug: string;
}

const PostDetail = ({ postId, slug }: PostDetailProps) => {
	const [isMobile, setIsMobile] = useState(false);
	const {
		useLikeForum,
		useGetForumSlug,
		useAddForumComment,
		useGetForumCommentById,
		useDeleteForumComment,
		useUpdateForumComment,
	} = useForumService();
	const { useCurrentUser } = useAuthService();
	const [likedPosts, setLikedPosts] = useState<{ [key: number]: boolean }>({});
	const [commentText, setCommentText] = useState("");
	const [commentId, setCommentId] = useState<string | " ">("");
	const [editingCommentId, setEditingCommentId] = useState<string | "">("");
	const [replyToId, setReplyToId] = useState<string | " ">("");
	const [openReplies, setOpenReplies] = useState<string | null>(null);
	const commentInputRef = useRef<HTMLTextAreaElement | null>(null);

	const router = useRouter();
	const likeMutation = useLikeForum(postId);
	const commentMutation = useAddForumComment(postId);
	const getComment = useGetForumCommentById(true, postId);
	const getForumBySlug = useGetForumSlug(true, slug);
	const deleteCommentMutation = useDeleteForumComment(commentId);
	const updateCommentMutation = useUpdateForumComment(editingCommentId);
	const { data: user } = useCurrentUser(true);
	const currentUserId = (user as any)?.profile?.user_id;

	const detail: any = getForumBySlug?.data;

	const comments = Array.isArray(getComment?.data) ? getComment?.data : [];

	useEffect(() => {
		const initialLikes: { [key: string]: boolean } = {};
		initialLikes[detail?.id] = detail?.has_liked ?? false;
		console.log(detail?.has_liked);
		setLikedPosts(initialLikes);
	}, [detail]);

	const handleCancel = () => {
		setCommentText("");
		setEditingCommentId("");
		setReplyToId("");
	};

	const handleSubmit = () => {
		if (replyToId) {
			commentMutation.mutate(
				{ comment: commentText, parent_id: replyToId }, // send reply info
				{
					onSuccess: () => {
						setCommentText("");
						setReplyToId("");
						getComment.refetch();
						getForumBySlug.refetch();
					},
				},
			);
		} else if (editingCommentId) {
			updateCommentMutation.mutate(
				{ comment: commentText },
				{
					onSuccess: () => {
						setCommentText("");
						setEditingCommentId("");
						getComment.refetch();
						getForumBySlug.refetch();
					},
				},
			);
		} else {
			commentMutation.mutate(
				{ comment: commentText },
				{
					onSuccess: () => {
						setCommentText("");
						getComment.refetch();
						getForumBySlug.refetch();
					},
				},
			);
		}
	};

	const handleDelete = (commentId: any) => {
		setCommentId(commentId);
		if (window.confirm(`Are you sure you want to delete your comment?`)) {
			deleteCommentMutation.mutate(commentId, {
				onSuccess: () => {
					getComment.refetch();
					getForumBySlug.refetch();
				},
			});
		}
	};

	const handleLike = (postId: any) => {
		setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));

		likeMutation.mutate(postId, {
			onSuccess: () => {
				getForumBySlug.refetch();
			},
			onError: () => {
				setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
			},
		});
	};

	const handleBack = () => {
		router.back();
	};

	useEffect(() => {
		const checkScreen = () => setIsMobile(window.innerWidth < 768);
		checkScreen();
		window.addEventListener("resize", checkScreen);
		return () => window.removeEventListener("resize", checkScreen);
	}, []);

	if (getForumBySlug.isLoading || getComment.isLoading) {
		return (
			<div className="flex justify-center items-center h-[60vh]">
				<Loader2 className="animate-spin text-primary-400 w-8 h-8" />
				<span className="ml-3 text-gray-600 font-medium">
					Loading forum chat...
				</span>
			</div>
		);
	}

	return (
		<div className="">
			<div className="flex gap-3 text-sm text-gray-55 mb-5">
				<button onClick={handleBack} className="font-bold">
					Forum Chat{" "}
				</button>
				/ <span>Comments</span>
			</div>

			<div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
				{/* Header */}
				<div className="flex items-center mb-4">
					<div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 mr-3">
						<Image
							src={detail?.author?.image || DEFAULT_AVATAR}
							alt={detail?.author.name}
							width={40}
							height={40}
							className="object-cover w-full h-full"
						/>
					</div>
					<div>
						<p className="font-semibold text-gray-55">
							{isMobile && detail?.author.name.length > 10
								? `${detail?.author.name.slice(0, 10)}...`
								: detail?.author.name}
						</p>
						<p className="text-sm text-gray-500">
							{formatRole(detail?.author.active_role)}
						</p>
					</div>
					<span className="ml-auto text-nowrap text-xs px-3 py-1 border border-gray-200 rounded-full bg-gray-100 text-gray-600">
						{timeAgo(detail?.created_at)}
					</span>
				</div>

				{/* Post Body */}
				{detail?.image_url ? (
					<Dialog>
						<DialogTrigger asChild>
							<div
								className="bg-center bg-no-repeat bg-cover h-40 mb-3 cursor-pointer rounded-md"
								style={{ backgroundImage: `url(${detail?.image_url})` }}
							/>
						</DialogTrigger>
						<DialogContent className="max-w-3xl p-0 bg-transparent border-none shadow-none flex justify-center items-center">
							<img
								src={detail?.image_url}
								alt="Full Image"
								className="w-full h-auto max-h-[90vh] object-contain rounded-md"
							/>
						</DialogContent>
					</Dialog>
				) : (
					<div className="bg-primary-400 h-40 mb-3 rounded-md" />
				)}

				<h4 className="font-semibold text-gray-800 text-lg">{detail?.title}</h4>
				<p className="text-gray-600 text-sm mb-4">{detail?.content}</p>

				{/* Actions */}
				<div className="flex md:justify-end justify-start gap-4 items-center text-sm mb-6">
					<div className="flex items-center">
						<span className="bg-white border hover:border-gray-55 border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
							<Eye size={14} color="#1D2432" />
						</span>
						<span className="ml-1 flex gap-2 md:text-sm text-xs text-gray-55 font-medium">
							{detail?.views_count}
							<span className="hidden md:block">Views</span>
						</span>
					</div>
					<div className="flex items-center">
						<span className="bg-white border hover:border-gray-55 border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
							<MessagesSquare size={14} color="#1D2432" />
						</span>
						<span className="ml-3 text-sm flex gap-2 text-gray-55 font-medium">
							{detail?.comments_count}
							<span className="hidden md:block">Comments</span>
						</span>
					</div>
					<div className="flex items-center">
						<span
							onClick={() => handleLike(detail?.id)}
							className={`bg-white border cursor-pointer shadow-md rounded-full p-2 flex items-center justify-center transition-transform
							 ${likedPosts[detail?.id] ? "border-primary-400" : "border-gray-225"}`}
						>
							<ThumbsUp
								size={14}
								color={likedPosts[detail?.id] ? "#0BA02C" : "#1D2432"}
								fill={likedPosts[detail?.id] ? "#0BA02C" : "none"}
							/>
						</span>
						<span className="ml-3 text-sm flex gap-2 text-gray-55 font-medium">
							{detail?.likes_count}{" "}
							<span className="hidden md:block">Likes</span>
						</span>
					</div>
					<div className="flex items-center">
						<span className="bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
							<Share2 size={14} color="#1D2432" />
						</span>
						<span className="ml-1 md:text-sm flex gap-2 text-xs text-gray-55 font-medium">
							{detail?.shares_count}
						</span>
					</div>
				</div>

				{/* Comments Section */}
				<h5 className="font-semibold text-sm text-gray-55 mb-3">
					{detail?.comments_count} Comments
				</h5>

				<div className="space-y-3">
					{getComment.isLoading ? (
						<p>Loading comments...</p>
					) : comments?.length ? (
						comments.map((comment: any) => (
							<div
								key={comment.id}
								className="flex flex-col items-start gap-1 bg-[#F1F1F1] p-3 rounded-lg"
							>
								<div className="flex w-full items-center justify-between">
									<div className="flex gap-4 items-center">
										<div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
											<Image
												src={comment?.author.image || DEFAULT_AVATAR}
												alt={comment?.author.name}
												width={40}
												height={40}
												className="object-cover w-full h-full"
											/>
										</div>
										<div className="">
											<p className="font-semibold text-gray-55">
												{isMobile && comment.author.name > 10
													? `${comment?.author?.name.slice(0, 10)}...`
													: comment?.author?.name}
											</p>
											<p className="text-xs text-gray-55">
												{formatRole(comment?.author.active_role)}
											</p>
										</div>
									</div>
									<p className="text-xs px-3 py-1 border border-gray-225 bg-gray-100 rounded-full text-gray-500 mt-1">
										{isMobile && comment?.created_at > 10
											? `${comment?.created_at.slice(0, 10)}...`
											: timeAgo(comment.created_at)}
									</p>
								</div>
								<div className="flex-1">
									<p className="text-sm text-gray-55 mt-1">
										{comment?.comment}
									</p>
								</div>

								{/* Actions */}
								<div className="flex w-full md:justify-end justify-start gap-4 items-center text-sm md:mb-1">
									<div className="flex items-center">
										<span
											onClick={() => {
												setReplyToId(comment.id);
												setCommentText("");
											}}
											className="bg-white border hover:border-gray-55 border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center"
										>
											<MessagesSquare size={14} color="#1D2432" />
										</span>

										<span
											onClick={() =>
												setOpenReplies(
													openReplies === comment.id ? null : comment.id,
												)
											}
											className="ml-1 md:text-sm text-xs text-gray-55 font-medium cursor-pointer hover:underline"
										>
											{openReplies === comment.id
												? "Hide Replies"
												: `${comment?.replies?.length} Replies`}
										</span>
									</div>

									{comment.user.id == currentUserId && (
										<>
											<div className="flex items-center">
												<span
													onClick={() => {
														setEditingCommentId(comment.id);
														setCommentText(comment.comment);
														setTimeout(() => {
															commentInputRef.current?.scrollIntoView({
																behavior: "smooth",
																block: "start",
															});
															commentInputRef.current?.focus();
														}, 200);
													}}
													className="bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center"
												>
													<Edit size={14} color="#1D2432" />
												</span>
											</div>
											<span
												onClick={() => handleDelete(comment?.id)}
												className="bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center"
											>
												<Trash size={14} color="#1D2432" />
											</span>
										</>
									)}
								</div>
								<AnimatePresence>
									{openReplies === comment.id &&
										comment.replies?.length > 0 && (
											<motion.div
												key={comment.id}
												initial={{ height: 0, opacity: 0 }}
												animate={{ height: "auto", opacity: 1 }}
												exit={{ height: 0, opacity: 0 }}
												transition={{ duration: 0.3, ease: "easeInOut" }}
												className="pl-3  w-full  space-y-2"
											>
												{comment.replies.map((reply: any) => (
													<motion.div
														key={reply.id}
														initial={{ x: -10, opacity: 0 }}
														animate={{ x: 0, opacity: 1 }}
														transition={{ duration: 0.2 }}
														className="ml-16 pl-4 py-1 rounded-md flex flex-col gap-1"
													>
														<div className="flex gap-3">
															<div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
																<Image
																	src={reply?.author.image || DEFAULT_AVATAR}
																	alt={reply?.author.name}
																	width={25}
																	height={25}
																	className="rounded-full w-full h-full object-cover"
																/>
															</div>
															<div className="mb-2">
																<p className="font-semibold text-gray-55">
																	{reply.author.name}
																</p>
																<p className="text-xs text-gray-400">
																	{timeAgo(reply.created_at)}
																</p>
															</div>
														</div>
														<p className="text-gray-55 text-sm">
															{reply.comment}
														</p>
														<div className="flex w-full md:justify-end justify-start gap-4 items-center text-sm md:mb-1">
															{reply.user.id == currentUserId && (
																<>
																	<div className="flex items-center">
																		<span
																			onClick={() => {
																				setEditingCommentId(reply.id);
																				setCommentText(reply.comment);
																				setTimeout(() => {
																					commentInputRef.current?.scrollIntoView(
																						{
																							behavior: "smooth",
																							block: "start",
																						},
																					);
																					commentInputRef.current?.focus();
																				}, 200);
																			}}
																			className="bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center"
																		>
																			<Edit size={14} color="#1D2432" />
																		</span>
																	</div>
																	<span
																		onClick={() => handleDelete(reply?.id)}
																		className="bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center"
																	>
																		<Trash size={14} color="#1D2432" />
																	</span>
																</>
															)}
														</div>
													</motion.div>
												))}
											</motion.div>
										)}
								</AnimatePresence>
							</div>
						))
					) : (
						<p className="text-sm text-gray-500">No comments yet.</p>
					)}
				</div>
				{replyToId && (
					<div className="text-xs text-gray-600 w-full text-left">
						Replying to comment #{replyToId}
						<button
							onClick={() => setReplyToId("")}
							className="ml-2 text-red-500 text-xs underline"
						>
							Cancel
						</button>
					</div>
				)}

				{/* Add Comment */}
				<div className="flex flex-col relative items-center gap-3 mt-4">
					<textarea
						ref={commentInputRef}
						className="border relative outline-none shadow-md w-full p-4 text-sm font-normal py-3 rounded-md resize-none border-gray-225"
						name="comment"
						placeholder="comment"
						id="comment"
						rows={7}
						value={commentText}
						onChange={(e) => setCommentText(e.target.value)}
					></textarea>
					{(editingCommentId || replyToId) && (
						<button
							onClick={handleCancel}
							className="ml-2 absolute right-3 top-10 p-2 rounded-full hover:bg-gray-100"
							title="Cancel"
						>
							<X className="w-5 h-5 text-gray-500" />
						</button>
					)}
					<button
						onClick={handleSubmit}
						className="bg-primary-400 w-full text-center text-sm text-white px-4 py-2 rounded-lg flex justify-center items-center gap-2"
					>
						<span>{editingCommentId ? "Update Comment" : "Comment"}</span>
						<Send size={14} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default PostDetail;
