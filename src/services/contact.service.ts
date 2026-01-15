import axios from "axios";
import { ContactFormData } from "@/types/contact.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

// Contact Page API Service
export const contactPageService = {
  // Submit contact form
  submitContactForm: async (data: ContactFormData): Promise<{ message: string }> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/contact`, data);
      return response.data;
    } catch (error) {
      console.error("Error submitting contact form:", error);
      throw error;
    }
  },
};
