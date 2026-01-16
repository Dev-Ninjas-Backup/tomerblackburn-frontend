import HeroSection from "./_components/HeroSection";
import HowItWorksSection from "./_components/HowItWorksSection";
import BathroomTypesSection from "./_components/BathroomTypesSection";
import WhyChooseUsSection from "./_components/WhyChooseUsSection";

export default function EstimatorPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <BathroomTypesSection />
      <WhyChooseUsSection />
    </main>
  );
}