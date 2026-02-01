import api from "@/lib/api";
import {
  PrivacyPolicyResponse,
  TermsOfServiceResponse,
  LegalFormData,
} from "@/types/legal.types";

export const privacyPolicyService = {
  get: async () => {
    const response = await api.get<PrivacyPolicyResponse>("/privacy-policy");
    return response.data;
  },

  createOrUpdate: async (data: LegalFormData) => {
    const response = await api.post<PrivacyPolicyResponse>("/privacy-policy", data);
    return response.data;
  },

  update: async (data: Partial<LegalFormData>) => {
    const response = await api.patch<PrivacyPolicyResponse>("/privacy-policy", data);
    return response.data;
  },
};

export const termsOfServiceService = {
  get: async () => {
    const response = await api.get<TermsOfServiceResponse>("/terms-of-service");
    return response.data;
  },

  createOrUpdate: async (data: LegalFormData) => {
    const response = await api.post<TermsOfServiceResponse>("/terms-of-service", data);
    return response.data;
  },

  update: async (data: Partial<LegalFormData>) => {
    const response = await api.patch<TermsOfServiceResponse>("/terms-of-service", data);
    return response.data;
  },
};
