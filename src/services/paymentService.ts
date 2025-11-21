import { usePost } from "@/lib/hooks";
import { PAYMENTS} from "@/lib/api-constants";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";

export const usePaymentService = () => {
    const handleSuccess = useHandleSuccess();
    const handleError = useHandleError();

    const useOrderPayment= () => {
        return usePost<any>(
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
 

    return {
       useOrderPayment,
    };
};
