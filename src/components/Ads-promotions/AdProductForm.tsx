"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import PlanSelector, { Plan } from "./PlanSelector";
import { useAuthService } from "@/services/authService";
import { useProductService } from "@/services/productService";
import { Product } from "@/types";
import { Loader2 } from "lucide-react";

const plans: Plan[] = [
	{ value: "weekly", label: "Weekly Plan", maxProducts: 3, basePrice: 0.99 },
	{ value: "monthly", label: "Monthly Plan", maxProducts: 10, basePrice: 3.99 },
	{ value: "yearly", label: "Yearly Plan", maxProducts: 50, basePrice: 29.99 },
];

const AdProductForm = (preSelectedId: any) => {
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [previews, setPreviews] = useState<string[]>([]);
	const [selectedPlan, setSelectedPlan] = useState<string>("weekly");
	const [factor, setFactor] = useState<number>(1);
	const { useCurrentUser } = useAuthService();
	const { useGetProductByUserId } = useProductService();
	const user = useCurrentUser(true);
	const getProduct = useGetProductByUserId(
		true,
		(user as Record<string, any>).data?.profile?.user_id,
	);

	const ads = Array.isArray(
		(getProduct.data as Record<string, any>)?.products?.data,
	)
		? (getProduct.data as Record<string, any>)?.products?.data
		: [];

	const {
		control,
		setValue,
		formState: { errors },
	} = useForm<Product>({
		mode: "onBlur",
	});

	useEffect(() => {
		if (!getProduct.isLoading && preSelectedId) {
			const found = ads.find((p: Product) => p.id === preSelectedId);
			if (found) {
				setSelectedProduct(found);
				setPreviews(found.images_url.slice(0, 3));
			}
		}
	}, [getProduct.isLoading, preSelectedId, ads]);


	useEffect(() => {
		if (!getProduct.isLoading && preSelectedId) {
			setValue("id", preSelectedId);
		}
	}, [getProduct.isLoading, preSelectedId, setValue]);


	const handleProductChange = (id: string) => {
		const product = ads.find((p: Product) => p.id === id) || null;
		setSelectedProduct(product);
		if (product) {
			setPreviews(product.images_url.slice(0, 3));
		}
	};

	return (
		<form className="space-y-1 max-w-md mx-auto">
			{/* Select Product */}

			{getProduct.isLoading ? (
				<div className="flex items-center gap-2">
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					<span>Loading products...</span>
				</div>
			) : (
				<Controller
					name="id"
					control={control}
					rules={{ required: "Select Product is required" }}
					render={({ field }) => (
						<FormSelect
							label="Select Product"
							focusLabel="Select Product (Required):"
							isRequired
							searchable
							options={ads.map((p: Product) => ({
								value: p.id,
								label: `${p.id} - ${p.product_name}`,
							}))}
							value={field?.value}
							onChange={(value) => {
								field.onChange(value);
								handleProductChange(value);
							}}
						/>
					)}
				/>
			)}

			{/* Auto-populated fields */}
			{selectedProduct && (
				<div className="space-y-1">
					<FormInput
						label="Product Title"
						type="text"
						focusLabel="Product Title:"
						value={selectedProduct.product_name}
						readOnly
					/>

					{/* Category */}
					<FormSelect
						label="Product Category"
						focusLabel="Product Category:"
						options={[
							{ value: "Pets", label: "Pets" },
							{ value: "Birds", label: "Birds" },
							{ value: "Accessories", label: "Accessories" },
						]}
						value={selectedProduct.category}
						onChange={() => {}}
						disabled
					/>

					{/* Tags */}
					<div className="flex flex-wrap gap-2 py-4 px-2">
						{selectedProduct.tags.map((tag: any) => (
							<span
								key={tag.id}
								className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
							>
								{tag.name}
							</span>
						))}
					</div>

					<FormInput
						label="Location"
						type="text"
						focusLabel="Location:"
						value={selectedProduct.location}
						readOnly
					/>

					<FormInput
						label="Price in US Dollars"
						type="number"
						focusLabel="Price:"
						value={selectedProduct.price}
						readOnly
					/>

					<FormInput
						label="Available Units"
						type="number"
						focusLabel="Available Units:"
						value={selectedProduct.available_unit}
						readOnly
					/>

					{/* Availability toggle */}
					<div className="flex w-11/12 m-auto items-center py-3 justify-between">
						<span className="text-sm font-medium text-gray-700">
							Availability Status -{" "}
							{selectedProduct.availability ? "Open" : "Closed"}
						</span>
						<span
							className={`px-3 py-1 text-xs rounded-full ${
								selectedProduct.availability
									? "bg-green-100 text-green-600"
									: "bg-red-100 text-red-600"
							}`}
						>
							{selectedProduct.availability ? "Open" : "Closed"}
						</span>
					</div>

					{/* Image Previews */}
					{previews.length > 0 && (
						<div className="flex gap-3">
							{previews.map((img, idx) => (
								<div
									key={idx}
									className="w-[100px] h-[60px] border rounded-md overflow-hidden flex items-center justify-center"
								>
									<Image
										src={img}
										alt={`Preview ${idx + 1}`}
										width={100}
										height={70}
										className="object-cover w-full h-full"
									/>
								</div>
							))}
						</div>
					)}
				</div>
			)}

			{/* Plan Selector */}
			{selectedProduct && (
				<PlanSelector
					plans={plans}
					selectedPlan={selectedPlan}
					factor={factor}
					onChange={(plan, factor) => {
						setSelectedPlan(plan);
						setFactor(factor);
					}}
				/>
			)}
		</form>
	);
};

export default AdProductForm;
