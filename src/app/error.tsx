"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { RefreshCw, Home, AlertCircle } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Image
            src="/images/logo.svg"
            alt="BBurn Builders"
            width={50}
            height={50}
            className="mx-auto mb-6"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-center mb-4">
            <AlertCircle className="w-16 h-16 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            We're experiencing some technical difficulties. Please try
            refreshing the page.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4"
        >
          <button
            onClick={reset}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#2d4a8f] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors"
          >
            <RefreshCw size={20} />
            <span>Try Again</span>
          </button>

          <div className="block">
            <a
              href="/"
              className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Home size={20} />
              <span>Go Home</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-sm text-gray-500"
        >
          <p>Error ID: {error.digest}</p>
          <p className="mt-2">Contact support: info@bburnbuilders.com</p>
        </motion.div>
      </div>
    </div>
  );
}
