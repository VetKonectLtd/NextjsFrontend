import { apiClient } from "@/lib/api";
import { ApiResponse } from "@/types";

export interface CasePayload {
  case_title: string;
  client_phone_number: string;
  pet_or_farm: "Pet" | "Farm";
  pet_name?: string;
  specie?: string;
  breed?: string;
  farm_name?: string | null;
  type_of_livestock?: string | null;
  number_of_livestock?: number | null;
  number_of_workers?: number | null;
  age: number;
  sex: string;
  location: string;
  other_details: string;
  date_occurred: string;
  date_presented: string;
  history: string;
  clinical_signs: string[];
  temperature: string;
  heart_rate: string;
  weight: string;
  tentative_diagnosis: string;
  differential_diagnosis: string;
  lab_confirm: string;
  mortality: string;
  treatment_regimen: string[];
  picture: File | string;
}

export interface Case {
  id: number;
  case_title: string;
  client_phone_number: string;
  pet_or_farm: "Pet" | "Farm";
  pet_name?: string;
  specie?: string;
  breed?: string;
  farm_name?: string;
  type_of_livestock?: string;
  number_of_livestock?: number;
  number_of_workers?: number;
  age: number;
  sex: string;
  location: string;
  other_details: string;
  date_occurred: string;
  date_presented: string;
  history: string;
  clinical_signs: string[] | string; // API might return stringified array or array
  temperature: string;
  heart_rate: string;
  weight: string;
  tentative_diagnosis: string;
  differential_diagnosis: string;
  lab_confirm: string;
  mortality: string;
  treatment_regimen: string[] | string;
  picture: string;
  created_at?: string;
  updated_at?: string;
  // Mapped fields for UI convenience if needed, but keeping raw for now
}

export interface CasesResponse {
  cases: {
    current_page: number;
    data: Case[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: {
      url: string | null;
      label: string;
      active: boolean;
      page: number | null;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
  };
}

export interface CommentPayload {
  case_id: number;
  comment: string;
  parent_id?: string | null;
}

export interface Comment {
  id: number;
  case_id: number;
  user_id: number;
  comment: string;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
  user?: {
      id: number;
      name: string;
      avatar?: string;
  }
  replies?: Comment[];
}

export const casesService = {
  // POST {{baseURL}}/api/v3/add-case
  addCase: async (data: CasePayload): Promise<ApiResponse<any>> => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Handle arrays - append each item with key[] suffix for PHP/Laravel
        value.forEach((item) => formData.append(`${key}[]`, item));
      } else if (value instanceof File) {
        // Handle File objects
        formData.append(key, value);
      } else if (value === null || value === undefined) {
        // Send empty string for null/undefined values so the field is present
        formData.append(key, '');
      } else {
        // Handle strings, numbers, etc.
        formData.append(key, String(value));
      }
    });

    return apiClient.post("/v3/add-case", formData);
  },

  // GET {{baseURL}}/api/v3/get-user-cases
  getUserCases: async (page: number = 1): Promise<ApiResponse<CasesResponse>> => {
    return apiClient.get(`/v3/get-user-cases?page=${page}`);
  },

  // GET {{baseURL}}/api/v3/get-case_by-id/{id}/case
  getCaseById: async (id: string | number): Promise<ApiResponse<{ case: Case }>> => {
    return apiClient.get(`/v3/get-case_by-id/${id}/case`);
  },

  // DELETE {{baseURL}}/api/v3/delete-case/{id}/delete
  deleteCase: async (id: string | number): Promise<ApiResponse<any>> => {
    return apiClient.delete(`/v3/delete-case/${id}/delete`);
  },

  // POST {{baseURL}}/api/v3/promote-ad (Used for Adding Comments)
  addComment: async (payload: CommentPayload): Promise<ApiResponse<any>> => {
    return apiClient.post("/v3/promote-ad", payload);
  },

  // GET {{baseURL}}/api/v3/get-comments/{caseId}/case
  getComments: async (caseId: string | number): Promise<ApiResponse<{ comments: Comment[] }>> => {
    return apiClient.get(`/v3/get-comments/${caseId}/case`);
  },

  // DELETE {{baseURL}}/api/v3/delete-comment/{id}/case
  deleteComment: async (id: string | number): Promise<ApiResponse<any>> => {
    return apiClient.delete(`/v3/delete-comment/${id}/case`);
  },

  // GET {{baseURL}}/api/v3/filter-case (Download Report)
  // Note: Implementing as GET with Query Params since fetch GET cannot have body.
  // If backend strictly requires body with GET, this will fail, but standard is Query Params.
  // User said "Payload", but for GET that usually implies Query Params in a standard web client.
  // Also handling Blob response manually since apiClient parses JSON.
  downloadReport: async (from: string, to: string): Promise<Blob> => {
    // Get token manually since we can't use apiClient for Blob easily without modifying it
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    }
    const token = getCookie("auth-token"); // Assuming cookie name from apiClient

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/v3/filter-case?from=${from}&to=${to}`, {
        method: "GET",
        headers: {
            // "Content-Type": "application/json", // Not needed for GET
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/json" // Prefer excel
        },
    });

    if (!response.ok) {
        throw new Error("Failed to download report");
    }

    return response.blob();
  }
};
