"use client";
import { useState} from "react";
import Image from "next/image";
import { Smile, Link as LinkIcon, Send, X } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { directMessageService } from "@/services/directMessageService";
import { useForm } from "react-hook-form";
import { MessageFormData } from "@/types";
import { resolveProfileImageSrc } from "../shared/VetProfile";
import Avatar from "react-avatar";


const ChatBox = ({ selectedVet }: any) => {
	const [showEmoji, setShowEmoji] = useState(false);
	const [previews, setPreviews] = useState<string[]>([]);
	const { useSendMessage } = directMessageService();
	const sendMessageMutation = useSendMessage();


	const { register, handleSubmit, getValues, setValue } =
		useForm<MessageFormData>();

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		const allowedFiles = files;

		allowedFiles.forEach((file) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviews((prev) => [...prev, reader.result as string]);
			};
			reader.readAsDataURL(file);
		});
		setValue("images", [...allowedFiles], {
			shouldValidate: true,
		});
	};

	const handleRemoveImage = (idx: number) => {
		setPreviews((prev) => prev.filter((_, i) => i !== idx));

		const existingImages = getValues("images") || [];
		const updatedImages = existingImages.filter((_, i) => i !== idx);
		setValue("images", updatedImages, { shouldValidate: true });
	};

	// handle emoji select
	const handleEmojiSelect = (emoji: any) => {
		const currentContent = getValues("content") || "";
		setValue("content", currentContent + emoji.native);
		setShowEmoji(false);
	};

	const handleSend = (data: any) => {
		if (!data.content && !data.images) return;

		const formData: any = new FormData();
		formData.append("content", data.content);
		formData.append("receiver_id", selectedVet?.userId);

		data.images?.forEach((file: any) => formData.append("images[]", file));

		sendMessageMutation.mutate(formData, {
			onSuccess: () => {
				setValue("content", "");
				setValue("images", []);
				setPreviews([]);
			},
		});
	};

	const profileImageSrc = resolveProfileImageSrc(selectedVet?.image);

	return (
		<div className="w-full border rounded-lg shadow-md bg-white relative">
			{/* Header */}
			<div className="flex justify-between border-b p-2">
				<div className="flex w-full items-center gap-2">
					<div className="w-7 h-7 rounded-full border border-gray-225 overflow-hidden">
						{profileImageSrc ? (
							<Image
								src={profileImageSrc}
								alt={selectedVet?.name || "Vet"}
								width={40}
								height={40}
								className="object-cover w-full h-full"
							/>
						) : (
							<Avatar
								name={selectedVet?.name || "Vet"}
								size="30"
								maxInitials={2}
								round
							/>
						)}
					</div>
					<div className="flex items-start text-left flex-col text-gray-55">
						<p className="text-sm font-semibold">Dr. {selectedVet?.name}</p>
						<p className="text-xs">{selectedVet.role}</p>
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

					<label
						htmlFor="chatImage"
						className="p-2 shadow-sm border border-gray-225 hover:bg-gray-100 rounded-full"
					>
						<LinkIcon size={16} />
					</label>

					{/* hidden file input */}
					<input
						id="chatImage"
						type="file"
						accept="image/*"
						multiple
						onChange={(e) => handleImageUpload(e)}
						className="hidden"
					/>
				</div>
			</div>

			{/* Textarea */}
			<div>
				<textarea
					className="w-full resize-none min-h-[140px] border-none p-2 text-sm outline-none"
					rows={3}
					placeholder="What are we discussing?"
					{...register("content")}
				/>
			</div>

			{/* Emoji Picker */}
			{showEmoji && (
				<div className="absolute bottom-16 left-2 z-50">
					<Picker data={data} onEmojiSelect={handleEmojiSelect} />
				</div>
			)}

			{/* Image preview */}
			<div className="flex gap-2 overflow-x-auto  scrollbar-hide">
				{previews.map((img, idx) => (
					<div
						key={idx}
						className="relative flex items-center w-fit  my-4 md:my-2"
					>
						<div className="w-[80px] h-[50px] border-2 border-gray-200 rounded-md overflow-hidden flex items-center justify-center mb-1">
							<Image
								src={img}
								alt={`Preview ${idx + 1}`}
								width={100}
								height={70}
								className="object-cover w-full h-full"
							/>
						</div>
						<button
							type="button"
							onClick={() => handleRemoveImage(idx)}
							className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full md:w-6 w-4 h-4 md:h-6 flex items-center justify-center"
						>
							✕
						</button>
					</div>
				))}
			</div>

			<button
				onClick={handleSubmit(handleSend)}
				className="flex font-medium px-3 py-2 justify-center items-center text-center w-full bg-primary-400 text-white rounded-b-lg disabled:bg-[#555555]"
			>
				Send <Send className="ml-3" size={14} />
			</button>
		</div>
	);
};

export default ChatBox;
