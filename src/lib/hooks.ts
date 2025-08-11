import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './api';
import { ApiResponse } from '@/types';

// Generic GET hook
export function useGet<T>(
  key: string[],
  endpoint: string,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
  }
) {
  return useQuery({
    queryKey: key,
    queryFn: () => apiClient.get<T>(endpoint),
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime,
    cacheTime: options?.cacheTime,
  });
}

// Generic POST hook
export function usePost<TData, TVariables = any>(
  endpoint: string,
  options?: {
    onSuccess?: (data: ApiResponse<TData>) => void;
    onError?: (error: Error) => void;
    invalidateQueries?: string[][];
  }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TVariables) => apiClient.post<TData>(endpoint, data),
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

// Generic PUT hook
export function usePut<TData, TVariables = any>(
  endpoint: string,
  options?: {
    onSuccess?: (data: ApiResponse<TData>) => void;
    onError?: (error: Error) => void;
    invalidateQueries?: string[][];
  }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TVariables) => apiClient.put<TData>(endpoint, data),
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
    onSuccess?: (data: ApiResponse<TData>) => void;
    onError?: (error: Error) => void;
    invalidateQueries?: string[][];
  }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TVariables) => apiClient.patch<TData>(endpoint, data),
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
    onSuccess?: (data: ApiResponse<TData>) => void;
    onError?: (error: Error) => void;
    invalidateQueries?: string[][];
  }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiClient.delete<TData>(endpoint),
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
