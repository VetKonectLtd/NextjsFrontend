"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { ForumChat } from "@/types";
import { useForumService } from "@/services/forumService";
import { Loader2 } from "lucide-react";
import { useAuthService } from "@/services/authService";
import { formatRole } from "@/components/shared/TimeFormat";
import { forumCategories } from "./forumCategories";

type ForumChatFormProps = {
	mode: "create" | "edit";
	chat?: ForumChat;
};

const ForumChatForm = ({ mode, chat }: ForumChatFormProps) => {
	const [preview, setPreview] = useState<string | null>(
		chat?.image_url || null,
	);
	const router = useRouter();
	const { useAddForum, useUpdateForum } = useForumService();
	const addForumMutation = useAddForum();
	const updateForumMutation = useUpdateForum(chat?.id || "");
	const { useCurrentUser } = useAuthService();
	const { data: user } = useCurrentUser(true);
	const [isCustom, setIsCustom] = useState(false);
	const currentUserRole = (user as any)?.role;

	const {
		register,
		control,
		handleSubmit,
		clearErrors,
		setValue,
		reset,
		formState: { errors },
	} = useForm<ForumChat>();

	useEffect(() => {
		if (mode === "edit" && chat) {
			reset({
				title: chat.title,
				visibility: chat.visibility,
				content: chat.content,
			});
			setPreview(chat.image_url || null);
		}
	}, [mode, chat, reset]);

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => setPreview(reader.result as string);
			reader.readAsDataURL(file);
			setValue("image", file, { shouldValidate: true });
		}
	};

	const handleRemoveImage = () => {
		setPreview(null);
		setValue("image", null);
	};

	const handleBack = () => router.back();

	const onSubmit = (data: ForumChat) => {
		const formData: any = new FormData();
		formData.append("title", data.title);
		formData.append("visibility", data.visibility);
		formData.append("category", data.category);
		formData.append("content", data.content);

		if (data.image instanceof File) formData.append("image", data.image);

		if (mode === "create") {
			addForumMutation.mutate(formData, {
				onSuccess: () => router.push(`/chat-forum`),
			});
		} else {
			updateForumMutation.mutate(formData, {
				onSuccess: () => router.push(`/chat-forum`),
			});
		}
	};

	return (
		<div className="max-w-7xl mx-auto px-3 md:px-5 pt-28 pb-20">
			<h2 className="text-sm pb-4">
				<span onClick={handleBack} className="font-bold cursor-pointer">
					Forum Chat
				</span>{" "}
				/ {mode === "create" ? "Add to Forum" : "Edit Forum Chat"}
			</h2>

			<div className="min-h-screen shadow-md border rounded-lg border-gray-225 bg-white">
				<div className="w-full px-6 mt-5 mx-auto">
					<h2 className="text-gray-55 text-base pb-5 font-bold">
						{mode === "create" ? "Add to Forum Chat" : "Edit Forum Chat"}
					</h2>

					<form className="space-y-2">
						{/* Visibility */}
						<Controller
							name="visibility"
							control={control}
							rules={{ required: "Please select visibility" }}
							render={({ field }) => (
								<Select
									onValueChange={field.onChange}
									defaultValue={chat?.visibility || ""}
								>
									<SelectTrigger className="border shadow-sm w-full rounded-md border-gray-225 p-4">
										<SelectValue placeholder="Visibility of the post" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="everyone">Everyone</SelectItem>
										{currentUserRole && (
											<SelectItem value={currentUserRole}>
												{formatRole(currentUserRole)}
											</SelectItem>
										)}
									</SelectContent>
								</Select>
							)}
						/>
						{errors.visibility && (
							<p className="text-red-500 text-xs">
								{errors.visibility.message}
							</p>
						)}

						<Controller
							name="category"
							control={control}
							rules={{ required: "Please select a Category" }}
							render={({ field }) => (
								<>
									<Select
										onValueChange={(value) => {
											field.onChange(value);

											if (value === "Others") {
												setIsCustom(true);
												setValue("category", ""); // clear previous value
											} else {
												setIsCustom(false);
											}
										}}
										defaultValue={chat?.category || ""}
									>
										<SelectTrigger className="border shadow-sm w-full rounded-md border-gray-225 p-4">
											<SelectValue placeholder="Select Category" />
										</SelectTrigger>

										<SelectContent>
											{forumCategories.map((category) => (
												<SelectItem key={category} value={category}>
													{category}
												</SelectItem>
											))}

											{/* Custom option */}
											<SelectItem value="Others">Others</SelectItem>
										</SelectContent>
									</Select>

									{/* Custom Input */}
									{isCustom && (
										<Input
											type="text"
											placeholder="Enter custom category"
											className="border shadow-sm w-full p-4 rounded-md border-gray-225 mt-2"
											{...register("category", {
												required: "Custom category is required",
											})}
										/>
									)}
								</>
							)}
						/>
						{errors.category && (
							<p className="text-red-500 text-xs">{errors.category.message}</p>
						)}

						{/* Title */}
						<Input
							type="text"
							placeholder="Title"
							defaultValue={chat?.title || ""}
							{...register("title", { required: "Title is required" })}
							className="border shadow-sm w-full p-4 rounded-md border-gray-225"
						/>
						{errors.title && (
							<p className="text-red-500 text-xs">{errors.title.message}</p>
						)}

						{/* Content */}
						<Textarea
							placeholder="Content"
							rows={10}
							defaultValue={chat?.content || ""}
							{...register("content", { required: "Content is required" })}
							className="border shadow-sm w-full p-4 rounded-md resize-none border-gray-225"
						/>
						{errors.content && (
							<p className="text-red-500 text-xs">{errors.content.message}</p>
						)}

						{/* Image Upload */}
						<div className="flex flex-col">
							{preview ? (
								<>
									<div className="w-full h-[100px] border-2 border-gray-225 rounded-md overflow-hidden mb-2 flex items-center justify-center">
										<Image
											src={preview}
											alt="Preview"
											width={200}
											height={150}
											className="object-cover w-full h-full"
										/>
									</div>
									<button
										type="button"
										onClick={handleRemoveImage}
										className="text-sm text-left text-gray-55 underline"
									>
										Remove Image
									</button>
								</>
							) : (
								<>
									<label
										htmlFor="chat-image-upload"
										className="w-full h-[100px] flex flex-col items-center bg-[#F1F1F1] justify-center border border-gray-55 rounded-md cursor-pointer mb-2"
									>
										<span className="text-gray-600 font-semibold text-sm">
											Add Image
										</span>
									</label>
									<input
										id="chat-image-upload"
										type="file"
										accept="image/*"
										{...register("image")}
										onChange={(e) => {
											handleImageUpload(e);
											clearErrors("image");
										}}
										className="hidden"
									/>
								</>
							)}
						</div>

						{/* Submit */}
						<div className="pt-8">
							<button
								type="submit"
								onClick={handleSubmit(onSubmit)}
								disabled={
									mode === "create"
										? addForumMutation.isLoading
										: updateForumMutation.isLoading
								}
								className="w-full py-3 mt-6 rounded-md text-white text-base font-semibold bg-primary-400 disabled:bg-[#666666] transition disabled:opacity-50 disabled:cursor-not-allowed mb-2 flex items-center justify-center gap-2"
							>
								{mode === "create" ? (
									addForumMutation.isLoading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
											Processing...
										</>
									) : (
										"Submit"
									)
								) : updateForumMutation.isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
										Updating...
									</>
								) : (
									"Update"
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ForumChatForm;
