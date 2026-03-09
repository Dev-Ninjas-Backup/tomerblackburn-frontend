import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { submissionService } from "@/services/submission.service";
import { SubmissionStatus } from "@/types/submission.types";
import { toast } from "sonner";

export const useSubmissions = (
  status?: SubmissionStatus,
  page: number = 1,
  limit: number = 10,
) => {
  return useQuery({
    queryKey: ["submissions", status, page, limit],
    queryFn: async () => {
      const response = await submissionService.getAll(status, page, limit);
      return response.data;
    },
  });
};

export const useAllSubmissions = (status?: SubmissionStatus, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["all-submissions", status],
    queryFn: async () => {
      const response = await submissionService.getAllWithoutPagination(status);
      return response.data;
    },
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSubmission = (id: string) => {
  return useQuery({
    queryKey: ["submission", id],
    queryFn: async () => {
      const response = await submissionService.getById(id);
      return response.data.data;
    },
    enabled: !!id,
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const response = await submissionService.getDashboardStats();
      return response.data.data;
    },
  });
};

export const useUpdateSubmissionStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: SubmissionStatus }) =>
      submissionService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success("Status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });
};

export const useDeleteSubmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => submissionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      toast.success("Submission deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete submission");
    },
  });
};

export const useRegeneratePdf = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => submissionService.regeneratePdf(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      toast.success("PDF regenerated successfully");
    },
    onError: () => {
      toast.error("Failed to regenerate PDF");
    },
  });
};

export const useExportSubmissions = () => {
  return useMutation({
    mutationFn: async (status?: SubmissionStatus) => {
      return await submissionService.exportToExcel(status);
    },
    onSuccess: (data: { blob: Blob; filename: string }) => {
      const url = window.URL.createObjectURL(data.blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = data.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Submissions exported successfully");
    },
    onError: () => {
      toast.error("Failed to export submissions");
    },
  });
};

export const useExportSubmissionsByIds = () => {
  return useMutation({
    mutationFn: async (ids: string[]) => {
      return await submissionService.exportByIds(ids);
    },
    onSuccess: (data: { blob: Blob; filename: string }) => {
      const url = window.URL.createObjectURL(data.blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = data.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Submissions exported successfully");
    },
    onError: () => {
      toast.error("Failed to export submissions");
    },
  });
};

// export const useExportSubmissions = () => {
//   return useMutation({
//     mutationFn: (status?: SubmissionStatus) => submissionService.exportToExcel(status),
//     onSuccess: () => {
//       toast.success('Excel file downloaded successfully');
//     },
//     onError: () => {
//       toast.error('Failed to export submissions');
//     },
//   });
// };
