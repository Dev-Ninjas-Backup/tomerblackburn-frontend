import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { projectTypeService } from '@/services/project-type.service';
import { serviceCategoryService } from '@/services/service-category.service';
import { serviceService } from '@/services/service.service';
import { CreateProjectTypeDto, UpdateProjectTypeDto, CreateServiceCategoryDto, UpdateServiceCategoryDto, CreateServiceDto, UpdateServiceDto } from '@/types/project-management.types';
import { toast } from 'sonner';

// Project Types
export const useProjectTypes = (isActive?: boolean) => {
  return useQuery({
    queryKey: ['project-types', isActive],
    queryFn: async () => {
      const response = await projectTypeService.getAll(isActive);
      return response.data.data;
    },
  });
};

export const useCreateProjectType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProjectTypeDto) => projectTypeService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-types'] });
      toast.success('Project type created successfully');
    },
    onError: () => {
      toast.error('Failed to create project type');
    },
  });
};

export const useUpdateProjectType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectTypeDto }) =>
      projectTypeService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-types'] });
      toast.success('Project type updated successfully');
    },
    onError: () => {
      toast.error('Failed to update project type');
    },
  });
};

export const useDeleteProjectType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => projectTypeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-types'] });
      toast.success('Project type deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete project type');
    },
  });
};

// Service Categories
export const useServiceCategories = (isActive?: boolean) => {
  return useQuery({
    queryKey: ['service-categories', isActive],
    queryFn: async () => {
      const response = await serviceCategoryService.getAll(isActive);
      return response.data.data;
    },
  });
};

export const useServiceCategoriesByProjectType = (projectTypeId?: string) => {
  return useQuery({
    queryKey: ['service-categories', 'project-type', projectTypeId],
    queryFn: async () => {
      if (!projectTypeId) return [];
      const response = await serviceCategoryService.getByProjectType(projectTypeId);
      return response.data.data;
    },
    enabled: !!projectTypeId,
  });
};

export const useCreateServiceCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateServiceCategoryDto) => serviceCategoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service-categories'] });
      toast.success('Service category created successfully');
    },
    onError: () => {
      toast.error('Failed to create service category');
    },
  });
};

export const useUpdateServiceCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateServiceCategoryDto }) =>
      serviceCategoryService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service-categories'] });
      toast.success('Service category updated successfully');
    },
    onError: () => {
      toast.error('Failed to update service category');
    },
  });
};

export const useDeleteServiceCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => serviceCategoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service-categories'] });
      toast.success('Service category deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete service category');
    },
  });
};

// Services
export const useServices = (isActive?: boolean) => {
  return useQuery({
    queryKey: ['services', isActive],
    queryFn: async () => {
      const response = await serviceService.getAll(isActive);
      return response.data.data;
    },
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, image }: { data: CreateServiceDto; image?: File }) =>
      serviceService.create(data, image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service created successfully');
    },
    onError: () => {
      toast.error('Failed to create service');
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data, image }: { id: string; data: UpdateServiceDto; image?: File }) =>
      serviceService.update(id, data, image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service updated successfully');
    },
    onError: () => {
      toast.error('Failed to update service');
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => serviceService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete service');
    },
  });
};
