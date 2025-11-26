import { useGet, usePost } from "@/lib/hooks";
import { ORDER } from "@/lib/api-constants";
import { useHandleError, useHandleSuccess } from "@/lib/hooks/useToastHandlers";

export const useOrderService = () => {
	const handleSuccess = useHandleSuccess();
	const handleError = useHandleError();

	const useGetBuyersOrder = (enabled: boolean = false, page: number = 1) => {
		const queryParams = new URLSearchParams();
		queryParams.append("page", page.toString());
		const url = `${ORDER.GET_BUYER_ORDERS}?${queryParams.toString()}`;
		return useGet<any>(["buyersOrder", page.toString()], url, {
			enabled,
			keepPreviousData: true,
			staleTime: 0,
		});
	};


	const useGetMerchantOrder = (enabled: boolean = false, page: number = 1) => {
		const queryParams = new URLSearchParams();
		queryParams.append("page", page.toString());
		const url = `${ORDER.GET_MERCHANT_ORDERS}?${queryParams.toString()}`;
		return useGet<any>(["merchantOrder", page.toString()], url, {
			enabled,
			keepPreviousData: true,
			staleTime: 0,
		});
	};

	const useGetOrderById = (enabled: boolean = false, id: string) => {
		return useGet<any>(["orderById"], ORDER.GET_ORDER_BY_ID(id), {
			enabled,
			staleTime: 0,
		});
	}

	const useCancelOrder = (enabled: boolean = false, id: string) => {
		return usePost<{ message: string }>(ORDER.CANCELLED_ORDER(id), {
			onSuccess: (response) => {
				handleSuccess(response.message || "Order cancelled successfully!");
			},
			onError: (error) => {
				handleError(error.message, "Order cancellation failed");
			},
		});
	};

	const useConfirmOrder = (enabled: boolean = false, id: string) => {
		return usePost<{ message: string }>(ORDER.CONFIRM_ORDER(id), {
			onSuccess: (response) => {
				handleSuccess(response.message || "Order confirmed successfully!");
			},
			onError: (error) => {
				handleError(error.message, "Order confirmation failed");
			},
		});
	};

	const useCompaintOrder = (enabled: boolean = false, id: string) => {
		return usePost<{ message: string }>(ORDER.ORDER_COMPLAINT(id), {
			onSuccess: (response) => {
				handleSuccess(
					response.message || "Order complaint submitted successfully!",
				);
			},
			onError: (error) => {
				handleError(error.message, "Order complaint submission failed");
			},
		});
	};

	return {
		useGetBuyersOrder,
		useGetMerchantOrder,
		useCancelOrder,
		useConfirmOrder,
		useCompaintOrder,
		useGetOrderById,
	};
};
