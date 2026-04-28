import { api } from "@/lib/api";

// About Us API Service
export const aboutService = {
  // Get about us data
  getAboutUsData: async () => {
    const response = await api.get("/about-us");
    return response.data;
  },
};