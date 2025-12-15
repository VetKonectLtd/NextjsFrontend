"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthBg } from "@/app/assets/images";
import { Shop } from "@/app/assets/icons/vet-vendor";
import Image from "next/image";
import { Bg22, Hand, Lock } from "@/app/assets/icons";
import { Share2, Plus, ChevronLeft, SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStoreService } from "@/services/storeService";
import { useAuthService } from "@/services/authService";
import StoreCardSkeleton from "@/components/shared/StoreCardSkeleton";
import StoreCard from "@/components/shared/StoreCard";
import EmptyState from "@/components/shared/EmptyState";
import { Product, Store } from "@/types";
import { useProductService } from "@/services/productService";
import StoreProductCard from "@/components/shared/StoreProductCard";

export default function StoreDetailsPage({
	params,
}: {
	params: { id: string };
}) {
	const [available, setAvailable] = useState(true);
	const router = useRouter();
	const { useGetStoreById, useDeleteStore } = useStoreService();
	const storeData: any = useGetStoreById(true, params.id);
	const deleteStoreMutation = useDeleteStore(params.id);
	const { useGetProductByStore } = useProductService();
	const storeProduct = useGetProductByStore(true, params.id);

	const product = (storeProduct.data as Record<string, any>)?.products.data;

	const store = (storeData.data as Record<string, any>)?.store;

	const handleBack = () => {
		router.back();
	};

	const handleDeleteStore = () => {
		confirm("Are you sure you want to delete this store?");

		deleteStoreMutation.mutateAsync();
		router.push("/dashboard/stores");
	};

	return (
		<div className="min-h-screen w-11/12 mt-3 m-auto shadow-md border rounded-2xl border-gray-225 bg-white">
			<div
				style={{ backgroundImage: `url(${Bg22.src})` }}
				className="flex  bg-gray-100 h-32 bg-no-repeat bg-top rounded-t-2xl bg-cover justify-between items-start p-4"
			>
				<div
					onClick={handleBack}
					className="flex items-center text-sm text-gray-55 hover:text-green-50"
				>
					<span className="bg-white border cursor-pointer text-gray-500 border-gray-225 shadow-md rounded-full p-1 mr-2">
						<ChevronLeft className="w-5 h-5" />
					</span>{" "}
					Back
				</div>

				<div className="flex items-center">
					<Link
						href={`/dashboard/stores/edit/${params.id}`}
						className="flex items-center text-sm text-gray-55 hover:text-green-50"
					>
						Edit
						<span className="bg-white border text-gray-500 cursor-pointer border-gray-225 shadow-md rounded-full p-2 ml-2">
							<SquarePen className="w-5 h-5" />
						</span>
					</Link>

					<button
						onClick={handleDeleteStore}
						className="ml-4 bg-white border text-gray-500 cursor-pointer border-gray-225 shadow-md rounded-full p-2"
					>
						<Trash2 className="w-5 h-5 text-gray-500  hover:text-red-600 cursor-pointer" />
					</button>
				</div>
			</div>

			<div className="flex max-w-sm px-4 md:px-0 m-auto flex-col items-center -mt-12">
				<div className="w-24 h-24 rounded-full border-4 border-green-50 overflow-hidden">
					<Image
						src={store?.picture_url}
						alt={store?.store_name}
						width={150}
						height={150}
						className="object-cover w-full h-full"
					/>
				</div>
				<h1 className="mt-3 text-lg font-semibold">{store?.store_name}</h1>
				<p className="text-sm mt-2 text-gray-500">Store</p>

				<div className="flex flex-col items-center gap-2 mt-6">
					<span className="text-sm text-gray-600">Availability</span>
					<button
						onClick={() => setAvailable(!available)}
						className="w-12 h-6 flex border border-[#51D86F] items-center rounded-full p-1 transition bg-white"
					>
						<span
							className={`w-4 h-4 bg-[#51D86F] rounded-full shadow transform transition ${
								store?.availability ? "translate-x-6" : "translate-x-0"
							}`}
						/>
					</button>
				</div>

				{/* Action Buttons */}
				<div className="flex gap-2 mt-6 w-full items-center justify-center  border-b py-7">
					<button className="flex flex-col items-center text-gray-700 space-y-3 ">
						<span className="bg-white border mb-2 hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
							<Image
								src={Lock.src}
								alt="lock"
								width={24}
								height={24}
								className="object-contain w-6 h-6"
							/>
						</span>

						<span className="text-xs">Products</span>
					</button>
					<button className="flex flex-col justify-center items-center space-y-3 text-gray-500">
						<span className="bg-white border mb-2 hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
							<Share2 className="w-6 h-6" />
						</span>
						<span className="text-xs">Share</span>
					</button>
				</div>

				<Link  href={`/dashboard/stores/${params.id}/add`} className="flex max-w-sm items-center justify-between w-full border-2 bg-white border-green-50 rounded-xl p-2 pl-3 mt-8 transition">
					<span className="text-gray-55 text-sm font-bold">
						Add New Product
					</span>
					<span
						className="w-8 h-8 flex items-center justify-center bg-green-50 text-white rounded-xl text-xl"
					>
						<Plus className="w-5 h-5 font-bold text-white " />
					</span>
				</Link>

				{storeProduct.isLoading ? (
					<div className="grid grid-cols-2 py-5 sm:grid-cols-3 md:grid-cols-4 gap-5">
						{Array.from({ length: 3 }).map((_, i) => (
							<StoreCardSkeleton key={i} />
						))}
					</div>
				) : product?.length >= 1 ? (
					<div className="grid grid-cols-1 py-5 sm:grid-cols-2 md:grid-cols-2 md:gap-5 gap-2">
						{product.map((product: Product) => (
							<StoreProductCard
								key={product?.id}
								{...product}
								onViewProduct={(id) =>
									router.push(`/dashboard/stores/${params.id}/products/${id}`)
								}
							/>
						))}
					</div>
				) : (
					<EmptyState
						title="Hey! User"
						description="Kindly click on the button above to add a new product to your store"
						image={Hand}
					/>
				)}

				
			</div>
		</div>
	);
}
