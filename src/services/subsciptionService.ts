import { usePost, useGet, useDelete, usePut } from "@/lib/hooks";
import { SUBSCRIPTION } from "@/lib/api-constants";
import { Store } from "@/types";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";


export const useSubscriptionService = () => {
    const handleSuccess = useHandleSuccess();
    const handleError = useHandleError();
    
    const useGetUserSubscription = (enabled: boolean = false) => {
        return useGet<{token: string }>(
            ["useSubscription"],
            `${SUBSCRIPTION.GET_USER_SUBSCRIPTION}`,
            {
                enabled,
                staleTime: 0,
            },
        );
    };

   
    return {
        useGetUserSubscription,
       
    };
};
