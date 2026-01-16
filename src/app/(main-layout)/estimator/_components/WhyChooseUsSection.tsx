"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { CircleCheck, CircleDollarSign, Zap } from "lucide-react";
import { useRef } from "react";
import { UserGroupIcon } from "@heroicons/react/24/outline";

const features = [
  {
    title: "Transparent Pricing",
    description: "See exactly what you're paying for with itemized estimates",
    icon: <CircleCheck />,
  },
  {
    title: "Fast & Easy",
    description: "Get your estimate within 10 minutes",
    icon: <Zap />,
  },
  {
    title: "No Hidden Fees",
    description: "What you see is what you get - no surprises",
    icon: <CircleDollarSign />,
  },
  {
    title: "Expert Team",
    description: "Chicago-based professionals with years of experience",
    icon: <UserGroupIcon className="w-8" />,
  },
];

const WhyChooseUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            Why Choose Us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
              }
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex items-start space-x-4"
            >
              <div className="w-12 h-12 bg-[#eaebf2] rounded-md flex items-center justify-center text-2xl flex-shrink-0">
                {feature.icon}
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
