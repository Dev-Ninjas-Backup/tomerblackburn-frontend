import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

// About Us API Service
export const aboutService = {
  // Get about us data
  getAboutUsData: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/about-us`);
      return response.data;
    } catch (error) {
      console.error("Error fetching about us data:", error);
      throw error;
    }
  },
};