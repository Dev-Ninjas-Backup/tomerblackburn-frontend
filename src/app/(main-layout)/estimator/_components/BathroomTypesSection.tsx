"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useProjectTypes } from "@/hooks/useProjectManagement";

const BathroomTypesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: projectTypes, isLoading } = useProjectTypes(true);

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#283878] mb-4">
            Project Types
          </h2>
          <p className="text-gray-600 text-lg">
            Choose the configuration that fits your needs
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#283878] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading project types...</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {projectTypes?.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl w-full sm:w-64 md:w-72"
              >
                <div className="relative h-48 bg-linear-to-br from-[#283878] to-[#1f2d5c] overflow-hidden">
                  {type.image?.url ? (
                    <img
                      src={type.image.url}
                      alt={type.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-6xl font-bold opacity-20">
                        {type.name.charAt(0)}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {type.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {type.description ||
                      `Complete ${type.name.toLowerCase()} services`}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Button
            onClick={() =>
              (window.location.href = "/estimator/choose-project-type")
            }
            className="bg-[#283878] hover:bg-[#1f2d5c] text-white px-8 py-6 text-lg rounded-full"
          >
            Get Started Now →
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BathroomTypesSection;
