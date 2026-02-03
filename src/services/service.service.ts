import axios from 'axios';
import {
  Service,
  CreateServiceDto,
  UpdateServiceDto,
  ApiResponse,
} from '@/types/project-management.types';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const serviceService = {
  getAll: async (isActive?: boolean) => {
    const params = isActive !== undefined ? { isActive } : {};
    return axios.get<ApiResponse<Service[]>>(`${API_URL}/services`, { params });
  },

  getActive: async () => {
    return axios.get<ApiResponse<Service[]>>(`${API_URL}/services/active`);
  },

  getByCategory: async (categoryId: string) => {
    const params = { serviceCategoryId: categoryId };
    return axios.get<ApiResponse<Service[]>>(`${API_URL}/services`, { params });
  },

  getById: async (id: string) => {
    return axios.get<ApiResponse<Service>>(`${API_URL}/services/${id}`);
  },

  getByCode: async (code: string) => {
    return axios.get<ApiResponse<Service>>(`${API_URL}/services/code/${code}`);
  },

  create: async (data: CreateServiceDto, image?: File) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    if (image) {
      formData.append('image', image);
    }
    return axios.post<ApiResponse<Service>>(`${API_URL}/services`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  update: async (id: string, data: UpdateServiceDto, image?: File) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    if (image) {
      formData.append('image', image);
    }
    return axios.patch<ApiResponse<Service>>(`${API_URL}/services/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  delete: async (id: string) => {
    return axios.delete<ApiResponse<void>>(`${API_URL}/services/${id}`);
  },
};
