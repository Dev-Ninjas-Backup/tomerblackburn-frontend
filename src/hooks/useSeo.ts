import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { seoService } from '@/services/seo.service';
import { UpdateSeoSettingsDto, UpdateSeoPageDto } from '@/types/seo.types';
import { toast } from 'sonner';

export const useGlobalSeo = () => {
  return useQuery({
    queryKey: ['seo', 'global'],
    queryFn: seoService.getGlobalSettings,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateGlobalSeo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateSeoSettingsDto) => seoService.updateGlobalSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seo'] });
      toast.success('Global SEO settings saved successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to save SEO settings');
    },
  });
};

export const useSeoPages = () => {
  return useQuery({
    queryKey: ['seo', 'pages'],
    queryFn: seoService.getAllPages,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateSeoPage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSeoPageDto }) =>
      seoService.updatePage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seo', 'pages'] });
      toast.success('Page SEO updated successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update page SEO');
    },
  });
};

export const useSeoBundle = () => {
  return useQuery({
    queryKey: ['seo', 'bundle'],
    queryFn: seoService.getPublicBundle,
    staleTime: 10 * 60 * 1000,
  });
};
