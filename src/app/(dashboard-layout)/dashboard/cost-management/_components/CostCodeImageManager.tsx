"use client";

import React, { useRef } from "react";
import { X, Upload, ImageIcon } from "lucide-react";

interface ExistingImage {
  id: string;
  fileInstance: { url: string; originalFilename: string };
}

interface PendingImage {
  file: File;
  preview: string;
}

interface Props {
  // Edit mode — existing saved images
  existingImages?: ExistingImage[];
  onDeleteExisting?: (imageId: string) => void;

  // Both modes — pending (not yet uploaded) images
  pendingImages: PendingImage[];
  onAddPending: (files: File[]) => void;
  onRemovePending: (index: number) => void;
}

const CostCodeImageManager = ({
  existingImages = [],
  onDeleteExisting,
  pendingImages,
  onAddPending,
  onRemovePending,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) onAddPending(files);
    e.target.value = "";
  };

  return (
    <div className="col-span-2 border-t pt-4 mt-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
          <ImageIcon size={15} /> Reference Images
          <span className="text-xs font-normal text-gray-400">
            (shown to users as gallery)
          </span>
        </h3>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 text-sm bg-[#2d4a8f] hover:bg-[#243a73] text-white px-3 py-1.5 rounded"
        >
          <Upload size={13} /> Add Images
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
          title="Select images to upload"
          aria-label="Select images to upload"
        />
      </div>

      {existingImages.length === 0 && pendingImages.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4 bg-gray-50 rounded">
          No images added yet.
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {/* Existing saved images */}
          {existingImages.map((img) => (
            <div
              key={img.id}
              className="relative group rounded overflow-hidden border aspect-square"
            >
              <img
                src={img.fileInstance.url}
                alt={img.fileInstance.originalFilename}
                className="w-full h-full object-cover"
              />
              {onDeleteExisting && (
                <button
                  type="button"
                  onClick={() => onDeleteExisting(img.id)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove image"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          ))}

          {/* Pending (local preview) images */}
          {pendingImages.map((img, i) => (
            <div
              key={i}
              className="relative group rounded overflow-hidden border aspect-square"
            >
              <img
                src={img.preview}
                alt={img.file.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-[9px] px-1 py-0.5 truncate">
                {img.file.name}
              </div>
              <button
                type="button"
                onClick={() => onRemovePending(i)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove image"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CostCodeImageManager;
