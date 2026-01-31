import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { privacyPolicyService, termsOfServiceService } from "@/services/legal.service";
import { toast } from "sonner";

// Privacy Policy Hooks
export const usePrivacyPolicy = () => {
  return useQuery({
    queryKey: ["privacyPolicy"],
    queryFn: privacyPolicyService.get,
    retry: false,
  });
};

export const useSavePrivacyPolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: privacyPolicyService.createOrUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["privacyPolicy"] });
      toast.success("Privacy Policy saved successfully");
    },
    onError: () => {
      toast.error("Failed to save Privacy Policy");
    },
  });
};

// Terms of Service Hooks
export const useTermsOfService = () => {
  return useQuery({
    queryKey: ["termsOfService"],
    queryFn: termsOfServiceService.get,
    retry: false,
  });
};

export const useSaveTermsOfService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: termsOfServiceService.createOrUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["termsOfService"] });
      toast.success("Terms of Service saved successfully");
    },
    onError: () => {
      toast.error("Failed to save Terms of Service");
    },
  });
};
