"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Diagonal Split Background - Half Blue, Half White */}
      <div className="absolute inset-0 bg-[#2d4a8f]" />
      <div
        className="absolute inset-0 bg-white"
        style={{
          clipPath: "polygon(60% 0, 100% 0, 100% 100%, 30% 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="bg-white shadow-xl">
            <CardContent className="p-8 space-y-6">
              {/* Logo */}
              <motion.div
                className="flex flex-col items-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Image
                  src="/images/BBurnBuilders_logo.svg"
                  alt="BBurn Builders"
                  width={250}
                  height={40}
                />
              </motion.div>

              {/* Form */}
              <form className="space-y-4">
                {/* Email Field */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your Email"
                    className="p-6"
                  />
                </motion.div>

                {/* Password Field */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password *
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="p-6"
                  />
                </motion.div>

                {/* Sign In Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-[#2d4a8f] hover:bg-[#243a73] text-white p-6 mt-2"
                  >
                    Sign In
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
