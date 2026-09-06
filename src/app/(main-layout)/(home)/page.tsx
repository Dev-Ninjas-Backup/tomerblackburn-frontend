import React from "react";
import HeroSection from "./_components/HeroSection";
import MissionSection from "./_components/MissionSection";
import ServicesSection from "./_components/ServicesSection";
import { homePageService } from "@/services/home.service";
import { estimatorPageService } from "@/services/estimator.service";

import { getPageMetadata } from "@/lib/seo-helpers";

export const revalidate = 60;

export async function generateMetadata() {
  return getPageMetadata("/", {
    title: "BBurn Builders — Premier Custom Remodeling | Chicago, IL",
    description:
      "Chicago's premier remodeling contractor. Specializing in luxury bathroom remodels, custom carpentry, and home renovations. Get your free instant estimate!",
    keywords:
      "home remodeling chicago, bathroom remodel chicago, custom carpentry, luxury renovations illinois, general contractor chicago, bburn builders",
  });
}

const HomePage = async () => {
  let homePageData = null;
  let howItWorksSteps: Array<{
    id: string;
    stepNumber: number;
    title: string;
    description: string;
    isActive?: boolean;
  }> = [];

  try {
    homePageData = await homePageService.getCompleteHomePageData();
  } catch (error) {
    console.error("Failed to fetch home page data:", error);
  }

  try {
    const estimatorData = await estimatorPageService.getCompleteData();
    howItWorksSteps = estimatorData.data?.howItWorksSteps || [];
  } catch (error) {
    console.error("Failed to fetch estimator data:", error);
  }

  return (
    <div>
      <HeroSection
        homePageData={homePageData?.homePage}
        howItWorksSteps={howItWorksSteps}
      />
      <MissionSection homePageData={homePageData?.homePage} />
      <ServicesSection services={homePageData?.services || []} />
    </div>
  );
};

export default HomePage;
