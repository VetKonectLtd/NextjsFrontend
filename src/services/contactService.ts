import { usePost, useGet, useDelete, usePut } from "@/lib/hooks";
import { CONTACT_US } from "@/lib/api-constants";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";
import { Contact_us } from "@/types";

export const useContactService = () => {
  const handleSuccess = useHandleSuccess();
  const handleError = useHandleError();

  const useAddToNewletter = () => {
    return usePost<{ email: string }>(CONTACT_US.ADD_TO_NEWSLETTER, {
      onSuccess: (response: any) => {
        handleSuccess(
          response.message || "Email added to newsletter successfully!",
        );
      },
      onError: (error) => {
        handleError(error.message || "failed");
      },
    });
  };

  const useContactUs = () => {
    return usePost<{ contact: Contact_us }>(CONTACT_US.CONTACT_US, {
      onSuccess: (response: any) => {
        handleSuccess(response.message || "Message sent successfully!");
      },
      onError: (error) => {
        handleError(error.message || "failed");
      },
    });
  };

  return {
    useContactUs,
    useAddToNewletter,
  };
};
