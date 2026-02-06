import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { submissionService } from '@/services/submission.service';
import { toast } from 'sonner';

export const useNextSteps = (includeInactive: boolean = false) => {
  return useQuery({
    queryKey: ['next-steps', includeInactive],
    queryFn: async () => {
      const response = await submissionService.getAllNextSteps(includeInactive);
      return response.data.data;
    },
  });
};

export const useCreateNextStep = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      stepNumber: number;
      title: string;
      description: string;
      isActive?: boolean;
    }) => submissionService.createNextStep(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['next-steps'] });
      toast.success('Next step created successfully');
    },
    onError: () => {
      toast.error('Failed to create next step');
    },
  });
};

export const useUpdateNextStep = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      submissionService.updateNextStep(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['next-steps'] });
      toast.success('Next step updated successfully');
    },
    onError: () => {
      toast.error('Failed to update next step');
    },
  });
};

export const useDeleteNextStep = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => submissionService.deleteNextStep(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['next-steps'] });
      toast.success('Next step deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete next step');
    },
  });
};
