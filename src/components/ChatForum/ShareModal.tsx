"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useForumService } from "@/services/forumService";
import { Copy, Share2 , Facebook} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { XIcon } from "@/app/assets/icons";
import { useBlogService } from "@/services/blogServie";

interface ShareModalProps {
	open: boolean;
	setOpen: (v: boolean) => void;
	link: string;
	id: string;
	mode?: "chat-forum" | "blog";
}

export default function ShareModal({
	open,
	setOpen,
	link,
	id,
	mode
}: ShareModalProps) {
	const [copied, setCopied] = useState(false);
	const { useGetShareForum } = useForumService();
	const {
			useGetShareBlog,
		} = useBlogService();

	const {refetch: increaseShareforChat} = useGetShareForum(false, id);
	const {refetch: increaseShareforBlog} = useGetShareBlog(false, id);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(link);
		if (mode === "chat-forum") {
			increaseShareforChat();
			
		}else if (mode === "blog") {
			increaseShareforBlog();
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-md rounded-xl">
				<DialogHeader>
					<DialogTitle className="text-gray-800">Share Post</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col gap-4">
					{/* Link Box */}
					<div className="bg-gray-100 px-3 py-2 rounded-lg flex items-center justify-between border">
						<span className="text-sm text-gray-700 text-ellipsis">{link}</span>
						<button
							onClick={handleCopy}
							className="p-2 rounded-lg hover:bg-gray-200 transition"
						>
							<Copy size={16} />
						</button>
					</div>

					{/* Share Buttons */}
					<div className="grid grid-cols-3 gap-4">
						<Link
							href={`https://wa.me/?text=${encodeURIComponent(link)}`}
							target="_blank"
							onClick={() => { if (mode === "chat-forum") increaseShareforChat(); else increaseShareforBlog(); }}
							className="flex flex-col items-center gap-1"
						>
							<div className="bg-green-500 text-white p-3 rounded-full">
								<Share2 size={18} />
							</div>
							<span className="text-xs">WhatsApp</span>
						</Link>

						<Link
							href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
								link,
							)}`}
							target="_blank"
							onClick={() => { if (mode === "chat-forum") increaseShareforChat(); else increaseShareforBlog(); }}
							className="flex flex-col items-center gap-1"
						>
							<div className="bg-blue-600 text-white p-3 rounded-full">
								<Facebook size="18" />
							</div>
							<span className="text-xs">Facebook</span>
						</Link>

						<Link
							href={`https://x.com/intent/tweet?url=${encodeURIComponent(
								link,
							)}`}
							target="_blank"
							onClick={() => { if (mode === "chat-forum") increaseShareforChat(); else increaseShareforBlog(); }}
							className="flex flex-col items-center gap-1"
						>
							<div className="border border-black text-white p-3 rounded-full">
								<Image
									src={XIcon}
									alt={"facebook"}
									width={16}
									height={16}
									className="w-4 h-4"
								/>
							</div>
							<span className="text-xs">Twitter</span>
						</Link>
					</div>

					{copied && (
						<p className="text-green-600 text-sm text-center">
							Copied to clipboard!
						</p>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
