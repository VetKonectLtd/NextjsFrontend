import { usePost, useGet, useDelete, usePut } from "@/lib/hooks";
import { CLINIC, VETERINARY_CLINIC } from "@/lib/api-constants";
import {  VetClinic, GetAllVetClinicResponse } from "@/types";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";


export const useVeterinaryClinicService = () => {
    const handleSuccess = useHandleSuccess();
    const handleError = useHandleError();

    
    const useAddVetClinic = () => {
        return usePost<{ vetClinic: VetClinic; token: string }, VetClinic>(
            VETERINARY_CLINIC.ADD_VET_CLINIC,
            {
                onSuccess: (response: any) => {
                    handleSuccess(response.message || "Category  updated successfully!");
                },
                onError: (error) => {
                    handleError(error.message || "failed");
                },
            },
        );
    };

    const useGetVetClinicById = (enabled: boolean = false, id: string) => {
            return useGet<any>(["getVetParaById"], VETERINARY_CLINIC.GET_VET_CLINIC_BY_ID(id), {
                enabled,
                staleTime: 0,
            });
        };


    const useGetAllVetClinic = (page: number = 1, enabled: boolean = true) => {
        const queryParams = new URLSearchParams();
        queryParams.append('page', page.toString());

        const url = `${VETERINARY_CLINIC.GET_ALL_VET_CLINIC}?${queryParams.toString()}`;

        return useGet<GetAllVetClinicResponse>(
            ["allVetClinics", page.toString()],
            url,
            {
                enabled,
                staleTime: 5 * 60 * 1000, // 5 minutes
            },
        );
    };

    const useGetClinicAndVetClinic = (
		enabled: boolean = false,
		page: number = 1,
	) => {
		const queryParams = new URLSearchParams();
		queryParams.append("page", page.toString());

		const url = `${CLINIC.GET_CLINIC_AND_VET_CLINIC}?${queryParams.toString()}`;
		return useGet<any>(["getClinicAndVetClinic", page.toString()], url, {
			enabled,
			keepPreviousData: true,
			staleTime: 0,
		});
	};

    return {
      useAddVetClinic,
      useGetAllVetClinic,
      useGetVetClinicById,
      useGetClinicAndVetClinic
    };
};
