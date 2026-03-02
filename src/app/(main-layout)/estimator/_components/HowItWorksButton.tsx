"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorksButton = () => {
  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="py-8 bg-gray-50 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Button
          onClick={scrollToHowItWorks}
          size="lg"
          className="bg-[#283878] hover:bg-[#1f2d5f] text-white px-10 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          How it Works
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </Button>
      </motion.div>
    </div>
  );
};

export default HowItWorksButton;
