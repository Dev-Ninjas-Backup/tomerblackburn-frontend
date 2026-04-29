import { jwtDecode } from "jwt-decode";

export interface UserPermissions {
  id: string;
  userId: string;
  submissionsView: boolean;
  submissionsEdit: boolean;
  submissionsDelete: boolean;
  contactsView: boolean;
  contactsEdit: boolean;
  contactsDelete: boolean;
  costManagementView: boolean;
  costManagementEdit: boolean;
  costManagementDelete: boolean;
  projectManagementView: boolean;
  projectManagementEdit: boolean;
  projectManagementDelete: boolean;
  webView: boolean;
  webEdit: boolean;
  settingsView: boolean;
  dataBackupAccess: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  avatarFile?: any;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
  permissions?: UserPermissions | null;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface DecodedToken {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const authStorage = {
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
  },

  getUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  setUser: (user: User): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(USER_KEY);
  },

  clear: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

export const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};

export const getDecodedToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    return null;
  }
};
