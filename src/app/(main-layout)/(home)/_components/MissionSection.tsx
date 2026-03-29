"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { EditorPreview } from "@/components/Editor";

interface MissionSectionProps {
  homePageData?: {
    ourMissionTitle?: string;
    ourMissionSubTitle?: string;
  } | null;
}

const MissionSection = ({ homePageData }: MissionSectionProps) => {
  const title = homePageData?.ourMissionTitle || "Our Mission";
  const subTitle =
    homePageData?.ourMissionSubTitle ||
    "BBurn Builders is here to change that. Our mission is to put the focus back where it belongs on client communication and satisfaction.";
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-700 text-3xl mb-8 leading-relaxed"
        >
          <EditorPreview content={subTitle} bare />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/about">
            <Button
              size="lg"
              className="bg-[#283878] hover:bg-[#2d3f6c] text-white px-8 py-6 rounded-full"
            >
              Find out more
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;
