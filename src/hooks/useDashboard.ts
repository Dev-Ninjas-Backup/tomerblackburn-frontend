import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboard.service';

export const useDashboardSummary = () => {
  return useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: async () => {
      const response = await dashboardService.getSummary();
      return response.data;
    },
  });
};

export const useRevenueTrend = (months: number = 12) => {
  return useQuery({
    queryKey: ['revenue-trend', months],
    queryFn: async () => {
      const response = await dashboardService.getRevenueTrend(months);
      return response.data;
    },
  });
};
