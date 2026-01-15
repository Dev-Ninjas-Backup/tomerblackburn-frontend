"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface MissionSectionProps {
  title?: string;
  description?: string;
  highlightText?: string;
  ctaText?: string;
  ctaLink?: string;
}

const MissionSection = ({
  title = "Our Mission",
  description = "Construction companies are known for taking on too many projects at once, which leads to over-scheduling, delays, mismanaged budgets, and project managers that don't return your calls.",
  highlightText = "BBurn Builders is here to change that. Our mission is to put the focus back where it belongs on client communication and satisfaction.",
  ctaText = "Find out more",
  ctaLink = "/about",
}: MissionSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-[#283878] mb-6"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-700 text-lg mb-4 leading-relaxed"
        >
          {description}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gray-700 text-lg mb-8 leading-relaxed"
        >
          {highlightText.split("client communication").map((part, index) => (
            <span key={index}>
              {part}
              {index === 0 && (
                <span className="text-[#283878] font-semibold">
                  client communication
                </span>
              )}
            </span>
          ))}
          {highlightText.split("satisfaction").length > 1 && (
            <>
              {
                highlightText
                  .split("client communication")[1]
                  .split("satisfaction")[0]
              }
              <span className="text-[#283878] font-semibold">satisfaction</span>
              {highlightText.split("satisfaction")[1]}
            </>
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href={ctaLink}>
            <Button
              size="lg"
              className="bg-[#283878] hover:bg-[#2d3f6c] text-white px-8 py-6 rounded-full"
            >
              {ctaText}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;
