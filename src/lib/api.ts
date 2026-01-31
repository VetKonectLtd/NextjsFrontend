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
  private shouldHandleAuthRedirects: boolean;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.shouldHandleAuthRedirects = true; // Default to true
  }

  // Method to disable auto redirects (call this from public pages)
  disableAuthRedirects() {
    this.shouldHandleAuthRedirects = false;
  }

  // Method to enable auto redirects (call this from protected pages)
  enableAuthRedirects() {
    this.shouldHandleAuthRedirects = true;
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

      // Handle 401 Unauthorized - Only auto-redirect if enabled
      if (response.status === 401) {
        console.warn("401 Unauthorized for endpoint:", endpoint);
        
        if (this.shouldHandleAuthRedirects) {
          this.handleUnauthorized();
        }
        
        // Throw a specific error that components can catch
        throw new Error(
          data.error || data.message || "Unauthorized - Please login again",
        );
      }

      if (!response.ok) {
        throw new Error(data.error || data.message || "API request failed");
      }

      return data;
    } catch (error) {
      // Don't log expected auth errors
      if (!(error instanceof Error && error.message.includes("Unauthorized"))) {
        console.error("API request error:", error);
      }
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
      Cookies.set("auth-token", token, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      localStorage.setItem("auth-token", token);
    }
  }

  private removeAuthToken(): void {
    if (typeof window !== "undefined") {
      Cookies.remove("auth-token");
      localStorage.removeItem("auth-token");
    }
  }

  private handleUnauthorized(): void {
    if (typeof window !== "undefined") {
      // Remove auth token
      this.removeAuthToken();

      // Only redirect if not already on login page
      if (window.location.pathname !== "/login") {
        const currentUrl = window.location.href;
        sessionStorage.setItem("redirect-after-login", currentUrl);
        window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
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

  // Generic CRUD operations with optional auth handling
  async get<T>(endpoint: string, disableAuthRedirect = false): Promise<ApiResponse<T>> {
    const previousSetting = this.shouldHandleAuthRedirects;
    if (disableAuthRedirect) {
      this.disableAuthRedirects();
    }
    
    try {
      return await this.request<T>(endpoint);
    } finally {
      if (disableAuthRedirect) {
        this.shouldHandleAuthRedirects = previousSetting;
      }
    }
  }

  async post<T>(endpoint: string, data: any, disableAuthRedirect = false): Promise<ApiResponse<T>> {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    const previousSetting = this.shouldHandleAuthRedirects;
    
    if (disableAuthRedirect) {
      this.disableAuthRedirects();
    }
    
    try {
      return await this.request<T>(endpoint, {
        method: "POST",
        body,
      });
    } finally {
      if (disableAuthRedirect) {
        this.shouldHandleAuthRedirects = previousSetting;
      }
    }
  }

  async put<T>(endpoint: string, data: any, disableAuthRedirect = false): Promise<ApiResponse<T>> {
    const previousSetting = this.shouldHandleAuthRedirects;
    
    if (disableAuthRedirect) {
      this.disableAuthRedirects();
    }
    
    try {
      return await this.request<T>(endpoint, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    } finally {
      if (disableAuthRedirect) {
        this.shouldHandleAuthRedirects = previousSetting;
      }
    }
  }

  async patch<T>(endpoint: string, data: any, disableAuthRedirect = false): Promise<ApiResponse<T>> {
    const previousSetting = this.shouldHandleAuthRedirects;
    
    if (disableAuthRedirect) {
      this.disableAuthRedirects();
    }
    
    try {
      return await this.request<T>(endpoint, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    } finally {
      if (disableAuthRedirect) {
        this.shouldHandleAuthRedirects = previousSetting;
      }
    }
  }

  async delete<T>(endpoint: string, disableAuthRedirect = false): Promise<ApiResponse<T>> {
    const previousSetting = this.shouldHandleAuthRedirects;
    
    if (disableAuthRedirect) {
      this.disableAuthRedirects();
    }
    
    try {
      return await this.request<T>(endpoint, {
        method: "DELETE",
      });
    } finally {
      if (disableAuthRedirect) {
        this.shouldHandleAuthRedirects = previousSetting;
      }
    }
  }
}

export const apiClient = new ApiClient();