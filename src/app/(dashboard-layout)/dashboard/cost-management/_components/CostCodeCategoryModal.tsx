"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useCreateCostCodeCategory,
  useUpdateCostCodeCategory,
} from "@/hooks/useCostManagement";
import { CreateCostCodeCategoryDto } from "@/types/cost-management.types";

interface CostCodeCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  data?: any;
}

const CostCodeCategoryModal = ({
  isOpen,
  onClose,
  mode,
  data,
}: CostCodeCategoryModalProps) => {
  const createMutation = useCreateCostCodeCategory();
  const updateMutation = useUpdateCostCodeCategory();
  const [formData, setFormData] = useState<CreateCostCodeCategoryDto>({
    name: "",
    slug: "",
    description: "",
    stepNumber: 1,
    displayOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    if (mode === "edit" && data) {
      setFormData({
        name: data.name,
        slug: data.slug,
        description: data.description || "",
        stepNumber: data.stepNumber,
        displayOrder: data.displayOrder,
        isActive: data.isActive,
      });
    } else {
      setFormData({
        name: "",
        slug: "",
        description: "",
        stepNumber: 1,
        displayOrder: 0,
        isActive: true,
      });
    }
  }, [mode, data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "create") {
      await createMutation.mutateAsync(formData);
    } else {
      await updateMutation.mutateAsync({ id: data.id, data: formData });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {mode === "create" ? "Create" : "Edit"} Cost Code Category
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            title="Close modal"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="e.g., Demolition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Slug *</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="e.g., demolition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="Brief description..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Step Number
              </label>
              <input
                type="number"
                value={formData.stepNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stepNumber: parseInt(e.target.value),
                  })
                }
                className="w-full border rounded px-3 py-2"
                min="1"
                placeholder="1"
                title="Step number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    displayOrder: parseInt(e.target.value),
                  })
                }
                className="w-full border rounded px-3 py-2"
                min="0"
                placeholder="0"
                title="Display order"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="mr-2"
                title="Active status"
                aria-label="Active status"
              />
              <label className="text-sm font-medium">Active</label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#2d4a8f] hover:bg-[#243a73]">
              {mode === "create" ? "Create" : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CostCodeCategoryModal;
