import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { estimatorPageService } from "@/services/estimator.service";
import {
  EstimatorPage,
  HowItWorksStep,
  WhyChooseUsFeature,
} from "@/types/estimator.types";
import { toast } from "sonner";

// Main Page
export const useEstimatorPageData = () => {
  return useQuery({
    queryKey: ["estimatorPage"],
    queryFn: estimatorPageService.getEstimatorPage,
  });
};

export const useCompleteEstimatorPageData = () => {
  return useQuery({
    queryKey: ["completeEstimatorPage"],
    queryFn: estimatorPageService.getCompleteData,
  });
};

export const useUpdateEstimatorPage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<EstimatorPage>) =>
      estimatorPageService.updateEstimatorPage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["estimatorPage"] });
      queryClient.invalidateQueries({ queryKey: ["completeEstimatorPage"] });
      toast.success("Estimator page updated successfully");
    },
    onError: () => {
      toast.error("Failed to update estimator page");
    },
  });
};

// How It Works Steps
export const useHowItWorksSteps = () => {
  return useQuery({
    queryKey: ["howItWorksSteps"],
    queryFn: estimatorPageService.getAllHowItWorksSteps,
  });
};

export const useCreateHowItWorksStep = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<HowItWorksStep>) =>
      estimatorPageService.createHowItWorksStep(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["howItWorksSteps"] });
      queryClient.invalidateQueries({ queryKey: ["completeEstimatorPage"] });
      toast.success("Step created successfully");
    },
    onError: () => {
      toast.error("Failed to create step");
    },
  });
};

export const useUpdateHowItWorksStep = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<HowItWorksStep> }) =>
      estimatorPageService.updateHowItWorksStep(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["howItWorksSteps"] });
      queryClient.invalidateQueries({ queryKey: ["completeEstimatorPage"] });
      toast.success("Step updated successfully");
    },
    onError: () => {
      toast.error("Failed to update step");
    },
  });
};

export const useDeleteHowItWorksStep = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => estimatorPageService.deleteHowItWorksStep(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["howItWorksSteps"] });
      queryClient.invalidateQueries({ queryKey: ["completeEstimatorPage"] });
      toast.success("Step deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete step");
    },
  });
};

// Why Choose Us Features
export const useWhyChooseUsFeatures = () => {
  return useQuery({
    queryKey: ["whyChooseUsFeatures"],
    queryFn: estimatorPageService.getAllWhyChooseUsFeatures,
  });
};

export const useCreateWhyChooseUsFeature = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<WhyChooseUsFeature>) =>
      estimatorPageService.createWhyChooseUsFeature(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whyChooseUsFeatures"] });
      queryClient.invalidateQueries({ queryKey: ["completeEstimatorPage"] });
      toast.success("Feature created successfully");
    },
    onError: () => {
      toast.error("Failed to create feature");
    },
  });
};

export const useUpdateWhyChooseUsFeature = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<WhyChooseUsFeature> }) =>
      estimatorPageService.updateWhyChooseUsFeature(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whyChooseUsFeatures"] });
      queryClient.invalidateQueries({ queryKey: ["completeEstimatorPage"] });
      toast.success("Feature updated successfully");
    },
    onError: () => {
      toast.error("Failed to update feature");
    },
  });
};

export const useDeleteWhyChooseUsFeature = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => estimatorPageService.deleteWhyChooseUsFeature(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whyChooseUsFeatures"] });
      queryClient.invalidateQueries({ queryKey: ["completeEstimatorPage"] });
      toast.success("Feature deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete feature");
    },
  });
};
