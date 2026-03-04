"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEstimatorStore } from "@/store/estimatorStore";
import { useServiceCategoriesByProjectType } from "@/hooks/useProjectManagement";

export default function ChooseServiceCategoryPage() {
  const router = useRouter();
  const { projectTypeId, setServiceCategoryId } = useEstimatorStore();

  const { data: serviceCategories, isLoading } =
    useServiceCategoriesByProjectType(projectTypeId || undefined);

  useEffect(() => {
    if (!projectTypeId) {
      router.push("/estimator/choose-project-type");
      return;
    }

    // Auto-skip if only one active category
    if (serviceCategories && !isLoading) {
      const activeCategories = serviceCategories.filter(cat => cat.isActive);
      if (activeCategories.length === 1) {
        setServiceCategoryId(activeCategories[0].id);
        router.push("/estimator/choose-service");
      }
    }
  }, [projectTypeId, router, serviceCategories, isLoading, setServiceCategoryId]);

  const handleSelect = (categoryId: string) => {
    setServiceCategoryId(categoryId);
    router.push("/estimator/choose-service");
  };

  const handleBack = () => {
    router.push("/estimator/choose-project-type");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#283878] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service categories...</p>
        </div>
      </div>
    );
  }

  const activeCategories = serviceCategories?.filter(cat => cat.isActive) || [];

  if (activeCategories.length === 0) {
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
              Choose Service Category
            </h1>
            <p className="text-gray-600 text-lg">
              Select the specific category for your project
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No Service Categories Available
              </h3>
              <p className="text-gray-600 mb-6">
                There are currently no active service categories for this project type. Please go back and select a different project type.
              </p>
              <Button
                onClick={handleBack}
                className="bg-[#283878] hover:bg-[#1f2d5c] text-white px-8 py-3 rounded-full"
              >
                ← Back to Project Types
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
            Choose Service Category
          </h1>
          <p className="text-gray-600 text-lg">
            Select the specific category for your project
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {activeCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => handleSelect(category.id)}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="w-full sm:w-80 bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg hover:scale-102"
            >
              <div className="relative h-64 bg-linear-to-br from-[#283878] to-[#1f2d5c] overflow-hidden">
                {category.image?.url ? (
                  <img
                    src={category.image.url}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-6xl font-bold opacity-20">
                      {category.name.charAt(0)}
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.description ||
                    `${category.name} services and options`}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

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
