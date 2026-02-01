import { termsOfServiceService } from "@/services/legal.service";
import { TermsOfServiceClient } from "./_components/TermsOfServiceClient";

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
