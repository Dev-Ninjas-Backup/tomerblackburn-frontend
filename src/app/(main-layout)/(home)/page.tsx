import React from "react";
import HeroSection from "./_components/HeroSection";
import MissionSection from "./_components/MissionSection";
import ServicesSection from "./_components/ServicesSection";

import { homePageService } from "@/services/home.service";

export const revalidate = 60; // Revalidate every 60 seconds

const HomePage = async () => {
  let homePageData = null;

  try {
    homePageData = await homePageService.getCompleteHomePageData();
  } catch (error) {
    console.error("Failed to fetch home page data:", error);
  }

  return (
    <div>
      <HeroSection homePageData={homePageData?.homePage} />
      <MissionSection homePageData={homePageData?.homePage} />
      <ServicesSection services={homePageData?.services || []} />
      
    </div>
  );
};

export default HomePage;
