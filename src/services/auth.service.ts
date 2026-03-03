import api from '@/lib/api';

export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
  role?: 'SUPER_ADMIN' | 'ADMIN' | 'USER';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
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
};
