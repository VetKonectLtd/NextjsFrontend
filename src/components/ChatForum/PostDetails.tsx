"use client";

import { MessagesSquare, ThumbsUp, Share2, Send, Delete, Edit, Trash } from "lucide-react";
import Image from "next/image";

interface PostDetailProps {
	post: any;
	onClose: () => void;
}

const PostDetail = ({ post, onClose }: PostDetailProps) => {
	return (
		<div className="px-5">
			<div className="flex gap-3 text-sm text-gray-55 mb-5">
				<button onClick={onClose} className="font-bold">
					Forum Chat{" "}
				</button>
				/ <span>Comments</span>
			</div>

			<div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
				{/* Header */}
				<div className="flex items-center mb-4">
					<div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 mr-3">
						<Image
							src={post.avatar}
							alt={post.author}
							width={40}
							height={40}
							className="object-cover w-full h-full"
						/>
					</div>
					<div>
						<h3 className="font-semibold text-gray-800">{post.author}</h3>
						<p className="text-sm text-gray-500">{post.role}</p>
					</div>
					<span className="ml-auto text-xs px-3 py-1 border border-gray-200 rounded-full bg-gray-100 text-gray-600">
						{post.time}
					</span>
				</div>

				{/* Post Body */}
				<div className="bg-primary-400 h-40 mb-4"></div>
				<h4 className="font-semibold text-gray-800 text-lg">{post.title}</h4>
				<p className="text-gray-600 text-sm mb-4">{post.content}</p>

				{/* Actions */}
				<div className="flex md:justify-end justify-start gap-4 items-center text-sm mb-6">
					<div className="flex items-center">
						<span className="bg-white border hover:border-gray-55 border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
							<MessagesSquare size={14} color="#1D2432" />
						</span>
						<span className="ml-3 text-sm text-gray-55 font-medium">
							{post.comments.length} Comments
						</span>
					</div>
					<div className="flex items-center">
						<span className="bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
							<ThumbsUp size={14} color="#1D2432" />
						</span>
						<span className="ml-3 text-sm text-gray-55 font-medium">
							{post.likes} Likes
						</span>
					</div>
					<span className="bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
						<Share2 size={14} color="#1D2432" />
					</span>
				</div>

				{/* Comments Section */}
				<h5 className="font-semibold text-sm text-gray-55 mb-3">
					{post.comments.length} Comments
				</h5>

				<div className="space-y-3">
					{post.comments.map((comment: any) => (
						<div
							key={comment.id}
							className="flex flex-col items-start gap-3 bg-[#F1F1F1] p-3 rounded-lg"
						>
							<div className="flex w-full items-center justify-between">
								<div className="flex gap-4 items-center">
									<div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
										<Image
											src={comment.avatar}
											alt={comment.author}
											width={40}
											height={40}
											className="object-cover w-full h-full"
										/>
									</div>
									<div className="">
										<p className="font-semibold text-gray-55">
											{comment.author}
										</p>
										<p className="text-xs text-gray-55">{comment.role}</p>
									</div>
								</div>
								<p className="text-xs px-3 py-1 border border-gray-225 bg-gray-100 rounded-full text-gray-500 mt-1">
									{comment.time}
								</p>
							</div>
							<div className="flex-1">
								<p className="text-sm text-gray-55 mt-1">{comment.text}</p>
							</div>
                            
							{/* Actions */}
							<div className="flex w-full md:justify-end justify-start gap-4 items-center text-sm my-3 md:my-6">
								<div className="flex items-center">
									<span className="bg-white border hover:border-gray-55 border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
										<MessagesSquare size={14} color="#1D2432" />
									</span>
									<span className="ml-3 text-sm text-gray-55 font-medium">
										{comment.length} Replies
									</span>
								</div>
								<div className="flex items-center">
									<span className="bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
										<Edit size={14} color="#1D2432" />
									</span>
								</div>
								<span className="bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
									<Trash size={14} color="#1D2432" />
								</span>
							</div>
						</div>
					))}
				</div>

				{/* Add Comment */}
				<div className="flex flex-col items-center gap-3 mt-4">
                    <textarea
							className="border outline-none shadow-md w-full p-4  text-sm font-normal py-3 rounded-md resize-none border-gray-225"
							name="comment"
                            placeholder="comment"
							id="comment"
							rows={7}
						></textarea>
					<button className="bg-primary-400 w-full text-center text-sm text-white px-4 py-2 rounded-lg flex justify-center items-center gap-2">
						<span>Comment</span>
						<Send size={14} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default PostDetail;
