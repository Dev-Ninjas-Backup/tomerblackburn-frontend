"use client";

import ImageWithFallback from "@/components/ui/image-with-fallback";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface Service {
  title: string;
  description: string;
  image: string;
}

interface ServicesSectionProps {
  title?: string;
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    title: "RESPONSIVE COMMUNICATION",
    description:
      "We follow up, follow through, and stay in touch, so you always know what's going on with your project.",
    image: "/images/service-1.jpg",
  },
  {
    title: "ACCURATE BUDGETING",
    description:
      "We create accurate estimates and keep our overhead low, so you can make the most of your money, without unnecessary expenses.",
    image: "/images/service-2.jpg",
  },
  {
    title: "SMART SCHEDULING",
    description:
      "We never take on too many jobs at once, so your project gets our full attention and doesn't experience delays.",
    image: "/images/service-3.jpg",
  },
];

const ServicesSection = ({
  title = "Why Our Service Stands Out",
  services = defaultServices,
}: ServicesSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9] as const,
      },
    },
  };

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Title with decorative lines */}
        <div className="flex items-center justify-center mb-12">
          <div className="hidden md:block flex-1 max-w-xs h-px bg-gray-300"></div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-[#283878] text-center px-8"
          >
            {title}
          </motion.h2>
          <div className="hidden md:block flex-1 max-w-xs h-px bg-gray-300"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white overflow-hidden"
            >
              <div className="relative h-96 w-full overflow-hidden rounded-3xl mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full"
                >
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
              <div className="px-4 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
