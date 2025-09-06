"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Image, { StaticImageData } from "next/image";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import PlanSelector, { Plan } from "./PlanSelector";
import { Dog, Shop } from "@/app/assets/icons/vet-vendor";

const ads = [
	{
		id: "1",
		title: "Golden Retriever Puppy",
		price: 50.99,
		category: "Pets",
		tags: ["dog", "puppy", "golden retriever"],
		images: [Dog.src, Shop.src, Dog.src],
		rating: 4.5,
		location: "Lagos, Nigeria",
		units: 20,
		status: "active",
		open: true,
		availableUnits: true,
	},
	{
		id: "2",
		title: "Persian Cat",
		price: 120.0,
		category: "Pets",
		tags: ["cat", "persian", "feline"],
		images: [Dog.src, Shop.src, Dog.src],
		rating: 4.8,
		location: "Abuja, Nigeria",
		units: 10,
		status: "active",
		open: true,
		availableUnits: true,
	},
	{
		id: "3",
		title: "African Grey Parrot",
		price: 299.99,
		category: "Birds",
		tags: ["parrot", "african grey", "bird"],
		images: [Dog.src, Shop.src, Dog.src],
		rating: 4.3,
		location: "Oyo, Nigeria",
		units: 5,
		status: "expired",
		open: false,
		availableUnits: false,
	},
];

export interface Product {
	id: string;
	title: string;
	category: string;
	tags: string[];
	price: number;
	images:string[]; 
	location: string;
	units: number;
	open: boolean;
}

const plans: Plan[] = [
	{ value: "free", label: "Free Trial Plan", maxProducts: 1, basePrice: 0 },
	{ value: "weekly", label: "Weekly Plan", maxProducts: 3, basePrice: 0.99 },
	{ value: "monthly", label: "Monthly Plan", maxProducts: 10, basePrice: 3.99 },
	{ value: "yearly", label: "Yearly Plan", maxProducts: 50, basePrice: 29.99 },
];

const ProductForm = () => {
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [previews, setPreviews] = useState<string[]>([]);
	const [selectedPlan, setSelectedPlan] = useState<string>("free");
	const [factor, setFactor] = useState<number>(1);

	const {
		control,
		formState: { errors },
	} = useForm<Product>({
		mode: "onBlur",
	});

	const handleProductChange = (id: string) => {
		const product = ads.find((p) => p.id === id) || null;
		setSelectedProduct(product);
		if (product) {
			setPreviews(product.images.slice(0, 3));
		}
	};

	return (
		<form className="space-y-1 max-w-md mx-auto">
			{/* Select Product */}
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
						options={ads.map((p) => ({
							value: p.id,
							label: `${p.id} - ${p.title}`,
						}))}
						value={field?.value}
						onChange={(value) => {
							field.onChange(value);
							handleProductChange(value);
						}}
					/>
				)}
			/>

			{/* Auto-populated fields */}
			{selectedProduct && (
				<div className="space-y-1">
					<FormInput
						label="Product Title"
						type="text"
						focusLabel="Product Title:"
						value={selectedProduct.title}
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
						{selectedProduct.tags.map((tag, idx) => (
							<span
								key={idx}
								className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
							>
								{tag}
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
						value={selectedProduct.units}
						readOnly
					/>

					{/* Availability toggle */}
					<div className="flex w-11/12 m-auto items-center py-3 justify-between">
						<span className="text-sm font-medium text-gray-700">
							Availability Status - {selectedProduct.open ? "Open" : "Closed"}
						</span>
						<span
							className={`px-3 py-1 text-xs rounded-full ${
								selectedProduct.open
									? "bg-green-100 text-green-600"
									: "bg-red-100 text-red-600"
							}`}
						>
							{selectedProduct.open ? "Open" : "Closed"}
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

export default ProductForm;
