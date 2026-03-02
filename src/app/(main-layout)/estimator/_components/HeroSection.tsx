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
    <section className="relative h-[calc(100vh-120px)] bg-gray-100 flex flex-col items-center justify-center overflow-hidden">
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
              <Link href="/estimator/choose-project-type">
                <Button className="bg-white text-[#283878] hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
                  Start Your Free Estimate
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* How it Works Button - Below Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 mt-8 flex flex-col items-center gap-2"
      >
        <div className="relative">
          <Button
            onClick={() => {
              const element = document.getElementById("how-it-works");
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            size="lg"
            className="bg-[#283878] hover:bg-[#1f2d5f] text-white px-12 py-6 text-base font-semibold rounded-full hover:shadow-xl transition-all border border-white shadow-[0_0_0_3px_#283878,0_0_0_6px_white]"
          >
            How it Works
          </Button>
        </div>
        <motion.svg
          className="w-6 h-6 text-[#283878]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;
