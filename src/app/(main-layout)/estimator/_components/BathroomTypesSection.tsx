"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const bathroomTypes = [
  {
    title: "Two Piece (Powder Room)",
    description: "Toilet + Sink",
    image: "/images/bathroom-two-piece.jpg",
  },
  {
    title: "Three Piece - Tub",
    description: "Toilet + Sink + Tub",
    image: "/images/bathroom-three-tub.jpg",
  },
  {
    title: "Three Piece - Shower",
    description: "Toilet + Sink + Shower",
    image: "/images/bathroom-three-shower.jpg",
  },
  {
    title: "Four Piece",
    description: "Toilet + Sink + Shower + Tub",
    image: "/images/bathroom-four-piece.jpg",
  },
];

const BathroomTypesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#283878] mb-4">
            Bathroom Types
          </h2>
          <p className="text-gray-600 text-lg">
            Choose the configuration that fits your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {bathroomTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xltransform "
            >
              <div className="relative h-48 bg-gray-200">
                <Image
                  src={type.image}
                  alt={type.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {type.title}
                </h3>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Button
            onClick={() =>
              (window.location.href = "/estimator/choose-bathroom-type")
            }
            className="bg-[#283878] hover:bg-[#1f2d5c] text-white px-8 py-6 text-lg rounded-full"
          >
            Get Started Now →
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BathroomTypesSection;
