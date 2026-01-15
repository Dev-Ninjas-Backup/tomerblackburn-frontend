import axios from "axios";
import { PortfolioPageData } from "@/types/portfolio.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

// Portfolio Page API Service
export const portfolioPageService = {
  // Get portfolio page data
  getPortfolioPageData: async (): Promise<PortfolioPageData> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/portfolio`);
      return response.data;
    } catch (error) {
      console.error("Error fetching portfolio page data:", error);
      throw error;
    }
  },
};
