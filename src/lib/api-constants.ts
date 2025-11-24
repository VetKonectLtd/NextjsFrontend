// API Base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Auth endpoints
export const AUTH_ENDPOINTS = {
	LOGIN: "/v3/login",
	SIGNUP: "/v3/register",
	GOOGLE_LOGIN: "/v3/google/loginUsingGoogle",
	LINKEDIN_LOGIN: "/v3/linkedin/loginUsingLinkedin",
	LOGOUT: "/v3/logout",
	REFRESH: "/v3/refresh",
	RESENDVERIFICATION: "/v3/resendVerificationEmail",
	ME: "/me",
	GET_PROFILE: "/v3/get-profile",
	FORGOT_PASSWORD: "/v3/reset-mail",
	RESET_PASSWORD: "/v3/reset-password",
} as const;

// User endpoints
export const USER_ENDPOINTS = {
	PROFILE: "/users/profile",
	COMPLETE_PROFILE: "/v3/complete-profile",
	UPDATE_PROFILE: "/users/profile",
	CHANGE_PASSWORD: "/users/change-password",
	DELETE_ACCOUNT: "/users/delete",
} as const;

export const PET_OwNER_ENDPOINTS = {
	ADD_PET: "/v3/add-pet",
	ADD_PET_OWNER: "/v3/add-pet-owner",
	GET_PETS: "/v3/get-user-pets",
	GET_PET_BY_ID: (petId: string) => `/v3/get-pet-by-id/${petId}/pet`,
	UPDATE_PET: (petId: string) => `/v3/update-pet/${petId}/pet`,
	DELETE_PET: (petId: string) => `/v3/delete-pet/${petId}/delete`,
} as const;

export const LIVE_STOCK_ENDPOINTS = {
	ADD_FARM: "/v3/add-farm",
	ADD_LIVESTOCK_FARMER:"/v3/add-livestock-farmer",
	GET_FARMS: "/v3/get-user-farms",
	GET_FARM_BY_ID: (Id: string) => `/v3/get-farm-by-id/${Id}/farm`,
	UPDATE_FARM: (Id: string) => `/v3/update-farm/${Id}/farm`,
	DELETE_FARM: (Id: string) => `/v3/delete-farm/${Id}/delete`,
} as const;

export const STORE = {
	ADD_STORE: "/v3/add-new-store",
	ADD_VENDOR: "/v3/add-vendor",
	GET_STORES: "/v3/vendor-store",
	GET_STORE_BY_USER_ID: (Id: string) => `/v3/get-store-by-user-id/${Id}/store`,
	GET_STORE_BY_ID: (Id: string) => `/v3/get-store-by-id/${Id}/store`,
	UPDATE_STORE: (Id: string) => `/v3/store/${Id}/store`,
	DELETE_STORE: (Id: string) => `/v3/delete-store/${Id}/store`,
};

export const PRODUCTS = {
	ADD_PRODUCT: "/v3/add-new-product",
	GET_ALL_PRODUCTS: "/v3/get-all-product",
	GET_USER_PRODUCTS: "/v3/get-user-products",
	GET_PRODUCT_NOT_ON_STORE: "/v3/get-product-not-on-store",
	GET_RELATED_PRODUCT: (Id: string) => `/v3/get-related-product/${Id}/related`,
	GET_PRODUCT_BY_STORE: (Id: string) =>
		`/v3/get-product-by-store/${Id}/product`,
	GET_PRODUCT_BY_ID: (Id: string)=> `/v3/get-product-by-id/${Id}/product`,
	GET_PRODUCT_BY_USER_ID: (Id: string) =>
		`/v3/get-products-by-user-id/${Id}/product`,
	UPDATE_PRODUCT: (Id: string) => `/v3/update-product/${Id}/product`,
	DELETE_PRODUCT: (Id: string) => `/v3/delete-products/${Id}/product`,
};

export const BLOG = {
	TOGGLE_BLOG_LIKE: (Id: string) => `/v3/blogs/${Id}/like`,
	GET_ALL_BLOGS: "/v3/gets-all-blog",
	TRENDING_BLOGS: "/v3/blogs/trending",
	BLOGS_SLUG: (Id: string) => `/v3/blogs/slug/${Id}/slug`,
	SHARE_BLOG: (Id: string) => `/v3/blogs/${Id}/share`,
	BLOG: (Id: string) => `/v3/blogs/${Id}/blog`,
};

