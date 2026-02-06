import axios from 'axios';
import { Submission, SubmissionStatus, DashboardStats, ApiResponse } from '@/types/submission.types';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const submissionService = {
  create: async (data: any) => {
    return axios.post<ApiResponse<Submission>>(`${API_URL}/submissions`, data);
  },

  getAll: async (status?: SubmissionStatus, page: number = 1, limit: number = 10) => {
    const params: any = { page, limit };
    if (status) params.status = status;
    return axios.get<ApiResponse<Submission[]>>(`${API_URL}/submissions`, { params });
  },

  getById: async (id: string) => {
    return axios.get<ApiResponse<Submission>>(`${API_URL}/submissions/${id}`);
  },

  getBySubmissionNumber: async (submissionNumber: string) => {
    return axios.get<ApiResponse<Submission>>(`${API_URL}/submissions/by-number/${submissionNumber}`);
  },

  getDashboardStats: async () => {
    return axios.get<ApiResponse<DashboardStats>>(`${API_URL}/submissions/dashboard-stats`);
  },

  updateStatus: async (id: string, status: SubmissionStatus) => {
    return axios.patch<ApiResponse<Submission>>(`${API_URL}/submissions/${id}/status`, { status });
  },

  delete: async (id: string) => {
    return axios.delete<ApiResponse<void>>(`${API_URL}/submissions/${id}`);
  },

  regeneratePdf: async (id: string) => {
    return axios.post<ApiResponse<Submission>>(`${API_URL}/submissions/${id}/regenerate-pdf`);
  },

  exportToExcel: async (status?: SubmissionStatus) => {
    const params: any = {};
    if (status) params.status = status;
    const response = await axios.get(`${API_URL}/submissions/export`, {
      params,
      responseType: 'blob',
    });
    
    const blob = new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `submissions-export-${new Date().toISOString().split('T')[0]}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },

  // Next Steps CRUD
  getAllNextSteps: async (includeInactive: boolean = false) => {
    return axios.get<ApiResponse<Array<{
      id: string;
      stepNumber: number;
      title: string;
      description: string;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
    }>>>(`${API_URL}/submissions/next-steps`, {
      params: { includeInactive }
    });
  },

  getNextStepById: async (id: string) => {
    return axios.get<ApiResponse<{
      id: string;
      stepNumber: number;
      title: string;
      description: string;
      isActive: boolean;
    }>>(`${API_URL}/submissions/next-steps/${id}`);
  },

  createNextStep: async (data: {
    stepNumber: number;
    title: string;
    description: string;
    isActive?: boolean;
  }) => {
    return axios.post<ApiResponse<any>>(`${API_URL}/submissions/next-steps`, data);
  },

  updateNextStep: async (id: string, data: {
    stepNumber?: number;
    title?: string;
    description?: string;
    isActive?: boolean;
  }) => {
    return axios.patch<ApiResponse<any>>(`${API_URL}/submissions/next-steps/${id}`, data);
  },

  deleteNextStep: async (id: string) => {
    return axios.delete<ApiResponse<void>>(`${API_URL}/submissions/next-steps/${id}`);
  },

  addMedia: async (submissionId: string, data: {
    fileInstanceId: string;
    mediaType: 'PHOTO' | 'VIDEO';
    description?: string;
  }) => {
    return axios.post<ApiResponse<any>>(`${API_URL}/submissions/${submissionId}/media`, data);
  },
};
