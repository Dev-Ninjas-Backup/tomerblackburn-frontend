"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface PhilosophySectionProps {
  aboutUsData?: {
    title?: string;
  } | null;
}

const PhilosophySection = ({ aboutUsData }: PhilosophySectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const title = aboutUsData?.title || "Our Philosophy";

  return (
    <section ref={ref} className="pt-16 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Title with decorative lines */}
        <div className="flex items-center justify-center mb-16">
          <div className="hidden md:block flex-1 max-w-xs h-px bg-gray-300"></div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-[#283878] text-center px-8"
          >
            {title}
          </motion.h2>
          <div className="hidden md:block flex-1 max-w-xs h-px bg-gray-300"></div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
