import api from "@/lib/api";
import {
  EstimatorPage,
  HowItWorksStep,
  WhyChooseUsFeature,
  CompleteEstimatorPageData,
} from "@/types/estimator.types";

export const estimatorPageDashboardService = {
  // Main Page
  getEstimatorPage: async () => {
    const response = await api.get<{ message: string; data: EstimatorPage }>(
      "/estimator-page"
    );
    return response.data.data;
  },

  getCompleteData: async () => {
    const response = await api.get<{ message: string; data: CompleteEstimatorPageData }>(
      "/estimator-page/complete"
    );
    return response.data.data;
  },

  updateEstimatorPage: async (payload: Partial<EstimatorPage>) => {
    const response = await api.put<{ message: string; data: EstimatorPage }>(
      "/estimator-page",
      payload
    );
    return response.data.data;
  },

  // How It Works Steps
  getAllHowItWorksSteps: async () => {
    const response = await api.get<{ message: string; count: number; data: HowItWorksStep[] }>(
      "/estimator-page/how-it-works"
    );
    return response.data.data;
  },

  createHowItWorksStep: async (payload: Partial<HowItWorksStep>) => {
    const response = await api.post<{ message: string; data: HowItWorksStep }>(
      "/estimator-page/how-it-works",
      payload
    );
    return response.data.data;
  },

  updateHowItWorksStep: async (id: string, payload: Partial<HowItWorksStep>) => {
    const response = await api.put<{ message: string; data: HowItWorksStep }>(
      `/estimator-page/how-it-works/${id}`,
      payload
    );
    return response.data.data;
  },

  deleteHowItWorksStep: async (id: string) => {
    await api.delete(`/estimator-page/how-it-works/${id}`);
  },

  // Why Choose Us Features
  getAllWhyChooseUsFeatures: async () => {
    const response = await api.get<{ message: string; count: number; data: WhyChooseUsFeature[] }>(
      "/estimator-page/why-choose-us"
    );
    return response.data.data;
  },

  createWhyChooseUsFeature: async (payload: Partial<WhyChooseUsFeature>) => {
    const response = await api.post<{ message: string; data: WhyChooseUsFeature }>(
      "/estimator-page/why-choose-us",
      payload
    );
    return response.data.data;
  },

  updateWhyChooseUsFeature: async (id: string, payload: Partial<WhyChooseUsFeature>) => {
    const response = await api.put<{ message: string; data: WhyChooseUsFeature }>(
      `/estimator-page/why-choose-us/${id}`,
      payload
    );
    return response.data.data;
  },

  deleteWhyChooseUsFeature: async (id: string) => {
    await api.delete(`/estimator-page/why-choose-us/${id}`);
  },
};
