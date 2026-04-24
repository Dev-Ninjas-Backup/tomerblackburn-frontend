"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeroSectionProps {
  homePageData?: {
    title?: string;
    subTitle?: string;
    homeBackgroundImage?: {
      url: string;
    } | null;
  } | null;
}

const HeroSection = ({ homePageData }: HeroSectionProps) => {
  const title = homePageData?.title || "Calculate Your Bathroom Remodeling Cost";
  const subTitle = homePageData?.subTitle || "From Minor Fixes to Full Renovations. We Treat Every Job With Care.";
  const backgroundImage = homePageData?.homeBackgroundImage?.url || "data:image/svg+xml,%3Csvg width='1920' height='1080' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='%23374151' text-anchor='middle' dy='.3em'%3EBackground Image%3C/text%3E%3C/svg%3E";

  return (
    <section className="relative h-[calc(100vh-120px)] min-h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 " />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#283878] text-white rounded-[2.5rem] p-10 md:p-16 shadow-2xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold mb-5 leading-tight"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg mb-8 text-white/95 leading-relaxed"
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
                className="bg-white text-[#283878] hover:bg-gray-50 font-semibold px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Start My Estimate
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
