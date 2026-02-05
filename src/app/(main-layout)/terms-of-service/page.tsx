import { termsOfServiceService } from "@/services/legal.service";
import { TermsOfServiceClient } from "./_components/TermsOfServiceClient";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function TermsOfServicePage() {
  let termsOfService = null;
  let error = null;

  try {
    const response = await termsOfServiceService.get();
    termsOfService = response.data;
  } catch (err) {
    error = "Terms of Service not found";
  }

  return <TermsOfServiceClient termsOfService={termsOfService} error={error} />;
}
