import { usePost, useGet,  useDelete, usePut } from "@/lib/hooks";
import { LIVE_STOCK_ENDPOINTS } from "@/lib/api-constants";
import { LiveStock } from "@/types";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";

// PetOwner service using hooks
export const useLiveStockService = () => {
    const handleSuccess = useHandleSuccess();
    const handleError = useHandleError();

    
    const useAddLiveStock = () => {
        return usePost<{ livestock: LiveStock; token: string }, LiveStock>(
            LIVE_STOCK_ENDPOINTS.ADD_FARM,
            {
                onSuccess: (response: any) => {
                    handleSuccess(response.message || "Farm added successfully!");
                },
                onError: (error) => {
                    handleError(error.message || "failed");
                },
            },
        );
    };

    
    const useGetLiveStock = (enabled: boolean = false) => {
        return useGet<{ livestock: LiveStock; token: string }>(
            ["liveStocks"],
            `${LIVE_STOCK_ENDPOINTS.GET_FARMS}`,
            {
                enabled,
                staleTime: 0,
            },
        );
    };

    const useGetLiveStockById = (enabled: boolean = false, id: string) => {
        return useGet<{ livestock: LiveStock; token: string }>(
            ["getLiveStockById", id],
            `${LIVE_STOCK_ENDPOINTS.GET_FARM_BY_ID(id)}`,
            {
                enabled,
                staleTime: 0,
            },
        );
    };

    const useUpdateLiveStock = (id: string) => {
        return usePost<{ livestock: LiveStock; token: string }, LiveStock>(
            LIVE_STOCK_ENDPOINTS.UPDATE_FARM(id),
            {
                onSuccess: (response: any) => {
                    handleSuccess(response.message || "Farm updated successfully!");
                },
                onError: (error) => {
                    handleError(error.message || "failed");
                },
            },
        );
    };

    
    const useDeleteLiveStock = (id: string) => {
        return useDelete<LiveStock>(LIVE_STOCK_ENDPOINTS.DELETE_FARM(id), {
                onSuccess: (response: any) => {
                    handleSuccess(response.message || "Farm deleted successfully!");
                },
                onError: (error) => {
                    handleError(error.message || "failed");
                },
                invalidateQueries: [["liveStocks"]],
            },);
    };

    return {
        useAddLiveStock,
        useGetLiveStock,
        useGetLiveStockById,
        useUpdateLiveStock,
        useDeleteLiveStock,
    };
};
