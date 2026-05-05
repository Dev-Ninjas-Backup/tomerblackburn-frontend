"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CostCodeImage {
  id: string;
  fileInstance: { url: string; originalFilename: string };
}

// ─── Gallery Icon Button ─────────────────────────────────────────────────────
export const GalleryIconButton: React.FC<{
  images: CostCodeImage[];
  label: string;
}> = ({ images, label }) => {
  const [open, setOpen] = useState(false);

  if (!images || images.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View images for ${label}`}
        className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#283878]/10 text-[#283878] hover:bg-[#283878]/20 hover:scale-110 transition-all duration-200 shrink-0"
      >
        <Images className="w-3.5 h-3.5" />
      </button>

      {open && <ImageSliderModal images={images} label={label} onClose={() => setOpen(false)} />}
    </>
  );
};

// ─── Image Slider Modal ──────────────────────────────────────────────────────
const ImageSliderModal: React.FC<{
  images: CostCodeImage[];
  label: string;
  onClose: () => void;
}> = ({ images, label, onClose }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setCurrent((p) => (p - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setCurrent((p) => (p + 1) % images.length);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [images.length, onClose]);

  const prev = () => setCurrent((p) => (p - 1 + images.length) % images.length);
  const next = () => setCurrent((p) => (p + 1) % images.length);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-2xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3 px-1">
          <p className="text-white font-semibold text-sm truncate">{label}</p>
          <div className="flex items-center gap-3">
            <span className="text-white/60 text-xs">{current + 1} / {images.length}</span>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={images[current].fileInstance.url}
              alt={images[current].fileInstance.originalFilename}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
              className="max-h-[70vh] max-w-full object-contain"
            />
          </AnimatePresence>

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-3 justify-center overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setCurrent(i)}
                className={`shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-all ${
                  i === current ? "border-white" : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <img
                  src={img.fileInstance.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </div>,
    document.body,
  );
};
