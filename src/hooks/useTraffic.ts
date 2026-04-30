import { useQuery } from '@tanstack/react-query';
import { trafficService } from '@/services/traffic.service';

export const useTrafficSessions = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['traffic-sessions', page, limit],
    queryFn: async () => {
      const response = await trafficService.getSessions(page, limit);
      return response.data;
    },
  });
};

export const useTrafficStats = () => {
  return useQuery({
    queryKey: ['traffic-stats'],
    queryFn: async () => {
      const response = await trafficService.getStats();
      return response.data;
    },
    refetchInterval: 30000,
  });
};
