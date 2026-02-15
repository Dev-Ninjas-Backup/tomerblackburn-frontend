import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tipsService } from "@/services/tips.service";
import { CreateTipDto, UpdateTipDto } from "@/types/tips.types";
import { toast } from "sonner";

export const useTips = (position?: number) => {
  return useQuery({
    queryKey: ["tips", position],
    queryFn: () => tipsService.getAll(position),
  });
};

export const useTip = (id: string) => {
  return useQuery({
    queryKey: ["tips", id],
    queryFn: () => tipsService.getById(id),
    enabled: !!id,
  });
};

export const useCreateTip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTipDto) => tipsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tips"] });
      toast.success("Tip created successfully");
    },
    onError: () => {
      toast.error("Failed to create tip");
    },
  });
};

export const useUpdateTip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTipDto }) =>
      tipsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tips"] });
      toast.success("Tip updated successfully");
    },
    onError: () => {
      toast.error("Failed to update tip");
    },
  });
};

export const useDeleteTip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => tipsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tips"] });
      toast.success("Tip deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete tip");
    },
  });
};
