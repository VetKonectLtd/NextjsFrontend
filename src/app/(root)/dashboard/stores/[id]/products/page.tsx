"use client";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import StoreProductCard from "@/components/shared/StoreProductCard";

const mockProducts = [
	{
		id: "1",
		title: "Golden Retriever Puppy",
		price: 50.99,
		images: [
			"https://images.unsplash.com/photo-1558788353-f76d92427f16",
			"https://images.unsplash.com/photo-1507149833265-60c372daea22",
			"https://images.unsplash.com/photo-1518717758536-85ae29035b6d",
		],
		rating: 4.5,
		location: "Lagos, Nigeria",
		units: 20,
		open: true,
		availableUnits: true,
	},
	{
		id: "2",
		title: "Persian Cat",
		price: 120.0,
		images: [
			"https://images.unsplash.com/photo-1592194996308-7b43878e84a6",
			"https://images.unsplash.com/photo-1558788353-f76d92427f16",
			"https://images.unsplash.com/photo-1507149833265-60c372daea22",
			"https://images.unsplash.com/photo-1518717758536-85ae29035b6d",
		],
		rating: 4.8,
		location: "Abuja, Nigeria",
		units: 10,
		open: true,
		availableUnits: true,
	},
	{
		id: "3",
		title: "African Grey Parrot",
		price: 299.99,
		images: [
			"https://images.unsplash.com/photo-1558788353-f76d92427f16",
			"https://images.unsplash.com/photo-1507149833265-60c372daea22",
			"https://images.unsplash.com/photo-1518717758536-85ae29035b6d",
		],
		rating: 4.3,
		location: "Oyo, Nigeria",
		units: 5,
		open: false,
		availableUnits: false,
	},
];

const ProductPage = () => {
	const router = useRouter();

	return (
		<div className="min-h-screen w-11/12 mt-3 m-auto bg-white">
			<h1 className="text-xl text-gray-55 font-bold mb-4">Goodislorn Store</h1>

			<Link
				href="/dashboard/stores/1/add"
				className="flex items-center justify-between w-full border-2 pl-2 bg-white border-green-50 rounded-xl p-2 mb-6 transition"
			>
				<span className="text-gray-55 text-sm font-semibold">
					Add New Product
				</span>
				<div className="w-8 h-8 flex items-center justify-center bg-green-50 text-white rounded-xl text-xl">
					<PlusIcon className="w-5 h-5 font-bold text-white " />
				</div>
			</Link>

			<div className="grid grid-cols-2 py-5 sm:grid-cols-3 md:grid-cols-4 gap-5">
				{mockProducts.map((p) => (
					<StoreProductCard
						key={p.id}
						{...p}
						onViewProduct={(id) =>
							router.push(`/dashboard/stores/1/products/${id}`)
						}
					/>
				))}
			</div>
		</div>
	);
};

export default ProductPage;
