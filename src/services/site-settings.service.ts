import api from "@/lib/api";
import { SiteSettings, CreateSiteSettingsDto, UpdateSiteSettingsDto } from "@/types/site-settings.types";

export const siteSettingsService = {
  getSettings: async () => {
    const response = await api.get<{ message: string; data: SiteSettings }>("/site-settings");
    return response.data.data;
  },

  create: async (data: CreateSiteSettingsDto) => {
    const response = await api.post<{ message: string; data: SiteSettings }>("/site-settings", data);
    return response.data.data;
  },

  update: async (data: UpdateSiteSettingsDto) => {
    const response = await api.patch<{ message: string; data: SiteSettings }>("/site-settings", data);
    return response.data.data;
  },
};
