import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AuthState, User } from '@/types';

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  countryCode: string;
  state: string;
  agreeTerms: boolean;
}

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  logout: () => void;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signup: (credentials: SignupFormData) => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        // Actions
        login: async (credentials: { email: string; password: string }) => {
          try {
            set({ isLoading: true, error: null });
            // This is where you would typically make an API call
            // For now, we'll just simulate a successful login with a mock user
            const mockUser: User = { 
              id: '1', 
              email: credentials.email, 
              name: 'Test User',
              role: 'user',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            set({
              user: mockUser,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Login failed',
              isLoading: false,
            });
            throw error;
          }
        },

        signup: async (credentials) => {
          try {
            set({ isLoading: true, error: null });
            
            // This is where you would typically make an API call
            // For now, we'll just simulate a successful signup with a mock user
            // const mockUser: User = { 
            //   id: '1', 
            //   email: credentials.email, 
            //   name: credentials.name,
            //   role: 'user',
            //   createdAt: new Date().toISOString(),
            //   updatedAt: new Date().toISOString()
            // };
            
            set({
              // user: mockUser,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Signup failed',
              isLoading: false,
            });
            throw error;
          }
        },

        setUser: (user: User | null) => {
          set({
            user,
            isAuthenticated: !!user,
          });
        },

        setLoading: (isLoading: boolean) => {
          set({ isLoading });
        },

        setError: (error: string | null) => {
          set({ error });
        },

        clearError: () => {
          set({ error: null });
        },

        logout: () => {
          // Clear auth token from localStorage
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth-token');
          }
          set({
            user: null,
            isAuthenticated: false,
            error: null,
          });
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: 'auth-store' }
  )
);
