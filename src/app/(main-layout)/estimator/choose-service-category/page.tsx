"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEstimatorStore } from "@/store/estimatorStore";
import { useServiceCategoriesByProjectType } from "@/hooks/useProjectManagement";

export default function ChooseServiceCategoryPage() {
  const router = useRouter();
  const { projectTypeId, serviceCategoryId, setServiceCategoryId } =
    useEstimatorStore();

  const { data: serviceCategories, isLoading } =
    useServiceCategoriesByProjectType(projectTypeId || undefined);
  const [selected, setSelected] = useState<string | null>(serviceCategoryId);

  useEffect(() => {
    if (!projectTypeId) {
      router.push("/estimator/choose-project-type");
      return;
    }
  }, [projectTypeId, router]);

  const handleSelect = (categoryId: string) => {
    setSelected(categoryId);
  };

  const handleContinue = () => {
    if (selected) {
      setServiceCategoryId(selected);
      router.push("/estimator/choose-service");
    }
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {serviceCategories?.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => handleSelect(category.id)}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`
                bg-white rounded-2xl overflow-hidden cursor-pointer
                ${
                  selected === category.id
                    ? "ring-4 ring-[#283878] shadow-xl scale-105"
                    : "hover:shadow-lg hover:scale-102"
                }
              `}
            >
              <div className="relative h-48 bg-linear-to-br from-blue-500 to-blue-700">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-6xl font-bold opacity-20">
                    {category.name.charAt(0)}
                  </div>
                </div>
                {selected === category.id && (
                  <div className="absolute top-4 right-4 bg-white text-[#283878] rounded-full p-2">
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
            Continue to Services →
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
