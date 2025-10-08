import { usePost, useGet, useDelete, usePut } from "@/lib/hooks";
import { VETERINARY_CLINIC } from "@/lib/api-constants";
import {  VetClinic } from "@/types";
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



    return {
      useAddVetClinic
    };
};
