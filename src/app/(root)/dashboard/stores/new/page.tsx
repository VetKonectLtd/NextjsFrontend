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

export default function NewStorePage() {
	const [available, setAvailable] = useState(true);
	const [preview, setPreview] = useState<string | null>(null);

	const { control, getValues, setValue } = useForm();

	const countries = Country.getAllCountries().map((c) => ({
		value: c.isoCode,
		label: `${c.name}`,
	}));

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

	return (
		<div className="min-h-screen w-11/12 mt-3 m-auto shadow-md border rounded-lg border-gray-225 bg-white">
			<Link
				href="/dashboard/stores"
				className="flex items-center text-sm text-gray-55 hover:text-green-50 ml-4 mt-4"
			>
				<span className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-1 mr-3">
					<ChevronLeft className="w-5 h-5" />
				</span>{" "}
				Back
			</Link>

			<div className="max-w-xs mt-5 mx-auto">
				<h1 className="text-3xl font-bold text-gray-55 text-center">
					Store Details
				</h1>
				<p className="text-gray-500 text-sm w-1/2 m-auto text-center mb-6">
					You can add a new store to your store list
				</p>

				<form className="space-y-1">
					<FormInput
						label="Store Name"
						type="text"
						focusLabel="Store Name:"
						isRequired
					/>

					<FormInput
						label="Email"
						type="email"
						focusLabel="Email (Required):"
						isRequired
					/>
					<Controller
						name="phone"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<PhoneInput
								label="Phone Number."
								isRequired
								focusLabel="Phone Number (Optional)"
								value={field.value || ""}
								countryCode={getValues("countryCode")}
								onChange={({ phone, countryCode }) => {
									field.onChange(phone);
									setValue("countryCode", countryCode);
								}}
							/>
						)}
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

					{/* Image Upload */}
					<div className="flex flex-col">
						{preview ? (
							<>
								<div className="w-full h-[150px] border-2 border-gray-200 rounded-md overflow-hidden mb-2 cursor-pointer flex items-center justify-center">
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
									className="w-full h-[150px] flex flex-col items-center justify-center border border-gray-55 rounded-md cursor-pointer mb-2"
								>
									<span className="text-gray-400 text-sm">
										Click to upload image
									</span>
								</label>
								<input
									id="store-image-upload"
									type="file"
									accept="image/*"
									onChange={handleImageUpload}
									className="hidden"
								/>
							</>
						)}
					</div>
					<div className=" pt-8">
						<button
							type="button"
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
