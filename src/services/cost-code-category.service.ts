import axios from 'axios';
import {
  CostCodeCategory,
  CreateCostCodeCategoryDto,
  UpdateCostCodeCategoryDto,
  ApiResponse,
} from '@/types/cost-management.types';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const costCodeCategoryService = {
  getAll: async (isActive?: boolean, includeCostCodes?: boolean) => {
    const params: any = {};
    if (isActive !== undefined) params.isActive = isActive;
    if (includeCostCodes) params.includeCostCodes = includeCostCodes;
    return axios.get<ApiResponse<CostCodeCategory[]>>(`${API_URL}/cost-code-categories`, { params });
  },

  getActive: async (includeCostCodes?: boolean) => {
    const params = includeCostCodes ? { includeCostCodes } : {};
    return axios.get<ApiResponse<CostCodeCategory[]>>(`${API_URL}/cost-code-categories/active`, { params });
  },

  getById: async (id: string) => {
    return axios.get<ApiResponse<CostCodeCategory>>(`${API_URL}/cost-code-categories/${id}`);
  },

  getBySlug: async (slug: string) => {
    return axios.get<ApiResponse<CostCodeCategory>>(`${API_URL}/cost-code-categories/slug/${slug}`);
  },

  create: async (data: CreateCostCodeCategoryDto) => {
    return axios.post<ApiResponse<CostCodeCategory>>(`${API_URL}/cost-code-categories`, data);
  },

  update: async (id: string, data: UpdateCostCodeCategoryDto) => {
    return axios.patch<ApiResponse<CostCodeCategory>>(`${API_URL}/cost-code-categories/${id}`, data);
  },

  toggleStatus: async (id: string) => {
    return axios.patch<ApiResponse<CostCodeCategory>>(`${API_URL}/cost-code-categories/${id}/toggle-status`);
  },

  delete: async (id: string) => {
    return axios.delete<ApiResponse<void>>(`${API_URL}/cost-code-categories/${id}`);
  },
};
