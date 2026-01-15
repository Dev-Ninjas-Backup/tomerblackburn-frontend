"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSubscribeNewsletter } from "@/hooks/useHomePage";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface SubscribeSectionProps {
  title?: string;
  description?: string;
  ctaText?: string;
  onSubmit?: (email: string) => void;
}

const SubscribeSection = ({
  title = "Subscribe",
  description = "Be the first to hear about property improvements tips and updates from our latest projects.",
  ctaText = "Find out more",
  onSubmit,
}: SubscribeSectionProps) => {
  const [email, setEmail] = useState("");
  const { mutate: subscribe, isPending } = useSubscribeNewsletter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(email);
    } else {
      subscribe(email, {
        onSuccess: () => {
          setEmail("");
        },
      });
    }
  };

  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-[#283878] mb-4"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 mb-10 text-base"
        >
          {description}
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-8 justify-center items-center max-w-2xl mx-auto"
        >
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full sm:flex-1 h-12 px-6 py-8 rounded-md border-2 border-gray-300 focus:border-[#283878] focus:ring-0"
          />
          <Button
            type="submit"
            size="lg"
            disabled={isPending}
            className="bg-[#283878] hover:bg-[#1f2d5c] text-white text-xl px-10 py-8 h-12 rounded-full disabled:opacity-50 whitespace-nowrap"
          >
            {isPending ? "Submitting..." : ctaText}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default SubscribeSection;
