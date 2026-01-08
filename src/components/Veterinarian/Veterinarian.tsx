"use client";

import { useState, useMemo, useEffect } from "react";
import VetProfile, { VetProfileProps } from "@/components/shared/VetProfile";
import VetProfileSkeleton from "@/components/shared/VetProfileSkeleton";
import EmptyState from "@/components/shared/EmptyState";
import SelectedVet from "./SelectedVetDetail";
import { useVeterinaryService } from "@/services/veterinaryService";
import { VetDoctorData, GetAllVetDoctorResponse } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";

// Generic veterinarian placeholder image URL from Unsplash
const GENERIC_VET_IMAGE =
	"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop";

interface VeterinarianProps {
	vets?: VetProfileProps[];
	selectedLocation?: { latitude: number; longitude: number } | null;
	selectedCountry?: { latitude: number; longitude: number } | null;
}

const Veterinarian: React.FC<VeterinarianProps> = ({
	selectedLocation,
	selectedCountry,
}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [allVets, setAllVets] = useState<VetDoctorData[]>([]);
	const [selectedVet, setSelectedVet] = useState<VetProfileProps | null>(null);
	const [selectedAction, setSelectedAction] = useState<string>("default");
	const router = useRouter();
	const searchParams = useSearchParams();


	const { useGetAllVetDoctor } = useVeterinaryService();
	const {
		data: apiData,
		isLoading,
		error,
		refetch: refetchData,
	} = useGetAllVetDoctor(currentPage);

	// Cast to actual response type since API returns data directly
	const data = apiData as unknown as GetAllVetDoctorResponse | undefined;

	// Transform API data to VetProfile props
	const transformedVets: VetProfileProps[] = useMemo(() => {
		if (!data?.veterinary_doctors?.data) return [];

		// Combine all loaded vets
		const combinedVets =
			currentPage === 1
				? data.veterinary_doctors.data
				: [...allVets, ...data.veterinary_doctors.data];

		// Update allVets state
		if (data.veterinary_doctors.data.length > 0 && currentPage > 1) {
			setAllVets(combinedVets);
		} else if (currentPage === 1) {
			setAllVets(data.veterinary_doctors.data);
		}

		return combinedVets.map((vet: VetDoctorData) => {
			const fullName = `${vet.user.first_name} ${vet.user.last_name}`;
			const location = `${vet.user.state}, ${vet.user.country}`;

			// Calculate average rating from ratings array
			const totalRatings = vet.ratings.length;
			const averageRating =
				totalRatings > 0
					? vet.ratings.reduce(
							(sum: number, r: any) => sum + (r.rating || 0),
							0,
						) / totalRatings
					: vet.average_rating;

			return {
				id: vet.id.toString(),
				name: fullName,
				location: location,
				role: vet.role,
				specialty: vet.specialty,
				image: vet.user.profile || GENERIC_VET_IMAGE,
				address: vet.address,
				rating: averageRating,
				totalRatings: totalRatings,
				isAvailable: vet.availability == 1,
				isVerified: vet.is_approved == 1,
				email: vet.user.email,
				phone: vet.user.phone_num,
				userId: vet.user_id.toString(),

				// ADD THESE
				latitude: vet.latitude,
				longitude: vet.longitude,
				state: vet.user.state,
				country: vet.user.country,
			};
		});
	}, [data, currentPage, allVets]);

	// ---------------------------------------------------
	// 1️⃣ FILTER VETS WITHIN 50KM RADIUS
	// ---------------------------------------------------
	const vetsWithinRadius = useMemo(() => {
		if (!selectedLocation) return transformedVets;

		const R = 6371;
		const calculateDistance = (
			lat1: number,
			lon1: number,
			lat2: number,
			lon2: number,
		) => {
			const dLat = (lat2 - lat1) * (Math.PI / 180);
			const dLon = (lon2 - lon1) * (Math.PI / 180);

			const a =
				Math.sin(dLat / 2) ** 2 +
				Math.cos((lat1 * Math.PI) / 180) *
					Math.cos((lat2 * Math.PI) / 180) *
					Math.sin(dLon / 2) ** 2;

			return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		};

		return transformedVets.filter((vet) => {
			if (!vet.latitude || !vet.longitude) return false;

			const dist = calculateDistance(
				selectedLocation.latitude,
				selectedLocation.longitude,
				Number(vet.latitude),
				Number(vet.longitude),
			);

			return dist <= 50;
		});
	}, [selectedLocation, transformedVets]);

	// ---------------------------------------------------
	// 2️⃣ IF NO VET NEARBY → SEARCH NEARBY STATES
	// ---------------------------------------------------
	const vetsInNearbyStates = useMemo(() => {
		if (!selectedLocation) return [];

		// get user current state based on geocode (assuming backend stores state)
		const userState = transformedVets.find(
			(v) => v.latitude && v.longitude,
		)?.state;

		if (!userState) return [];

		// find all vets NOT in the user state but in same country
		const nearbyStates = transformedVets.filter(
			(v) => v.state !== userState && v.country === "Nigeria",
		);

		return nearbyStates;
	}, [selectedLocation, transformedVets]);

	// ---------------------------------------------------
	// 3️⃣ FINAL RESULT
	// ---------------------------------------------------
	const finalFilteredVets =
		selectedLocation && vetsWithinRadius.length > 0
			? vetsWithinRadius
			: selectedLocation && vetsWithinRadius.length === 0
				? vetsInNearbyStates
				: transformedVets;

	useEffect(() => {
		const vetId = searchParams.get("vet");
		if (vetId) {
			const vet = transformedVets.find((v) => v.id === vetId);
			if (vet) {
				setSelectedVet(vet);
			}
		}
	}, [searchParams, transformedVets]);

	const handleViewProfile = (id: string) => {
		const vet = transformedVets.find((v) => v.id === id) || null;
		setSelectedVet(vet);
		router.push(`?vet=${id}`);
	};

	const handleContact = (
		id: string,
		type:
			| "phone"
			| "media"
			| "message"
			| "mail"
			| "location"
			| "share"
			| "rate",
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
			setSelectedAction(type);
		}
	};

	const handleLoadMore = () => {
		if (data?.veterinary_doctors?.next_page_url) {
			setCurrentPage((prev) => prev + 1);
		}
	};

	const hasMorePages = data?.veterinary_doctors?.next_page_url !== null;

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
						description="Failed to load veterinarians. Please try again."
					/>
				) : finalFilteredVets.length === 0 ? (
					<EmptyState
						title="No Veterinarians Found"
						description="There are no veterinarians available at the moment."
					/>
				) : (
					<>
						<div
							className={`grid mt-3 md:gap-6 gap-3
            ${selectedVet ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 md:grid-cols-4"}`}
						>
							{finalFilteredVets.map((vet: any) => (
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
				refetchData={refetchData}
			/>
		</section>
	);
};

export default Veterinarian;
