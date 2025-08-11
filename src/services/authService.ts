import { usePost, useGet } from '@/lib/hooks';
import { AUTH_ENDPOINTS } from '@/lib/api-constants';
import { LoginCredentials, SignupCredentials, User } from '@/types';

// Auth service using hooks
export const useAuthService = () => {
  // Login mutation
  const useLogin = () => {
    return usePost<{ user: User; token: string }, LoginCredentials>(
      AUTH_ENDPOINTS.LOGIN,
      {
        onSuccess: (response) => {
          if (response.success && response.data?.token) {
            // Store token in localStorage
            localStorage.setItem('auth-token', response.data.token);
          }
        },
        onError: (error) => {
          console.error('Login failed:', error.message);
        },
      }
    );
  };

  // Signup mutation
  const useSignup = () => {
    return usePost<{ user: User; token: string }, SignupCredentials>(
      AUTH_ENDPOINTS.SIGNUP,
      {
        onSuccess: (response) => {
          if (response.success && response.data?.token) {
            // Store token in localStorage
            localStorage.setItem('auth-token', response.data.token);
          }
        },
        onError: (error) => {
          console.error('Signup failed:', error.message);
        },
      }
    );
  };

  // Get current user query
  const useCurrentUser = (enabled: boolean = true) => {
    return useGet<User>(
      ['currentUser'],
      AUTH_ENDPOINTS.ME,
      {
        enabled,
        staleTime: 5 * 60 * 1000, // 5 minutes
      }
    );
  };

  // Logout mutation
  const useLogout = () => {
    return usePost<void, void>(
      AUTH_ENDPOINTS.LOGOUT,
      {
        onSuccess: () => {
          // Remove token from localStorage
          localStorage.removeItem('auth-token');
        },
      }
    );
  };

  // Refresh token mutation
  const useRefreshToken = () => {
    return usePost<{ token: string }, void>(
      AUTH_ENDPOINTS.REFRESH,
      {
        onSuccess: (response) => {
          if (response.success && response.data?.token) {
            localStorage.setItem('auth-token', response.data.token);
          }
        },
      }
    );
  };

  // Forgot password mutation
  const useForgotPassword = () => {
    return usePost<{ message: string }, { email: string }>(
      AUTH_ENDPOINTS.FORGOT_PASSWORD
    );
  };

  // Reset password mutation
  const useResetPassword = () => {
    return usePost<{ message: string }, { token: string; password: string }>(
      AUTH_ENDPOINTS.RESET_PASSWORD
    );
  };

  return {
    useLogin,
    useSignup,
    useCurrentUser,
    useLogout,
    useRefreshToken,
    useForgotPassword,
    useResetPassword,
  };
};

// Export individual hooks for convenience
export const {
  useLogin,
  useSignup,
  useCurrentUser,
  useLogout,
  useRefreshToken,
  useForgotPassword,
  useResetPassword,
} = useAuthService();
