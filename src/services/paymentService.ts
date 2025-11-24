import { usePost } from "@/lib/hooks";
import { PAYMENTS} from "@/lib/api-constants";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";
import { Payment } from "@/types";

export const usePaymentService = () => {
    const handleSuccess = useHandleSuccess();
    const handleError = useHandleError();

    const useOrderPayment= () => {
        return usePost<Payment>(
            PAYMENTS.CREATE_PAYMENT_ORDER,
            {
                onSuccess: (response: any) => {
                    handleSuccess(response.message || "Payment order created successfully!");
                },
                onError: (error) => {
                    handleError(error.message || "failed");
                },
            },
        );
    };

    const usePayment= () => {
        return usePost<Payment>(
            PAYMENTS.CREATE_PAYMENT,
            {
                onSuccess: (response: any) => {
                    handleSuccess(response.message || "Payment order created successfully!");
                },
                onError: (error) => {
                    handleError(error.message || "failed");
                },
            },
        );
    };
 

    return {
       useOrderPayment,
        usePayment,
    };
};
