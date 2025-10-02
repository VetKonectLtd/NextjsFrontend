import { usePost, useGet } from "@/lib/hooks";
import { VETERINARY_ENDPOINTS } from "@/lib/api-constants";
import {
	VeterinaryDoctor,
	GetNearestVetsRequest,
	GetNearestVetsResponse,
	VetDoctor,
} from "@/types";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";

// Veterinary service using hooks
export const useVeterinaryService = () => {
	const handleSuccess = useHandleSuccess();
	const handleError = useHandleError();

	// GET request using useGet hook with mutation-like interface
	const useGetNearestVets = (request: GetNearestVetsRequest, enabled: boolean = true) => {
		const queryParams = new URLSearchParams();
		queryParams.append('longitude', request.longitude.toString());
		queryParams.append('latitude', request.latitude.toString());
		if (request.page) queryParams.append('page', request.page.toString());

		const url = `${VETERINARY_ENDPOINTS.GET_NEAREST_DOCTORS}?${queryParams.toString()}`;

		return useGet<GetNearestVetsResponse>(
			["nearestVets", request.latitude.toString(), request.longitude.toString(), (request.page || 1).toString()],
			url,
			{
				enabled,
				staleTime: 5 * 60 * 1000, // 5 minutes
			}
		);
	};

	const useAddVetDoctor = () => {
			return usePost<{ store: VetDoctor; token: string }, VetDoctor>(
				VETERINARY_ENDPOINTS.ADD_VET_DOCTOR,
				{
					onSuccess: (response: any) => {
						handleSuccess(response.message || "Category updated successfully!");
					},
					onError: (error) => {
						handleError(error.message || "failed");
					},
				},
			);
		};

	const useGetAllVetDoctor = (enabled: boolean = false) => {
			return useGet<{ vetDoctor: VeterinaryDoctor; token: string }>(
				["vetDoctor"],
				`${VETERINARY_ENDPOINTS.GET_ALL_VET_DOCTOR}`,
				{
					enabled,
					staleTime: 0,
				},
			);
		};

	return {
		useGetNearestVets,
		useAddVetDoctor,
		useGetAllVetDoctor
	};
};

// Helper function to transform API response to component props format
export const transformVetDataToProps = (apiVets: VeterinaryDoctor[], defaultImages: any[]) => {
	return apiVets.map((vet, index) => ({
		id: vet.id,
		name: vet.name,
		location: vet.location,
		image: defaultImages[index % defaultImages.length], // Use default images cyclically
		rating: vet.rating,
		totalRatings: vet.totalRatings,
		isAvailable: vet.isAvailable,
		isVerified: vet.isVerified,
		// Additional data that might be useful
		email: vet.email,
		phone: vet.phone,
		specialization: vet.specialization,
		distance: vet.distance,
		experience: vet.experience,
		clinicName: vet.clinicName,
		clinicAddress: vet.clinicAddress,
		consultationFee: vet.consultationFee,
		availableHours: vet.availableHours,
	}));
};

// Empty data design for development and testing
export const createEmptyVetData = (): GetNearestVetsResponse => ({
	message: "success",
	veterinary_doctors: {
		current_page: 1,
		data: [],
		first_page_url: "",
		from: null,
		last_page: 1,
		last_page_url: "",
		links: [],
		next_page_url: null,
		path: "",
		per_page: 10,
		prev_page_url: null,
		to: null,
		total: 0,
	},
});

