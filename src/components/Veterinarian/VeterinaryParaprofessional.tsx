"use client";

import { useState, useMemo } from "react";
import VetProfile, { VetProfileProps } from "@/components/shared/VetProfile";
import VetProfileSkeleton from "@/components/shared/VetProfileSkeleton";
import EmptyState from "@/components/shared/EmptyState";
import SelectedVet from "./SelectedVetDetail";
import { useVeterinaryParaprofessionalService } from "@/services/veterinaryParaprofessional";
import { VetParaprofessionalData, GetAllVetParaprofessionalResponse } from "@/types";

// Generic veterinarian placeholder image URL from Unsplash
const GENERIC_VET_IMAGE = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop";

interface VeterinaryParaprofessionalProps {
	vets?: VetProfileProps[];
}

const VeterinaryParaprofessional: React.FC<VeterinaryParaprofessionalProps> = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [allVPPs, setAllVPPs] = useState<VetParaprofessionalData[]>([]);
	const [selectedVet, setSelectedVet] = useState<VetProfileProps | null>(null);
	const [selectedAction, setSelectedAction] = useState<string>("default");

	const { useGetAllVetParaprofessional } = useVeterinaryParaprofessionalService();
	const { data: apiData, isLoading, error , refetch  } = useGetAllVetParaprofessional(currentPage);
	
	// Cast to actual response type since API returns data directly
	const data = apiData as unknown as GetAllVetParaprofessionalResponse | undefined;

	// Transform API data to VetProfile props
	const transformedVets: VetProfileProps[] = useMemo(() => {
		if (!data?.veterinary_paraprofessionals?.data) return [];

		// Combine all loaded VPPs
		const combinedVPPs = currentPage === 1 
			? data.veterinary_paraprofessionals.data 
			: [...allVPPs, ...data.veterinary_paraprofessionals.data];

		// Update allVPPs state
		if (data.veterinary_paraprofessionals.data.length > 0 && currentPage > 1) {
			setAllVPPs(combinedVPPs);
		} else if (currentPage === 1) {
			setAllVPPs(data.veterinary_paraprofessionals.data);
		}

		return combinedVPPs.map((vpp: VetParaprofessionalData) => {
			const fullName = `${vpp.user.first_name} ${vpp.user.last_name}`;
			const location = `${vpp.user.state}, ${vpp.user.country}`;
			
			// Calculate average rating from ratings array
			const totalRatings = vpp.ratings.length;
			const averageRating = totalRatings > 0 
				? vpp.ratings.reduce((sum: number, r: any) => sum + (r.rating || 0), 0) / totalRatings 
				: vpp.average_rating;

			return {
				id: vpp.id.toString(),
				name: fullName,
				location: location,
				image: vpp.user.profile || GENERIC_VET_IMAGE,
				rating: averageRating,
				role:vpp.role,
				totalRatings: totalRatings,
				isAvailable: vpp.availability === 1,
				isVerified: vpp.is_approved === 1,
				email: vpp.user.email,
				phone: vpp.user.phone_num,
				userId: vpp.user_id.toString(),
			};
		});
	}, [data, currentPage, allVPPs]);

	const handleViewProfile = (id: string) => {
		const vet = transformedVets.find((v) => v.id === id) || null;
		setSelectedVet(vet);
	};

	const handleContact = (
		id: string,
		type: "phone" | "media" | "message" | "mail" | "location" | "share" | "rate",
	) => {
		const vet = transformedVets.find((v) => v.id === id);
		
		if (type === "phone" && vet?.phone) {
			window.location.href = `tel:${vet.phone}`;
		} else if (type === "mail" && vet?.email) {
			window.location.href = `mailto:${vet.email}`;
		} else if (type === "message") {
			// Open vet profile and navigate to message section
			handleViewProfile(id);
			setSelectedAction("message");
		} else {
			console.log("Contact VPP:", id, "via:", type);
			setSelectedAction(type);
		}
	};

	const handleLoadMore = () => {
		if (data?.veterinary_paraprofessionals?.next_page_url) {
			setCurrentPage((prev) => prev + 1);
		}
	};

	const hasMorePages = data?.veterinary_paraprofessionals?.next_page_url !== null;

	return (
		<section
			className={`grid gap-6 mt-3 transition-all duration-300 
        ${selectedVet ? "lg:grid-cols-4" : "lg:grid-cols-4"}`}
		>
			<div
				className={`transition-all duration-300 
          ${selectedVet ? "lg:col-span-2 md:block hidden" : "lg:col-span-4"}`}
			>
				{isLoading && currentPage === 1 ? (
					<div
						className={`grid mt-3 md:gap-6 gap-3
            ${selectedVet ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 md:grid-cols-4"}`}
					>
						{Array.from({ length: 8 }).map((_, index) => (
							<VetProfileSkeleton key={index} />
						))}
					</div>
				) : error ? (
					<EmptyState
						title="Failed to Load"
						description="Failed to load veterinary paraprofessionals. Please try again."
					/>
				) : transformedVets.length === 0 ? (
					<EmptyState
						title="No Paraprofessionals Found"
						description="There are no veterinary paraprofessionals available at the moment."
					/>
				) : (
					<>
						<div
							className={`grid mt-3 md:gap-6 gap-3
            ${selectedVet ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 md:grid-cols-4"}`}
						>
							{transformedVets.map((vet) => (
								<VetProfile
									key={vet.id}
									{...vet}
									onViewProfile={handleViewProfile}
									onContact={handleContact}
								/>
							))}
						</div>

						{/* Load More Button */}
						{hasMorePages && (
							<div className="flex justify-center mt-8">
								<button
									onClick={handleLoadMore}
									disabled={isLoading}
									className="px-6 py-3 bg-primary-400 text-white rounded-lg font-medium hover:bg-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{isLoading ? "Loading..." : "Load More"}
								</button>
							</div>
						)}
					</>
				)}
			</div>

			<SelectedVet
				handleContact={handleContact}
				selectedVet={selectedVet}
				selectedAction={selectedAction}
				setSelectedVet={setSelectedVet}
				refetchData={refetch}
			/>
		</section>
	);
};

export default VeterinaryParaprofessional;
