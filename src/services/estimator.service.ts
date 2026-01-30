import api from "@/lib/api";
import {
  EstimatorPage,
  HowItWorksStep,
  WhyChooseUsFeature,
  CompleteEstimatorPageData,
} from "@/types/estimator.types";

export const estimatorPageService = {
  // Main Page
  getEstimatorPage: async (): Promise<EstimatorPage> => {
    const response = await api.get("/estimator-page");
    return response.data.data;
  },

  getCompleteData: async (): Promise<CompleteEstimatorPageData> => {
    const response = await api.get("/estimator-page/complete");
    return response.data.data;
  },

  updateEstimatorPage: async (
    payload: Partial<EstimatorPage>
  ): Promise<EstimatorPage> => {
    const response = await api.put("/estimator-page", payload);
    return response.data.data;
  },

  // How It Works Steps
  getAllHowItWorksSteps: async (): Promise<HowItWorksStep[]> => {
    const response = await api.get("/estimator-page/how-it-works");
    return response.data.data;
  },

  createHowItWorksStep: async (
    payload: Partial<HowItWorksStep>
  ): Promise<HowItWorksStep> => {
    const response = await api.post("/estimator-page/how-it-works", payload);
    return response.data.data;
  },

  updateHowItWorksStep: async (
    id: string,
    payload: Partial<HowItWorksStep>
  ): Promise<HowItWorksStep> => {
    const response = await api.put(`/estimator-page/how-it-works/${id}`, payload);
    return response.data.data;
  },

  deleteHowItWorksStep: async (id: string): Promise<void> => {
    await api.delete(`/estimator-page/how-it-works/${id}`);
  },

  // Why Choose Us Features
  getAllWhyChooseUsFeatures: async (): Promise<WhyChooseUsFeature[]> => {
    const response = await api.get("/estimator-page/why-choose-us");
    return response.data.data;
  },

  createWhyChooseUsFeature: async (
    payload: Partial<WhyChooseUsFeature>
  ): Promise<WhyChooseUsFeature> => {
    const response = await api.post("/estimator-page/why-choose-us", payload);
    return response.data.data;
  },

  updateWhyChooseUsFeature: async (
    id: string,
    payload: Partial<WhyChooseUsFeature>
  ): Promise<WhyChooseUsFeature> => {
    const response = await api.put(`/estimator-page/why-choose-us/${id}`, payload);
    return response.data.data;
  },

  deleteWhyChooseUsFeature: async (id: string): Promise<void> => {
    await api.delete(`/estimator-page/why-choose-us/${id}`);
  },
};
