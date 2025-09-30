"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, Loader2 } from "lucide-react";
import FormInput from "@/components/form/FormInput";
import { useRouter } from "next/navigation";
import FormSelect from "@/components/form/FormSelect";
import { LiveStock } from "@/types";
import { useLiveStockService } from "@/services/liveStockService";
import { Controller, useForm } from "react-hook-form";

type LiveStockFormProps = {
	mode: "create" | "edit";
	liveStock?: LiveStock;
};

const LiveStockForm = ({ mode, liveStock }: LiveStockFormProps) => {
	const [preview, setPreview] = useState<string | null>(null);
	const router = useRouter();
	const { useAddLiveStock, useUpdateLiveStock } = useLiveStockService();
	const addLiveStockMutation = useAddLiveStock();
	const updateLiveStockMutation = useUpdateLiveStock(
		(liveStock as Record<string, any>)?.farm.id,
	);

	const {
		register,
		control,
		formState: { errors },
		clearErrors,
		handleSubmit,
		setValue,
		reset,
	} = useForm<LiveStock>();

	useEffect(() => {
		if (liveStock) {
			reset({
				farm_name: (liveStock as Record<string, any>)?.farm.farm_name,
				no_of_livestock: (liveStock as Record<string, any>).farm
					.no_of_livestock,
				livestock_type: (liveStock as Record<string, any>).farm.livestock_type,
				no_of_worker: (liveStock as Record<string, any>).farm.no_of_worker,
				description: (liveStock as Record<string, any>).farm.description,
				age: (liveStock as Record<string, any>).farm.age,
				location: (liveStock as Record<string, any>).farm.location,
				sex: (liveStock as Record<string, any>).farm.sex,
				picture: null,
			});

			setPreview((liveStock as Record<string, any>).farm.picture_url ?? null);
		}
	}, [liveStock, reset]);

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

	const onSubmit = async (data: LiveStock) => {
		const formData: any = new FormData();
		formData.append("farm_name", data.farm_name);
		formData.append("location", data.location);
		formData.append("no_of_worker", data.no_of_worker);
		formData.append("age", data.age.toString());
		formData.append("livestock_type", data.livestock_type);
		formData.append("no_of_livestock", data.no_of_livestock.toString());
		formData.append("description", data.description);
		formData.append("sex", data.sex);

		if (data.picture instanceof File) {
			formData.append("picture", data.picture);
		}

		if (mode === "create") {
			addLiveStockMutation.mutate(formData, {
				onSuccess: () => {
					router.push("/dashboard/livestock");
				},
			});
		} else if (mode === "edit" && (liveStock as Record<string, any>).farm?.id) {
			updateLiveStockMutation.mutate(formData, {
				onSuccess: () => {
					router.push("/dashboard/livestock");
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
					Farm Details
				</h1>
				<p className="text-gray-500 text-sm w-1/2 m-auto text-center mb-6">
					You can add a new farm to your farm list
				</p>

				<form className="space-y-1" onSubmit={handleSubmit(onSubmit)}>
					<FormInput
						label="Name of Poultry"
						type="text"
						focusLabel="Name of Poultry"
						{...register("farm_name", { required: "Farm name is required" })}
						error={errors.farm_name?.message}
						onChange={() => clearErrors("farm_name")}
						isRequired
					/>

					<FormInput
						label="Location / Address"
						type="text"
						focusLabel="Location / Address"
						isRequired
						{...register("location", { required: "Location is required" })}
						error={errors.location?.message}
						onChange={() => clearErrors("location")}
					/>
					<FormInput
						label="Number of Workers"
						type="number"
						focusLabel="Number of Workers"
						isRequired
						{...register("no_of_worker", {
							required: "Number of Workers is required",
						})}
						error={errors.no_of_worker?.message}
						onChange={() => clearErrors("no_of_worker")}
					/>

					<FormInput
						label="Type of livestock"
						type="text"
						focusLabel="Type of livestock"
						isRequired
						{...register("livestock_type", {
							required: "Type of livestock is required",
						})}
						error={errors.livestock_type?.message}
						onChange={() => clearErrors("livestock_type")}
					/>
					<FormInput
						label="Number of Livestock"
						type="number"
						focusLabel="Number of Livestock"
						isRequired
						{...register("no_of_livestock", {
							required: "Number of Livestock is required",
						})}
						error={errors.no_of_livestock?.message}
						onChange={() => clearErrors("no_of_livestock")}
					/>

					<Controller
						name="sex"
						control={control}
						rules={{ required: "Sex is required" }}
						render={({ field }) => (
							<FormSelect
								label="Sex"
								focusLabel="Sex (Required) :"
								isRequired
								searchable
								options={[
									{ label: "Male", value: "Male" },
									{ label: "Female", value: "Female" },
								]}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
					{errors.sex && (
						<p className="text-red-600 text-sm">{errors.sex.message}</p>
					)}

					<FormInput
						label="Age"
						type="number"
						focusLabel="Age"
						isRequired
						{...register("age", { required: "Age is required" })}
						error={errors.age?.message}
						onChange={() => clearErrors("age")}
					/>

					<FormInput
						label="Farm Description"
						type="text"
						focusLabel="Farm Description"
						isRequired
						{...register("description", {
							required: "Farm Description is required",
						})}
						error={errors.description?.message}
						onChange={() => clearErrors("description")}
					/>

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
									{...register("picture", {
										required: mode === "create" ? "Image is required" : false,
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
							disabled={
								mode === "create"
									? addLiveStockMutation.isLoading
									: updateLiveStockMutation.isLoading
							}
							className="w-full py-3 mt-6 rounded-md text-white text-base font-semibold bg-primary-400 disabled:bg-[#666666] transition disabled:opacity-50 disabled:cursor-not-allowed mb-2 flex items-center justify-center gap-2"
						>
							{mode === "create" ? (
								addLiveStockMutation.isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
										Processing...
									</>
								) : (
									"Add"
								)
							) : updateLiveStockMutation.isLoading ? (
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
};

export default LiveStockForm;
