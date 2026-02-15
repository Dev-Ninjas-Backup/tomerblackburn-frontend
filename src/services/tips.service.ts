import api from "@/lib/api";
import { Tip, CreateTipDto, UpdateTipDto, ApiResponse } from "@/types/tips.types";

export const tipsService = {
  getAll: async (position?: number) => {
    const params = position ? { position } : {};
    const response = await api.get<ApiResponse<Tip[]>>("/tips", { params });
    return response.data.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<Tip>>(`/tips/${id}`);
    return response.data.data;
  },

  create: async (data: CreateTipDto) => {
    const response = await api.post<ApiResponse<Tip>>("/tips", data);
    return response.data.data;
  },

  update: async (id: string, data: UpdateTipDto) => {
    const response = await api.patch<ApiResponse<Tip>>(`/tips/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<void>>(`/tips/${id}`);
    return response.data;
  },
};
