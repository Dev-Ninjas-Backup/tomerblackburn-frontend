import axios from 'axios';
import {
  ServiceCategory,
  CreateServiceCategoryDto,
  UpdateServiceCategoryDto,
  ApiResponse,
} from '@/types/project-management.types';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const serviceCategoryService = {
  getAll: async (isActive?: boolean) => {
    const params = isActive !== undefined ? { isActive } : {};
    return axios.get<ApiResponse<ServiceCategory[]>>(`${API_URL}/service-categories`, { params });
  },

  getActive: async () => {
    return axios.get<ApiResponse<ServiceCategory[]>>(`${API_URL}/service-categories/active`);
  },

  getByProjectType: async (projectTypeId: string) => {
    return axios.get<ApiResponse<ServiceCategory[]>>(`${API_URL}/service-categories/project-type/${projectTypeId}`);
  },

  getById: async (id: string) => {
    return axios.get<ApiResponse<ServiceCategory>>(`${API_URL}/service-categories/${id}`);
  },

  create: async (data: CreateServiceCategoryDto) => {
    return axios.post<ApiResponse<ServiceCategory>>(`${API_URL}/service-categories`, data);
  },

  update: async (id: string, data: UpdateServiceCategoryDto) => {
    return axios.patch<ApiResponse<ServiceCategory>>(`${API_URL}/service-categories/${id}`, data);
  },

  delete: async (id: string) => {
    return axios.delete<ApiResponse<void>>(`${API_URL}/service-categories/${id}`);
  },
};
