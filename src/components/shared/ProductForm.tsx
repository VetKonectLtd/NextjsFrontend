"use client";

import { ChevronLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import FormInput from "@/components/form/FormInput";
import { Country } from "country-state-city";
import { Controller, useForm } from "react-hook-form";
import TagInput from "@/components/form/TagInput";
import { useRouter } from "next/navigation";
import { useProductService } from "@/services/productService";
import { Product } from "@/types";

type ProductFormProps = {
	mode: "create" | "edit";
	product?: Product;
	storeId: string;
};

export default function ProductForm({
	mode,
	product,
	storeId,
}: ProductFormProps) {
	const router = useRouter();
	const [available, setAvailable] = useState(product?.availability ?? false);
	const [previews, setPreviews] = useState<string[]>(product?.images_url || []);

	const { useAddProduct, useUpdateProduct } = useProductService();
	const productMutation = useAddProduct();
	const updateProductMutation = useUpdateProduct(
		(product as Record<string, any>)?.id,
	);


	const {
		register,
		control,
		handleSubmit,
		getValues,
		clearErrors,
		setValue,
		reset,
		formState: { errors },
	} = useForm<Product>();

	useEffect(() => {
		if (mode === "edit" && product) {
			reset({
				product_name: product?.product_name,
				category: product?.category,
				description: product?.description,
				tags: product?.tags,
				location: product?.location,
				price: product?.price,
				available_unit: product?.available_unit,
				availability: product?.availability,
				images: [],
			});
		}
	}, [mode, product, reset]);

	const countries = Country.getAllCountries().map((c) => ({
		value: c.isoCode,
		label: `${c.name}`,
	}));

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		const allowedFiles = files.slice(0, 3 - previews.length);

		const existingImages = getValues("images") || [];

		allowedFiles.forEach((file) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviews((prev) => [...prev, reader.result as string]);
			};
			reader.readAsDataURL(file);
		});
		setValue("images", [...existingImages, ...allowedFiles], {
			shouldValidate: true,
		});
	};

	const handleRemoveImage = (idx: number) => {
		setPreviews((prev) => prev.filter((_, i) => i !== idx));

		const existingImages = getValues("images") || [];
		const updatedImages = existingImages.filter((_, i) => i !== idx);
		setValue("images", updatedImages, { shouldValidate: true });
	};

	const onSubmit = (data: Product) => {
		const formData:any = new FormData();
		formData.append("product_name", data.product_name);
		formData.append("store_id", storeId);
		data.tags.forEach((tag) => formData.append("tags[]", tag));
		formData.append("category", data.category);
		formData.append("description", data.description);
		formData.append("price", data.price);
		formData.append("available_unit", data.available_unit);
		formData.append("availability", available);
		formData.append("location", data.location);

		data.images?.forEach((file) => formData.append("images[]", file));

		if (mode === "create") {
			productMutation.mutate(formData, {
				onSuccess: (res: any) =>
					router.push(
						`/dashboard/stores/${storeId}/products/${res.product.id}`,
					),
			});
		} else {
			updateProductMutation.mutate(formData, {
				onSuccess: (res: any) =>
					router.push(
						`/dashboard/stores/${storeId}/products/${res.product.id}`,
					),
			});
		}
	};

	const handleBack = () => {
		router.back();
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
				<div>
					<h1 className="text-3xl font-bold text-gray-55 text-center">
						Product Details
					</h1>
					<p className="text-gray-500 text-sm w-1/2 m-auto text-center mb-6">
						You can add a new Item to your product list
					</p>
				</div>

				<div>
					<form className="space-y-1">
						<FormInput
							label="Product Title"
							type="text"
							focusLabel="Product Title:"
							isRequired
							{...register("product_name", {
								required: "Product title is required",
							})}
							error={errors.product_name?.message}
						/>

						<FormInput
							label="Product Category"
							type="text"
							focusLabel="Product Category:"
							isRequired
							{...register("category", { required: "Category is required" })}
							error={errors.category?.message}
						/>

						<FormInput
							label="Product Description"
							type="text"
							focusLabel="Product Description:"
							isRequired
							{...register("description", {
								required: "Description is required",
								minLength: {
									value: 10,
									message: "Description should be at least 10 characters",
								},
							})}
							error={errors.description?.message}
						/>

						<Controller
							name="tags"
							control={control}
							rules={{required: "At least one tag is required" }}
							render={({ field }) => (
								<TagInput
									{...field}
									label="Product Tags"
									focusLabel="Product Tags:"
									isRequired
									error={errors.tags?.message as string}
								/>
							)}
						/>

						<FormInput
							label="Location"
							type="text"
							focusLabel="Location:"
							isRequired
							{...register("location", {
								required: "Location is required",
							})}
							error={errors.location?.message}
						/>

						<FormInput
							label="Price in US Dollars"
							type="number"
							focusLabel="Price in US Dollars:"
							isRequired
							{...register("price", {
								required: "Price is required",
								valueAsNumber: true,
								min: { value: 1, message: "Price must be at least 1" },
							})}
							error={errors.price?.message}
						/>

						{/* Availability toggle */}
						<div className="flex w-11/12 m-auto items-center py-5 justify-between">
							<span className="text-sm font-medium text-gray-700">
								Availability Status - {available ? "Open" : "Closed"}
							</span>
							<button
								type="button"
								onClick={() => setAvailable(!available)}
								className="w-9 h-4 p-1 flex items-center border border-primary-400 rounded-full transition"
							>
								<span
									className={`w-3 h-3 bg-primary-400 rounded-full shadow transform transition ${
										available ? "translate-x-4" : "translate-x-0"
									}`}
								/>
							</button>
						</div>

						{/* Units */}
						<FormInput
							label="Available Units"
							type="number"
							focusLabel="Available Units:"
							isRequired
							{...register("available_unit", {
								required: "Available units is required",
								valueAsNumber: true,
								min: { value: 1, message: "Units must be at least 1" },
							})}
							error={errors.available_unit?.message}
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
										onChange={(e) => {
											handleImageUpload(e);
											clearErrors("images");
										}}
										className="hidden"
									/>
								</>
							)}
							
						</div>
						<div className=" pt-8">
							<button
								type="submit"
								onClick={handleSubmit(onSubmit)}
                                disabled={
								mode === "create"
									? productMutation.isLoading
									: updateProductMutation.isLoading
							}
								className="w-full py-3 mt-6 rounded-md text-white text-base font-semibold bg-primary-400 disabled:bg-[#666666] transition disabled:opacity-50 disabled:cursor-not-allowed mb-2 flex items-center justify-center gap-2"
							>
								{mode === "create" ? (
									productMutation.isLoading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
											Processing...
										</>
									) : (
										"Add"
									)
								) : updateProductMutation.isLoading ? (
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
}
