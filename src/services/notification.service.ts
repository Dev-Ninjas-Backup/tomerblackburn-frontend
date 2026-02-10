import api from '@/lib/api';
import { Notification } from '@/types/notification.types';

export const notificationService = {
  getNotifications: async (limit: number = 10, isRead?: boolean) => {
    const params: any = { limit };
    if (isRead !== undefined) {
      params.isRead = isRead.toString();
    }
    const response = await api.get<Notification[]>('/notifications', { params });
    return response.data;
  },

  markAsRead: async (id: string) => {
    const response = await api.patch<Notification>(`/notifications/${id}`, { isRead: true });
    return response.data;
  },
};
