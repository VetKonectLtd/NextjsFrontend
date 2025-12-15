import {
	ApiResponse,
	User,
	LoginCredentials,
	SignupCredentials,
} from "@/types";
import Cookies from "js-cookie";

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

class ApiClient {
	private baseUrl: string;

	constructor(baseUrl: string = API_BASE_URL) {
		this.baseUrl = baseUrl;
	}

	private async request<T>(
		endpoint: string,
		options: RequestInit = {},
	): Promise<ApiResponse<T>> {
		const url = `${this.baseUrl}${endpoint}`;

		const isFormData = options.body instanceof FormData;

		const config: RequestInit = {
			credentials: "include",
			headers: {
				Accept: "application/json",
				...(isFormData ? {} : { "Content-Type": "application/json" }),
				...options.headers,
			},
			...options,
		};

		// Add auth token if available
		const token = this.getAuthToken();
		if (token) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${token}`,
			};
		}

		try {
			const response = await fetch(url, config);
			const data = await response.json();

			// Handle 401 Unauthorized - Auto logout and redirect
			if (response.status === 401) {
				console.warn("401 Unauthorized - Logging out user");
				this.handleUnauthorized();
				throw new Error(
					data.error || data.message || "Unauthorized - Please login again",
				);
			}

			if (!response.ok) {
				throw new Error(data.error || data.message || "API request failed");
			}

			return data;
		} catch (error) {
			// console.error("API request error:", error);
			throw error;
		}
	}

	private getAuthToken(): string | null {
		if (typeof window !== "undefined") {
			return Cookies.get("auth-token") || null;
		}
		return null;
	}

	private setAuthToken(token: string): void {
		if (typeof window !== "undefined") {
			Cookies.set("auth-token", token);
		}
	}

	private removeAuthToken(): void {
		if (typeof window !== "undefined") {
			Cookies.remove("auth-token");
		}
	}

	private handleUnauthorized(): void {
		if (typeof window !== "undefined") {
			// Remove auth token
			this.removeAuthToken();

			// Clear any user data from localStorage if needed
			Cookies.remove("auth-token");

			// Redirect to login page
			if (window.location.pathname !== "/login") {
				window.location.replace("/login");
			}
		}
	}

	// Auth endpoints
	async login(
		credentials: LoginCredentials,
	): Promise<ApiResponse<{ user: User; token: string }>> {
		const response = await this.request<{ user: User; token: string }>(
			"/auth/login",
			{
				method: "POST",
				body: JSON.stringify(credentials),
			},
		);

		if (response.success && response.data?.token) {
			this.setAuthToken(response.data.token);
		}

		return response;
	}

	async signup(
		credentials: SignupCredentials,
	): Promise<ApiResponse<{ user: User; token: string }>> {
		const response = await this.request<{ user: User; token: string }>(
			"/auth/signup",
			{
				method: "POST",
				body: JSON.stringify(credentials),
			},
		);

		if (response.success && response.data?.token) {
			this.setAuthToken(response.data.token);
		}

		return response;
	}

	async logout(): Promise<void> {
		this.removeAuthToken();
	}

	async getCurrentUser(): Promise<ApiResponse<User>> {
		return this.request<User>("/auth/me");
	}

	// Generic CRUD operations
	async get<T>(endpoint: string): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint);
	}

	async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
		const body = data instanceof FormData ? data : JSON.stringify(data);
		return this.request<T>(endpoint, {
			method: "POST",
			body,
		});
	}

	async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, {
			method: "PUT",
			body: JSON.stringify(data),
		});
	}

	async patch<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, {
			method: "PATCH",
			body: JSON.stringify(data),
		});
	}

	async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
		return this.request<T>(endpoint, {
			method: "DELETE",
		});
	}
}

export const apiClient = new ApiClient();
