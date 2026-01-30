import api from "@/lib/api";
import { CompleteEstimatorPageData } from "@/types/estimator.types";

export const estimatorPageService = {
  getCompleteData: async () => {
    const response = await api.get<{ message: string; data: CompleteEstimatorPageData }>(
      "/estimator-page/complete"
    );
    return response.data;
  },
};