export const BLOG_COMMENTS = {
	ADD_COMMENT: (Id: string) => `/v3/add-comment/${Id}/comment`,
	GET_COMMENTS: (Id: string) => `/v3/fetch-comment/${Id}/comment`,
	UPDATE_COMMENT: (Id: string) => `/v3/edit-comment/${Id}/comment`,
	DELETE_COMMENT: (Id: string) => `/v3/delete-comment/${Id}/comment`,
	REPORT_COMMENT: (Id: string) => `/v3/comments/${Id}/flag`,
};

export const PROMOTIONPLAN = {
	CREATE_PLAN: "/v3/buy-plan",
};

export const ACTIVITIES ={
	GET_ACTIVITIES:"/v3/get-user-activity",
	GET_USER_NOTIFICATION:"/v3/get-user-notification",
	GET_USER_NOTIFICATIONS_BY_ID:(Id:string) => `/v3/get-notification/${Id}/notification`
}

export const FORUM_CHAT = {
	FORUM_STORE: "/v3/forums/store",
	GET_USER_FORUM: "/v3/forums/get-user-forum",
	TRENDING_FORUM: "/v3/forums/trending",
	GET_ALL_FORUM: "/v3/forums/index",
	GET_VISIBILITY_OPTIONS: (visibility:string)=> `/v3/forums/get-visibility-options/${visibility}/forums`,

	LIKE_FORUM: (Id: string) => `/v3/forums/${Id}/like`,

	ADD_FORUM_COMMENT: (forumId: string) => `/v3/forums/${forumId}/comments`,
	GET_FORUM_COMMENTS: (forumId: string) =>`/v3/forums/${forumId}/comments/fetch`,
	UPDATE_FORUM_COMMENT: (Id: string) => `/v3/forums/comments/${Id}`,
	DELETE_FORUM_COMMENT: (Id: string) => `/v3/forums/comments/${Id}/delete`,
	REPORT_FORUM_COMMENT: (Id: string) => `/v3/forums/comments/${Id}/flag`,

	SHARE_FORUM: (Id: string) => `/v3/forums/${Id}/share`,
	UPDATE_FORUM: (Id: string) => `/v3/forums/${Id}/update`,
	FORUM_SLUG: (slug: string) => `/v3/forums/${slug}`,
	DELETE_FORUM: (Id: string) => `/v3/forums/${Id}/delete`,
};

export const DIRECT_CHAT = {
	APPOINTMENT:"/v3/appointment",
	GET_APPOINTMENT_BY_ID:(Id:string) => `/v3/appointment/${Id}`,
	GET_CANCEL:(Id:string) => `/v3/appointment/${Id}/cancel`,
	SEND_MESSAGE: "/v3/messages/send",
	GET_CHAT_LIST: "/v3/get-chat-list",
	GET_MESSAGE_SENT_TO:`/v3/message/sent`,
	GET_MESSAGE_RECEIVED_FROM: `/v3/message/received`,
	GET_MESSAGE: (userId: string) => `/v3/messages/${userId}`,
	EDIT_MESSAGE: (Id: string) => `/v3/messages/${Id}/edit`,
	DELETE_MESSAGE: (Id: string) => `/v3/messages/${Id}/delete`,
};

// Veterinary endpoints
export const VETERINARY_ENDPOINTS = {
  GET_NEAREST_DOCTORS: '/v3/get-nearest-veterinary-doctors',
  ADD_VET_DOCTOR: "/v3/add-veterinary-doctor",
  GET_ALL_VET_DOCTOR:"/v3/get-all-veterinary-doctors"
} as const;

export const VENDOR_ENDPOINTS = {
  GET_ALL_VENDOR: "/v3/get-all-vendor"
} as const;

export const VETERINARY_CLINIC ={
	ADD_VET_CLINIC: "/v3/add-veterinary-clinic",
	GET_ALL_VET_CLINIC: "/v3/get-all-veterinary-clinics"
}

export const VETERINARY_PARAPROFESSIONAL ={
	ADD_VET_PROFESSIONAL: "/v3/add-veterinary-paraprofessional",
	GET_ALL_VET_PARAPROFESSIONAL: "/v3/get-all-veterinary-paraprofessionals"
}

export const OTHERS ={
	ADD_OTHERS:"/v3/add-others"
}

export const GENERAL = {
	FEED_CALCULATOR:"/v3/feed-calculator",
	DISEASE_PREDICTOR:"/v3/disease-predictor"
}

export const CONTACT_US = {
	ADD_TO_NEWSLETTER: "/v3/add-to-newsletter",
	CONTACT_US: "/v3/contact-us"
}

export const SUPPORT = {
	SUPPORT_TICKET: "/v3/drop-complain",
}

export const PAYMENTS = {
	CREATE_PAYMENT_ORDER: "/v3/order/initialize",
	CREATE_PAYMENT: "/v3/orders",
}