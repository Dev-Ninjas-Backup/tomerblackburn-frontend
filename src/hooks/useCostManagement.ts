import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { costCodeCategoryService } from '@/services/cost-code-category.service';
import { costCodeService } from '@/services/cost-code.service';
import { costCodeOptionService } from '@/services/cost-code-option.service';
import { CreateCostCodeCategoryDto, UpdateCostCodeCategoryDto, CreateCostCodeDto, UpdateCostCodeDto, CreateCostCodeOptionDto, UpdateCostCodeOptionDto } from '@/types/cost-management.types';
import { toast } from 'sonner';

// Cost Code Categories
export const useCostCodeCategories = (isActive?: boolean) => {
  return useQuery({
    queryKey: ['cost-code-categories', isActive],
    queryFn: async () => {
      const response = await costCodeCategoryService.getAll(isActive);
      return response.data.data;
    },
  });
};

export const useCreateCostCodeCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCostCodeCategoryDto) => costCodeCategoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cost-code-categories'] });
      toast.success('Cost code category created successfully');
    },
    onError: () => {
      toast.error('Failed to create cost code category');
    },
  });
};

export const useUpdateCostCodeCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCostCodeCategoryDto }) =>
      costCodeCategoryService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cost-code-categories'] });
      toast.success('Cost code category updated successfully');
    },
    onError: () => {
      toast.error('Failed to update cost code category');
    },
  });
};

export const useReorderCostCodeCategories = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (items: { id: string; displayOrder: number }[]) =>
      costCodeCategoryService.reorder(items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cost-code-categories'] });
    },
    onError: () => {
      toast.error('Failed to reorder categories');
    },
  });
};

export const useDeleteCostCodeCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => costCodeCategoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cost-code-categories'] });
      toast.success('Cost code category deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete cost code category');
    },
  });
};

// Cost Codes
export const useCostCodes = (filters?: { 
  categoryId?: string; 
  serviceId?: string; 
  questionType?: string;
  unitType?: string;
  isActive?: boolean;
  isIncludedInBase?: boolean;
  includeOptions?: boolean;
  includeCategory?: boolean;
  includeServiceRelation?: boolean;
}) => {
  return useQuery({
    queryKey: ['cost-codes', filters],
    queryFn: async () => {
      const response = await costCodeService.getAll(filters);
      return response.data.data;
    },
  });
};

export const useCostCodesByCategory = (categoryId?: string) => {
  return useQuery({
    queryKey: ['cost-codes', 'category', categoryId],
    queryFn: async () => {
      if (!categoryId) return [];
      const response = await costCodeService.getByCategory(categoryId);
      return response.data.data;
    },
    enabled: !!categoryId,
  });
};

export const useCreateCostCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCostCodeDto) => costCodeService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cost-codes'] });
      toast.success('Cost code created successfully');
    },
    onError: () => {
      toast.error('Failed to create cost code');
    },
  });
};

export const useUpdateCostCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCostCodeDto }) =>
      costCodeService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cost-codes'] });
      toast.success('Cost code updated successfully');
    },
    onError: () => {
      toast.error('Failed to update cost code');
    },
  });
};

export const useReorderCostCodes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (items: { id: string; displayOrder: number }[]) =>
      costCodeService.reorder(items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cost-codes'] });
    },
    onError: () => {
      toast.error('Failed to reorder cost codes');
    },
  });
};

export const useDeleteCostCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => costCodeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cost-codes'] });
      toast.success('Cost code deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete cost code');
    },
  });
};

// Cost Code Options
export const useCostCodeOptions = (costCodeId?: string) => {
  return useQuery({
    queryKey: ['cost-code-options', costCodeId],
    queryFn: async () => {
      if (!costCodeId) return [];
      const response = await costCodeOptionService.getByCostCode(costCodeId);
      return response.data.data;
    },
    enabled: !!costCodeId,
  });
};

export const useCreateCostCodeOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCostCodeOptionDto) => costCodeOptionService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cost-code-options'] });
      toast.success('Cost code option created successfully');
    },
    onError: () => {
      toast.error('Failed to create cost code option');
    },
  });
};

export const useUpdateCostCodeOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCostCodeOptionDto }) =>
      costCodeOptionService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cost-code-options'] });
      toast.success('Cost code option updated successfully');
    },
    onError: () => {
      toast.error('Failed to update cost code option');
    },
  });
};

export const useDeleteCostCodeOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => costCodeOptionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cost-code-options'] });
      toast.success('Cost code option deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete cost code option');
    },
  });
};

export const useSetDefaultCostCodeOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => costCodeOptionService.setAsDefault(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cost-code-options'] });
      toast.success('Default option set successfully');
    },
    onError: () => {
      toast.error('Failed to set default option');
    },
  });
};

export const useBulkCreateCostCodeOptions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ costCodeId, options }: { costCodeId: string; options: Omit<CreateCostCodeOptionDto, 'costCodeId'>[] }) =>
      costCodeOptionService.bulkCreate(costCodeId, options),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cost-code-options'] });
      toast.success('Options created successfully');
    },
    onError: () => {
      toast.error('Failed to create options');
    },
  });
};

export const useReorderCostCodeOptions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ costCodeId, optionIds }: { costCodeId: string; optionIds: string[] }) =>
      costCodeOptionService.reorder(costCodeId, optionIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cost-code-options'] });
      toast.success('Options reordered successfully');
    },
    onError: () => {
      toast.error('Failed to reorder options');
    },
  });
};
