"use client";

import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useUpdatePortfolio } from "@/hooks/usePortfolio";
import { toast } from "sonner";

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: any;
}

export const EditCategoryModal = ({
  isOpen,
  onClose,
  category,
}: EditCategoryModalProps) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const updatePortfolio = useUpdatePortfolio();

  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setSlug(category.slug || "");
      setDescription(category.description || "");
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePortfolio.mutateAsync({
        id: category.id,
        data: { name, slug, description },
      });
      toast.success("Category updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-9999 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Edit Category</h3>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d4a8f]"
              placeholder="e.g., Kitchen Remodeling"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL)
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d4a8f]"
              placeholder="kitchen-remodeling"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d4a8f] resize-none"
              placeholder="Brief description of this category..."
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
              disabled={updatePortfolio.isPending}
              className="px-6 py-2 bg-[#2d4a8f] text-white rounded-lg hover:bg-[#1e3560] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {updatePortfolio.isPending && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              {updatePortfolio.isPending ? "Updating..." : "Update Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
