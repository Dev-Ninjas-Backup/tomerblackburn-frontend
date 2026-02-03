import axios from 'axios';
import {
  ProjectType,
  CreateProjectTypeDto,
  UpdateProjectTypeDto,
  ApiResponse,
} from '@/types/project-management.types';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const projectTypeService = {
  getAll: async (isActive?: boolean) => {
    const params = isActive !== undefined ? { isActive } : {};
    return axios.get<ApiResponse<ProjectType[]>>(`${API_URL}/project-types`, { params });
  },

  getActive: async () => {
    return axios.get<ApiResponse<ProjectType[]>>(`${API_URL}/project-types/active`);
  },

  getById: async (id: string) => {
    return axios.get<ApiResponse<ProjectType>>(`${API_URL}/project-types/${id}`);
  },

  create: async (data: CreateProjectTypeDto) => {
    return axios.post<ApiResponse<ProjectType>>(`${API_URL}/project-types`, data);
  },

  update: async (id: string, data: UpdateProjectTypeDto) => {
    return axios.patch<ApiResponse<ProjectType>>(`${API_URL}/project-types/${id}`, data);
  },

  delete: async (id: string) => {
    return axios.delete<ApiResponse<void>>(`${API_URL}/project-types/${id}`);
  },
};
