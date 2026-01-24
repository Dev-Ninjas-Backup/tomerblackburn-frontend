import { useQuery } from "@tanstack/react-query";
import { portfolioService } from "@/services/portfolio.service";

// Hook to fetch portfolio page data
export const usePortfolioPageData = () => {
  return useQuery({
    queryKey: ["portfolioPageData"],
    queryFn: () => portfolioService.getAllCategories(false),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
