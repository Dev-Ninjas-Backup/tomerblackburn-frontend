import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface DashboardSummary {
  totalSubmissions: number;
  pending: number;
  processing: number;
  completed: number;
  totalRevenue: number;
}

export interface RevenueTrend {
  range: {
    start: string;
    end: string;
    months: number;
  };
  labels: string[];
  totals: number[];
}

export const dashboardService = {
  getSummary: async () => {
    const response = await axios.get<{ message: string; data: DashboardSummary }>(
      `${API_URL}/dashboard/summary`
    );
    return response.data;
  },

  getRevenueTrend: async (months: number = 12) => {
    const response = await axios.get<{ message: string; data: RevenueTrend }>(
      `${API_URL}/dashboard/revenue`,
      { params: { months } }
    );
    return response.data;
  },
};
