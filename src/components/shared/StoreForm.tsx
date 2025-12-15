"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, Loader2 } from "lucide-react";
import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import { Country } from "country-state-city";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Store } from "@/types";
import { useStoreService } from "@/services/storeService";
import { useAuthService } from "@/services/authService";
import { useGeolocation } from "@/lib/hooks/useGeolocation";
import FormGooglePlacesInput from "../form/FormGooglePlacesInput";

type StoreFormProps = {
	mode: "create" | "edit";
	store?: Store;
};

export default function SoreForm({ mode, store }: StoreFormProps) {
	const [available, setAvailable] = useState(false);
	const [preview, setPreview] = useState<string | null>(null);
	const router = useRouter();
	const { useAddStore, useUpdateStore } = useStoreService();
	const { useCurrentUser } = useAuthService();
	const addStoreMutation = useAddStore();
	const user = useCurrentUser(true);
	const { coordinates } = useGeolocation();

	const updateStoreMutation = useUpdateStore(
		(store as Record<string, any>)?.store?.id,
	);

	const {
		control,
		register,
		handleSubmit,
		setValue,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm<Store>();

	const [selectedLocation, setSelectedLocation] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);

	console.log("Selected Location:", selectedLocation);

	useEffect(() => {
		if (store) {
			reset(
				{
					store_name: (store as Record<string, any>)?.store.store_name,
					email: (store as Record<string, any>).store.email,
					phone_number: (store as Record<string, any>).store.phone_number,
					latitude: (store as Record<string, any>).store.latitude,
					location: (store as Record<string, any>).store.location,
					longitude: (store as Record<string, any>).store.longitude,
					role: (store as Record<string, any>).store.role,
					availability: (store as Record<string, any>).store.availability,
					picture: null,
				},
				{ keepDirty: true },
			);

			setPreview((store as Record<string, any>).store.picture_url ?? null);
		}
	}, [store, reset]);

	const watchedCountryCode = useWatch({
		control,
		name: "country",
	});

	useEffect(() => {
		setValue("latitude", selectedLocation?.latitude.toString());
		setValue("longitude", selectedLocation?.longitude.toString());

		setValue("user_id", (user as Record<string, any>).data?.profile?.user_id);
		setValue("role", (user as Record<string, any>).data?.role);
	}, [setValue, user]);

	const countries = Country.getAllCountries().map((c) => ({
		value: c.isoCode,
		label: `${c.name}`,
	}));

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64 = reader.result as string;
				setPreview(base64);
			};
			reader.readAsDataURL(file);
			setValue("picture", file, { shouldValidate: true });
		}
	};

	const handleRemoveImage = () => {
		setPreview(null);
	};

	const handleBack = () => {
		router.back();
	};

	const onSubmit = (data: Store) => {
		const formData: any = new FormData();
		formData.append("store_name", data.store_name);
		formData.append("user_id", data.user_id);
		formData.append("latitude", data.latitude);
		formData.append("longitude", data.longitude);
		formData.append("email", data.email);
		formData.append("phone_number", data.phone_number);
		formData.append("role", data.role);
		formData.append("availability", available);
		formData.append("location", data.location);

		if (data.picture instanceof File) {
			formData.append("picture", data.picture);
		}

		if (mode === "create") {
			addStoreMutation.mutate(formData, {
				onSuccess: (response: any) => {
					const storeId = response?.store?.id;
					router.push(`/dashboard/stores/${storeId}`);
				},
			});
		} else if (mode === "edit" && (store as Record<string, any>)?.store.id) {
			updateStoreMutation.mutate(formData, {
				onSuccess: (response: any) => {
					const storeId = response?.store?.id;
					router.push(`/dashboard/stores/${storeId}`);
				},
			});
		}
	};

	return (
		<div className="w-11/12 mt-3 m-auto shadow-md border rounded-lg border-gray-225 bg-white">
			<div
				onClick={handleBack}
				className="flex items-center text-sm text-gray-55 hover:text-green-50 ml-4 mt-4"
			>
				<span className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-1 mr-3">
					<ChevronLeft className="w-5 h-5" />
				</span>{" "}
				Back
			</div>

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
						{...register("store_name", { required: "Store name is required" })}
						error={errors.store_name?.message}
					/>

					<FormInput
						label="Email"
						type="email"
						focusLabel="Email (Required):"
						isRequired
						{...register("email", {
							required: "Email is required",
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Invalid email address",
							},
						})}
						error={errors.email?.message}
					/>

					<FormInput
						label="Phone Number"
						type="number"
						focusLabel="Phone Number (Required):"
						isRequired
						{...register("phone_number", {
							required: "Phone number is required",
						})}
						error={errors.phone_number?.message}
					/>

					{errors.phone_number && (
						<p className="text-red-500 text-xs">
							{errors.phone_number?.message}
						</p>
					)}

					<FormGooglePlacesInput
						name="location"
						control={control}
						label="Location"
						focusLabel="Location (Required):"
						isRequired
						error={errors.location?.message}
						onLocationSelect={(loc: any) => setSelectedLocation(loc)}
					/>

					<div className="flex w-11/12 m-auto items-center py-5 justify-between">
						<span className="text-sm font-medium text-gray-700">
							Availability Status - {available ? "Open" : "Closed"}
						</span>
						<button
							type="button"
							onClick={() => setAvailable((prev) => !prev)}
							className="w-9 h-4 p-1 flex items-center border border-primary-400 rounded-full transition"
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
								<div className="relative w-full h-[150px] border-2 border-gray-200 rounded-md overflow-hidden mb-2 cursor-pointer">
									<Image
										src={preview}
										alt="Preview"
										fill
										className="object-cover"
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
									{...register("picture", {
										required: "Image is required",
									})}
									onChange={(e) => {
										handleImageUpload(e);
										clearErrors("picture");
									}}
									className="hidden"
								/>
							</>
						)}
						{errors.picture?.message && (
							<p className="text-red-500 text-sm mt-1">
								{errors.picture?.message}
							</p>
						)}
					</div>

					<div className=" pt-8">
						<button
							type="submit"
							onClick={handleSubmit(onSubmit)}
							disabled={
								mode === "create"
									? addStoreMutation.isLoading
									: updateStoreMutation.isLoading
							}
							className="w-full py-3 mt-6 rounded-md text-white text-base font-semibold bg-primary-400 disabled:bg-[#666666] transition disabled:opacity-50 disabled:cursor-not-allowed mb-2 flex items-center justify-center gap-2"
						>
							{mode === "create" ? (
								addStoreMutation.isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
										Processing...
									</>
								) : (
									"Add"
								)
							) : updateStoreMutation.isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
								</>
							) : (
								"Update"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
