"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEstimatorStore } from "@/store/estimatorStore";
import { useServicesByCategory } from "@/hooks/useProjectManagement";
import { Service } from "@/types/project-management.types";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

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
    setServiceId(service.id);
    router.push("/estimator/step-1");
  };

  const handleBack = () => {
    router.push("/estimator/choose-project-type");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100/70 to-indigo-50/40 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-slate-200/80"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-[#283878] animate-spin"></div>
          </div>
          <p className="text-slate-600 font-semibold animate-pulse tracking-wide">Loading services...</p>
        </div>
      </div>
    );
  }

  const activeServices = services?.filter((service) => service.isActive) || [];

  if (activeServices.length === 0) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-slate-100/70 to-indigo-50/40 py-8 md:py-12 flex flex-col justify-center">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#283878]/10 text-[#283878] text-[10px] font-extrabold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Service Options
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">
              Choose Your <span className="bg-gradient-to-r from-[#283878] via-[#3f57b5] to-[#1f2d5c] bg-clip-text text-transparent">Service</span>
            </h1>
            <p className="text-slate-500 text-sm md:text-base font-medium max-w-md mx-auto">
              Select the specific service for your project
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-8"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 max-w-md text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-slate-400"
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
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                No Services Available
              </h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                There are currently no active services for this category. Please
                go back and select a different category.
              </p>
              <button
                onClick={handleBack}
                className="flex items-center gap-2 bg-[#283878] hover:bg-[#1f2d5c] hover:scale-[1.02] active:scale-[0.98] text-white py-2.5 px-6 rounded-2xl font-semibold shadow-lg shadow-[#283878]/25 transition-all mx-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Categories
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-slate-100/70 to-indigo-50/40 py-8 md:py-12 flex flex-col">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col flex-1">
        {/* Back Button / Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex justify-start"
        >
          <button
            onClick={handleBack}
            className="group flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#283878] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Project Types</span>
          </button>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#283878]/10 text-[#283878] text-[10px] font-extrabold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Service Options
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">
              Choose Your <span className="bg-gradient-to-r from-[#283878] via-[#3f57b5] to-[#1f2d5c] bg-clip-text text-transparent">Service</span>
            </h1>
            <p className="text-slate-500 text-sm md:text-base font-medium max-w-md mx-auto">
              Select the specific service for your project
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            initial="hidden"
            animate="visible"
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 mx-auto w-full ${
              activeServices.length === 1 ? "max-w-md grid-cols-1" :
              activeServices.length === 2 ? "max-w-2xl lg:grid-cols-2" :
              activeServices.length === 3 ? "max-w-4xl lg:grid-cols-3" :
              "max-w-6xl lg:grid-cols-4"
            }`}
          >
            {activeServices.map((service) => (
              <motion.div
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94] as const,
                    },
                  },
                }}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={() => handleSelect(service)}
                className="w-full bg-white rounded-3xl overflow-hidden border border-slate-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] cursor-pointer hover:shadow-[0_20px_40px_rgba(40,56,120,0.08)] hover:border-[#283878]/15 group relative transition-all duration-300"
              >
                <div className="relative h-44 bg-linear-to-br from-[#283878] to-[#1f2d5c] overflow-hidden">
                  {service.imageFile?.url ? (
                    <motion.img
                      src={service.imageFile.url}
                      alt={service.name}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-white text-5xl font-bold opacity-15">
                        {service.name.split(" ").map((word) => word.charAt(0)).join("")}
                      </div>
                    </div>
                  )}
                  {/* Subtle inner dark gradient for active cards */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                
                <div className="p-5 relative flex flex-col h-[145px] justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1.5 group-hover:text-[#283878] transition-colors duration-300 line-clamp-2">
                      {service.name}
                    </h3>
                    <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed">
                      {service.fullDescription ||
                        service.shortDescription ||
                        `Professional ${service.name.toLowerCase()} renovation services tailored to your needs.`}
                    </p>
                  </div>
                  
                  <div className="flex items-center text-[#283878] font-bold text-[10px] tracking-wider uppercase gap-1.5 mt-2.5 opacity-0 transform translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                    <span>Select Option</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
