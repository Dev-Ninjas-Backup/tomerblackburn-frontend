"use client";

import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useUpdatePortfolioImage } from "@/hooks/usePortfolio";
import { toast } from "sonner";

interface EditImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: any;
}

export const EditImageModal = ({
  isOpen,
  onClose,
  image,
}: EditImageModalProps) => {
  const [caption, setCaption] = useState("");
  const updateImage = useUpdatePortfolioImage();

  useEffect(() => {
    if (image) {
      setCaption(image.caption || "");
    }
  }, [image]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateImage.mutateAsync({ imageId: image.id, data: { caption } });
      toast.success("Image updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update image");
    }
  };

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-9999 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Edit Image</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <img
              src={image.file?.url}
              alt={image.caption || "Image"}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caption
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d4a8f]"
              placeholder="Image caption..."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateImage.isPending}
              className="px-6 py-2 bg-[#2d4a8f] text-white rounded-lg hover:bg-[#1e3560] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {updateImage.isPending && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              {updateImage.isPending ? "Updating..." : "Update Image"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
