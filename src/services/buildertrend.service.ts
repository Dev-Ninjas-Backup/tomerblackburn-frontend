import { ContactFormData } from "./contact.service";

export const builderTrendService = {
  // Submit via backend proxy (recommended)
  submitToBuilderTrend: async (data: ContactFormData) => {
    try {
      // This will call your backend endpoint which will handle BuilderTrend submission
      const response = await fetch("/api/buildertrend/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("BuilderTrend submission failed");
      }

      return await response.json();
    } catch (error) {
      console.error("BuilderTrend submission error:", error);
      throw error;
    }
  },
};
