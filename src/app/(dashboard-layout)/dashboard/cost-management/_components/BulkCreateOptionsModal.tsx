"use client";

import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBulkCreateCostCodeOptions } from "@/hooks/useCostManagement";

interface BulkCreateOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  costCodeId: string;
}

interface OptionInput {
  optionName: string;
  optionValue: string;
  priceModifier: number;
  isDefault: boolean;
}

const BulkCreateOptionsModal = ({
  isOpen,
  onClose,
  costCodeId,
}: BulkCreateOptionsModalProps) => {
  const bulkCreateMutation = useBulkCreateCostCodeOptions();
  const [options, setOptions] = useState<OptionInput[]>([
    { optionName: "", optionValue: "", priceModifier: 0, isDefault: false },
  ]);

  const addOption = () => {
    setOptions([
      ...options,
      { optionName: "", optionValue: "", priceModifier: 0, isDefault: false },
    ]);
  };

  const removeOption = (index: number) => {
    if (options.length > 1) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (
    index: number,
    field: keyof OptionInput,
    value: any,
  ) => {
    const updated = [...options];
    updated[index] = { ...updated[index], [field]: value };
    setOptions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validOptions = options.filter((opt) => opt.optionName.trim());
    if (validOptions.length === 0) {
      alert("Please add at least one option");
      return;
    }
    await bulkCreateMutation.mutateAsync({ costCodeId, options: validOptions });
    onClose();
    setOptions([
      { optionName: "", optionValue: "", priceModifier: 0, isDefault: false },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Bulk Create Options</h2>
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
            {options.map((option, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-sm">Option {index + 1}</h3>
                  {options.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="text-red-600 hover:text-red-900"
                      title="Remove option"
                      aria-label="Remove option"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">
                      Option Name *
                    </label>
                    <input
                      type="text"
                      value={option.optionName}
                      onChange={(e) =>
                        updateOption(index, "optionName", e.target.value)
                      }
                      className="w-full border rounded px-2 py-1.5 text-sm"
                      placeholder="e.g., Standard"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">
                      Option Value
                    </label>
                    <input
                      type="text"
                      value={option.optionValue}
                      onChange={(e) =>
                        updateOption(index, "optionValue", e.target.value)
                      }
                      className="w-full border rounded px-2 py-1.5 text-sm"
                      placeholder="e.g., 24 inch"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">
                      Price Modifier
                    </label>
                    <input
                      type="number"
                      value={option.priceModifier}
                      onChange={(e) =>
                        updateOption(
                          index,
                          "priceModifier",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      className="w-full border rounded px-2 py-1.5 text-sm"
                      step="0.01"
                      placeholder="0"
                    />
                  </div>
                  <div className="flex items-center pt-6">
                    <input
                      type="checkbox"
                      checked={option.isDefault}
                      onChange={(e) =>
                        updateOption(index, "isDefault", e.target.checked)
                      }
                      className="mr-2"
                      title="Default option"
                      aria-label="Default option"
                    />
                    <label className="text-xs font-medium">Default</label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            onClick={addOption}
            variant="outline"
            className="mt-4 w-full"
          >
            <Plus size={16} className="mr-2" />
            Add Another Option
          </Button>

          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#2d4a8f] hover:bg-[#243a73]">
              Create All Options
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BulkCreateOptionsModal;
