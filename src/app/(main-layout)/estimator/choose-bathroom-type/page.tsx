"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEstimatorStore } from "@/store/estimatorStore";
import type { BathroomType } from "@/types/estimator";

// Note: This is a client component, so revalidate doesn't apply here
// ISR only works with server components

const bathroomTypes = [
  {
    id: "TP" as BathroomType,
    title: "Two Piece (Powder Room)",
    description: "Toilet + Sink",
    image: "/images/bathroom-two-piece.jpg",
  },
  {
    id: "TPT" as BathroomType,
    title: "Three Piece - Tub",
    description: "Toilet + Sink + Tub",
    image: "/images/bathroom-three-tub.jpg",
  },
  {
    id: "TPS" as BathroomType,
    title: "Three Piece - Shower",
    description: "Toilet + Sink + Shower",
    image: "/images/bathroom-three-shower.jpg",
  },
  {
    id: "FP" as BathroomType,
    title: "Four Piece",
    description: "Toilet + Sink + Shower + Tub",
    image: "/images/bathroom-four-piece.jpg",
  },
];

export default function ChooseBathroomTypePage() {
  const router = useRouter();
  const { bathroomType, setBathroomType } = useEstimatorStore();
  const [selected, setSelected] = useState<BathroomType | null>(bathroomType);

  const handleSelect = (type: BathroomType) => {
    setSelected(type);
  };

  const handleContinue = () => {
    if (selected) {
      setBathroomType(selected);
      router.push("/estimator/step-1");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#283878] mb-4">
            Select Your Bathroom Type
          </h1>
          <p className="text-gray-600 text-lg">
            Choose the type of bathroom remodel you're planning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {bathroomTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => handleSelect(type.id)}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`
                bg-white rounded-2xl overflow-hidden cursor-pointer 
                ${
                  selected === type.id
                    ? "ring-4 ring-[#283878] shadow-xl scale-105"
                    : "hover:shadow-lg hover:scale-102"
                }
              `}
            >
              <div className="relative h-56 bg-gray-200">
                <Image
                  src={type.image}
                  alt={type.title}
                  fill
                  className="object-cover"
                />
                {selected === type.id && (
                  <div className="absolute top-4 right-4 bg-[#283878] text-white rounded-full p-2">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {type.title}
                </h3>
                <p className="text-gray-600">{type.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <Button
            onClick={handleContinue}
            disabled={!selected}
            className="bg-[#283878] hover:bg-[#1f2d5c] text-white px-12 py-6 text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Estimate →
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
