"use client";

import { useState, useMemo, useEffect } from "react";
import ClinicProfile, { ClinicProfileProps } from "../shared/ClinicProfile";
import VetProfileSkeleton from "@/components/shared/VetProfileSkeleton";
import EmptyState from "@/components/shared/EmptyState";
import SelectedClinic from "./SelectedClinic";
import { useVeterinaryClinicService } from "@/services/veterinaryClinicService";
import { VetClinicData, GetAllVetClinicResponse } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { address, tr } from "framer-motion/client";

// Generic veterinarian placeholder image URL from Unsplash
const GENERIC_VET_IMAGE = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop";

interface VetClinicProps {
    clinics?: ClinicProfileProps[];
    selectedLocation?: { latitude: number; longitude: number } | null;
}

const VetClinic: React.FC<VetClinicProps> = ({selectedLocation}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [allClinics, setAllClinics] = useState<VetClinicData[]>([]);
    const [selectedClinic, setSelectedClinic] = useState<ClinicProfileProps | null>(null);
    const [selectedAction, setSelectedAction] = useState<string>("default");
    const router = useRouter();
    const searchParams = useSearchParams();

    const { useGetAllVetClinic, useGetClinicAndVetClinic } = useVeterinaryClinicService();

    const { data: apiData, isLoading, error , refetch: refetchData} = useGetClinicAndVetClinic(true, currentPage);
    console.log("clinicAndVetReq", apiData);
    // const { data: apiData, isLoading, error , refetch: refetchData} = useGetAllVetClinic(currentPage);
    
    // Cast to actual response type since API returns data directly
    const data:any = apiData as unknown as GetAllVetClinicResponse | undefined;


    /*
  ---------------------------------------------------
  MERGE CLINICS + VETCLINICS
  ---------------------------------------------------
  */

  const mergedClinics = useMemo(() => {
    if (!data) return [];

    const clinics = data?.clinic?.data || [];
    const vetClinics = data?.vetClinic?.data || [];

    return [...clinics, ...vetClinics];
  }, [data]);

  /*
  ---------------------------------------------------
  PAGINATION MERGE
  ---------------------------------------------------
  */

  useEffect(() => {
    if (!mergedClinics.length) return;

    setAllClinics((prev) => {
      const newClinics = mergedClinics.filter(
        (c) => !prev.some((p) => p.id === c.id)
      );

      return currentPage === 1 ? mergedClinics : [...prev, ...newClinics];
    });
  }, [mergedClinics, currentPage]);

  

   /*
  ---------------------------------------------------
  TRANSFORM DATA
  ---------------------------------------------------
  */

 const transformedClinics: ClinicProfileProps[] = useMemo(() => {
  if (!data) return [];

  const clinics = data?.clinic?.data || [];
  const vetClinics = data?.vetClinic?.data || [];

  const formattedClinics: ClinicProfileProps[] = clinics.map((clinic: any) => ({
    id: `clinic-${clinic.id}`,
    name: clinic.clinic_name,
    location: clinic.location,
    role: "Clinic",
    specialty: clinic.clinic_speciality,
    image: clinic.picture_url || GENERIC_VET_IMAGE,

    rating: 0,
    totalRatings: 0,

    address: clinic.location,
    isAvailable: clinic.availability == 1,
    isVerified: clinic.status === "confirm_pending" ? false : true,

    email: clinic.email,
    phone: clinic.phone_number,
    userId: clinic.user_id,

    latitude: clinic.latitude,
    longitude: clinic.longitude,

    state: "",
    country: "",
  }));

  const formattedVetClinics: ClinicProfileProps[] = vetClinics.map(
    (clinic: any) => {
      const totalRatings = clinic.ratings?.length || 0;

      const avgRating =
        totalRatings > 0
          ? clinic.ratings.reduce(
              (sum: number, r: any) => sum + (r.rating || 0),
              0
            ) / totalRatings
          : clinic.average_rating;
          
      return {
        id: `vet-${clinic.id}`,
        name: clinic.name_of_clinic,
        location: clinic.address,
        role: clinic.role,
        specialty: clinic.specialty,

        image:
          clinic?.user?.profile?.profile_image_url ||
          GENERIC_VET_IMAGE,

        rating: avgRating,
        totalRatings,

        address: clinic.address,
        isAvailable: clinic.availability == 1,
        isVerified: clinic.is_approved == 1,

        email: clinic?.user?.email,
        phone: clinic.contact_num,
        userId: clinic.user_id,

        latitude: clinic.latitude,
        longitude: clinic.longitude,

        state: clinic?.user?.state,
        country: clinic?.user?.country,
      };
    }
  );

  return [...formattedClinics, ...formattedVetClinics];
}, [data]);


    // ---------------------------------------------------
	// 1️⃣ FILTER VETS WITHIN 50KM RADIUS
	// ---------------------------------------------------
	const vetsWithinRadius = useMemo(() => {
		if (!selectedLocation) return transformedClinics;

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

		return transformedClinics.filter((clinic) => {
			if (!clinic.latitude || !clinic.longitude) return false;

			const dist = calculateDistance(
				selectedLocation.latitude,
				selectedLocation.longitude,
				Number(clinic.latitude),
				Number(clinic.longitude),
			);

			return dist <= 50;
		});
	}, [selectedLocation, transformedClinics]);

	// ---------------------------------------------------
	// 2️⃣ IF NO VET NEARBY → SEARCH NEARBY STATES
	// ---------------------------------------------------
	const vetsInNearbyStates = useMemo(() => {
		if (!selectedLocation) return [];

		// get user current state based on geocode (assuming backend stores state)
		const userState = transformedClinics.find(
			(v) => v.latitude && v.longitude,
		)?.state;

		if (!userState) return [];

		// find all vets NOT in the user state but in same country
		const nearbyStates = transformedClinics.filter(
			(v) => v.state !== userState && v.country === "Nigeria",
		);

		return nearbyStates;
	}, [selectedLocation, transformedClinics]);

	// ---------------------------------------------------
	// 3️⃣ FINAL RESULT
	// ---------------------------------------------------
	const finalFilteredClinic =
		selectedLocation && vetsWithinRadius.length > 0
			? vetsWithinRadius
			: selectedLocation && vetsWithinRadius.length === 0
				? vetsInNearbyStates
				: transformedClinics;

    useEffect(() => {
            const vetId = searchParams.get("clinic");
            if (vetId) {
                const clinic = transformedClinics.find((v) => v.id === vetId);
                if (clinic) {
                    setSelectedClinic(clinic);
                }
            }
        }, [searchParams, transformedClinics]);

    const handleViewProfile = (id: string) => {
        const clinic = transformedClinics.find((v) => v.id === id) || null;
        setSelectedClinic(clinic);
        router.push(`?clinic=${id}`);
    };

    const handleContact = (
        id: string,
        type: "phone" | "media" | "message" | "mail" | "location" | "share" | "rate",
    ) => {
        const clinic = transformedClinics.find((v) => v.id === id);
        
        if (type === "phone" && clinic?.phone) {
            window.location.href = `tel:${clinic.phone}`;
        } else if (type === "mail" && clinic?.email) {
            window.location.href = `mailto:${clinic.email}`;
        } else if (type === "message") {
            // Open clinic profile and navigate to message section
            handleViewProfile(id);
            setSelectedAction("message");
        } else {
            setSelectedAction(type);
        }
    };

    
    const handleLoadMore = () => {
    if (data?.clinic?.next_page_url || data?.vetClinic?.next_page_url) {
        setCurrentPage((prev) => prev + 1);
    }
};

    const hasMorePages =
    data?.clinic?.next_page_url || data?.vetClinic?.next_page_url;

    return (
        <section
            className={`grid gap-6 mt-3 transition-all duration-300 
        ${selectedClinic ? "lg:grid-cols-4" : "lg:grid-cols-4"}`}
        >
            <div
                className={`transition-all duration-300 
          ${selectedClinic ? "lg:col-span-2 md:block hidden" : "lg:col-span-4"}`}
            >
                {isLoading && currentPage === 1 ? (
                    <div
                        className={`grid mt-3 md:gap-6 gap-3
            ${selectedClinic ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 md:grid-cols-4"}`}
                    >
                        {Array.from({ length: 8 }).map((_, index) => (
                            <VetProfileSkeleton key={index} />
                        ))}
                    </div>
                ) : error ? (
                    <EmptyState
                        title="Failed to Load"
                        description="Failed to load veterinary clinics. Please try again."
                    />
                ) : finalFilteredClinic.length === 0 ? (
                    <EmptyState
                        title="No Clinics Found"
                        description="There are no veterinary clinics available at the moment."
                    />
                ) : (
                    <>
                        <div
                            className={`grid mt-3 md:gap-6 gap-3
            ${selectedClinic ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 md:grid-cols-4"}`}
                        >
                            {finalFilteredClinic.map((clinic) => (
                                <ClinicProfile
                                    key={clinic.id}
                                    {...clinic}
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

                <SelectedClinic
                    handleContact={handleContact}
                    selectedClinic={selectedClinic}
                    selectedAction={selectedAction}
                    setSelectedClinic={setSelectedClinic}
                    refetchData={refetchData}
                />
        
        </section>
    );
};

export default VetClinic;
