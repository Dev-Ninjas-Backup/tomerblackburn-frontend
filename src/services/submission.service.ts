import axios from 'axios';
import { Submission, SubmissionStatus, DashboardStats, ApiResponse } from '@/types/submission.types';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const submissionService = {
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
};
