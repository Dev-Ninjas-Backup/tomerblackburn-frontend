import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '@/services/notification.service';

export const useNotifications = (limit: number = 10, isRead?: boolean) => {
  return useQuery({
    queryKey: ['notifications', limit, isRead],
    queryFn: () => notificationService.getNotifications(limit, isRead),
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notificationService.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
