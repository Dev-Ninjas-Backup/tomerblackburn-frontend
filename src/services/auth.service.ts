import api from '@/lib/api';
import { UserPermissions } from '@/lib/auth';

export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
  role?: 'SUPER_ADMIN' | 'ADMIN' | 'VIEW_ONLY';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  permissions?: UserPermissions | null;
}

export const authService = {
  register: async (data: RegisterUserDto) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  getAllUsers: async () => {
    const response = await api.get<{ message: string; data: User[] }>('/users');
    return response.data;
  },

  updateUser: async (id: string, data: { name?: string; email?: string; role?: string }) => {
    const response = await api.patch<{ message: string; data: User }>(`/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await api.delete<{ message: string }>(`/users/${id}`);
    return response.data;
  },

  toggleUserStatus: async (id: string) => {
    const response = await api.patch<{ message: string; data: User }>(`/users/${id}/toggle-status`);
    return response.data;
  },

  changePassword: async (id: string, data: { currentPassword: string; newPassword: string }) => {
    const response = await api.patch<{ message: string }>(`/users/${id}/password`, data);
    return response.data;
  },

  getUserPermissions: async (id: string) => {
    const response = await api.get<{ message: string; data: UserPermissions }>(`/users/${id}/permissions`);
    return response.data;
  },

  updateUserPermissions: async (id: string, data: Partial<UserPermissions>) => {
    const response = await api.put<{ message: string; data: UserPermissions }>(`/users/${id}/permissions`, data);
    return response.data;
  },
};
