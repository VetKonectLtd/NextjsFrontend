import { usePost, useGet, useDelete, usePut } from "@/lib/hooks";
import { STORE } from "@/lib/api-constants";
import { Store } from "@/types";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";

// STORE service using hooks
export const useStoreService = () => {
    const handleSuccess = useHandleSuccess();
    const handleError = useHandleError();

    
    const useAddStore = () => {
        return usePost<{ store: Store; token: string }, Store>(
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

    const useAddVendor = () => {
        return usePost<{ store: Store }>(
            STORE.ADD_VENDOR,
            {
                onSuccess: (response: any) => {
                    // handleSuccess(response.message || "Store added successfully!");
                },
                onError: (error) => {
                    handleError(error.message || "failed");
                },
            },
        );
    };

    
    const useGetStores = (enabled: boolean = false, page: number = 1) => {
        const queryParams = new URLSearchParams();
        queryParams.append("page", page.toString());
        const url = `${STORE.GET_STORES}?${queryParams.toString()}`;
        return useGet<{ store: Store; token: string }>(
            ["store"],
            url,
            {
                enabled,
                staleTime: 0,
            },
        );
    };



    const useGetStoreById = (enabled: boolean = false, Id: string) => {
        return useGet<{ store: Store; token: string }>(
            ["getStoreById"],
            `${STORE.GET_STORE_BY_ID(Id)}`,
            {
                enabled,
                staleTime: 0,
            },
        );
    };

    const useGetStoreByUserId = (enabled: boolean = false, user_id: string, page: number = 1) => {
        const queryParams = new URLSearchParams();
        queryParams.append("page", page.toString());
        const url = `${STORE.GET_STORE_BY_USER_ID(user_id)}?${queryParams.toString()}`;
        return useGet<{ store: Store; token: string }>(
            ["getStoreByUserId", page.toString()],
            url,
            {
                enabled,
                staleTime: 0,
            },
        );
    };

    const useUpdateStore = (Id: string) => {
        return usePost<{ store: Store; token: string }, Store>(
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
        useAddVendor
    };
};
