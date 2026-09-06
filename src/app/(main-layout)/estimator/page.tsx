import HeroSection from "./_components/HeroSection";
import HowItWorksSection from "./_components/HowItWorksSection";
import BathroomTypesSection from "./_components/BathroomTypesSection";
import WhyChooseUsSection from "./_components/WhyChooseUsSection";
import { estimatorPageService } from "@/services/estimator.service";
import { getPageMetadata } from "@/lib/seo-helpers";

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata() {
  return getPageMetadata("/estimator", {
    title: "Online Remodel Estimator — Instant Pricing | BBurn Builders",
    description:
      "Calculate live remodeling costs and configure your custom bathroom or home renovation in Chicago with our instant, transparent project estimator tool.",
    keywords:
      "remodel calculator, bathroom remodel cost estimator, instant construction estimate chicago, renovation quote bburn builders",
  });
}

export default async function EstimatorPage() {
  let estimatorData = null;

  try {
    const response = await estimatorPageService.getCompleteData();
    estimatorData = response.data;
  } catch (error) {
    console.error("Failed to fetch estimator page data:", error);
  }

  return (
    <main className="min-h-screen">
      <HeroSection data={estimatorData?.page} />
      <HowItWorksSection 
        title={estimatorData?.page?.howItWorksTitle}
        steps={estimatorData?.howItWorksSteps || []}
      />
      <BathroomTypesSection />
      <WhyChooseUsSection 
        title={estimatorData?.page?.whyChooseUsTitle}
        features={estimatorData?.whyChooseUsFeatures || []}
      />
    </main>
  );
}