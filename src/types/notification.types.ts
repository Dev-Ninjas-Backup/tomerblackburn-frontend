export interface Notification {
  id: string;
  action: string;
  entityType: string;
  entityId?: string;
  description?: string;
  metadata?: string;
  isRead: boolean;
  createdAt: string;
}
