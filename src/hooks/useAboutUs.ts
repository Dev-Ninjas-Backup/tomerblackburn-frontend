import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { aboutUsService } from "@/services/home.service";
import { AboutUs } from "@/types/home.types";
import { toast } from "sonner";

export const useAboutUsData = () => {
  return useQuery({
    queryKey: ["aboutUs"],
    queryFn: aboutUsService.getAboutUs,
  });
};

export const useUpdateAboutUs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<AboutUs>) =>
      aboutUsService.updateAboutUs(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aboutUs"] });
      toast.success("About Us updated successfully");
    },
    onError: () => {
      toast.error("Failed to update About Us");
    },
  });
};
