"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CategorySelector from "@/components/vet-vendor/CategorySelector";
import SearchBar from "@/components/vet-vendor/SearchBar";
import CategoryTabs from "@/components/vet-vendor/CategoryTabs";
import ProductCard from "@/components/vet-vendor/ProductCard";


import { Dog, Shop, Cart, Message } from "@/app/assets/icons/vet-vendor";
import { Paws, Cow, Icon11, Icon12, Icon13 } from "@/app/assets/icons/vet-vendor";

export default function VetVendorPage() {
	const [activeCategory, setActiveCategory] = useState("Vet Vendor");
	const [activeTab, setActiveTab] = useState("All");

	const products = [
		{
			title: "German Shepherd",
			price: 50.99,
			image: Shop.src,
			rating: 5,
			seller: "Owen",
			location: "Cross River, Nigeria",
			open: true,
			category: "Pets",
		},
		{
			title: "Dog Chain",
			price: 23.99,
			image: Dog.src,
			rating: 4,
			seller: "Chanel",
			location: "Abuja",
			open: true,
			category: "Tools and materials",
		},
		{
			title: "Dog Feed",
			price: 15.99,
			image: Shop.src,
			rating: 4,
			seller: "Owen",
			location: "Lagos",
			open: true,
			category: "Feed",
		},
		{
			title: "Cattle Injection",
			price: 99.99,
			image: Dog.src,
			rating: 5,
			seller: "Chanel",
			location: "Abuja",
			open: true,
			category: "Drugs",
		},
	];

	const categories = [
		{ name: "Pets", icon: Paws },
		{ name: "Livestock", icon: Cow },
		{ name: "Feed", icon: Icon11 },
		{ name: "Drugs", icon: Icon12 },
		{ name: "Tools and materials", icon: Icon13 },
	];

	const tabs = categories.map((c) => {
		const count =
			c.name === "All"
				? products.length
				: products.filter((p) => p.category === c.name).length;

		return { ...c, count };
	});

	const filteredProducts =
		activeTab === "All"
			? products
			: products.filter((p) => p.category === activeTab);

	return (
		<div className="min-h-screen w-11/12 m-auto bg-white">
			<div className="font-semibold flex items-end justify-end text-[#0F0F0F]">
				<span>Currency $</span>
			</div>

			<CategorySelector
				activeCategory={activeCategory}
				onSelect={setActiveCategory}
			/>

			<div className="flex md:flex-row flex-col items-center gap-4 w-full py-2">
				<SearchBar />

				<div className="flex items-center gap-4">
					<Link href="#">
						<Image src={Cart} alt="Cart" width={36} height={36} />
					</Link>
					<Link href="#">
						<Image src={Message} alt="Chat" width={36} height={36} />
					</Link>
					<button className="px-5 py-2 rounded-lg border border-primary-400 text-primary-400 font-medium bg-white">
						Sell
					</button>
				</div>
			</div>

			<CategoryTabs tabs={tabs} activeTab={activeTab} onSelect={setActiveTab} />

			<div className="grid grid-cols-2 py-5 sm:grid-cols-3 md:grid-cols-4 gap-5">
				{filteredProducts.length > 0 ? (
					filteredProducts.map((p, i) => <ProductCard key={i} {...p} />)
				) : (
					<p className="col-span-full text-center text-gray-500">
						No products found for {activeCategory} in {activeTab}
					</p>
				)}
			</div>
		</div>
	);
}
