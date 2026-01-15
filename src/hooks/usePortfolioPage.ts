import { useQuery } from "@tanstack/react-query";
import { portfolioPageService } from "@/services/portfolio.service";

// Hook to fetch portfolio page data
export const usePortfolioPageData = () => {
  return useQuery({
    queryKey: ["portfolioPageData"],
    queryFn: portfolioPageService.getPortfolioPageData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
