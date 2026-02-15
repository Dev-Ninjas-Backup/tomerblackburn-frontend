"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEstimatorStore } from "@/store/estimatorStore";
import { useProjectTypes } from "@/hooks/useProjectManagement";

export default function ChooseProjectTypePage() {
  const router = useRouter();
  const { projectTypeId, setProjectTypeId, resetEstimator } =
    useEstimatorStore();
  const { data: projectTypes, isLoading } = useProjectTypes(true); // Only active
  const [selected, setSelected] = useState<string | null>(projectTypeId);

  useEffect(() => {
    // Reset estimator when component mounts
    resetEstimator();
  }, [resetEstimator]);

  const handleSelect = (typeId: string) => {
    setSelected(typeId);
  };

  const handleContinue = () => {
    if (selected) {
      setProjectTypeId(selected);
      router.push("/estimator/choose-service-category");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#283878] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project types...</p>
        </div>
      </div>
    );
  }

  const activeProjectTypes = projectTypes?.filter(type => type.isActive) || [];

  if (activeProjectTypes.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#283878] mb-4">
              Choose Your Project Type
            </h1>
            <p className="text-gray-600 text-lg">
              Select the type of project you're planning to get started
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No Project Types Available
              </h3>
              <p className="text-gray-600 mb-6">
                There are currently no active project types. Please check back later or contact us for assistance.
              </p>
              <Button
                onClick={() => router.push("/")}
                className="bg-[#283878] hover:bg-[#1f2d5c] text-white px-8 py-3 rounded-full"
              >
                Go to Home
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#283878] mb-4">
            Choose Your Project Type
          </h1>
          <p className="text-gray-600 text-lg">
            Select the type of project you're planning to get started
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {activeProjectTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => handleSelect(type.id)}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`
                w-full sm:w-80 bg-white rounded-2xl overflow-hidden cursor-pointer
                ${
                  selected === type.id
                    ? "ring-4 ring-[#283878] shadow-xl scale-105"
                    : "hover:shadow-lg hover:scale-102"
                }
              `}
            >
              <div className="relative h-72 bg-linear-to-br from-[#283878] to-[#1f2d5c] overflow-hidden">
                {/* Project type image */}
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
                {selected === type.id && (
                  <div className="absolute top-4 right-4 bg-white text-[#283878] rounded-full p-2 shadow-lg">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <Button
            onClick={handleContinue}
            disabled={!selected}
            className="bg-[#283878] hover:bg-[#1f2d5c] text-white px-12 py-6 text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Services →
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
