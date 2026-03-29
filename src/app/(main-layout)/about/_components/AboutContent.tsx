"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import Link from "next/link";
import { EditorPreview } from "@/components/Editor";

interface AboutContentProps {
  aboutUsData?: {
    ownerInfo?: string;
    description?: string;
    image?: {
      url: string;
    } | null;
  } | null;
}

const AboutContent = ({ aboutUsData }: AboutContentProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const ownerInfo =
    aboutUsData?.ownerInfo ||
    "From Tomer Blackburn, BBurn Builders founder & owner";
  const description =
    aboutUsData?.description ||
    "I started BBurn Builders to bring the focus of the construction industry back where it belongs: on client communication and satisfaction.";
  const placeholderImage =
    "data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-size='18' fill='%23374151' text-anchor='middle' dy='.3em'%3EOwner Photo%3C/text%3E%3C/svg%3E";

  return (
    <section ref={ref} className="pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto items-start">
          {/* Image - Shows first on mobile, right on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1 lg:order-2 relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-xl"
          >
            <ImageWithFallback
              src={aboutUsData?.image?.url || placeholderImage}
              alt="Owner photo"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Text Content - Shows second on mobile, left on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 lg:order-1 space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                ABOUT US
              </h3>
              <p className="text-gray-500 italic">{ownerInfo}</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 leading-relaxed"
            >
              <EditorPreview content={description} bare />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-700"
            >
              If the BBurn Builders philosophy resonates with you,{" "}
              <Link
                href="/contact"
                className="text-[#283878] underline hover:text-[#1f2d5c] font-medium"
              >
                get in touch for a free quote
              </Link>{" "}
              on your project!
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;
