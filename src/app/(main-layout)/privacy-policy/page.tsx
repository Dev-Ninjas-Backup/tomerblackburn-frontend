import { privacyPolicyService } from "@/services/legal.service";
import { PrivacyPolicyClient } from "./_components/PrivacyPolicyClient";
import { getPageMetadata } from "@/lib/seo-helpers";

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata() {
  return getPageMetadata("/privacy-policy", {
    title: "Privacy Policy | BBurn Builders",
    description:
      "Review the privacy policy for BBurn Builders to understand how we collect, protect, and manage your personal data across our online estimator services.",
    keywords: "privacy policy bburn builders",
  });
}

export default async function PrivacyPolicyPage() {
  let privacyPolicy = null;
  let error = null;

  try {
    const response = await privacyPolicyService.get();
    privacyPolicy = response.data;
  } catch (err) {
    error = "Privacy Policy not found";
  }

  return <PrivacyPolicyClient privacyPolicy={privacyPolicy} error={error} />;
}
