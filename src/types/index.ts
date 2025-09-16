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
