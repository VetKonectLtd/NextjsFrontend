import { usePost, useGet } from "@/lib/hooks";
import { AUTH_ENDPOINTS, USER_ENDPOINTS } from "@/lib/api-constants";
import {
	PersonalInfoForm,
	LoginCredentials,
	User,
	SignupCredentials,
} from "@/types";
import Cookies from "js-cookie";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";

// Auth service using hooks
export const useAuthService = () => {
	const handleSuccess = useHandleSuccess();
	const handleError = useHandleError();

	// Helper function to set cookie properly
	const setAuthCookie = (token: string) => {
		try {
			// Get the secure flag - make sure it's a boolean
			const isSecure = window.location.protocol === "https:";

			// Set cookie with proper values
			Cookies.set("auth-token", token, {
				secure: isSecure,
				sameSite: "lax",
				path: "/",
			});

			// Also store in localStorage for immediate access
			localStorage.setItem("auth-token", token);
		} catch (error) {
			console.error("Failed to set auth cookie:", error);
			// Fallback: set cookie without options
			Cookies.set("auth-token", token);
			localStorage.setItem("auth-token", token);
		}
	};

	// Helper function to remove auth tokens
	const removeAuthTokens = () => {
		try {
			Cookies.remove("auth-token");
			localStorage.removeItem("auth-token");
			sessionStorage.removeItem("pending-comment");
			sessionStorage.removeItem("pending-reply-to");
			sessionStorage.removeItem("pending-edit-comment");
		} catch (error) {
			console.error("Failed to remove auth tokens:", error);
		}
	};

	// Login mutation
	const useLogin = () => {
		return usePost<{ user: LoginCredentials; token: string }, LoginCredentials>(
			AUTH_ENDPOINTS.LOGIN,
			{
				onSuccess: (response: any) => {
					if (response?.token) {
						// Use the helper function
						setAuthCookie(response.token);
						handleSuccess(response.message || "Login successfully!");
					} else if (response?.data?.token) {
						// Handle different response format
						setAuthCookie(response.data.token);
						handleSuccess(
							response.message ||
								response.data.message ||
								"Login successfully!",
						);
					}
				},
				onError: (error) => {
					handleError(error.message || "Login failed");
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
					if (response?.token) {
						setAuthCookie(response.token);
					} else if (response?.data?.token) {
						setAuthCookie(response.data.token);
					}
					handleSuccess(response.message || "Signup successfully!");
				},
				onError: (error) => {
					handleError(error.message || "Signup failed");
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
					if (response?.token) {
						setAuthCookie(response.token);
					} else if (response?.data?.token) {
						setAuthCookie(response.data.token);
					}
					handleSuccess(response.message || "Profile completed successfully!");
				},
				onError: (error) => {
					handleError(error.message || "Profile completion failed");
				},
			},
		);
	};

	// Update profile (expects FormData or JSON depending on caller)
	const useUpdateProfile = () => {
		return usePost<{ message: string }, FormData | Record<string, any>>(
			AUTH_ENDPOINTS.UPDATE_PROFILE,
			{
				onSuccess: (response: any) => {
					handleSuccess(response.message || "Profile updated successfully!");
				},
				onError: (error) => {
					handleError(error.message || "Profile update failed");
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

	// Get current user query
	const useCurrentUser = (enabled: boolean = true) => {
		const token = Cookies.get("auth-token");

		const isEnabled = Boolean(token) && Boolean(enabled);
		return useGet<User>(["currentUser"], AUTH_ENDPOINTS.GET_PROFILE, {
			enabled: isEnabled,
			staleTime: 5 * 60 * 1000, // 5 minutes
		});
	};

	// Logout mutation
	const useLogout = () => {
		return usePost<void, void>(AUTH_ENDPOINTS.LOGOUT, {
			onSuccess: (res: any) => {
				removeAuthTokens();
				handleSuccess(res.message || "Logout successfully!");
			},
			onError:()=>{
				 removeAuthTokens();
			},
			invalidateQueries: [["currentUser"]],
		});
	};

	// Refresh token mutation
	const useRefreshToken = () => {
		return usePost<{ token: string }, void>(AUTH_ENDPOINTS.REFRESH, {
			onSuccess: (response) => {
				if (response.success && response.data?.token) {
					Cookies.set("auth-token", response.data.token);
				}
			},
		});
	};

	// Forgot password mutation
	const useForgotPassword = () => {
		return usePost<{ message: string }, { email: string }>(
			AUTH_ENDPOINTS.FORGOT_PASSWORD,
			{
				onSuccess: (response) => {
					handleSuccess(response.message || "Password reset link sent!");
				},
				onError: (error) => {
					handleError(error.message || "Failed to send reset link.");
				},
			},
		);
	};

	// Reset password mutation
	const useResetPassword = () => {
		return usePost<{ message: string }, { token: string; password: string }>(
			AUTH_ENDPOINTS.RESET_PASSWORD,
			{
				onSuccess: (response) => {
					handleSuccess(response.message || "Password reset successfully!");
				},
				onError: (error: any) => {
					handleError(
						error.error || error.message || "Failed to reset password.",
					);
				},
			},
		);
	};

	// Resend verification mutation
	const useResendVerification = () => {
		return usePost<{ message: string }, { email: string }>(
			AUTH_ENDPOINTS.RESENDVERIFICATION,
		);
	};

	return {
		useLogin,
		useSignup,
		useCompleteProfile,
		useUpdateProfile,
		useResendVerification,
		useGoogleLogin,
		setAuthCookie,
		useCurrentUser,
		useLogout,
		useRefreshToken,
		useForgotPassword,
		useResetPassword,
	};
};
