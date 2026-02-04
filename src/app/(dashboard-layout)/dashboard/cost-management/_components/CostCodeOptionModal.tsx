"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useCreateCostCodeOption,
  useUpdateCostCodeOption,
} from "@/hooks/useCostManagement";
import { CreateCostCodeOptionDto } from "@/types/cost-management.types";

interface CostCodeOptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  data?: any;
  costCodeId: string;
}

const CostCodeOptionModal = ({
  isOpen,
  onClose,
  mode,
  data,
  costCodeId,
}: CostCodeOptionModalProps) => {
  const createMutation = useCreateCostCodeOption();
  const updateMutation = useUpdateCostCodeOption();
  const [formData, setFormData] = useState<CreateCostCodeOptionDto>({
    costCodeId: "",
    optionName: "",
    optionValue: "",
    priceModifier: 0,
    isDefault: false,
    displayOrder: 0,
  });

  useEffect(() => {
    if (mode === "edit" && data) {
      setFormData({
        costCodeId: data.costCodeId,
        optionName: data.optionName,
        optionValue: data.optionValue || "",
        priceModifier: data.priceModifier,
        isDefault: data.isDefault,
        displayOrder: data.displayOrder,
      });
    } else {
      setFormData({
        costCodeId: costCodeId,
        optionName: "",
        optionValue: "",
        priceModifier: 0,
        isDefault: false,
        displayOrder: 0,
      });
    }
  }, [mode, data, costCodeId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "create") {
      await createMutation.mutateAsync(formData);
    } else {
      // For update, don't send costCodeId
      const { costCodeId, ...updateData } = formData;
      await updateMutation.mutateAsync({ id: data.id, data: updateData });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {mode === "create" ? "Create" : "Edit"} Cost Code Option
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
              <label className="block text-sm font-medium mb-1">
                Option Name *
              </label>
              <input
                type="text"
                value={formData.optionName}
                onChange={(e) =>
                  setFormData({ ...formData, optionName: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="e.g., Standard, Premium, Mid-Range"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Option Value
              </label>
              <input
                type="text"
                value={formData.optionValue}
                onChange={(e) =>
                  setFormData({ ...formData, optionValue: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="e.g., 24 inch, Large, etc."
              />
              <p className="text-xs text-gray-500 mt-1">
                Optional: Specific value or size
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Price Modifier *
              </label>
              <input
                type="number"
                value={formData.priceModifier}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priceModifier: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full border rounded px-3 py-2"
                step="0.01"
                placeholder="e.g., 0, 150, -50"
              />
              <p className="text-xs text-gray-500 mt-1">
                Positive adds to base price, negative subtracts
              </p>
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
                    displayOrder: parseInt(e.target.value) || 0,
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
                checked={formData.isDefault}
                onChange={(e) =>
                  setFormData({ ...formData, isDefault: e.target.checked })
                }
                className="mr-2"
                title="Default option"
                aria-label="Default option"
              />
              <label className="text-sm font-medium">
                Set as Default Option
              </label>
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

export default CostCodeOptionModal;
