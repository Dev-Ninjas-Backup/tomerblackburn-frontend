import api from '@/lib/api';

export interface HearAboutUsOption {
  id: string;
  label: string;
  displayOrder: number;
  isActive: boolean;
}

export interface HearAboutUsSetting {
  id: string;
  isEnabled: boolean;
}

export const hearAboutUsService = {
  getSetting: () => api.get<{ data: HearAboutUsSetting }>('/hear-about-us/setting'),
  getActiveOptions: () => api.get<{ data: HearAboutUsOption[] }>('/hear-about-us/options/active'),
  getAllOptions: () => api.get<{ data: HearAboutUsOption[] }>('/hear-about-us/options'),
  createOption: (data: { label: string; displayOrder?: number; isActive?: boolean }) =>
    api.post<{ data: HearAboutUsOption }>('/hear-about-us/options', data),
  updateOption: (id: string, data: Partial<{ label: string; displayOrder: number; isActive: boolean }>) =>
    api.patch<{ data: HearAboutUsOption }>(`/hear-about-us/options/${id}`, data),
  deleteOption: (id: string) => api.delete(`/hear-about-us/options/${id}`),
  updateSetting: (isEnabled: boolean) =>
    api.patch<{ data: HearAboutUsSetting }>('/hear-about-us/setting', { isEnabled }),
  reorderOptions: (items: { id: string; displayOrder: number }[]) =>
    api.patch('/hear-about-us/options/reorder', { items }),
};
