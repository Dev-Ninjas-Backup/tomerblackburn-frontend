"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FloatingPriceCard } from "../_components/FloatingPriceCard";
import { useEstimatorStore } from "@/store/estimatorStore";
import { useCostCodes } from "@/hooks/useCostManagement";
import { useServicesByCategory } from "@/hooks/useProjectManagement";
import { CostCodeRenderer } from "../_components/CostCodeRenderer";
import { EstimatorBreadcrumb } from "../_components/EstimatorBreadcrumb";

export default function Step1Page() {
  const router = useRouter();
  const {
    serviceId,
    serviceCategoryId,
    step1Selections,
    addCostCodeSelection,
    updateCostCodeSelection,
    removeCostCodeSelection,
  } = useEstimatorStore();

  const { data: services } = useServicesByCategory(serviceCategoryId || undefined);
  const serviceName = services?.find((s) => s.id === serviceId)?.name;

  const { data: costCodes, isLoading } = useCostCodes({
    serviceId: serviceId || undefined,
    includeOptions: true,
    includeCategory: true,
  });

  const step1CostCodes = costCodes?.filter((code) => code.step === 1) || [];

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!serviceId) {
      router.push("/estimator/choose-service");
    }
  }, [hydrated, serviceId, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#283878] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cost codes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 overflow-x-hidden">
      <FloatingPriceCard />

      <div className="lg:flex lg:justify-center container mx-auto">
        <div className="px-4 w-full max-w-4xl lg:mr-4">
          {/* Service Title */}
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-900">
              {serviceName || "Loading..."}
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">Rough work estimator</p>
          </div>

          {/* Breadcrumb */}
          <EstimatorBreadcrumb currentStep="step-1" />

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#283878]">
                Step 1: Rough
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#283878] h-2 rounded-full"
                style={{ width: "50%" }}
              ></div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {step1CostCodes.length > 0 ? (
              <CostCodeRenderer
                costCodes={step1CostCodes as any}
                selections={step1Selections}
                onSelectionChange={(costCodeId, selection) => {
                  const existing = step1Selections.find(
                    (s) => s.costCodeId === costCodeId,
                  );
                  if (existing) {
                    updateCostCodeSelection(1, costCodeId, selection);
                  } else {
                    addCostCodeSelection(1, {
                      costCodeId,
                      unitPrice: selection.unitPrice || 0,
                      ...selection,
                    });
                  }
                }}
                onSelectionRemove={(costCodeId) => {
                  removeCostCodeSelection(1, costCodeId);
                }}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-12 shadow-sm text-center"
              >
                <div className="w-16 h-16 bg-[#283878]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[#283878]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No Items for This Step
                </h3>
                <p className="text-gray-500 text-sm">
                  There are no cost codes configured for this step yet. You can
                  proceed to the next step.
                </p>
              </motion.div>
            )}

            <div className="flex gap-4">
              <Button
                onClick={() => router.push("/estimator/choose-service")}
                variant="outline"
                className="flex-1 py-6 text-lg rounded-full"
              >
                ← Back
              </Button>
              <Button
                onClick={() => router.push("/estimator/step-2")}
                className="flex-1 bg-[#283878] hover:bg-[#1f2d5c] text-white py-6 text-lg rounded-full"
              >
                Next →
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="hidden lg:block lg:w-80 lg:shrink-0" />
      </div>
    </div>
  );
}
