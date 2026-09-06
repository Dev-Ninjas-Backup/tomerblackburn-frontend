import { termsOfServiceService } from "@/services/legal.service";
import { TermsOfServiceClient } from "./_components/TermsOfServiceClient";
import { getPageMetadata } from "@/lib/seo-helpers";

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata() {
  return getPageMetadata("/terms-of-service", {
    title: "Terms of Service — BBurn Builders",
    description:
      "Review the terms and conditions for using the BBurn Builders website, online estimator, and remodeling services.",
    keywords: "terms of service bburn builders",
  });
}

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
