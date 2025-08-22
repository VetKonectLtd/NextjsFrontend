'use client';

import { useRouter } from 'next/navigation';
import CategorySelector from "@/components/vet-vendor/CategorySelector";
import SearchBar from "@/components/vet-vendor/SearchBar";
import CategoryTabs from "@/components/vet-vendor/CategoryTabs";
import ProductCard from "@/components/shared/ProductCard";
import {Dog, Shop, Cart, Message} from "@/app/assets/icons/vet-vendor";
import Image from "next/image";
import Link from "next/link";

export default function VetVendorPage() {
	const router = useRouter();
	
	const products = [
		{
			id: "1",
			title: "German Shepherd",
			price: 50.99,
			image: Shop.src,
			rating: 5,
			seller: "Owen",
			location: "Cross River, Nigeria",
			open: true,
		},
		{
			id: "2",
			title: "German Shepherd",
			price: 50.99,
			image: Dog.src,
			rating: 5,
			seller: "Owen",
			location: "Lagos",
			open: true,
		},
		{
			id: "3",
			title: "Dog Mouth Guard",
			price: 7.99,
			image: Shop.src,
			rating: 4,
			seller: "Chanel",
			location: "Cross River, Nigeria",
			open: true,
		},
		{
			id: "4",
			title: "Dog Chain",
			price: 23.99,
			image: Dog.src,
			rating: 4,
			seller: "Chanel",
			location: "Abuja",
			open: true,
		},
		{
			id: "5",
			title: "Dog Chain",
			price: 23.99,
			image: Dog.src,
			rating: 4,
			seller: "Chanel",
			location: "Abuja",
			open: true,
		},
		{
			id: "6",
			title: "Dog Chain",
			price: 23.99,
			image: Dog.src,
			rating: 4,
			seller: "Chanel",
			location: "Abuja",
			open: false,
		},
		{
			id: "7",
			title: "Dog Mouth Guard",
			price: 7.99,
			image: Shop.src,
			rating: 4,
			seller: "Chanel",
			location: "Cross River, Nigeria",
			open: true,
		},
		{
			id: "8",
			title: "Dog Mouth Guard",
			price: 7.99,
			image: Shop.src,
			rating: 4,
			seller: "Chanel",
			location: "Cross River, Nigeria",
			open: true,
		},
	];

	return (
		<div className="min-h-screen w-11/12 m-auto bg-white">
			<div className="font-semibold flex items-end justify-end text-[#0F0F0F]"><span>Currency  $</span></div>
			<CategorySelector />
			<div className="flex md:flex-row flex-col items-center gap-4 w-full py-2">
				<SearchBar />

				<div className="flex items-center gap-4">
					<Link href="#">
						<Image
							src={Cart}
							alt="Chat"
							width={36}
							height={36}
							className="mx-1"
						/>
					</Link>
					<Link href="#">
						<Image
							src={Message}
							alt="Cart"
							width={36}
							height={36}
							className="mx-1"
						/>
					</Link>

					<button className="px-5 py-2 rounded-lg border border-primary-400 text-primary-400 font-medium bg-white">
						Sell
					</button>
				</div>
			</div>

			<CategoryTabs />
			<div className="grid grid-cols-2 py-5 sm:grid-cols-3 md:grid-cols-4 gap-5">
				{products.map((p, i) => (
					<ProductCard key={p.id} {...p} onViewProduct={(id) => router.push(`/dashboard/products/${id}`)} />
				))}
			</div>
		</div>
	);
}
