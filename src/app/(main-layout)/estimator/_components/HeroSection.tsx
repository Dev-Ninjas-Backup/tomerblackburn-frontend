"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EstimatorPage } from "@/types/estimator.types";

interface HeroSectionProps {
  data?: EstimatorPage | null;
}

const HeroSection = ({ data }: HeroSectionProps) => {
  const backgroundImage =
    data?.backgroundImage?.url || "/images/bathroom-hero.jpg";
  const title = data?.title || "Estimate Your Project Remodel Cost";
  const description =
    data?.description ||
    "Professional estimates in minutes, not days. Transparent pricing, no hidden fees.";

  return (
    <section className="relative h-[calc(100vh-120px)] bg-gray-100 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      >
        <div className="absolute inset-0 bg-black/05"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#283878] rounded-3xl p-12 max-w-lg w-full text-center text-white shadow-2xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold mb-6 leading-tight"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg mb-8 opacity-90"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/estimator/choose-bathroom-type">
                <Button className="bg-white text-[#283878] hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
                  Start Your Free Estimate
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
