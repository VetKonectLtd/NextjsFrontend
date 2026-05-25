import { usePost } from "@/lib/hooks";
import { SUPPORT } from "@/lib/api-constants";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";
import { SupportTicket } from "@/types";

export const useSupportService = () => {
  const handleSuccess = useHandleSuccess();
  const handleError = useHandleError();

  const useSupportComplian = () => {
    return usePost<{ support: SupportTicket }>(SUPPORT.SUPPORT_TICKET, {
      onSuccess: (response: any) => {
        handleSuccess(
          response.message || "Support ticket submitted successfully!",
        );
      },
      onError: (error) => {
        handleError(error.message || "failed");
      },
    });
  };

  return {
    useSupportComplian,
  };
};
