"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const NewChatPage = () => {
	const [preview, setPreview] = useState<string | null>(null);
	const router = useRouter();

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveImage = () => {
		setPreview(null);
	};

	const handleBack = () => {
		router.back();
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
						<Select>
							<SelectTrigger className="border outline-none shadow-sm w-full rounded-md border-gray-225 p-4 text-sm font-normal py-5">
								<SelectValue placeholder="Visibility of the post" />
							</SelectTrigger>

							<SelectContent>
								<SelectItem value="Everyone">Everyone</SelectItem>
								<SelectItem value="Veterinary Doctors">
									Veterinary Doctors
								</SelectItem>
								<SelectItem value="Veterinary Paraprofessional">
									Veterinary Paraprofessional
								</SelectItem>
								<SelectItem value="Petowner/Livestock farmer">
									Petowner/Livestock farmer
								</SelectItem>
								<SelectItem value="Veterinary Clinic">
									Veterinary Clinic
								</SelectItem>
								<SelectItem value="Vendor">Vendor</SelectItem>
								<SelectItem value="Students">Students</SelectItem>
							</SelectContent>
						</Select>

						<Input
							type="text"
							placeholder="Title"
							className="border outline-none shadow-sm w-full p-4 text-sm font-normal py-5 rounded-md border-gray-225"
						/>

						<Textarea
							className="border outline-none shadow-sm w-full p-4  text-sm font-normal py-3 mb-3 rounded-md resize-none border-gray-225"
							placeholder="content"
							id="content"
							rows={10}
						/>

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
										onChange={handleImageUpload}
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
								className="w-full py-3 rounded-md text-white text-base font-semibold bg-primary-400 disabled:bg-[#666666] transition disabled:opacity-50 disabled:cursor-not-allowed mb-2"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default NewChatPage;
