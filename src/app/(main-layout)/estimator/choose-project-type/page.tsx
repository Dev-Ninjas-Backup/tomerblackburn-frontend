"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEstimatorStore } from "@/store/estimatorStore";
import { useProjectTypes } from "@/hooks/useProjectManagement";
import { RotateCcw, ArrowRight, Clock } from "lucide-react";

const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export default function ChooseProjectTypePage() {
  const router = useRouter();
  const { setProjectTypeId, serviceId, lastActivityAt, resetEstimator } = useEstimatorStore();
  const { data: projectTypes, isLoading } = useProjectTypes(true);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    // Show modal if there's an incomplete session within 24 hours
    if (serviceId && lastActivityAt) {
      const isExpired = Date.now() - lastActivityAt > SESSION_EXPIRY_MS;
      if (!isExpired) {
        setShowSessionModal(true);
      } else {
        resetEstimator();
      }
    }
  }, [hydrated, serviceId, lastActivityAt, resetEstimator]);

  const handleContinueSession = () => {
    setShowSessionModal(false);
    router.push("/estimator/step-1");
  };

  const handleFreshStart = () => {
    resetEstimator();
    setShowSessionModal(false);
  };

  const handleSelect = (typeId: string) => {
    setProjectTypeId(typeId);
    router.push("/estimator/choose-service-category");
  };

  const getTimeAgo = () => {
    if (!lastActivityAt) return "";
    const diff = Date.now() - lastActivityAt;
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (mins > 0) return `${mins} minute${mins > 1 ? "s" : ""} ago`;
    return "just now";
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

  const activeProjectTypes = projectTypes?.filter((type) => type.isActive) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Session Resume Modal */}
      <AnimatePresence>
        {showSessionModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
              onClick={handleFreshStart}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8" onClick={(e) => e.stopPropagation()}>
                <div className="w-14 h-14 bg-[#283878]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Clock className="w-7 h-7 text-[#283878]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  Welcome Back!
                </h2>
                <p className="text-gray-500 text-center text-sm mb-6">
                  You have an unfinished estimate from{" "}
                  <span className="font-medium text-gray-700">{getTimeAgo()}</span>.
                  Would you like to continue where you left off?
                </p>

                <div className="space-y-3">
                  <button
                    onClick={handleContinueSession}
                    className="w-full flex items-center justify-center gap-2 bg-[#283878] hover:bg-[#1f2d5c] text-white py-3.5 rounded-xl font-medium transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Continue My Estimate
                  </button>
                  <button
                    onClick={handleFreshStart}
                    className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-xl font-medium transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Start Fresh
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
            Select the type of project you&apos;re planning to get started
          </p>
        </motion.div>

        {activeProjectTypes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No Project Types Available
              </h3>
              <p className="text-gray-600 mb-6">
                There are currently no active project types. Please check back later.
              </p>
              <Button
                onClick={() => router.push("/")}
                className="bg-[#283878] hover:bg-[#1f2d5c] text-white px-8 py-3 rounded-full"
              >
                Go to Home
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {activeProjectTypes.map((type) => (
              <motion.div
                key={type.id}
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
                onClick={() => handleSelect(type.id)}
                className="w-full bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg"
              >
                <div className="relative h-72 bg-linear-to-br from-[#283878] to-[#1f2d5c] overflow-hidden">
                  {type.image?.url ? (
                    <motion.img
                      src={type.image.url}
                      alt={type.name}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {type.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {type.description || `Complete ${type.name.toLowerCase()} services`}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
