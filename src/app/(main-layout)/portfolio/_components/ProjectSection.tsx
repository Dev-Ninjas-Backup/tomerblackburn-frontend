"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import ImageWithFallback from "@/components/ui/image-with-fallback";
import ImageLightbox from "@/components/ui/image-lightbox";

interface Project {
  id: string;
  name: string;
  slug: string;
  description?: string;
  images?: Array<{
    id: string;
    caption?: string;
    displayOrder: number;
    file?: {
      id: string;
      url: string;
      filename: string;
    };
  }>;
}

interface ProjectSectionProps {
  project: Project;
}

const ProjectSection = ({ project }: ProjectSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images =
    project.images
      ?.map((img) => img.file?.url)
      .filter((url): url is string => Boolean(url)) || [];

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
      prev < images.length - 1 ? prev + 1 : prev,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <section ref={ref} className="py-12 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Project Title with decorative lines */}
        <div className="flex items-center justify-center mb-12">
          <div className="hidden md:block flex-1 max-w-xs h-px bg-gray-300"></div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-[#283878] text-center px-8"
          >
            {project.name}
          </motion.h2>
          <div className="hidden md:block flex-1 max-w-xs h-px bg-gray-300"></div>
        </div>

        {/* Masonry Grid - Pinterest Style */}
        {images.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="columns-2 lg:columns-3 xl:columns-3 gap-4"
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
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
                    alt={`${project.name} - Image ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-24 w-24 text-gray-300 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Images Available
              </h3>
              <p className="text-gray-500">
                Images for this project will be added soon.
              </p>
            </div>
          </motion.div>
        )}

        {/* Image Lightbox */}
        {lightboxOpen && (
          <ImageLightbox
            images={images}
            currentIndex={currentImageIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
            projectTitle={project.name}
          />
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
