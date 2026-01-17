"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEstimatorStore } from "@/store/estimatorStore";
import { CheckCircle } from "lucide-react";

export default function ConfirmationPage() {
  const router = useRouter();
  const { bathroomType, totalPrice, resetEstimator } = useEstimatorStore();

  useEffect(() => {
    if (!bathroomType) {
      router.push("/estimator/choose-bathroom-type");
    }
  }, [bathroomType, router]);

  const estimateNumber = `EST-${new Date().getFullYear()}-${Math.floor(
    Math.random() * 1000
  )
    .toString()
    .padStart(3, "0")}`;

  const handleStartNew = () => {
    resetEstimator();
    router.push("/estimator/choose-bathroom-type");
  };

  const handleBackHome = () => {
    resetEstimator();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-8"
          >
            <CheckCircle className="w-16 h-16 text-green-600" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Thank You for Your Submission!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 mb-12"
          >
            Your bathroom estimate has been received. We'll send a detailed
            proposal to your email shortly.
          </motion.p>

          {/* Estimate Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-8"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-gray-600">Estimate Number:</span>
                <span className="font-bold text-[#283878]">
                  {estimateNumber}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total:</span>
                <span className="text-3xl font-bold text-[#283878]">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>

          {/* What Happens Next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-8 text-left"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What happens next?
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-[#283878] text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    You'll receive an email confirmation
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Check your inbox for a summary of your estimate
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-[#283878] text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    We'll review your estimate (1-2 hours)
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Our team will carefully review your project details
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-[#283878] text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    You'll get a detailed PDF proposal
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Complete breakdown of costs and project timeline
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-[#283878] text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    We'll contact you to discuss next steps
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Schedule a consultation to finalize your project
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={handleBackHome}
              variant="outline"
              className="px-8 py-6 text-lg rounded-full"
            >
              Back to home
            </Button>
            <Button
              onClick={handleStartNew}
              className="bg-[#283878] hover:bg-[#1f2d5c] text-white px-8 py-6 text-lg rounded-full"
            >
              Start New Estimate
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
