"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

interface HowItWorksStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
}

interface HeroSectionProps {
  homePageData?: {
    title?: string;
    subTitle?: string;
    homeBackgroundImage?: {
      url: string;
    } | null;
  } | null;
  howItWorksSteps?: HowItWorksStep[];
}

const HeroSection = ({
  homePageData,
  howItWorksSteps = [],
}: HeroSectionProps) => {
  const title = homePageData?.title || "Calculate Your Home Remodeling Cost";
  const subTitle =
    homePageData?.subTitle ||
    "From Minor Fixes to Full Renovations. We Treat Every Job With Care.";
  const backgroundImage =
    homePageData?.homeBackgroundImage?.url ||
    "data:image/svg+xml,%3Csvg width='1920' height='1080' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3C/svg%3E";

  const steps = howItWorksSteps
    .sort((a, b) => a.stepNumber - b.stepNumber)
    .slice(0, 3);

  return (
    <section className="relative h-[calc(100vh-120px)] min-h-150 flex flex-col items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content — card + how it works stacked */}
      <div className="relative z-10 w-full max-w-xl mx-auto px-4 flex flex-col items-center gap-3">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full bg-[#283878] text-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold mb-4 leading-tight"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-base mb-7 text-white/90 leading-relaxed"
          >
            {subTitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/estimator/choose-project-type">
              <Button
                size="lg"
                className="bg-white text-[#283878] hover:bg-gray-50 font-semibold px-10 py-6 text-base rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Start My Estimate
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* How It Works — compact strip */}
        {steps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg px-5 py-4"
          >
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest text-center mb-3">How It Works</p>
            <div className="flex items-stretch gap-0">
              {steps.map((step, i) => (
                <div
                  key={step.id}
                  className="flex items-stretch flex-1 min-w-0"
                >
                  {/* Step */}
                  <div className="flex flex-col items-center text-center flex-1 min-w-0 px-2">
                    <div className="w-7 h-7 rounded-full bg-[#283878] text-white text-xs font-bold flex items-center justify-center mb-1.5 shrink-0">
                      {step.stepNumber}
                    </div>
                    <p className="text-xs font-semibold text-[#283878] leading-tight mb-0.5 line-clamp-1">
                      {step.title}
                    </p>
                    <p className="text-[11px] text-gray-500 leading-tight line-clamp-2 hidden sm:block">
                      {step.description}
                    </p>
                  </div>

                  {/* Divider */}
                  {i < steps.length - 1 && (
                    <div className="flex items-center px-1 shrink-0">
                      <div className="w-px h-8 bg-gray-200" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
