import React from "react";
import PhilosophySection from "./_components/PhilosophySection";
import AboutContent from "./_components/AboutContent";
import { aboutService } from "@/services/about.service";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata = {
  title: "About Us - BBurn Builders",
  description:
    "Learn about BBurn Builders and our commitment to quality construction and client satisfaction.",
};

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
