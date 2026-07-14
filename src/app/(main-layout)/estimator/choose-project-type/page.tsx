"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEstimatorStore } from "@/store/estimatorStore";
import { useProjectTypes } from "@/hooks/useProjectManagement";
import { RotateCcw, ArrowRight, Clock, Sparkles } from "lucide-react";

const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export default function ChooseProjectTypePage() {
  const router = useRouter();
  const { setProjectTypeId, serviceId, lastActivityAt, resetEstimator } =
    useEstimatorStore();
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100/70 to-indigo-50/40 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-slate-200/80"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-[#283878] animate-spin"></div>
          </div>
          <p className="text-slate-600 font-semibold animate-pulse tracking-wide">Loading project types...</p>
        </div>
      </div>
    );
  }

  const activeProjectTypes =
    projectTypes?.filter((type) => type.isActive) || [];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-slate-100/70 to-indigo-50/40 py-8 md:py-12 flex flex-col">
      {/* Session Resume Modal */}
      <AnimatePresence>
        {showSessionModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-md"
              onClick={handleFreshStart}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
            >
              <div
                className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.15)] border border-slate-100 max-w-md w-full p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-16 h-16 bg-[#283878]/10 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-[#283878]/10">
                  <Clock className="w-8 h-8 text-[#283878]" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-2">
                  Welcome Back!
                </h2>
                <p className="text-slate-500 text-center text-sm mb-6 leading-relaxed">
                  You have an unfinished estimate from{" "}
                  <span className="font-semibold text-slate-800">
                    {getTimeAgo()}
                  </span>
                  . Would you like to continue where you left off?
                </p>

                <div className="space-y-3">
                  <button
                    onClick={handleContinueSession}
                    className="w-full flex items-center justify-center gap-2 bg-[#283878] hover:bg-[#1f2d5c] hover:scale-[1.02] active:scale-[0.98] text-white py-3.5 rounded-2xl font-semibold shadow-lg shadow-[#283878]/20 transition-all duration-200"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Continue My Estimate
                  </button>
                  <button
                    onClick={handleFreshStart}
                    className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 hover:scale-[1.02] active:scale-[0.98] text-slate-700 py-3.5 rounded-2xl font-semibold transition-all duration-200"
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
      <div className="container mx-auto px-4 max-w-6xl flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#283878]/10 text-[#283878] text-[10px] font-extrabold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Project Estimator
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">
            Choose Your <span className="bg-gradient-to-r from-[#283878] via-[#3f57b5] to-[#1f2d5c] bg-clip-text text-transparent">Project Type</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-medium max-w-md mx-auto">
            Select the type of project you&apos;re planning to get started
          </p>
        </motion.div>

        {/* Reassurance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-xl mx-auto mb-8 bg-white/70 backdrop-blur-md border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.01)] rounded-2xl px-5 py-3 flex gap-3.5 items-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-[#283878]" />
          <div className="w-8 h-8 rounded-xl bg-[#283878]/10 flex items-center justify-center text-[#283878] shrink-0 border border-[#283878]/5">
            <span className="text-base">💡</span>
          </div>
          <p className="text-xs md:text-sm text-slate-600 leading-normal text-left">
            <span className="font-bold text-[#283878]">Answer as best you can</span> — a real person will review your estimate and confirm all details before anything is final.
          </p>
        </motion.div>

        {activeProjectTypes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 max-w-md text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                No Project Types Available
              </h3>
              <p className="text-slate-500 text-sm mb-4">
                There are currently no active project types. Please check back
                later.
              </p>
              <Button
                onClick={() => router.push("/")}
                className="bg-[#283878] hover:bg-[#1f2d5c] text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-[#283878]/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Go to Home
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            initial="hidden"
            animate="visible"
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 mx-auto w-full ${
              activeProjectTypes.length === 2 ? "max-w-3xl" : "lg:grid-cols-3 max-w-5xl"
            }`}
          >
            {activeProjectTypes.map((type) => (
              <motion.div
                key={type.id}
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
                whileHover={type.isComingSoon ? {} : { y: -6, scale: 1.01 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={() => !type.isComingSoon && handleSelect(type.id)}
                className={`w-full bg-white rounded-3xl overflow-hidden border border-slate-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative transition-all duration-300 ${
                  type.isComingSoon
                    ? "cursor-not-allowed opacity-80"
                    : "cursor-pointer hover:shadow-[0_20px_40px_rgba(40,56,120,0.08)] hover:border-[#283878]/15 group"
                }`}
              >
                {/* Coming Soon Overlay */}
                {type.isComingSoon && (
                  <div className="absolute inset-0 z-10 bg-slate-900/40 backdrop-blur-[2px] rounded-3xl flex flex-col items-center justify-center p-4">
                    <span className="bg-white/95 text-[#283878] text-[10px] font-bold px-4 py-2 rounded-full shadow-md tracking-wider uppercase border border-white/20">
                      Coming Soon
                    </span>
                  </div>
                )}
                
                <div className="relative h-52 bg-linear-to-br from-[#283878] to-[#1f2d5c] overflow-hidden">
                  {type.image?.url ? (
                    <motion.img
                      src={type.image.url}
                      alt={type.name}
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        type.isComingSoon ? "filter grayscale brightness-75" : ""
                      }`}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-5xl font-bold opacity-15">
                        {type.name.charAt(0)}
                      </div>
                    </div>
                  )}
                  {/* Subtle inner dark gradient for active cards */}
                  {!type.isComingSoon && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  )}
                </div>

                <div className="p-5 relative flex flex-col h-[135px] justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-[#283878] transition-colors duration-300">
                      {type.name}
                    </h3>
                    <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                      {type.description ||
                        `Complete ${type.name.toLowerCase()} services`}
                    </p>
                  </div>
                  
                  {!type.isComingSoon && (
                    <div className="flex items-center text-[#283878] font-bold text-[10px] tracking-wider uppercase gap-1.5 mt-2.5 opacity-0 transform translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                      <span>Select Project</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
