"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import ImageLightbox from "@/components/ui/image-lightbox";

interface Project {
  id: string;
  title: string;
  images: string[];
}

interface ProjectSectionProps {
  project: Project;
}

const ProjectSection = ({ project }: ProjectSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev < project.images.length - 1 ? prev + 1 : prev
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <section ref={ref} className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Project Title with decorative lines */}
        <div className="flex items-center justify-center mb-12">
          <div className="hidden md:block flex-1 max-w-xs h-px bg-gray-300"></div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-[#283878] text-center px-8"
          >
            {project.title}
          </motion.h2>
          <div className="hidden md:block flex-1 max-w-xs h-px bg-gray-300"></div>
        </div>

        {/* Masonry Grid - Pinterest Style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4"
        >
          {project.images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.05 * index }}
              className="break-inside-avoid mb-4 cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="relative w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              >
                <ImageWithFallback
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Image Lightbox */}
        {lightboxOpen && (
          <ImageLightbox
            images={project.images}
            currentIndex={currentImageIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
            projectTitle={project.title}
          />
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
