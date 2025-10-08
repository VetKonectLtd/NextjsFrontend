"use client";

import { useState } from "react";
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

const NewChatPage = () => {
	const [preview, setPreview] = useState<string | null>(null);
	const router = useRouter();
	const { useAddForum } = useForumService();
	const addForumMutation = useAddForum();

	const {
		register,
		control,
		handleSubmit,
		clearErrors,
		setValue,
		formState: { errors },
	} = useForm<ForumChat>();

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64 = reader.result as string;
				setPreview(base64);
			};
			reader.readAsDataURL(file);
			setValue("image", file, { shouldValidate: true });
		}
	};

	const handleRemoveImage = () => {
		setPreview(null);
	};

	const handleBack = () => {
		router.back();
	};

	const onSubmit = (data: ForumChat) => {
		const formData: any = new FormData();
		formData.append("title", data.title);
		formData.append("visibility", data.visibility);
		formData.append("content", data.content);

		if (data.image instanceof File) {
			formData.append("image", data.image);
		}

		addForumMutation.mutate(formData, {
			onSuccess: () => {
				router.push(`/dashboard/chat-forum`);
			},
		});
	};

	return (
		<div className="w-11/12 mt-3 m-auto">
			<h2 className="text-sm pb-4">
				<span onClick={handleBack} className="font-bold cursor-pointer">
					Forum Chat{" "}
				</span>{" "}
				/ Add to Forum
			</h2>

			<div className="min-h-screen  shadow-md border rounded-lg border-gray-225 bg-white">
				<div className="w-full px-6 mt-5 mx-auto">
					<h2 className="text-gray-55 text-base pb-5 font-bold">
						Add to Forum Chat
					</h2>

					<form className="space-y-2">
						<Controller
							name="visibility"
							control={control}
							rules={{ required: "Please select visibility" }}
							render={({ field }) => (
								<Select onValueChange={field.onChange}>
									<SelectTrigger className="border shadow-sm w-full rounded-md border-gray-225 p-4">
										<SelectValue placeholder="Visibility of the post" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="everyone">Everyone</SelectItem>
										<SelectItem value="veterinary_doctors">
											Veterinary Doctors
										</SelectItem>
										<SelectItem value="veterinary_paraprofessional">
											Veterinary Paraprofessional
										</SelectItem>
										<SelectItem value="pet_owner">
											Petowner
										</SelectItem>
										<SelectItem value="livestock_farmer">
											Livestock farmer
										</SelectItem>
										<SelectItem value="veterinary_clinics">
											Veterinary Clinic
										</SelectItem>
										<SelectItem value="vendor">Vendor</SelectItem>
										<SelectItem value="others">Others</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.visibility && (
							<p className="text-red-500 text-xs">
								{errors.visibility.message}
							</p>
						)}

						<Input
							type="text"
							placeholder="Title"
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
									<div className="w-full h-[100px] border-2 border-gray-225 rounded-md overflow-hidden mb-2 cursor-pointer flex items-center justify-center">
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
										htmlFor="store-image-upload"
										className="w-full h-[100px] flex flex-col items-center bg-[#F1F1F1] justify-center border border-gray-55 rounded-md cursor-pointer mb-2"
									>
										<span className="text-gray-600 font-semibold text-sm">
											Add Image
										</span>
									</label>
									<input
										id="store-image-upload"
										type="file"
										accept="image/*"
										{...register("image", {
											required: "Image is required",
										})}
										onChange={(e) => {
											handleImageUpload(e);
											clearErrors("image");
										}}
										className="hidden"
									/>

									<button
										type="button"
										className="text-sm text-left text-gray-55 underline"
									>
										No image added yet
									</button>
								</>
							)}
						</div>
						<div className=" pt-8">
							<button
								type="submit"
								onClick={handleSubmit(onSubmit)}
								disabled={addForumMutation.isLoading}
								className="w-full py-3 mt-6 rounded-md text-white text-base font-semibold bg-primary-400 disabled:bg-[#666666] transition disabled:opacity-50 disabled:cursor-not-allowed mb-2 flex items-center justify-center gap-2"
							>
								{addForumMutation.isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
										Processing...
									</>
								) : (
									"Submit"
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default NewChatPage;
