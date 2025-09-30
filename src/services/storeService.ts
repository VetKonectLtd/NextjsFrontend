import { usePost, useGet, useDelete, usePut } from "@/lib/hooks";
import { STORE } from "@/lib/api-constants";
import { Store } from "@/types";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";

// STORE service using hooks
export const useStoreService = () => {
    const handleSuccess = useHandleSuccess();
    const handleError = useHandleError();

    
    const useAddStore = () => {
        return usePost<{ pet: Store; token: string }, Store>(
            STORE.ADD_STORE,
            {
                onSuccess: (response: any) => {
                    handleSuccess(response.message || "Store added successfully!");
                },
                onError: (error) => {
                    handleError(error.message || "failed");
                },
            },
        );
    };

    
    const useGetStores = (enabled: boolean = false) => {
        return useGet<{ pet: Store; token: string }>(
            ["store"],
            `${STORE.GET_STORES}`,
            {
                enabled,
                staleTime: 0,
            },
        );
    };

    const useGetStoreById = (enabled: boolean = false, Id: string) => {
        return useGet<{ pet: Store; token: string }>(
            ["getStoreById"],
            `${STORE.GET_STORE_BY_ID(Id)}`,
            {
                enabled,
                staleTime: 0,
            },
        );
    };

    const useGetStoreByUserId = (enabled: boolean = false, Id: string) => {
        return useGet<{ pet: Store; token: string }>(
            ["getStoreByUserId"],
            `${STORE.GET_STORE_BY_USER_ID(Id)}`,
            {
                enabled,
                staleTime: 0,
            },
        );
    };

    const useUpdateStore = (Id: string) => {
        return usePost<{ pet: Store; token: string }, Store>(
            STORE.UPDATE_STORE(Id),
            {
                onSuccess: (response: any) => {
                    handleSuccess(response.message || "Store updated successfully!");
                },
                onError: (error) => {
                    handleError(error.message || "failed");
                },
            },
        );
    };

    
    const useDeleteStore = (Id: string) => {
        return useDelete<Store>(STORE.DELETE_STORE(Id), {
                onSuccess: (response: any) => {
                    handleSuccess(response.message || "Store deleted successfully!");
                },
                onError: (error) => {
                    handleError(error.message || "failed");
                },
                invalidateQueries: [["store"]],
            },);
    };

    return {
        useAddStore,
        useGetStores,
        useGetStoreById,
        useUpdateStore,
        useDeleteStore,
        useGetStoreByUserId,
    };
};
