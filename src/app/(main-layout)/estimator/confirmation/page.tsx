"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEstimatorStore } from "@/store/estimatorStore";
import { CheckCircle, Download } from "lucide-react";
import { submissionService } from "@/services/submission.service";

interface NextStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
}

interface WhatHappensNextData {
  title: string;
  steps: NextStep[];
}

export default function ConfirmationPage() {
  const router = useRouter();
  const { serviceId, totalPrice, userInfo, resetEstimator, submissionId, submissionNumber, pdfUrl } =
    useEstimatorStore();
  const grandTotal = totalPrice + (Number(userInfo.buildingTypePrice) || 0);
  const [nextSteps, setNextSteps] = useState<WhatHappensNextData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!serviceId) {
      router.push("/estimator/choose-service");
    }
  }, [serviceId, router]);

  useEffect(() => {
    const fetchNextSteps = async () => {
      try {
        const response = await submissionService.getAllNextSteps(false);
        setNextSteps({
          title: "What happens next?",
          steps: response.data.data,
        });
      } catch (error) {
        console.error("Failed to fetch next steps:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNextSteps();
  }, []);

  const handleStartNew = () => {
    resetEstimator();
    router.push("/estimator/choose-service");
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
                  {submissionNumber || 'Processing...'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total:</span>
                <span className="text-3xl font-bold text-[#283878]">
                  ${grandTotal.toLocaleString()}
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
              {nextSteps?.title || "What happens next?"}
            </h2>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#283878] mx-auto"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {nextSteps?.steps
                  .sort((a, b) => a.stepNumber - b.stepNumber)
                  .map((step) => (
                    <div key={step.id} className="flex gap-4">
                      <div className="shrink-0 w-10 h-10 bg-[#283878] text-white rounded-full flex items-center justify-center font-bold">
                        {step.stepNumber}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {pdfUrl && (
              <Button
                onClick={() => window.open(pdfUrl, "_blank")}
                variant="outline"
                className="px-8 py-6 text-sm rounded-full"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </Button>
            )}
            <Button
              onClick={handleBackHome}
              variant="outline"
              className="px-8 py-6 text-base rounded-full"
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
