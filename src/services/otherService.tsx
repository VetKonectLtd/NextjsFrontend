import { usePost } from "@/lib/hooks";
import {  OTHERS } from "@/lib/api-constants";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";

// PetOwner service using hooks
export const useOtherService = () => {
    const handleSuccess = useHandleSuccess();
    const handleError = useHandleError();


     const useOthers = () => {
        return usePost<{ others:any}>(
            OTHERS.ADD_OTHERS,
            {
                onSuccess: (response: any) => {
                    // handleSuccess(response.message || "Farm added successfully!");
                },
                onError: (error) => {
                    handleError(error.message || "failed");
                },
            },
        );
    };

    

    return {
        useOthers
    };

};
