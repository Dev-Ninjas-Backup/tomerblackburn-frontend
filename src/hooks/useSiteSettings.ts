import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { siteSettingsService } from "@/services/site-settings.service";
import { CreateSiteSettingsDto, UpdateSiteSettingsDto } from "@/types/site-settings.types";

export const useSiteSettings = () => {
  return useQuery({
    queryKey: ["siteSettings"],
    queryFn: siteSettingsService.getSettings,
  });
};

export const useCreateSiteSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSiteSettingsDto) => siteSettingsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siteSettings"] });
    },
  });
};

export const useUpdateSiteSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateSiteSettingsDto) => siteSettingsService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siteSettings"] });
    },
  });
};
