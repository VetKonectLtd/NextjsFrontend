"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { Smile, Link as LinkIcon, Send, X } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const ChatBox = ({ selectedClinic }: any) => {
	const [text, setText] = useState("");
	const [image, setImage] = useState<string | null>(null);
	const [showEmoji, setShowEmoji] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// handle image selection
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	// handle emoji select
	const handleEmojiSelect = (emoji: any) => {
		setText((prev) => prev + emoji.native);
		setShowEmoji(false);
	};

	// simulate sending
	const handleSend = () => {
		console.log("Sending post:", { text, image });
		setText("");
		setImage(null);
	};

	return (
		<div className="w-full border rounded-lg shadow-md bg-white relative">
			{/* Header */}
			<div className="flex justify-between border-b p-2">
				<div className="flex w-full items-center gap-2">
					<div className="w-7 h-7 rounded-full border border-gray-225 overflow-hidden">
						<Image
							src={selectedClinic?.image || "/default-vet.png"}
							alt={selectedClinic?.name || "Vet"}
							width={40}
							height={40}
							className="object-cover w-full h-full"
						/>
					</div>
					<div className="flex items-start text-left flex-col text-gray-55">
						<p className="text-sm font-semibold">{selectedClinic?.name}</p>
						<p className="text-xs">{selectedClinic?.role}</p>
					</div>
				</div>

				{/* Emoji & Image buttons */}
				<div className="flex items-center gap-2">
					<button
						onClick={() => setShowEmoji((prev) => !prev)}
						className="p-2 shadow-sm border border-gray-225 hover:bg-gray-100 rounded-full relative"
					>
						<Smile size={16} />
					</button>

					<button
						onClick={() => fileInputRef.current?.click()}
						className="p-2 shadow-sm border border-gray-225 hover:bg-gray-100 rounded-full"
					>
						<LinkIcon size={16} />
					</button>

					{/* hidden file input */}
					<input
						type="file"
						ref={fileInputRef}
						accept="image/*"
						className="hidden"
						onChange={handleImageChange}
					/>
				</div>
			</div>

			{/* Textarea */}
			<div>
				<textarea
					className="w-full resize-none min-h-[140px] border-none p-2 text-sm outline-none"
					rows={3}
					placeholder="What are we discussing?"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
			</div>

			{/* Emoji Picker */}
			{showEmoji && (
				<div className="absolute bottom-16 left-2 z-50">
					<Picker data={data} onEmojiSelect={handleEmojiSelect} />
				</div>
			)}

			{/* Image preview */}
			{image && (
				<div className="bg-gray-225 w-ful relative p-1">
					<Image
						src={image}
						alt="Preview"
						width={56}
						height={56}
						className="max-h-14 w-14 rounded-lg object-cover"
					/>
					<button
						onClick={() => setImage(null)}
						className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
					>
						<X size={12} />
					</button>
				</div>
			)}

			<button
				onClick={handleSend}
				disabled={!text && !image}
				className="flex font-medium px-3 py-2 justify-center items-center text-center w-full bg-primary-400 text-white rounded-b-lg disabled:bg-[#555555]"
			>
				Send <Send className="ml-3" size={14} />
			</button>
		</div>
	);
};

export default ChatBox;
