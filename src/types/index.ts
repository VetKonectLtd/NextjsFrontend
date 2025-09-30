// User types
export interface User {
	id: string;
	email: string;
	first_name: string;
    last_name: string;
	phone_num?: string;
	state?: string;
	country?: string;
	email_verified_at?: string | null;
	password_algorithm: string;
	provider?: string | null;
	provider_id?: string | null;
	old_id?: number | null;
	old_table?: string | null;
	avatar?: string;
	role: "user" | "admin";
	createdAt: string;
	updatedAt: string;
}

// Authentication types
export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface ResetPasswordCredentials {
	email: string;
	password: string;
	password_confirmation: string;
	token: string;
}

export interface ForgotPassword {
	email: string;
}

// API Response types
export interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	message?: string;
	error?: string;
}

// Store types (example)
export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	category: string;
	inStock: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface Store {
	id: string;
	name: string;
	description: string;
	ownerId: string;
	products: Product[];
	createdAt: string;
	updatedAt: string;
}

export interface SignupCredentials {
	email: string;
	password: string;
	password_confirmation: string;
}

export interface PersonalInfoForm{
	first_name: string;
    last_name: string;
	phone_num?: string;
	country: string;
	state: string;
	agreeTerms: boolean;
};

// Veterinary types
export interface VeterinaryDoctor {
	id: string;
	name: string;
	email?: string;
	phone?: string;
	specialization?: string;
	location: string;
	latitude?: number;
	longitude?: number;
	image?: string;
	rating: number;
	totalRatings: number;
	isAvailable: boolean;
	isVerified: boolean;
	distance?: number; // Distance in kilometers
	experience?: number; // Years of experience
	clinicName?: string;
	clinicAddress?: string;
	consultationFee?: number;
	availableHours?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface GetNearestVetsRequest {
	longitude: number;
	latitude: number;
	radius?: number; // Search radius in kilometers (optional)
	limit?: number; // Maximum number of results (optional)
	page?: number; // Page number for pagination (optional)
}

export interface GetNearestVetsResponse {
	message: string;
	veterinary_doctors: {
		current_page: number;
		data: VeterinaryDoctor[];
		first_page_url: string;
		from: number | null;
		last_page: number;
		last_page_url: string;
		links: Array<{
			url: string | null;
			label: string;
			page: number | null;
			active: boolean;
		}>;
		next_page_url: string | null;
		path: string;
		per_page: number;
		prev_page_url: string | null;
		to: number | null;
		total: number;
	};
}
