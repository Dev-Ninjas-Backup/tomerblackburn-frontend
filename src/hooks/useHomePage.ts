import { useQuery, useMutation } from "@tanstack/react-query";
import { homePageService } from "@/services/home.service";
import { toast } from "sonner";

// Hook to fetch home page data
export const useHomePageData = () => {
  return useQuery({
    queryKey: ["homePageData"],
    queryFn: homePageService.getHomePageData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to subscribe to newsletter
export const useSubscribeNewsletter = () => {
  return useMutation({
    mutationFn: (email: string) => homePageService.subscribeNewsletter(email),
    onSuccess: () => {
      toast.success("Successfully subscribed to newsletter!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to subscribe. Please try again.");
    },
  });
};
