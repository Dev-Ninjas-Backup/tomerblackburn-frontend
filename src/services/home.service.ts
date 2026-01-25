import api from "@/lib/api";
import {
  HomePage,
  ServiceStandsOut,
  CompleteHomePageData,
} from "@/types/home.types";

// Home Page API Service
export const homePageService = {
  // Get complete home page data
  getCompleteHomePageData: async (): Promise<CompleteHomePageData> => {
    const response = await api.get("/home-page/complete");
    return response.data.data; // Extract data from response
  },

  // Get home page only
  getHomePage: async (): Promise<HomePage> => {
    const response = await api.get("/home-page");
    return response.data.data;
  },

  // Update home page
  updateHomePage: async (payload: Partial<HomePage>): Promise<HomePage> => {
    const response = await api.patch("/home-page", payload);
    return response.data.data;
  },

  // Services CRUD
  getAllServices: async (): Promise<ServiceStandsOut[]> => {
    const response = await api.get("/home-page/services");
    return response.data.data;
  },

  createService: async (formData: FormData): Promise<ServiceStandsOut> => {
    const response = await api.post("/home-page/services", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  },

  updateService: async (
    id: string,
    formData: FormData
  ): Promise<ServiceStandsOut> => {
    const response = await api.patch(`/home-page/services/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  },

  deleteService: async (id: string): Promise<void> => {
    await api.delete(`/home-page/services/${id}`);
  },

  // Subscribe to newsletter
  subscribeNewsletter: async (email: string): Promise<{ message: string }> => {
    const response = await api.post("/subscribe", { email });
    return response.data;
  },
};
