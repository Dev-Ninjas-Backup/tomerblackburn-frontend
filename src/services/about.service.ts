import axios from "axios";
import { AboutPageData } from "@/types/about.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

// About Page API Service
export const aboutPageService = {
  // Get about page data
  getAboutPageData: async (): Promise<AboutPageData> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/about`);
      return response.data;
    } catch (error) {
      console.error("Error fetching about page data:", error);
      throw error;
    }
  },
};
