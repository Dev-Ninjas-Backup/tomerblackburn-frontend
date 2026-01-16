"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="relative">
        {/* Thin Eclipse Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="w-28 h-28 border border-gray-100 rounded-full relative"
        >
          {/* Moving Arc */}
          <motion.div
            className="absolute inset-0 border-2 border-transparent border-t-[#2d4a8f] rounded-full"
            style={{
              borderTopWidth: "2px",
              borderRightWidth: "1px",
              borderRightColor: "rgba(45, 74, 143, 0.3)",
            }}
          />
        </motion.div>

        {/* Logo in Center */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "backOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src="/images/logo.svg"
            alt="BBurn Builders"
            width={30}
            height={30}
          />
        </motion.div>
      </div>
    </div>
  );
};
