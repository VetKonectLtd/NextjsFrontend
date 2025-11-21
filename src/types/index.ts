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
	store_id: string;
	product_name: string;
	description: string;
	price: number;
	tags: [];
	id: string;
	location: string;
	image1: string;
	average_rating: string;
	images: File[] | null;
	availability: boolean;
	available_unit: string;
	category: string;
	createdAt: string;
	images_url: string[] | null;
	updatedAt: string;
}

export interface Comment {
	comment: string;
	parent_id?: string;
}

export interface Activity {
	id: string;
	user_id: string;
	action: string;
	title: string;
	detail: string;
	created_at: string;
	updated_at: string;
}

export interface ReportComment {
	flag: string;
}

export interface Store {
	store_name: string;
	role: string;
	email: string;
	phone_number: string;
	location: string;
	availability: string;
	longitude?: string;
	latitude?: string;
	country: string;
	countryCode: string;
	picture: File | null;
	user_id: string;
	id: string;
	average_rating: string;
	products: Product[];
	picture_url: string;
	createdAt: string;
	updatedAt: string;
}

export interface PetOwner {
	pet_name: string;
	specie: string;
	breed: string;
	sex: string;
	age: string;
	pet_id?: string | null;
	id?: string | null;
	picture_url?: string;
	location: string;
	created_at: string;
	picture: string | File | null;
}

export interface LiveStock {
	farm_name: string;
	location: string;
	farm_id?: string | null;
	id?: string | null;
	no_of_worker: number;
	livestock_type: string;
	no_of_livestock: number;
	sex: string;
	picture_url?: string;
	age: string;
	created_at: string;
	picture: string | File | null;
	description: string;
}

export interface SignupCredentials {
	email: string;
	password: string;
	password_confirmation: string;
}

export interface PersonalInfoForm {
	first_name: string;
	last_name: string;
	phone_num?: string;
	country: string;
	state: string;
	agreeTerms: boolean;
}

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
	role?:string;
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

export interface VetDoctor {
	user_id: string;
	practice_license_num: string;
	specialty: string;
	list_them: string;
	address: string;
	agreeTerms: boolean;
	longitude?: number | string;
	latitude?: number | string;
}

export interface VetClinic {
	user_id: string;
	clinic_name: string;
	practice_license_num: string;
	specialty: string;
	list_them: string;
	contact_num: string;
	address: string;
	agreeTerms: boolean;
	longitude?: number | string;
	latitude?: number | string;
}

