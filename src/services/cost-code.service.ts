import axios from 'axios';
import {
  CostCode,
  CreateCostCodeDto,
  UpdateCostCodeDto,
  ApiResponse,
} from '@/types/cost-management.types';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const costCodeService = {
  getAll: async (filters?: {
    categoryId?: string;
    serviceId?: string;
    questionType?: string;
    unitType?: string;
    isActive?: boolean;
    isIncludedInBase?: boolean;
    includeOptions?: boolean;
    includeCategory?: boolean;
    includeServiceRelation?: boolean;
  }) => {
    return axios.get<ApiResponse<CostCode[]>>(`${API_URL}/cost-codes`, { params: filters });
  },

  getByCategory: async (categoryId: string) => {
    return axios.get<ApiResponse<CostCode[]>>(`${API_URL}/cost-codes/category/${categoryId}`);
  },

  getByQuestionType: async (questionType: string) => {
    return axios.get<ApiResponse<CostCode[]>>(`${API_URL}/cost-codes/question-type/${questionType}`);
  },

  getById: async (id: string) => {
    return axios.get<ApiResponse<CostCode>>(`${API_URL}/cost-codes/${id}`);
  },

  getByCode: async (code: string) => {
    return axios.get<ApiResponse<CostCode>>(`${API_URL}/cost-codes/code/${code}`);
  },

  create: async (data: CreateCostCodeDto) => {
    return axios.post<ApiResponse<CostCode>>(`${API_URL}/cost-codes`, data);
  },

  update: async (id: string, data: UpdateCostCodeDto) => {
    return axios.patch<ApiResponse<CostCode>>(`${API_URL}/cost-codes/${id}`, data);
  },

  toggleStatus: async (id: string) => {
    return axios.patch<ApiResponse<CostCode>>(`${API_URL}/cost-codes/${id}/toggle-status`);
  },

  reorder: async (items: { id: string; displayOrder: number }[]) => {
    return axios.patch(`${API_URL}/cost-codes/reorder`, { items });
  },

  delete: async (id: string) => {
    return axios.delete<ApiResponse<void>>(`${API_URL}/cost-codes/${id}`);
  },

  addImage: async (costCodeId: string, fileInstanceId: string) => {
    return axios.post(`${API_URL}/cost-codes/${costCodeId}/images`, { fileInstanceId });
  },

  removeImage: async (costCodeId: string, imageId: string) => {
    return axios.delete(`${API_URL}/cost-codes/${costCodeId}/images/${imageId}`);
  },

  reorderImages: async (costCodeId: string, items: { id: string; displayOrder: number }[]) => {
    return axios.patch(`${API_URL}/cost-codes/${costCodeId}/images/reorder`, { items });
  },
};
