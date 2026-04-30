import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface VisitorSession {
  id: string;
  socketId: string;
  ipAddress: string | null;
  userAgent: string | null;
  referrer: string | null;
  page: string | null;
  connectedAt: string;
  disconnectedAt: string;
  durationSeconds: number;
}

export interface TrafficStats {
  totalSessions: number;
  todaySessions: number;
  avgDurationSeconds: number;
  topPages: { page: string; visits: number }[];
  topReferrers: { referrer: string; visits: number }[];
}

export const trafficService = {
  getSessions: async (page = 1, limit = 20) => {
    const response = await axios.get<{
      message: string;
      data: {
        sessions: VisitorSession[];
        total: number;
        page: number;
        limit: number;
        pages: number;
      };
    }>(`${API_URL}/traffic/sessions`, { params: { page, limit } });
    return response.data;
  },

  getStats: async () => {
    const response = await axios.get<{ message: string; data: TrafficStats }>(
      `${API_URL}/traffic/stats`,
    );
    return response.data;
  },
};
