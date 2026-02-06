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
  const { serviceCategoryId, serviceId, setServiceId } = useEstimatorStore();

  const { data: services, isLoading } = useServicesByCategory(
    serviceCategoryId || undefined,
  );
  const [selected, setSelected] = useState<string | null>(serviceId);

  useEffect(() => {
    if (!serviceCategoryId) {
      router.push("/estimator/choose-service-category");
      return;
    }
  }, [serviceCategoryId, router]);

  const handleSelect = (service: Service) => {
    setSelected(service.id);
  };

  const handleContinue = () => {
    if (selected) {
      const selectedService = services?.find((s) => s.id === selected);
      if (selectedService) {
        setServiceId(selected, selectedService.basePrice || 0);
        router.push("/estimator/step-1");
      }
    }
  };

  const handleBack = () => {
    router.push("/estimator/choose-service-category");
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services?.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => handleSelect(service)}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`
                bg-white rounded-2xl overflow-hidden cursor-pointer
                ${
                  selected === service.id
                    ? "ring-4 ring-[#283878] shadow-xl scale-105"
                    : "hover:shadow-lg hover:scale-102"
                }
              `}
            >
              <div className="relative h-48 overflow-hidden">
                {service.imageFile?.url ? (
                  <img
                    src={service.imageFile.url}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-green-500 to-green-700 flex items-center justify-center">
                    <div className="text-white text-4xl font-bold opacity-20">
                      {service.name
                        .split(" ")
                        .map((word) => word.charAt(0))
                        .join("")}
                    </div>
                  </div>
                )}
                {selected === service.id && (
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
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-between"
        >
          <Button
            onClick={handleBack}
            variant="outline"
            className="px-8 py-6 text-lg rounded-full"
          >
            ← Back
          </Button>

          <Button
            onClick={handleContinue}
            disabled={!selected}
            className="bg-[#283878] hover:bg-[#1f2d5c] text-white px-12 py-6 text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Estimate →
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
