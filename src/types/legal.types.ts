export interface PrivacyPolicy {
  id: string;
  title: string;
  effectiveDate: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface TermsOfService {
  id: string;
  title: string;
  effectiveDate: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface PrivacyPolicyResponse {
  message: string;
  data: PrivacyPolicy;
}

export interface TermsOfServiceResponse {
  message: string;
  data: TermsOfService;
}

export interface LegalFormData {
  title: string;
  effectiveDate: string;
  body: string;
}
