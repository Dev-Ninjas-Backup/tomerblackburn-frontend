import { useMutation } from "@tanstack/react-query";
import { contactPageService } from "@/services/contact.service";
import { ContactFormData } from "@/types/contact.types";
import { toast } from "sonner";

// Hook to submit contact form
export const useSubmitContactForm = () => {
  return useMutation({
    mutationFn: (data: ContactFormData) => contactPageService.submitContactForm(data),
    onSuccess: () => {
      toast.success("Thank you! We'll get back to you soon.");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to submit. Please try again.");
    },
  });
};
