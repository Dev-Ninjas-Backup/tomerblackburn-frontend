import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { homePageService } from "@/services/home.service";
import { HomePage, ServiceStandsOut } from "@/types/home.types";
import { toast } from "sonner";

export const useHomePageData = () => {
  return useQuery({
    queryKey: ["homePage"],
    queryFn: homePageService.getHomePage,
  });
};

export const useCompleteHomePageData = () => {
  return useQuery({
    queryKey: ["completeHomePage"],
    queryFn: homePageService.getCompleteHomePageData,
  });
};

export const useUpdateHomePage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<HomePage>) =>
      homePageService.updateHomePage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homePage"] });
      queryClient.invalidateQueries({ queryKey: ["completeHomePage"] });
      toast.success("Home page updated successfully");
    },
    onError: () => {
      toast.error("Failed to update home page");
    },
  });
};

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: homePageService.getAllServices,
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => homePageService.createService(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["completeHomePage"] });
      toast.success("Service created successfully");
    },
    onError: () => {
      toast.error("Failed to create service");
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      homePageService.updateService(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["completeHomePage"] });
      toast.success("Service updated successfully");
    },
    onError: () => {
      toast.error("Failed to update service");
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => homePageService.deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["completeHomePage"] });
      toast.success("Service deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete service");
    },
  });
};
