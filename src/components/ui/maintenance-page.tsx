"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Wrench, Clock, Mail } from "lucide-react";

export const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 mt-10 md:mt-20">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Wrench className="w-16 h-16 text-[#2d4a8f]" />
            </motion.div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Under Maintenance
          </h1>
          <p className="text-gray-600 mb-6">
            We're currently performing scheduled maintenance to improve your
            experience. We'll be back shortly!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8"
        >
          <div className="flex items-center justify-center space-x-2 text-gray-600 mb-4">
            <Clock size={20} />
            <span className="font-medium">Estimated downtime: 2-4 hours</span>
          </div>
          <p className="text-sm text-gray-500">
            Started: {new Date().toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Mail size={20} />
            <span>Questions? Contact us at info@bburnbuilders.com</span>
          </div>

          <div className="text-sm text-gray-500">
            <p>Follow us for updates:</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="#" className="text-[#2d4a8f] hover:underline">
                Facebook
              </a>
              <a href="#" className="text-[#2d4a8f] hover:underline">
                Twitter
              </a>
              <a href="#" className="text-[#2d4a8f] hover:underline">
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
