"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEstimatorStore } from "@/store/estimatorStore";
import { useServicesByCategory } from "@/hooks/useProjectManagement";
import { Service } from "@/types/project-management.types";

export default function ChooseServicePage() {
  const router = useRouter();
  const { serviceCategoryId, setServiceId } = useEstimatorStore();

  const { data: allServices, isLoading } = useServicesByCategory(
    serviceCategoryId || undefined,
  );

  // Filter services by selected category
  const services = allServices?.filter(
    (service) => service.serviceCategoryId === serviceCategoryId,
  );

  useEffect(() => {
    if (!serviceCategoryId) {
      router.push("/estimator/choose-service-category");
      return;
    }
  }, [serviceCategoryId, router]);

  const handleSelect = (service: Service) => {
    setServiceId(service.id, service.clientPrice || 0);
    router.push("/estimator/step-1");
  };

  const handleBack = () => {
    router.push("/estimator/choose-project-type");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#283878] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  const activeServices = services?.filter((service) => service.isActive) || [];

  if (activeServices.length === 0) {
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
              Choose Your Service
            </h1>
            <p className="text-gray-600 text-lg">
              Select the specific service for your project
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
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No Services Available
              </h3>
              <p className="text-gray-600 mb-6">
                There are currently no active services for this category. Please
                go back and select a different category.
              </p>
              <Button
                onClick={handleBack}
                className="bg-[#283878] hover:bg-[#1f2d5c] text-white px-8 py-3 rounded-full"
              >
                ← Back to Categories
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
            Choose Your Service
          </h1>
          <p className="text-gray-600 text-lg">
            Select the specific service for your project
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {activeServices.map((service) => (
            <motion.div
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
                },
              }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={() => handleSelect(service)}
              className="w-full sm:w-72 bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden">
                {service.imageFile?.url ? (
                  <motion.img
                    src={service.imageFile.url}
                    alt={service.name}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-green-500 to-green-700 flex items-center justify-center">
                    <div className="text-white text-4xl font-bold opacity-20">
                      {service.name.split(" ").map((word) => word.charAt(0)).join("")}
                    </div>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {service.fullDescription ||
                    service.shortDescription ||
                    `Professional ${service.name.toLowerCase()} renovation services tailored to your needs.`}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-start"
        >
          <Button
            onClick={handleBack}
            variant="outline"
            className="px-8 py-6 text-lg rounded-full"
          >
            ← Back
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
