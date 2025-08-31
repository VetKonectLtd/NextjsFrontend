"use client";

import { useState } from "react";
import VetProfile, { VetProfileProps } from "@/components/shared/VetProfile";
import { AuthBg, Vet1, Vet2, Vet3, Vet4 } from "@/app/assets/images";
import SelectedVet from "./SelectedVetDetail";

const sampleVets: VetProfileProps[] = [
	{
		id: "1",
		name: "Dr. Orji Hyacinth C",
		location: "Delta, Nigeria",
		image: Vet1,
		rating: 4.5,
		totalRatings: 5,
		isAvailable: true,
		isVerified: true,
	},
	{
		id: "2",
		name: "Dr. Semiat Adogun",
		location: "Lagos, Nigeria",
		image: Vet2,
		rating: 4.7,
		totalRatings: 5,
		isAvailable: false,
		isVerified: true,
	},
	{
		id: "3",
		name: "Dr. Ochola Peter",
		location: "Abuja, Nigeria",
		image: Vet3,
		rating: 0.0,
		totalRatings: 5,
		isAvailable: true,
		isVerified: false,
	},
	{
		id: "4",
		name: "Dr. Benedict Onoja",
		location: "Lagos, Nigeria",
		image: Vet4,
		rating: 4.2,
		totalRatings: 5,
		isAvailable: true,
		isVerified: true,
	},
];

interface VeterinarianProps {
	vets?: VetProfileProps[];
}

const Veterinarian: React.FC<VeterinarianProps> = ({ vets = sampleVets }) => {
	const [selectedVet, setSelectedVet] = useState<VetProfileProps | null>(null);
	const [selectedAction, setSelectedAction] = useState<string>("default");

	const handleViewProfile = (id: string) => {
		const vet = vets.find((v) => v.id === id) || null;
		setSelectedVet(vet);
	};

	const handleContact = (
		id: string,
		type: "phone" | "message" | "mail" | "location" | "share" | "rate",
	) => {
		console.log("Contact vet:", id, "via:", type);
		setSelectedAction(type);
	};

	return (
		<section
			className={`grid gap-6 mt-3 transition-all duration-300 
        ${selectedVet ? "lg:grid-cols-4" : "lg:grid-cols-4"}`}
		>
			<div
				className={`transition-all duration-300 
          ${selectedVet ? "lg:col-span-2 md:block hidden" : "lg:col-span-4"}`}
			>
				<div
					className={`grid mt-3 md:gap-6 gap-3
            ${selectedVet ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 md:grid-cols-4"}`}
				>
					{vets.map((vet) => (
						<VetProfile
							key={vet.id}
							{...vet}
							onViewProfile={handleViewProfile}
							onContact={handleContact}
						/>
					))}
				</div>
			</div>

				<SelectedVet
					handleContact={handleContact}
					selectedVet={selectedVet}
					selectedAction={selectedAction}
					setSelectedVet={setSelectedVet}
				/>
		
		</section>
	);
};

export default Veterinarian;
