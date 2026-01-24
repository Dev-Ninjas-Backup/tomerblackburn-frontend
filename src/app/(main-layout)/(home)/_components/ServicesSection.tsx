"use client";

import ImageWithFallback from "@/components/ui/image-with-fallback";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface ServiceData {
  id: string;
  title: string;
  description: string;
  image?: {
    url: string;
  } | null;
}

interface ServicesSectionProps {
  title?: string;
  services?: ServiceData[];
}

const ServicesSection = ({
  title = "Why Our Service Stands Out",
  services = [],
}: ServicesSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Placeholder image for services without images
  const getServiceImage = (service: ServiceData) => {
    if (service.image?.url) {
      return service.image.url;
    }
    return "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-size='18' fill='%23374151' text-anchor='middle' dy='.3em'%3EService Image%3C/text%3E%3C/svg%3E";
  };

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
              key={service.id}
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
                    src={getServiceImage(service)}
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
