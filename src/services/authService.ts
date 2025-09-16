import { usePost, useGet } from "@/lib/hooks";
import { AUTH_ENDPOINTS, USER_ENDPOINTS } from "@/lib/api-constants";
import { PersonalInfoForm, LoginCredentials, User, SignupCredentials } from "@/types";
import Cookies from "js-cookie";

// Auth service using hooks
export const useAuthService = () => {
	// Login mutation
	const useLogin = () => {
		return usePost<{ user: User; token: string }, LoginCredentials>(
			AUTH_ENDPOINTS.LOGIN,
			{
				onSuccess: (response: any) => {
					if (response?.token) {
						// Store token in localStorage
						localStorage.setItem("auth-token", response.token);
						Cookies.set("auth-token", response.token); 
					}
				},
				onError: (error) => {
					console.error("Login failed:", error.message);
				},
			},
		);
	};

	// Signup mutation
	const useSignup = () => {
		return usePost<{ user: User; token: string }, SignupCredentials>(
			AUTH_ENDPOINTS.SIGNUP,
			{
				onSuccess: (response: any) => {
					if (response.token) {
						// Store token in localStorage
						// localStorage.setItem("auth-token", response.token);
					}
				},
				onError: (error) => {
					console.error("Signup failed:", error.message);
				},
			},
		);
	};

	// CompleteProfile mutation
	const useCompleteProfile = () => {
		return usePost<{ user: PersonalInfoForm; token: string }, PersonalInfoForm>(
			USER_ENDPOINTS.COMPLETE_PROFILE,
			{
				onSuccess: (response: any) => {
					if (response.token) {
						// Store token in localStorage
						// console.log(response.token);
					}
				},
				onError: (error) => {
					console.error("Signup failed:", error.message);
				},
			},
		);
	};

	// Google login
	const useGoogleLogin = (enabled: boolean = false) => {
		return useGet<{ user: User; token: string }>(
			["googleLogin"],
			`${AUTH_ENDPOINTS.GOOGLE_LOGIN}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	// LinkedIn login
	const useLinkedInLogin = (enabled: boolean = false) => {
		return useGet<{ user: User; token: string }>(
			["linkedinLogin"],
			`${AUTH_ENDPOINTS.LINKEDIN_LOGIN}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	// Get current user query
	const useCurrentUser = (enabled: boolean = true) => {
		return useGet<User>(["currentUser"], AUTH_ENDPOINTS.ME, {
			enabled,
			staleTime: 5 * 60 * 1000, // 5 minutes
		});
	};

	// Logout mutation
	const useLogout = () => {
		return usePost<void, void>(AUTH_ENDPOINTS.LOGOUT, {
			onSuccess: () => {
				// Remove token from localStorage
				localStorage.removeItem("auth-token");
				Cookies.remove("auth-token"); 
			},
		});
	};

	// Refresh token mutation
	const useRefreshToken = () => {
		return usePost<{ token: string }, void>(AUTH_ENDPOINTS.REFRESH, {
			onSuccess: (response) => {
				if (response.success && response.data?.token) {
					localStorage.setItem("auth-token", response.data.token);
				}
			},
		});
	};

	// Forgot password mutation
	const useForgotPassword = () => {
		return usePost<{ message: string }, { email: string }>(
			AUTH_ENDPOINTS.FORGOT_PASSWORD,
		);
	};

	// Reset password mutation
	const useResetPassword = () => {
		return usePost<{ message: string }, { token: string; password: string }>(
			AUTH_ENDPOINTS.RESET_PASSWORD,
		);
	};

	return {
		useLogin,
		useSignup,
		useCompleteProfile,
		useGoogleLogin,
		useLinkedInLogin,
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
	useCompleteProfile,
	useGoogleLogin,
	useLinkedInLogin,
	useCurrentUser,
	useLogout,
	useRefreshToken,
	useForgotPassword,
	useResetPassword,
} = useAuthService();
