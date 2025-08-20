"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import FormInput from "@/components/form/FormInput";
import PhoneInput from "@/components/form/PhoneInput";
import FormSelect from "@/components/form/FormSelect";
import { Country } from "country-state-city";
import { Controller, useForm } from "react-hook-form";
import TagInput from "@/components/form/TagInput";
import { useRouter } from "next/navigation";

export default function NewStorePage() {
	const [available, setAvailable] = useState(true);
	const [previews, setPreviews] = useState<string[]>([]);

	const { control, handleSubmit, register, setValue } = useForm();
	const router = useRouter();

	const countries = Country.getAllCountries().map((c) => ({
		value: c.isoCode,
		label: `${c.name}`,
	}));

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		const allowedFiles = files.slice(0, 3 - previews.length);

		allowedFiles.forEach((file) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviews((prev) => [...prev, reader.result as string]);
			};
			reader.readAsDataURL(file);
		});
	};

	const handleRemoveImage = (idx: number) => {
		setPreviews((prev) => prev.filter((_, i) => i !== idx));
	};

	const onSubmit = async (data: any) => {
		try {
			// const payload = {
			// 	...data,
			// 	available,
			// 	images: previews,
			// };

			// // Example API call (replace with your backend route)
			// const res = await fetch("/api/products", {
			// 	method: "POST",
			// 	headers: { "Content-Type": "application/json" },
			// 	body: JSON.stringify(payload),
			// });

			// if (!res.ok) throw new Error("Failed to create product");

			// const newProduct = await res.json();

			// Navigate to product details page with returned product ID
			router.push(`/dashboard/stores/1/products/1`);
		} catch (error) {
			console.error(error);
			alert("Something went wrong while creating product.");
		}
	};

	return (
		<div className="min-h-screen w-11/12 mt-3 m-auto shadow-md border rounded-lg border-gray-225 bg-white">
			<Link
				href="/dashboard/stores/1/products"
				className="flex items-center text-sm text-gray-55 hover:text-green-50 ml-4 mt-4"
			>
				<span className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-1 mr-3">
					<ChevronLeft className="w-5 h-5" />
				</span>{" "}
				Back
			</Link>

			<div className="max-w-xs mt-5 mx-auto">
				<h1 className="text-3xl font-bold text-gray-55 text-center">
					Product Details
				</h1>
				<p className="text-gray-500 text-sm w-1/2 m-auto text-center mb-6">
					You can add a new Item to your product list
				</p>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
					<FormInput
						label="Product Title"
						type="text"
						focusLabel="Product Title:"
						isRequired
					/>

					<FormInput
						label="Product Category"
						type="text"
						focusLabel="Product Category:"
						isRequired
					/>

					<FormInput
						label="Product Description"
						type="text"
						focusLabel="Product Description:"
						isRequired
					/>

					<TagInput
						label="Product Tags"
						focusLabel="Product Tags:"
						isRequired
					/>

					<Controller
						name="country"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<FormSelect
								label="Country"
								focusLabel="Country (Required) :"
								isRequired
								searchable
								options={countries}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>

					<FormInput
						label="Price in US Dollars"
						type="number"
						focusLabel="Price in US Dollars:"
						isRequired
					/>

					<div className="flex w-11/12 m-auto items-center py-5 justify-between">
						<span className="text-sm font-medium text-gray-700">
							Availability Status - {available ? "Open" : "Closed"}
						</span>
						<button
							type="button"
							onClick={() => setAvailable(!available)}
							className={`w-9 h-4 p-1 flex items-center border border-primary-400 rounded-full transition ${
								available ? "bg-white" : "bg-white"
							}`}
						>
							<span
								className={`w-3 h-3 bg-primary-400 rounded-full shadow transform transition ${
									available ? "translate-x-4" : "translate-x-0"
								}`}
							/>
						</button>
					</div>

					<FormInput
						label="Available Units"
						type="number"
						focusLabel="Available Units:"
						isRequired
					/>

					<div className="flex flex-col">
						{previews.length > 0 ? (
							<>
								<div className="w-full h-[150px] border-2 border-gray-200 rounded-md overflow-hidden mb-2 flex items-center justify-center">
									<Image
										src={previews[0]}
										alt="Preview"
										width={200}
										height={150}
										className="object-cover w-full h-full"
									/>
								</div>
								{/* Thumbnails */}
								<div className="flex gap-3">
									{previews.map((img, idx) => (
										<div key={idx} className="flex flex-col items-center">
											<div className="w-[100px] h-[70px] border-2 border-gray-200 rounded-md overflow-hidden flex items-center justify-center mb-1">
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
												className="text-xs text-gray-55 underline"
											>
												Remove Image
											</button>
										</div>
									))}
								</div>
							</>
						) : (
							<>
								<label
									htmlFor="store-image-upload"
									className="w-full h-[150px] flex flex-col items-center justify-center border border-gray-55 rounded-md cursor-pointer mb-2"
								>
									<span className="text-gray-400 text-sm">
										Click to upload images
									</span>
								</label>
								<input
									id="store-image-upload"
									type="file"
									accept="image/*"
									multiple
									onChange={handleImageUpload}
									className="hidden"
								/>
							</>
						)}
					</div>
					<div className=" pt-8">
						<button
							type="button"
							onClick={() => router.push(`/dashboard/stores/1/products/1`)}
							className="w-full py-3 rounded-md text-white text-base font-semibold bg-primary-400 disabled:bg-[#666666] transition disabled:opacity-50 disabled:cursor-not-allowed mb-2"
						>
							Add
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
