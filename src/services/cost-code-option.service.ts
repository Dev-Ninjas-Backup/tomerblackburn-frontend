import axios from 'axios';
import {
  CostCodeOption,
  CreateCostCodeOptionDto,
  UpdateCostCodeOptionDto,
  ApiResponse,
} from '@/types/cost-management.types';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const costCodeOptionService = {
  getAll: async (costCodeId?: string) => {
    const params = costCodeId ? { costCodeId } : {};
    return axios.get<ApiResponse<CostCodeOption[]>>(`${API_URL}/cost-code-options`, { params });
  },

  getByCostCode: async (costCodeId: string) => {
    return axios.get<ApiResponse<CostCodeOption[]>>(`${API_URL}/cost-code-options/cost-code/${costCodeId}`);
  },

  getById: async (id: string) => {
    return axios.get<ApiResponse<CostCodeOption>>(`${API_URL}/cost-code-options/${id}`);
  },

  create: async (data: CreateCostCodeOptionDto) => {
    return axios.post<ApiResponse<CostCodeOption>>(`${API_URL}/cost-code-options`, data);
  },

  bulkCreate: async (costCodeId: string, options: Omit<CreateCostCodeOptionDto, 'costCodeId'>[]) => {
    return axios.post<ApiResponse<CostCodeOption[]>>(`${API_URL}/cost-code-options/bulk`, {
      costCodeId,
      options,
    });
  },

  update: async (id: string, data: UpdateCostCodeOptionDto) => {
    return axios.patch<ApiResponse<CostCodeOption>>(`${API_URL}/cost-code-options/${id}`, data);
  },

  setAsDefault: async (id: string) => {
    return axios.patch<ApiResponse<CostCodeOption>>(`${API_URL}/cost-code-options/${id}/set-default`);
  },

  reorder: async (costCodeId: string, optionIds: string[]) => {
    return axios.patch<ApiResponse<CostCodeOption[]>>(`${API_URL}/cost-code-options/cost-code/${costCodeId}/reorder`, {
      optionIds,
    });
  },

  delete: async (id: string) => {
    return axios.delete<ApiResponse<void>>(`${API_URL}/cost-code-options/${id}`);
  },
};
