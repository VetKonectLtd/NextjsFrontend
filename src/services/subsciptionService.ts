import { usePost, useGet, useDelete, usePut } from "@/lib/hooks";
import { SUBSCRIPTION } from "@/lib/api-constants";
import { Store } from "@/types";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";

export const useSubscriptionService = () => {
  const handleSuccess = useHandleSuccess();
  const handleError = useHandleError();

  const useGetUserSubscription = (enabled: boolean = false) => {
    return useGet<{ token: string }>(
      ["useSubscription"],
      `${SUBSCRIPTION.GET_USER_SUBSCRIPTION}`,
      {
        enabled,
        staleTime: 0,
      },
    );
  };

  const useInitiateSubscription = () => {
    return usePost<{ token: string }>(SUBSCRIPTION.INITIATE_SUBSCRIPTION, {
      onSuccess: (data) => {
        handleSuccess("Subscription initiated successfully");
      },
      onError: (error) => {
        handleError("Failed to initiate subscription");
      },
    });
  };

  return {
    useGetUserSubscription,
    useInitiateSubscription,
  };
};
