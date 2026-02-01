import { privacyPolicyService } from "@/services/legal.service";
import { PrivacyPolicyClient } from "./_components/PrivacyPolicyClient";

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
