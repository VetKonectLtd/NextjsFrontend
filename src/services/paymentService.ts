import { usePost } from "@/lib/hooks";
import { PAYMENTS, USER_ENDPOINTS } from "@/lib/api-constants";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";
import { Payment } from "@/types";

export const usePaymentService = () => {
  const handleSuccess = useHandleSuccess();
  const handleError = useHandleError();

  const useOrderPayment = () => {
    return usePost<Payment>(PAYMENTS.CREATE_PAYMENT_ORDER, {
      onSuccess: (response: any) => {
        handleSuccess(
          response.message || "Payment order created successfully!",
        );
      },
      onError: (error) => {
        handleError(error.message || "failed");
      },
    });
  };

  const usePayment = () => {
    return usePost<Payment>(PAYMENTS.CREATE_PAYMENT, {
      onSuccess: (response: any) => {
        handleSuccess(
          response.message || "Payment order created successfully!",
        );
      },
      onError: (error) => {
        handleError(error.message || "failed");
      },
    });
  };

  const useAddPaymentDetails = () => {
    return usePost<Payment>(USER_ENDPOINTS.ADD_PAYMENT_DETAILS, {
      onSuccess: (response: any) => {
        handleSuccess(response.message || "Payment added successfully!");
      },
      onError: (error) => {
        handleError(error.message || "failed");
      },
    });
  };

  return {
    useOrderPayment,
    usePayment,
    useAddPaymentDetails,
  };
};
