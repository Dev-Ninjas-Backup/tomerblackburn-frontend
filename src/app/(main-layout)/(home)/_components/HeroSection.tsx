"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
}

const HeroSection = ({
  title = "Calculate Your Bathroom Remodeling Cost",
  subtitle = "From Minor Fixes to Full Renovations. We Treat Every Job With Care.",
  ctaText = "Start My Estimate",
  ctaLink = "/estimator",
  backgroundImage = "/images/hero-bg.jpg",
}: HeroSectionProps) => {
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
      <div className="relative z-10 text-center px-4 w-full max-w-2xl mx-auto">
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
            className="text-3xl md:text-4xl font-bold mb-5 leading-tight"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl mb-8 text-white/95 leading-relaxed"
          >
            {subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href={ctaLink}>
              <Button
                size="lg"
                className="bg-white text-[#283878] hover:bg-gray-50 font-semibold px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                {ctaText}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
