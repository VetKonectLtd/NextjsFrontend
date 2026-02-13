import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { resolveClient, ApiType } from "@/lib/api/clientResolver";
import { ApiResponse } from "@/types";

// Generic GET hook
export function useGet<T>(
	key: string[],
	endpoint: string,
	options?: {
		enabled?: boolean;
		staleTime?: number;
		api?: ApiType;
		cacheTime?: number;
		keepPreviousData?: boolean;
		disableAuthRedirect?: boolean;
		onError?: (error: Error) => void;
	},
) {
	const client = resolveClient(options?.api);

	return useQuery({
		queryKey: key,
		queryFn: async () => {
			try {
				return await client.get<T>(endpoint, options?.disableAuthRedirect);
			} catch (error: any) {
				if (
					error.message?.includes("Unauthorized") &&
					options?.disableAuthRedirect
				) {
					return {
						success: false,
						data: null,
						message: "Authentication required",
						error: "UNAUTHORIZED",
					};
				}
				throw error;
			}
		},
		enabled: options?.enabled ?? true,
		staleTime: options?.staleTime,
		cacheTime: options?.cacheTime,
		keepPreviousData: options?.keepPreviousData,
	});
}

// Generic POST hook
export function usePost<TData, TVariables = any>(
	endpoint: string,
	options?: {
		api?: ApiType;
		onSuccess?: (data: ApiResponse<TData>, variables: TVariables) => void;
		onError?: (error: Error) => void;
		invalidateQueries?: string[][];
		disableAuthRedirect?: boolean;
	},
) {
	const queryClient = useQueryClient();
	const client = resolveClient(options?.api);

	return useMutation({
		mutationFn: async (variables: TVariables) => {
			try {
				return await client.post<TData>(
					endpoint,
					variables,
					options?.disableAuthRedirect,
				);
			} catch (error: any) {
				if (
					error.message?.includes("Unauthorized") &&
					options?.disableAuthRedirect
				) {
					throw new Error("UNAUTHORIZED");
				}
				throw error;
			}
		},
		onSuccess: (response, variables) => {
			if (options?.onSuccess) {
				options.onSuccess(response, variables);
			}

			// Invalidate specified queries
			if (options?.invalidateQueries) {
				options.invalidateQueries.forEach((queryKey) => {
					queryClient.invalidateQueries({ queryKey });
				});
			}
		},
		onError: (error: Error) => {
			if (options?.onError) {
				options.onError(error);
			}
		},
	});
}

// Generic PUT hook
export function usePut<TData, TVariables = any>(
	endpoint: string,
	options?: {
		api?: ApiType;
		onSuccess?: (data: ApiResponse<TData>) => void;
		onError?: (error: Error) => void;
		invalidateQueries?: string[][];
		disableAuthRedirect?: boolean;
	},
) {
	const queryClient = useQueryClient();
	const client = resolveClient(options?.api);

	return useMutation({
		mutationFn: async (data: TVariables) => {
			try {
				return await client.put<TData>(
					endpoint,
					data,
					options?.disableAuthRedirect,
				);
			} catch (error: any) {
				if (
					error.message?.includes("Unauthorized") &&
					options?.disableAuthRedirect
				) {
					throw new Error("UNAUTHORIZED");
				}
				throw error;
			}
		},
		onSuccess: (response) => {
			if (options?.onSuccess) {
				options.onSuccess(response);
			}

			// Invalidate specified queries
			if (options?.invalidateQueries) {
				options.invalidateQueries.forEach((queryKey) => {
					queryClient.invalidateQueries({ queryKey });
				});
			}
		},
		onError: (error: Error) => {
			if (options?.onError) {
				options.onError(error);
			}
		},
	});
}

// Generic PATCH hook
export function usePatch<TData, TVariables = any>(
	endpoint: string,
	options?: {
		api?: ApiType;
		onSuccess?: (data: ApiResponse<TData>) => void;
		onError?: (error: Error) => void;
		invalidateQueries?: string[][];
    disableAuthRedirect?: boolean;
	},
) {
	const queryClient = useQueryClient();
	const client = resolveClient(options?.api);

	return useMutation({
		mutationFn: async (data: TVariables) => {
			try {
				return await client.patch<TData>(
					endpoint,
					data,
					options?.disableAuthRedirect,
				);
			} catch (error: any) {
				if (
					error.message?.includes("Unauthorized") &&
					options?.disableAuthRedirect
				) {
					throw new Error("UNAUTHORIZED");
				}
				throw error;
			}
		},
		onSuccess: (response) => {
			if (options?.onSuccess) {
				options.onSuccess(response);
			}

			// Invalidate specified queries
			if (options?.invalidateQueries) {
				options.invalidateQueries.forEach((queryKey) => {
					queryClient.invalidateQueries({ queryKey });
				});
			}
		},
		onError: (error: Error) => {
			if (options?.onError) {
				options.onError(error);
			}
		},
	});
}

// Generic DELETE hook
export function useDelete<TData = any>(
	endpoint: string,
	options?: {
		api?: ApiType;
		onSuccess?: (data: ApiResponse<TData>) => void;
		onError?: (error: Error) => void;
		invalidateQueries?: string[][];
	},
) {
	const queryClient = useQueryClient();
	const client = resolveClient(options?.api);

	return useMutation({
    mutationFn: () => client.delete<TData>(endpoint),
		onSuccess: (response) => {
			if (options?.onSuccess) {
				options.onSuccess(response);
			}

			// Invalidate specified queries
			if (options?.invalidateQueries) {
				options.invalidateQueries.forEach((queryKey) => {
					queryClient.invalidateQueries({ queryKey });
				});
			}
		},
		onError: (error: Error) => {
			if (options?.onError) {
				options.onError(error);
			}
		},
	});
}
