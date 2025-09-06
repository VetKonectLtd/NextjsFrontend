"use client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PetCard from "@/components/AnimalOwner/PetCard";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FarmCard from "@/components/AnimalOwner/FarmCard";
import { Dog } from "@/app/assets/icons/vet-vendor";

// 👇 Mock data arrays
const pets = [
	{ name: "Kora", image: Dog.src, species: "Dog", breed: "Rottweiler", sex: "Male", age: 2 },
	{ name: "Mimi", image: Dog.src, species: "Cat", breed: "Persian", sex: "Female", age: 1 },
];

const farms = [
	{
		name: "Adibala Poultry",
        image: Dog.src,
		location: "201, Huston Texas, United States",
		numOfWorkers: "20",
        typeOfLivestock: "Birds",
        numOfLivestock: "200",
		sex: "Female",
		age: 4,
	}
];

const AnimalOwner = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const initialTab = searchParams.get("tab") || "pets";
	const [tab, setTab] = useState(initialTab);

	useEffect(() => {
		const urlTab = searchParams.get("tab");
		if (urlTab && urlTab !== tab) {
			setTab(urlTab);
		}
	}, [searchParams]);

	const handleTabChange = (value: string) => {
		setTab(value);
		router.replace(`?tab=${value}`);
	};

	return (
		<div className="w-11/12 mt-3 m-auto bg-white">
			{/* Tabs Header */}
			<Tabs
				defaultValue={tab}
				onValueChange={handleTabChange}
				className="w-full"
			>
				<TabsList className="mb-6 bg-transparent">
					<TabsTrigger
						className="data-[state=active]:font-bold text-lg data-[state=active]:bg-transparent data-[state=active]:shadow-none font-normal"
						value="pets"
					>
						My Pets
					</TabsTrigger>
					<TabsTrigger
						className="data-[state=active]:font-bold text-lg data-[state=active]:bg-transparent data-[state=active]:shadow-none font-normal"
						value="livestock"
					>
						Livestock Farms
					</TabsTrigger>
				</TabsList>

				{/* Pets Tab */}
				<TabsContent value="pets">
					<Link
						href="/dashboard/animal-owner/new-pet"
						className="flex items-center justify-between w-full border-2 pl-2 bg-white border-green-50 rounded-xl p-2 mb-6 transition"
					>
						<span className="text-gray-55 text-sm font-semibold">
							Add New Pet
						</span>
						<div className="w-8 h-8 flex items-center justify-center bg-green-50 text-white rounded-xl text-xl">
							<PlusIcon className="w-5 h-5 font-bold text-white " />
						</div>
					</Link>

					<div className="grid md:grid-cols-1 gap-4">
						{pets.map((pet, i) => (
							<PetCard key={i} {...pet} />
						))}
					</div>
				</TabsContent>

				{/* Livestock Tab */}
				<TabsContent value="livestock">
					<Link
						href="/dashboard/animal-owner/new-livestock"
						className="flex items-center justify-between w-full border-2 pl-2 bg-white border-green-50 rounded-xl p-2 mb-6 transition"
					>
						<span className="text-gray-55 text-sm font-semibold">
							Add New Farm
						</span>
						<div className="w-8 h-8 flex items-center justify-center bg-green-50 text-white rounded-xl text-xl">
							<PlusIcon className="w-5 h-5 font-bold text-white " />
						</div>
					</Link>

					<div className="grid md:grid-cols-1 gap-4">
						{farms.map((farm, i) => (
							<FarmCard key={i} {...farm} />
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default AnimalOwner;
