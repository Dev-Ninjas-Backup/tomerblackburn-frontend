"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Bell } from "lucide-react";

export const ComingSoonPage = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown timer (example: 30 days from now)
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Image
            src="/images/BBurnBuilders_logo.svg"
            alt="BBurn Builders"
            width={100}
            height={100}
            className="mx-auto mb-6"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Coming Soon</h1>
          <p className="text-xl text-gray-600 mb-6">
            We're building something amazing for BBurn Builders. 
            Stay tuned for the big reveal!
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, index) => (
            <div key={item.label} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <motion.div
                key={item.value}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-[#2d4a8f]"
              >
                {item.value.toString().padStart(2, '0')}
              </motion.div>
              <div className="text-sm text-gray-500">{item.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Email Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8"
        >
          {!isSubscribed ? (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Get notified when we launch
              </h3>
              <form onSubmit={handleSubscribe} className="flex space-x-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d4a8f] focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#2d4a8f] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors"
                >
                  <Bell size={20} />
                </button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-green-600"
            >
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Mail size={20} />
                <span className="font-semibold">Thank you for subscribing!</span>
              </div>
              <p className="text-sm text-gray-600">We'll notify you when we launch.</p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-sm text-gray-500"
        >
          <p>Questions? Contact us at info@bburnbuilders.com</p>
        </motion.div>
      </div>
    </div>
  );
};