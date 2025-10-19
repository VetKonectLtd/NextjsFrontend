import { usePost, useGet, useDelete, usePut } from "@/lib/hooks";
import { VETERINARY_PARAPROFESSIONAL } from "@/lib/api-constants";
import {  VetParaprofessional, GetAllVetParaprofessionalResponse } from "@/types";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";


export const useVeterinaryParaprofessionalService = () => {
    const handleSuccess = useHandleSuccess();
    const handleError = useHandleError();

    
    const useAddVetProfessional = () => {
        return usePost<{ vetPara: VetParaprofessional; token: string }, VetParaprofessional>(
            VETERINARY_PARAPROFESSIONAL.ADD_VET_PROFESSIONAL,
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



    const useGetAllVetParaprofessional = (page: number = 1, enabled: boolean = true) => {
        const queryParams = new URLSearchParams();
        queryParams.append('page', page.toString());

        const url = `${VETERINARY_PARAPROFESSIONAL.GET_ALL_VET_PARAPROFESSIONAL}?${queryParams.toString()}`;

        return useGet<GetAllVetParaprofessionalResponse>(
            ["allVetParaprofessionals", page.toString()],
            url,
            {
                enabled,
                staleTime: 5 * 60 * 1000, // 5 minutes
            },
        );
    };

    return {
      useAddVetProfessional,
      useGetAllVetParaprofessional
    };
};
