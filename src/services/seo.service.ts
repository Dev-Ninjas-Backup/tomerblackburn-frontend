import api from '@/lib/api';
import {
  SeoSettings,
  UpdateSeoSettingsDto,
  SeoPage,
  UpdateSeoPageDto,
  SeoBundle,
} from '@/types/seo.types';

export const seoService = {
  getGlobalSettings: async (): Promise<SeoSettings> => {
    const response = await api.get<{ message: string; data: SeoSettings }>('/seo/global');
    return response.data.data;
  },

  updateGlobalSettings: async (data: UpdateSeoSettingsDto): Promise<SeoSettings> => {
    const response = await api.patch<{ message: string; data: SeoSettings }>('/seo/global', data);
    return response.data.data;
  },

  getAllPages: async (): Promise<SeoPage[]> => {
    const response = await api.get<{ message: string; data: SeoPage[] }>('/seo/pages');
    return response.data.data;
  },

  getPageByPath: async (path: string): Promise<SeoPage | null> => {
    const response = await api.get<{ message: string; data: SeoPage | null }>(`/seo/page?path=${encodeURIComponent(path)}`);
    return response.data.data;
  },

  updatePage: async (id: string, data: UpdateSeoPageDto): Promise<SeoPage> => {
    const response = await api.patch<{ message: string; data: SeoPage }>(`/seo/pages/${id}`, data);
    return response.data.data;
  },

  getPublicBundle: async (): Promise<SeoBundle> => {
    const response = await api.get<{ message: string; data: SeoBundle }>('/seo/bundle');
    return response.data.data;
  },
};
