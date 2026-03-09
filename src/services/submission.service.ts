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

  getAllWithoutPagination: async (status?: SubmissionStatus) => {
    const params: any = { page: 1, limit: 100 };
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
    
    let filename = `submissions-export-${new Date().toISOString().split('T')[0]}.xlsx`;
    
    try {
      const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'];
      if (contentDisposition) {
        const matches = contentDisposition.match(/filename[^;=\n]*=(['"]?)(.+?)\1(?:;|$)/i);
        if (matches && matches[2]) {
          filename = matches[2];
        }
      }
    } catch (e) {
      console.error('Failed to extract filename:', e);
    }
    
    return { blob: response.data, filename };
  },

  exportByIds: async (ids: string[]) => {
    const submissions = await Promise.all(
      ids.map(id => submissionService.getById(id).then(res => res.data.data))
    );
    
    const response = await axios.post(`${API_URL}/submissions/export`, { ids }, {
      responseType: 'blob',
    });
    
    const date = new Date().toISOString().split('T')[0];
    const filename = submissions.length === 1
      ? `${submissions[0].submissionNumber}_${date}.xlsx`
      : `${submissions.map(s => s.submissionNumber).join('_')}_${date}.xlsx`;
    
    return { blob: response.data, filename };
  },

  archiveMany: async (ids: string[]) => {
    return axios.post<ApiResponse<{ count: number }>>(`${API_URL}/submissions/bulk-archive`, { ids });
  },

  deleteMany: async (ids: string[]) => {
    return axios.post<ApiResponse<{ count: number }>>(`${API_URL}/submissions/bulk-delete`, { ids });
  },

  // Next Steps CRUD
  getAllNextSteps: async (includeInactive: boolean = true) => {
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
