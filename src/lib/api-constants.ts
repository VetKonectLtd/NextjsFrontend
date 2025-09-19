// API Base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/v3/login',
  SIGNUP: '/v3/register',
  GOOGLE_LOGIN: '/google/loginUsingGoogle',
  LINKEDIN_LOGIN: '/linkedin/loginUsingLinkedin',
  LOGOUT: '/v3/logout',
  REFRESH: '/v3/refresh',
  RESENDVERIFICATION: '/v3/resendVerificationEmail',
  ME: '/v3/me',
  FORGOT_PASSWORD: '/v3/reset-mail',
  RESET_PASSWORD: '/v3/reset-password',
} as const;

// User endpoints
export const USER_ENDPOINTS = {
  PROFILE: '/users/profile',
  COMPLETE_PROFILE: '/v3/complete-profile',
  UPDATE_PROFILE: '/users/profile',
  CHANGE_PASSWORD: '/users/change-password',
  DELETE_ACCOUNT: '/users/delete',
} as const;

