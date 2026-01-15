import React from "react";
import PhilosophySection from "./_components/PhilosophySection";
import AboutContent from "./_components/AboutContent";

export const metadata = {
  title: "About Us - BBurn Builders",
  description: "Learn about BBurn Builders and our commitment to quality construction and client satisfaction.",
};

const AboutPage = () => {
  return (
    <div>
      <PhilosophySection />
      <AboutContent />
    </div>
  );
};

export default AboutPage;
