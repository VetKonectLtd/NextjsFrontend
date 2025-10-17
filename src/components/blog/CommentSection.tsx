"use client";
import Image from "next/image";
import { Send, X } from "lucide-react";
import { ButtonBg } from "@/app/assets/icons/vet-vendor";
import { useBlogService } from "@/services/blogServie";
import { useRef, useState } from "react";
import { timeAgo } from "../shared/TimeFormat";
import { User } from "@/app/assets/icons";
import CommentMenu from "@/components/blog/CommentMenu";

interface Props {
	id: string;
	openDropdownId: string | null;
	toggleDropdown: (id: string) => void;
	setOpenDropdownId: (id: string | null) => void;
}

const DEFAULT_AVATAR = User;

const CommentSection = ({ id }: Props) => {
	const [commentText, setCommentText] = useState("");
	const [commentId, setCommentId] = useState<string | " ">("");
	const [editingCommentId, setEditingCommentId] = useState<string | "">("");
	const [replyToId, setReplyToId] = useState<string | " ">("");
	const commentInputRef = useRef<HTMLTextAreaElement | null>(null);
	const [openReplies, setOpenReplies] = useState<string | null>(null);
	const {
		useAddComment,
		useDeleteComment,
		useReportComment,
		useUpdateComment,
		useGetComments,
		useGetBlog,
	} = useBlogService();

	const deleteCommentMutation = useDeleteComment(commentId);
	const getBlog = useGetBlog(true, id);
	const reportComment = useReportComment(commentId);
	const updateCommentMutation = useUpdateComment(editingCommentId);
	const blogCommentMutation = useAddComment(id);
	const getComment = useGetComments(true, id);

	const comments: any = getComment.data || [];

	const handleCancel = () => {
		setCommentText("");
		setEditingCommentId("");
		setReplyToId("");
	};

	const handleDelete = (commentid: any) => {
		setCommentId(commentid);

		if (window.confirm(`Are you sure you want to delete your comment?`)) {
			deleteCommentMutation.mutate(commentid, {
				onSuccess: () => {
					getComment.refetch();
					getBlog.refetch();
				},
			});
		}
	};

	const handleFlag = (commentId: any) => {
		setCommentId(commentId);

		const choice = window.prompt(
			"Why are you reporting this comment? Type 'spam' or 'abuse'",
		);

		if (choice === "spam" || choice === "abuse") {
			if (
				window.confirm(
					`Are you sure you want to report this comment as ${choice}?`,
				)
			) {
				reportComment.mutate(
					{ flag: choice }, // ✅ only "spam" or "abuse"
					{
						onSuccess: () => {
							getComment.refetch();
							getBlog.refetch();
						},
					},
				);
			}
		} else {
			alert("Invalid choice. Please type either 'spam' or 'abuse'.");
		}
	};

	const handleEdit = (comment: any) => {
		setEditingCommentId(comment.id);
		setCommentText(comment.comment);
		setTimeout(() => {
			commentInputRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
			commentInputRef.current?.focus();
		}, 200);
	};

	const handleReply = (comment: any) => {
		setReplyToId(comment.id);
		setCommentText("");
		setTimeout(() => {
			commentInputRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
			commentInputRef.current?.focus();
		}, 200);
	};

	const handleSubmit = () => {
		if (replyToId) {
			blogCommentMutation.mutate(
				{ comment: commentText, parent_id: replyToId },
				{
					onSuccess: () => {
						setCommentText("");
						setReplyToId("");
						getComment.refetch();
						getBlog.refetch();
					},
				},
			);
		} else if (editingCommentId) {
			console.log(editingCommentId);
			updateCommentMutation.mutate(
				{ comment: commentText },
				{
					onSuccess: () => {
						setCommentText("");
						setEditingCommentId("");
						getComment.refetch();
						getBlog.refetch();
					},
				},
			);
		} else {
			blogCommentMutation.mutate(
				{ comment: commentText },
				{
					onSuccess: () => {
						setCommentText("");
						getComment.refetch();
						getBlog.refetch();
					},
				},
			);
		}
	};

	return (
		<div>
			<h4 className="font-semibold mb-4">Comments</h4>

			<div className="space-y-4 mb-4 max-h-[400px] scrollbar-hide overflow-y-auto">
				{comments.length > 0 ? (
					comments.map((c: any) => (
						<div
							key={c.id}
							className="pb-2 border-b border-gray-100 last:border-0"
						>
							<div className="flex justify-between">
								{/* Left side */}
								<div className="flex w-full mb-2 items-center gap-2">
									<div className="w-10 h-10 rounded-full border border-gray-225 overflow-hidden">
										<Image
											src={c.author.image || DEFAULT_AVATAR}
											alt={c.name}
											width={40}
											height={40}
											className="object-cover w-full h-full"
										/>
									</div>
									<div className="flex items-start text-left flex-col text-gray-55">
										<p className="text-sm font-semibold">{c.author.name}</p>
										<p className="text-xs text-gray-55">
											{timeAgo(c?.created_at)}
										</p>
									</div>
								</div>

								<CommentMenu
									handleEdit={() => handleEdit(c)}
									handleReply={() => handleReply(c)}
									handleDelete={() => handleDelete(c.id)}
									handleFlag={() => handleFlag(c.id)}
								/>
							</div>
							<p className="text-sm text-gray-600">{c.comment}</p>

							<span
								onClick={() =>
									setOpenReplies(openReplies === c.id ? null : c.id)
								}
								className="ml-1 text-xs text-gray-55 font-medium cursor-pointer hover:underline"
							>
								{openReplies === c.id
									? "Hide comments"
									: c?.replies?.length < 1
										? ""
										: `${c?.replies?.length} comments`}
							</span>

							{openReplies === c.id && c.replies?.length > 0
								? c.replies.map((reply: any) => (
										<div key={reply.id} className="mt-2 ml-12 pb-2">
											<div className="flex justify-between">
												{/* Left side */}
												<div className="flex w-full mb-1 items-center gap-2">
													<div className="w-8 h-8 rounded-full border border-gray-225 overflow-hidden">
														<Image
															src={reply.author.image || DEFAULT_AVATAR}
															alt={reply.name}
															width={32}
															height={32}
															className="object-cover w-full h-full"
														/>
													</div>
													<div className="flex items-start text-left flex-col text-gray-55">
														<p className="text-sm font-semibold">
															{reply.author.name}
														</p>
														<p className="text-xs text-gray-55">
															{timeAgo(reply?.created_at)}
														</p>
													</div>
												</div>

												<CommentMenu
													handleEdit={() => handleEdit(reply)}
													handleReply={() => handleReply(c)}
													handleDelete={() => handleDelete(reply.id)}
													handleFlag={() => handleFlag(reply.id)}
												/>
											</div>
											<p className="text-sm text-gray-600">{reply.comment}</p>
										</div>
									))
								: null}
						</div>
					))
				) : (
					<p className="text-sm text-gray-500">No comments yet</p>
				)}
			</div>

			<div className="flex absolute bottom-0 w-full left-0 border-t border-gray-225 right-0">
				<textarea
					ref={commentInputRef}
					value={commentText}
					onChange={(e) => setCommentText(e.target.value)}
					className="flex-1 resize-none rounded-bl-xl outline-none px-3 py-3 text-sm"
					name="comment"
					placeholder="Write a comment..."
					id="comment"
					rows={1}
				></textarea>
				{/* Cancel button shows only when editing or replying */}
				{(editingCommentId || replyToId) && (
					<button
						onClick={handleCancel}
						className="ml-2 p-2 rounded-full hover:bg-gray-100"
						title="Cancel"
					>
						<X className="w-5 h-5 text-gray-500" />
					</button>
				)}
				<button
					style={{ backgroundImage: `url(${ButtonBg.src})` }}
					onClick={handleSubmit}
					className="px-3 py-2 bg-no-repeat bg-contain bg-primary-400 text-white rounded-xl"
				>
					<Send className="w-5 h-5" />
				</button>
			</div>
		</div>
	);
};

export default CommentSection;
