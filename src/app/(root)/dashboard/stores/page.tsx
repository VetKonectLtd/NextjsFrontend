"use client";
import Link from "next/link";
import { Dog, Shop } from "@/app/assets/icons/vet-vendor";
import { PlusIcon } from "lucide-react";
import StoreCard from "@/components/shared/StoreCard";
import { useRouter } from "next/navigation";

const stores = [
	{
		id: "1",
		name: "Goodislorn Store",
		location: "Cross River, Nigeria",
		rating: 3.2,
		email: "peter@gmai.com",
		phone: "07056738294",
		image: Shop.src,
		open: true,
	},
	{
		id: "2",
		name: "Nam-Zim Store",
		location: "Abuja, Nigeria",
		rating: 4.0,
		email: "peter@gmai.com",
		phone: "07056738294",
		image: Dog.src,
		open: true,
	},
	{
		id: "3",
		name: "Lexipet Store",
		location: "Oyo, Nigeria",
		rating: 4.0,
		email: "peter@gmai.com",
		phone: "07056738294",
		image: Shop.src,
		open: false,
	},
	{
		id: "4",
		name: "Treequote Store",
		location: "Lagos, Nigeria",
		rating: 4.0,
		email: "peter@gmai.com",
		phone: "07056738294",
		image: Shop.src,
		open: true,
	},
];
const StorePage = () => {

	const router = useRouter();
	
	return (
		<div className="min-h-screen w-11/12 mt-3 m-auto bg-white">
			<h1 className="text-xl text-gray-55 font-bold mb-4">My Store</h1>

			<Link
				href="/dashboard/stores/new"
				className="flex items-center justify-between w-full border-2 pl-2 bg-white border-green-50 rounded-xl p-2 mb-6 transition"
			>
				<span className="text-gray-55 text-sm font-semibold">Add New Store</span>
				<div className="w-8 h-8 flex items-center justify-center bg-green-50 text-white rounded-xl text-xl">
					<PlusIcon className="w-5 h-5 font-bold text-white " />
				</div>
			</Link>
			
			<div className="grid grid-cols-2 py-5 sm:grid-cols-3 md:grid-cols-4 gap-5">
				{stores.map((p, i) => (
					<StoreCard key={i} {...p} onViewProduct={(id) => router.push(`/dashboard/stores/${id}/products`)}/>
				))}
			</div>
		</div>
	);
};

export default StorePage;
