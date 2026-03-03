import { create } from "zustand";
import { User, authStorage, isTokenValid } from "@/lib/auth";
import api from "@/lib/api";
import { showToast, toastMessages } from "@/lib/toast";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  fetchCurrentUser: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
}

// Initialize state from localStorage
const initializeAuth = () => {
  if (typeof window === "undefined") {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
    };
  }

  const token = authStorage.getToken();
  const user = authStorage.getUser();

  if (token && user && isTokenValid(token)) {
    return {
      user,
      token,
      isAuthenticated: true,
    };
  }

  return {
    user: null,
    token: null,
    isAuthenticated: false,
  };
};

const initialState = initializeAuth();

export const useAuthStore = create<AuthState>((set) => ({
  user: initialState.user,
  token: initialState.token,
  isAuthenticated: initialState.isAuthenticated,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data;

      authStorage.setToken(token);
      authStorage.setUser(user);

      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      const { message, description } = toastMessages.auth.loginSuccess(user.name);
      showToast.success(message, description);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      });
      
      showToast.error(toastMessages.auth.loginError, errorMessage);
      
      throw error;
    }
  },

  register: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      const { token, user } = response.data;

      authStorage.setToken(token);
      authStorage.setUser(user);

      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      const { message, description } = toastMessages.auth.registerSuccess(user.name);
      showToast.success(message, description);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      });
      
      showToast.error(toastMessages.auth.registerError, errorMessage);
      
      throw error;
    }
  },

  logout: () => {
    authStorage.clear();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
    
    const { message, description } = toastMessages.auth.logoutSuccess;
    showToast.info(message, description);
    
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  },

  checkAuth: () => {
    const token = authStorage.getToken();
    const user = authStorage.getUser();

    if (token && user && isTokenValid(token)) {
      set({
        user,
        token,
        isAuthenticated: true,
      });
    } else {
      // Token expired or invalid
      if (token && user) {
        authStorage.clear();
        const { message, description } = toastMessages.auth.sessionExpired;
        showToast.warning(message, description);
      }
      
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    }
  },

  fetchCurrentUser: async () => {
    try {
      const currentUser = authStorage.getUser();
      if (!currentUser?.id) return;

      const response = await api.get(`/users/${currentUser.id}`);
      const updatedUser = response.data.data;
      
      authStorage.setUser(updatedUser);
      set({ user: updatedUser });
    } catch (error) {
      console.error('Failed to fetch current user:', error);
    }
  },

  updateUser: (userData: Partial<User>) => {
    const currentUser = authStorage.getUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      authStorage.setUser(updatedUser);
      set({ user: updatedUser });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
