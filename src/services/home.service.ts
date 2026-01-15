import axios from "axios";
import { HomePageData } from "@/types/home.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

// Home Page API Service
export const homePageService = {
  // Get home page data
  getHomePageData: async (): Promise<HomePageData> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/home`);
      return response.data;
    } catch (error) {
      console.error("Error fetching home page data:", error);
      throw error;
    }
  },

  // Subscribe to newsletter
  subscribeNewsletter: async (email: string): Promise<{ message: string }> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/subscribe`, { email });
      return response.data;
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      throw error;
    }
  },
};
