"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { CircleCheck } from "lucide-react";
import { useRef } from "react";
import { WhyChooseUsFeature } from "@/types/estimator.types";
import Image from "next/image";

interface WhyChooseUsSectionProps {
  title?: string;
  features: WhyChooseUsFeature[];
}

const WhyChooseUsSection = ({ title, features }: WhyChooseUsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const sectionTitle = title || "Why Choose Us";

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#283878] mb-4">
            {sectionTitle}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
              }
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex items-start space-x-4"
            >
              <div className="w-12 h-12 bg-[#eaebf2] rounded-md flex items-center justify-center shrink-0">
                {feature.icon?.url ? (
                  <Image
                    src={feature.icon.url}
                    alt={feature.title}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                ) : (
                  <CircleCheck className="w-6 h-6 text-[#283878]" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
