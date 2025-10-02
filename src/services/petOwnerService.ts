import { usePost, useGet, useDelete, usePut } from "@/lib/hooks";
import { PET_OwNER_ENDPOINTS } from "@/lib/api-constants";
import { PetOwner } from "@/types";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";

// PetOwner service using hooks
export const usePetOwnerService = () => {
	const handleSuccess = useHandleSuccess();
	const handleError = useHandleError();

	const useAddPet = () => {
		return usePost<{ pet: PetOwner; token: string }, PetOwner>(
			PET_OwNER_ENDPOINTS.ADD_PET,
			{
				onSuccess: (response: any) => {
					handleSuccess(response.message || "Pet added successfully!");
				},
				onError: (error) => {
					handleError(error.message || "failed");
				},
			},
		);
	};

	const useAddPetOwner = () => {
		return usePost<{ pet: PetOwner }>(
			PET_OwNER_ENDPOINTS.ADD_PET_OWNER,
			{
				onSuccess: (response: any) => {
					// handleSuccess(response.message || "Pet added successfully!");
				},
				onError: (error) => {
					handleError(error.message || "failed");
				},
			},
		);
	};

	const useGetPetOwners = (enabled: boolean = false) => {
		return useGet<{ pet: PetOwner; token: string }>(
			["petOwner"],
			`${PET_OwNER_ENDPOINTS.GET_PETS}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	const useGetPetOwnerById = (enabled: boolean = false, petId: string) => {
		return useGet<{ pet: PetOwner; token: string }>(
			["getPetOwnerById"],
			`${PET_OwNER_ENDPOINTS.GET_PET_BY_ID(petId)}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	const useUpdatePetOwner = (petId: string) => {
		return usePost<{ pet: PetOwner; token: string }, PetOwner>(
			PET_OwNER_ENDPOINTS.UPDATE_PET(petId),
			{
				onSuccess: (response: any) => {
					handleSuccess(response.message || "Pet updated successfully!");
				},
				onError: (error) => {
					handleError(error.message || "failed");
				},
			},
		);
	};

	const useDeletePetOwner = (petId: string) => {
		return useDelete<PetOwner>(PET_OwNER_ENDPOINTS.DELETE_PET(petId), {
			onSuccess: (response: any) => {
				handleSuccess(response.message || "Pet deleted successfully!");
			},
			onError: (error) => {
				handleError(error.message || "failed");
			},
			invalidateQueries: [["petOwner"]],
		});
	};

	return {
		useAddPet,
		useGetPetOwners,
		useGetPetOwnerById,
		useUpdatePetOwner,
		useDeletePetOwner,
		useAddPetOwner,
	};
};
