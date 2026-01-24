import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { portfolioService } from "@/services/portfolio.service";

export const PORTFOLIO_QUERY_KEY = "portfolios";

// Get all portfolios
export const usePortfolios = (includeInactive = true) => {
  return useQuery({
    queryKey: [PORTFOLIO_QUERY_KEY, includeInactive],
    queryFn: async () => {
      const response = await portfolioService.getAllCategories(includeInactive);
      return response.data.data;
    },
  });
};

// Get portfolio by ID
export const usePortfolio = (id: string) => {
  return useQuery({
    queryKey: [PORTFOLIO_QUERY_KEY, id],
    queryFn: async () => {
      const response = await portfolioService.getCategoryById(id);
      return response.data.data;
    },
    enabled: !!id,
  });
};

// Create portfolio
export const useCreatePortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      name: string;
      slug: string;
      description?: string;
      displayOrder?: number;
      isActive?: boolean;
    }) => portfolioService.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PORTFOLIO_QUERY_KEY] });
    },
  });
};

// Update portfolio
export const useUpdatePortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        name?: string;
        slug?: string;
        description?: string;
        displayOrder?: number;
        isActive?: boolean;
      };
    }) => portfolioService.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PORTFOLIO_QUERY_KEY] });
    },
  });
};

// Delete portfolio
export const useDeletePortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => portfolioService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PORTFOLIO_QUERY_KEY] });
    },
  });
};

// Toggle portfolio status
export const useTogglePortfolioStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => portfolioService.toggleCategoryStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PORTFOLIO_QUERY_KEY] });
    },
  });
};

// Add image to portfolio
export const useAddPortfolioImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      categoryId,
      data,
    }: {
      categoryId: string;
      data: {
        fileId: string;
        caption?: string;
        displayOrder?: number;
      };
    }) => portfolioService.addImage(categoryId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PORTFOLIO_QUERY_KEY] });
    },
  });
};

// Update image
export const useUpdatePortfolioImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      imageId,
      data,
    }: {
      imageId: string;
      data: {
        fileId?: string;
        caption?: string;
        displayOrder?: number;
      };
    }) => portfolioService.updateImage(imageId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PORTFOLIO_QUERY_KEY] });
    },
  });
};

// Delete image
export const useDeletePortfolioImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (imageId: string) => portfolioService.deleteImage(imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PORTFOLIO_QUERY_KEY] });
    },
  });
};

// Reorder images
export const useReorderPortfolioImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      categoryId,
      imageIds,
    }: {
      categoryId: string;
      imageIds: string[];
    }) => portfolioService.reorderImages(categoryId, imageIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PORTFOLIO_QUERY_KEY] });
    },
  });
};
