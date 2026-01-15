import { useQuery } from "@tanstack/react-query";
import { aboutPageService } from "@/services/about.service";

// Hook to fetch about page data
export const useAboutPageData = () => {
  return useQuery({
    queryKey: ["aboutPageData"],
    queryFn: aboutPageService.getAboutPageData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
