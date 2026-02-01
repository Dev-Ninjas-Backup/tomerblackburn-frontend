"use client";

import React, { useState } from "react";
import { Edit, Trash2, Plus, Power, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useDeletePortfolio,
  useTogglePortfolioStatus,
  useDeletePortfolioImage,
} from "@/hooks/usePortfolio";
import { toast } from "sonner";
import { EditCategoryModal } from "./EditCategoryModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { AddImageModal } from "./AddImageModal";
import { EditImageModal } from "./EditImageModal";

interface PortfolioCategoryCardProps {
  category: any;
}

export const PortfolioCategoryCard = ({
  category,
}: PortfolioCategoryCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<any>(null);
  const [deletingImage, setDeletingImage] = useState<any>(null);

  const deletePortfolio = useDeletePortfolio();
  const toggleStatus = useTogglePortfolioStatus();
  const deleteImage = useDeletePortfolioImage();

  const handleDeleteCategory = async () => {
    try {
      await deletePortfolio.mutateAsync(category.id);
      toast.success("Category deleted successfully");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  const handleToggleStatus = async () => {
    try {
      await toggleStatus.mutateAsync(category.id);
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDeleteImage = async () => {
    if (!deletingImage) return;
    try {
      await deleteImage.mutateAsync(deletingImage.id);
      toast.success("Image deleted successfully");
      setDeletingImage(null);
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {/* Category Header */}
        <div className="bg-linear-to-r from-[#dbeafe] to-[#bfdbfe] px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-600 hover:text-gray-900"
                aria-label={
                  isExpanded ? "Collapse category" : "Expand category"
                }
              >
                <svg
                  className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {category.images?.length || 0} images • {category.slug}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  category.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {category.isActive ? "Active" : "Inactive"}
              </span>
              <button
                onClick={handleToggleStatus}
                className="p-2 hover:bg-purple-200 rounded-lg transition-colors"
                title={category.isActive ? "Deactivate" : "Activate"}
              >
                <Power className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="p-2 hover:bg-purple-200 rounded-lg transition-colors"
                title="Edit Category"
              >
                <Edit className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                title="Delete Category"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Images Grid */}
        {isExpanded && (
          <div className="p-6">
            {category.images && category.images.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <AnimatePresence>
                  {category.images.map((image: any, index: number) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 hover:border-purple-400"
                    >
                      <img
                        src={image.file?.url || "/placeholder.png"}
                        alt={image.caption || "Portfolio image"}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 hover:bg-black/40 bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                          <button
                            onClick={() => setEditingImage(image)}
                            className="p-2 bg-white rounded-lg hover:bg-gray-100"
                            title="Edit Image"
                          >
                            <Edit className="w-4 h-4 text-gray-700" />
                          </button>
                          <button
                            onClick={() => setDeletingImage(image)}
                            className="p-2 bg-white rounded-lg hover:bg-red-50"
                            title="Delete Image"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                      {image.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent p-2">
                          <p className="text-xs text-white truncate">
                            {image.caption}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {/* Add Image Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: category.images.length * 0.05,
                  }}
                  onClick={() => setIsAddImageModalOpen(true)}
                  className="aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all flex flex-col items-center justify-center gap-2 group"
                >
                  <Plus className="w-8 h-8 text-gray-400 group-hover:text-purple-600" />
                  <span className="text-sm text-gray-600 group-hover:text-purple-600">
                    Add Image
                  </span>
                </motion.button>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 font-medium mb-2">No images yet</p>
                <p className="text-sm text-gray-500 mb-4">
                  Add images to this category
                </p>
                <button
                  onClick={() => setIsAddImageModalOpen(true)}
                  className="px-4 py-2 bg-[#2d4a8f] text-white rounded-lg hover:bg-[#3461c9] transition-colors inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add First Image
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        category={category}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteCategory}
        title="Delete Category"
        message={`Are you sure you want to delete "${category.name}"? This will remove all images.`}
        isLoading={deletePortfolio.isPending}
      />

      <AddImageModal
        isOpen={isAddImageModalOpen}
        onClose={() => setIsAddImageModalOpen(false)}
        categoryId={category.id}
      />

      <EditImageModal
        isOpen={!!editingImage}
        onClose={() => setEditingImage(null)}
        image={editingImage}
      />

      <DeleteConfirmModal
        isOpen={!!deletingImage}
        onClose={() => setDeletingImage(null)}
        onConfirm={handleDeleteImage}
        title="Delete Image"
        message="Are you sure you want to delete this image?"
        isLoading={deleteImage.isPending}
      />
    </>
  );
};
