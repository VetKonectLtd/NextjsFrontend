import { usePost, useGet, useDelete, usePut } from "@/lib/hooks";
import { CLINIC } from "@/lib/api-constants";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";
import { ClinicListing } from "@/types";

export const useClinicService = () => {
	const handleSuccess = useHandleSuccess();
	const handleError = useHandleError();

	const useAddClinic = () => {
		return usePost<{ clinic: ClinicListing; token: string }, ClinicListing>(
			CLINIC.ADD_CLINIC,
			{
				onSuccess: (response: any) => {
					handleSuccess(response.message || "Clinic added successfully!");
				},
				onError: (error) => {
					handleError(error.message || "failed");
				},
			},
		);
	};

	const useGetClinicById = (enabled: boolean = false, id: string) => {
		return useGet<any>(["getClinicById"], CLINIC.GET_CLINIC_BY_ID(id), {
			enabled,
			staleTime: 0,
		});
	};

	return {
		useAddClinic,
		useGetClinicById,
	};
};
