import { usePost, useGet, useDelete, usePut } from "@/lib/hooks";
import { PRODUCTS } from "@/lib/api-constants";
import { Product } from "@/types";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";

// STORE service using hooks
export const useProductService = () => {
	const handleSuccess = useHandleSuccess();
	const handleError = useHandleError();

	const useAddProduct = () => {
		return usePost<{ product: Product; token: string }, Product>(
			PRODUCTS.ADD_PRODUCT,
			{
				onSuccess: (response: any) => {
					handleSuccess(response.message || "Product added successfully!");
				},
				onError: (error) => {
					handleError(error.message || "failed");
				},
			},
		);
	};

	const useGetProductByStore = (enabled: boolean = false, Id: string, page: number = 1) => {
		const queryParams = new URLSearchParams();
		queryParams.append("page", page.toString());
		const url = `${PRODUCTS.GET_PRODUCT_BY_STORE(Id)}?${queryParams.toString()}`;
		return useGet<Product>(
			["productByStore", page.toString()],
			url,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	const useGetAllProduct = (enabled: boolean = false, page: number = 1) => {
		const queryParams = new URLSearchParams();
		queryParams.append("page", page.toString());
		const url = `${PRODUCTS.GET_ALL_PRODUCTS}?${queryParams.toString()}`;
		return useGet<{ product: Product }>(
			["Allproducts", page.toString()],
			url,
			{
				enabled,
				keepPreviousData: true,
				staleTime: 0,
			},
		);
	};
	
	const useGetProductByUserId = (enabled: boolean = false, Id: string) => {
		return useGet<{ product: Product; token: string }>(
			["productByUserId"],
			`${PRODUCTS.GET_PRODUCT_BY_USER_ID(Id)}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	const useGetProductById = (enabled: boolean = false, Id: string) => {
		return useGet<{ product: Product; token: string }>(
			["productById"],
			`${PRODUCTS.GET_PRODUCT_BY_ID(Id)}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	const useGetRelatedProduct = (enabled: boolean = false, Id: string) => {
		return useGet<{ product: Product; token: string }>(
			["relatedProduct"],
			`${PRODUCTS.GET_RELATED_PRODUCT(Id)}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	const useGetProductNotOnStore = (enabled: boolean = false) => {
		return useGet<{ product: Product; token: string }>(
			["productNotOnStore"],
			`${PRODUCTS.GET_PRODUCT_NOT_ON_STORE}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	const useUpdateProduct = (Id: string) => {
		return usePost<{ product: Product; token: string }, Product>(
			PRODUCTS.UPDATE_PRODUCT(Id),
			{
				onSuccess: (response: any) => {
					handleSuccess(response.message || " Product updated successfully!");
				},
				onError: (error) => {
					handleError(error.message || "failed");
				},
			},
		);
	};

	const useDeleteProduct = (Id: string) => {
		return useDelete<any>(PRODUCTS.DELETE_PRODUCT(Id), {
			onSuccess: (response: any) => {
				handleSuccess(response.message || "Product deleted successfully!");
			},
			onError: (error) => {
				handleError(error.message || "failed");
			},
			invalidateQueries: [["product"]],
		});
	};

	return {
		useAddProduct,
		useGetProductByStore,
		useDeleteProduct,
		useUpdateProduct,
		useGetProductNotOnStore,
		useGetRelatedProduct,
		useGetProductByUserId,
		useGetProductById,
		useGetAllProduct,
	};
};
