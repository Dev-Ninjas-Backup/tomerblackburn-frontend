import React from "react";
import PhilosophySection from "./_components/PhilosophySection";
import AboutContent from "./_components/AboutContent";
import { aboutService } from "@/services/about.service";
import { getPageMetadata } from "@/lib/seo-helpers";

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata() {
  return getPageMetadata("/about", {
    title: "About Us — Craftsmanship & Standards | BBurn Builders",
    description:
      "Learn about BBurn Builders, founder Tomer Blackburn, and our dedication to elite craftsmanship, transparency, and architectural remodeling in Chicago.",
    keywords:
      "about bburn builders, tomer blackburn, chicago general contractor team, luxury builder history",
  });
}

const AboutPage = async () => {
  let aboutUsData = null;

  try {
    const response = await aboutService.getAboutUsData();
    aboutUsData = response.data;
  } catch (error) {
    console.error("Failed to fetch about us data:", error);
  }

  return (
    <div>
      <PhilosophySection aboutUsData={{ title: aboutUsData?.title }} />
      <AboutContent aboutUsData={{
        ownerInfo: aboutUsData?.ownerInfo,
        description: aboutUsData?.description,
        image: aboutUsData?.image
      }} />
    </div>
  );
};

export default AboutPage;