export interface VetParaprofessional {
	user_id: string;
	name_of_institution: string;
	graduation_year: string;
	expected_year_of_graduation: string;
	specialty: string;
	list_them: string;
	contact_num: string;
	address: string;
	agreeTerms: boolean;
	longitude?: number | string;
	latitude?: number | string;
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

// API response types for getAllVetDoctor
export interface VetDoctorUser {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	phone_num: string;
	state: string;
	country: string;
	activeRoleName: string | null;
	profile: string | null;
	active_role: string | null;
}

export interface VetDoctorRating {
	id?: number;
	rating?: number;
	comment?: string;
}

export interface VetDoctorData {
	id: number;
	user_id: number;
	specialty: string;
	list_them: string;
	address: string;
	longitude: string;
	latitude: string;
	role: string;
	availability: number;
	created_at: string;
	is_approved: number;
	average_rating: number;
	user: VetDoctorUser;
	ratings: VetDoctorRating[];
}

export interface GetAllVetDoctorResponse {
	message: string;
	veterinary_doctors: {
		current_page: number;
		data: VetDoctorData[];
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

// API response types for getAllVetParaprofessional
export interface VetParaprofessionalData {
	id: number;
	user_id: number;
	name_of_institution: string;
	specialty: string;
	list_them: string;
	contact_num: string;
	address: string;
	longitude: string;
	latitude: string;
	role: string;
	availability: number;
	is_approved: number;
	created_at: string;
	average_rating: number;
	user: VetDoctorUser;
	ratings: VetDoctorRating[];
}

export interface GetAllVetParaprofessionalResponse {
	veterinary_paraprofessionals: {
		current_page: number;
		data: VetParaprofessionalData[];
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

// API response types for getAllVetClinic
export interface VetClinicData {
	id: number;
	user_id: number;
	clinic_name: string;
	specialty: string;
	list_them: string;
	contact_num: string;
	address: string;
	longitude: string;
	latitude: string;
	role: string;
	availability: number;
	is_approved: number;
	created_at: string;
	average_rating: number;
	user: VetDoctorUser;
	ratings: VetDoctorRating[];
}

export interface GetAllVetClinicResponse {
	veterinary_clinics: {
		current_page: number;
		data: VetClinicData[];
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

// API response types for getAllVendor
export interface VendorData {
	id: number;
	user_id: number;
	role: string;
	created_at: string;
	user: VetDoctorUser;
}

export interface GetAllVendorResponse {
	current_page: number;
	data: VendorData[];
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
}

export interface ForumChat {
	id:string;
	title: string;
	content: string;
	category:string;
	comment:string;
	visibility:string;
	image: File | null;
	image_url:string;
	views_count:string;
	created_at:string;
	deleted_at:string;
	comments_count:string;
	shares_count:string;
	likes_count:string;
	status:string;
	has_liked:boolean;
	updated_at:string;
	author:Author;
	slug:string;

}

export interface BlogChat {
	id:string;
	title: string;
	content: string;
	comment:string;
	visibility:string;
	image: File | null;
	image_url:string;
	views_count:string;
	created_at:string;
	deleted_at:string;
	comments_count:string;
	shares_count:string;
	likes_count:string;
	status:string;
	has_liked:boolean;
	updated_at:string;
	author:Author;
	slug:string;

}

export interface  Author{
	id:string,
	name: string;
	image: string | null;
	active_role:string
}

export interface Appointment {
	date: string;
	time: string;
	id?: string;
	created_at?: string;
	updated_at?: string;
}

// Feed Calculator types
export interface FeedCalculatorFishRequest {
	livestock_category: "Fish";
	no_of_fish: number;
	fish_size: number;
}

export interface FeedCalculatorPoultryRequest {
	livestock_category: "Poultry";
	bird_type: string;
	feed_type: string;
	no_of_bird: number;
	no_of_week: number;
}

export interface FeedCalculatorPigRequest {
	livestock_category: "Pig";
	no_of_pig: number;
}

export type FeedCalculatorRequest = 
	| FeedCalculatorFishRequest 
	| FeedCalculatorPoultryRequest 
	| FeedCalculatorPigRequest;

export interface FeedCalculatorFishResponse {
	livestock_category: "Fish";
	fish_size: string;
	number_of_fish: number;
	feed_required: string;
}

export interface FeedCalculatorPoultryResponse {
	livestock_category: "Poultry";
	bird_type: string;
	feed_type: string;
	number_of_birds: number;
	feed_required: string;
}

export interface FeedCalculatorPigResponse {
	livestock_category: "Pig";
	number_of_pigs: number;
	feed_required: string;
}

export type FeedCalculatorResponse = 
	| FeedCalculatorFishResponse 
	| FeedCalculatorPoultryResponse 
	| FeedCalculatorPigResponse;

// Disease Predictor types
export interface DiseasePredictorRequest {
	livestock_category: string;
	diseases: string[];
}

export type DiseasePredictorResponse = string;
export interface HotNewsChat {
	id:string;
	title: string;
	content: string;
	comment:string;
	visibility:string;
	image: File | null;
	picture_url:string;
	views_count:string;
	created_at:string;
	deleted_at:string;
	comments_count:string;
	shares_count:string;
	likes_count:string;
	status:string;
	has_liked:boolean;
	updated_at:string;
	author:Author;
	slug:string;
}

interface MessageMeta {
	appointment_id?: string;
}

export interface ChatMessage {
	id: string;
	sender_id: string;
	receiver_id: string;
	content?: string;
	image_urls?: string[];
	type?: "text" | "appointment";
	meta?: MessageMeta;
	created_at?: string;
}

export interface MessageFormData {
	content?: string;
	images?: File[];
	receiver_id: string;
}

export interface Contact_us{
	email:string;
	content:string;
	agreeToTerms:boolean;
}

export interface SupportTicket{
	category:string;
	complain:string;
}