"use client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import PetCard from "@/components/AnimalOwner/PetCard";
import { usePetOwnerService } from "@/services/petOwnerService";
import { PetOwner } from "@/types";
import PetCardSkeleton from "@/components/AnimalOwner/PetCardSkeleton";
import EmptyState from "@/components/shared/EmptyState";
import { Hand } from "@/app/assets/icons";

const PetAnimalOwner = () => {
	const { useGetPetOwners } = usePetOwnerService();

	const petOwnersData = useGetPetOwners(true);

	const pets = (petOwnersData?.data as Record<string, any>)?.pets ?? [];

	return (
		<div className="w-11/12 m-auto bg-white">
			<div className="font-bold text-lg mb-6">
				My Pets
			</div>

			<Link
				href="/dashboard/pet/new-pet"
				className="flex items-center justify-between w-full border-2 pl-2 bg-white border-green-50 rounded-xl p-2 mb-6 transition"
			>
				<span className="text-gray-55 text-sm font-semibold">Add New Pet</span>
				<div className="w-8 h-8 flex items-center justify-center bg-green-50 text-white rounded-xl text-xl">
					<PlusIcon className="w-5 h-5 font-bold text-white " />
				</div>
			</Link>

			<div className="grid md:grid-cols-1 gap-4">
				{petOwnersData.isLoading ? (
					Array.from({ length: 2 }).map((_, i) => <PetCardSkeleton key={i} />)
				) : pets.length >= 1 ? (
					pets.map((pet: PetOwner, i: any) => (
						<PetCard key={pet.pet_id} {...pet} />
					))
				) : (
					<EmptyState
						title="Hey! User"
						description="Kindly click on the button above to add new pet profile"
						image={Hand}
					/>
				)}
			</div>
		</div>
	);
};

export default PetAnimalOwner;
