"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchableSelect } from "@/components/ui/searchable-select";
import {
  useCreateCostCode,
  useUpdateCostCode,
  useCostCodes,
  useBulkCreateCostCodeOptions,
  useCreateCostCodeOption,
  useUpdateCostCodeOption,
  useDeleteCostCodeOption,
} from "@/hooks/useCostManagement";
import {
  useProjectTypes,
  useServiceCategories,
  useServiceCategoriesByProjectType,
  useServicesByCategory,
} from "@/hooks/useProjectManagement";
import {
  CreateCostCodeDto,
  CostCodeCategory,
  QuestionType,
  UnitType,
} from "@/types/cost-management.types";

interface CostCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  data?: any;
  categories: CostCodeCategory[];
}

const CostCodeModal = ({
  isOpen,
  onClose,
  mode,
  data,
  categories,
}: CostCodeModalProps) => {
  const createMutation = useCreateCostCode();
  const updateMutation = useUpdateCostCode();
  const bulkCreateOptions = useBulkCreateCostCodeOptions();
  const createOption = useCreateCostCodeOption();
  const updateOption = useUpdateCostCodeOption();
  const deleteOption = useDeleteCostCodeOption();
  const { data: projectTypes } = useProjectTypes(true);
  const { data: allServiceCategories } = useServiceCategories(true);
  const [selectedProjectType, setSelectedProjectType] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const { data: serviceCategories } =
    useServiceCategoriesByProjectType(selectedProjectType);
  const { data: services } = useServicesByCategory(selectedCategory);
  const { data: allCostCodes } = useCostCodes({
    serviceId: selectedServiceId,
    isActive: true,
  });

  // Options state for ORANGE question type
  const [options, setOptions] = useState<
    Array<{
      id?: string;
      optionName: string;
      priceModifier: number;
      displayOrder: number;
      isDefault: boolean;
    }>
  >([]);

  // Track deleted option IDs for update mode
  const [deletedOptionIds, setDeletedOptionIds] = useState<string[]>([]);

  const [formData, setFormData] = useState<CreateCostCodeDto>({
    categoryId: "",
    code: "",
    name: "",
    description: "",
    basePrice: 0,
    markup: 0,
    clientPrice: 0,
    unitType: "FIXED",
    questionType: "WHITE",
    step: 1,
    displayOrder: 0,
    isIncludedInBase: false,
    requiresQuantity: false,
    isOptional: false,
    isActive: true,
    parentCostCodeId: "",
    showWhenParentValue: "",
    nestedInputType: "NONE",
    excludeFromExport: false,
  });

  useEffect(() => {
    if (
      mode === "edit" &&
      data &&
      data.service?.serviceCategoryId &&
      allServiceCategories
    ) {
      // Find service category and get projectTypeId
      const matchedCategory = allServiceCategories.find(
        (sc) => sc.id === data.service.serviceCategoryId,
      );
      if (matchedCategory?.projectTypeId) {
        setSelectedProjectType(matchedCategory.projectTypeId);
        setSelectedCategory(data.service.serviceCategoryId);
      }

      setFormData({
        categoryId: data.categoryId,
        serviceId: data.serviceId || "",
        code: data.code,
        name: data.name,
        description: data.description || "",
        basePrice: data.basePrice,
        markup: data.markup || 0,
        clientPrice: data.clientPrice || 0,
        unitType: data.unitType,
        questionType: data.questionType,
        step: data.step,
        displayOrder: data.displayOrder,
        isIncludedInBase: data.isIncludedInBase,
        requiresQuantity: data.requiresQuantity,
        isOptional: data.isOptional,
        isActive: data.isActive,
        parentCostCodeId: data.parentCostCodeId || "",
        showWhenParentValue: data.showWhenParentValue || "",
        nestedInputType: data.nestedInputType || "NONE",
        excludeFromExport: data.excludeFromExport ?? false,
      });
      setSelectedServiceId(data.serviceId || "");

      // Load existing options if ORANGE type
      if (data.questionType === "ORANGE" && data.options) {
        setOptions(
          data.options.map((opt: any) => ({
            id: opt.id,
            optionName: opt.optionName,
            priceModifier: Number(opt.priceModifier),
            displayOrder: opt.displayOrder,
            isDefault: opt.isDefault,
          })),
        );
      }
    } else if (mode === "create") {
      setFormData({
        categoryId: "",
        serviceId: "",
        code: "",
        name: "",
        description: "",
        basePrice: 0,
        markup: 0,
        clientPrice: 0,
        unitType: "FIXED",
        questionType: "WHITE",
        step: 1,
        displayOrder: 0,
        isIncludedInBase: false,
        requiresQuantity: false,
        isOptional: false,
        isActive: true,
        parentCostCodeId: "",
        showWhenParentValue: "",
        nestedInputType: "NONE",
        excludeFromExport: false,
      });
      setSelectedProjectType("");
      setSelectedCategory("");
      setSelectedServiceId("");
      setOptions([]);
      setDeletedOptionIds([]);
    }
  }, [mode, data, allServiceCategories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.serviceId) {
      alert("Please select a service");
      return;
    }

    // Validate ORANGE type has options
    if (formData.questionType === "ORANGE" && options.length === 0) {
      alert("Please add at least one option for dropdown question");
      return;
    }

    const submitData = { ...formData };
    if (!submitData.serviceId) delete submitData.serviceId;
    if (!submitData.parentCostCodeId) delete submitData.parentCostCodeId;
    if (!submitData.showWhenParentValue) delete submitData.showWhenParentValue;

    try {
      if (mode === "create") {
        // Step 1: Create cost code first
        const result = await createMutation.mutateAsync(submitData);
        const newCostCodeId = result.data.data.id;

        // Step 2: Create options with the new cost code ID
        if (formData.questionType === "ORANGE" && options.length > 0) {
          await bulkCreateOptions.mutateAsync({
            costCodeId: newCostCodeId,
            options: options.map((opt) => ({
              optionName: opt.optionName,
              priceModifier: opt.priceModifier,
              displayOrder: opt.displayOrder,
              isDefault: opt.isDefault,
            })),
          });
        }
      } else {
        // Step 1: Update cost code
        await updateMutation.mutateAsync({ id: data.id, data: submitData });

        // Step 2: Handle options for ORANGE type
        if (formData.questionType === "ORANGE") {
          // Delete removed options
          for (const optionId of deletedOptionIds) {
            await deleteOption.mutateAsync(optionId);
          }

          // Update or create options
          for (const option of options) {
            if (option.id) {
              // Update existing option
              await updateOption.mutateAsync({
                id: option.id,
                data: {
                  optionName: option.optionName,
                  priceModifier: option.priceModifier,
                  displayOrder: option.displayOrder,
                  isDefault: option.isDefault,
                },
              });
            } else {
              // Create new option
              await createOption.mutateAsync({
                costCodeId: data.id,
                optionName: option.optionName,
                priceModifier: option.priceModifier,
                displayOrder: option.displayOrder,
                isDefault: option.isDefault,
              });
            }
          }
        }
      }
      onClose();
    } catch (error) {
      console.error("Failed to save cost code:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-start justify-center bg-black/50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {mode === "create" ? "Create" : "Edit"} Cost Code
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Project Type *
              </label>
              <SearchableSelect
                options={projectTypes?.map((pt) => ({ value: pt.id, label: pt.name })) || []}
                value={selectedProjectType}
                onChange={(value) => {
                  setSelectedProjectType(value);
                  setSelectedCategory("");
                  setFormData({ ...formData, serviceId: "" });
                }}
                placeholder="Select Project Type"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Service Category *
              </label>
              <SearchableSelect
                options={serviceCategories?.map((sc) => ({ value: sc.id, label: sc.name })) || []}
                value={selectedCategory}
                onChange={(value) => {
                  setSelectedCategory(value);
                  setFormData({ ...formData, serviceId: "" });
                }}
                placeholder="Select Category"
                required
                disabled={!selectedProjectType}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Service *
              </label>
              <SearchableSelect
                options={services?.map((s) => ({ value: s.id, label: s.name })) || []}
                value={formData.serviceId || ""}
                onChange={(value) => {
                  setFormData({ ...formData, serviceId: value });
                  setSelectedServiceId(value);
                }}
                placeholder="Select Service"
                required
                disabled={!selectedCategory}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Category *
              </label>
              <SearchableSelect
                options={categories.map((cat) => ({ value: cat.id, label: cat.name })) || []}
                value={formData.categoryId}
                onChange={(value) => setFormData({ ...formData, categoryId: value })}
                placeholder="Select Category"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Code *</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="e.g., FP-D-1"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="e.g., Floor Tile Installation"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="Detailed description..."
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Base Price *
              </label>
              <input
                type="number"
                value={formData.basePrice}
                onChange={(e) => {
                  const basePrice = parseFloat(e.target.value) || 0;
                  const calculatedClientPrice =
                    basePrice + (basePrice * (formData.markup || 0)) / 100;
                  setFormData({
                    ...formData,
                    basePrice,
                    clientPrice: calculatedClientPrice,
                  });
                }}
                className="w-full border rounded px-3 py-2"
                min="0"
                step="0.01"
                required
                placeholder="0.00"
                title="Base price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Markup (%)
              </label>
              <input
                type="number"
                value={formData.markup}
                onChange={(e) => {
                  const markup = parseFloat(e.target.value) || 0;
                  const calculatedClientPrice =
                    formData.basePrice + (formData.basePrice * markup) / 100;
                  setFormData({
                    ...formData,
                    markup,
                    clientPrice: calculatedClientPrice,
                  });
                }}
                className="w-full border rounded px-3 py-2"
                min="0"
                step="0.01"
                placeholder="0"
                title="Markup percentage"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Client Price
              </label>
              <input
                type="number"
                value={formData.clientPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    clientPrice: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full border rounded px-3 py-2"
                min="0"
                step="0.01"
                placeholder="0.00"
                title="Client price (can be manually overridden)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Unit Type
              </label>
              <select
                value={formData.unitType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    unitType: e.target.value as UnitType,
                  })
                }
                className="w-full border rounded px-3 py-2"
                title="Select unit type"
                aria-label="Select unit type"
              >
                <option value="FIXED">Fixed</option>
                <option value="PER_SQFT">Per Sq Ft</option>
                <option value="PER_EACH">Per Each</option>
                <option value="PER_LOT">Per Lot</option>
                <option value="PER_SET">Per Set</option>
                <option value="PER_UPGRADE">Per Upgrade</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">
                Question Type
              </label>
              <select
                value={formData.questionType}
                onChange={(e) => {
                  const newType = e.target.value as QuestionType;
                  setFormData({
                    ...formData,
                    questionType: newType,
                  });
                  // Clear options if switching away from ORANGE
                  if (newType !== "ORANGE") {
                    setOptions([]);
                  }
                }}
                className="w-full border rounded px-3 py-2"
                title="Select question type"
                aria-label="Select question type"
              >
                <option value="WHITE">
                  WHITE - Assumed scope (cannot be changed)
                </option>
                <option value="BLUE">BLUE - Yes/No Toggle (default: No)</option>
                <option value="GREEN">GREEN - Data Input (numbers only)</option>
                <option value="ORANGE">
                  ORANGE - Dropdown list (preset options)
                </option>
                <option value="PURPLE">
                  PURPLE - Uses data from previous questions
                </option>
                <option value="YELLOW">
                  YELLOW - Conditional Yes/No (appears after previous Yes)
                </option>
                <option value="RED">RED - Inactive/Hidden (placeholder)</option>
              </select>
            </div>

            {/* Options Management for ORANGE type */}
            {formData.questionType === "ORANGE" && (
              <div className="col-span-2 border-t pt-4 mt-2">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-semibold text-gray-700">
                    📋 Dropdown Options
                  </h3>
                  <Button
                    type="button"
                    onClick={() => {
                      setOptions([
                        ...options,
                        {
                          optionName: "",
                          priceModifier: 0,
                          displayOrder: options.length,
                          isDefault: options.length === 0,
                        },
                      ]);
                    }}
                    className="bg-[#2D4A8F] hover:bg-[#4064b8] text-white px-3 py-1 text-sm"
                  >
                    + Add Option
                  </Button>
                </div>

                {options.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded">
                    No options added. Click "Add Option" to create dropdown
                    choices.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className="flex gap-2 items-start bg-gray-50 p-3 rounded"
                      >
                        <div className="flex-1 grid grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={option.optionName}
                            onChange={(e) => {
                              const newOptions = [...options];
                              newOptions[index].optionName = e.target.value;
                              setOptions(newOptions);
                            }}
                            placeholder="Option name"
                            className="border rounded px-2 py-1 text-sm"
                            required
                          />
                          <input
                            type="number"
                            value={option.priceModifier}
                            onChange={(e) => {
                              const newOptions = [...options];
                              newOptions[index].priceModifier =
                                parseFloat(e.target.value) || 0;
                              setOptions(newOptions);
                            }}
                            placeholder="Price"
                            className="border rounded px-2 py-1 text-sm"
                            step="0.01"
                            min="0"
                          />
                          <div className="flex items-center gap-2">
                            <label className="flex items-center text-xs">
                              <input
                                type="checkbox"
                                checked={option.isDefault}
                                onChange={(e) => {
                                  const newOptions = options.map((opt, i) => ({
                                    ...opt,
                                    isDefault:
                                      i === index ? e.target.checked : false,
                                  }));
                                  setOptions(newOptions);
                                }}
                                className="mr-1"
                              />
                              Default
                            </label>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const removedOption = options[index];
                            // Track deleted option ID if it exists
                            if (removedOption.id) {
                              setDeletedOptionIds([
                                ...deletedOptionIds,
                                removedOption.id,
                              ]);
                            }
                            setOptions(options.filter((_, i) => i !== index));
                          }}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Remove option"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  💡 Add dropdown options that users can select from. Set price
                  for each option.
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">
                Step Number
              </label>
              <input
                type="number"
                value={formData.step}
                onChange={(e) =>
                  setFormData({ ...formData, step: parseInt(e.target.value) })
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

            <div className="col-span-2 border-t pt-4 mt-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                🔗 Nested Question Settings (Optional)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Parent Question
                  </label>
                  <select
                    value={formData.parentCostCodeId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        parentCostCodeId: e.target.value,
                      })
                    }
                    className="w-full border rounded px-3 py-2"
                    title="Select parent question"
                    disabled={!formData.serviceId}
                  >
                    <option value="">None (Top-level question)</option>
                    {allCostCodes?.map((cc) => (
                      <option key={cc.id} value={cc.id}>
                        {cc.code} - {cc.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    This question will appear after parent is answered
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Show When Parent Value
                  </label>
                  <input
                    type="text"
                    value={formData.showWhenParentValue}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        showWhenParentValue: e.target.value,
                      })
                    }
                    className="w-full border rounded px-3 py-2"
                    placeholder="true / false / optionId / ANY"
                    disabled={!formData.parentCostCodeId}
                    title="Condition to show this question"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use: true, false, optionId, or ANY
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nested Input Type
                  </label>
                  <select
                    value={formData.nestedInputType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nestedInputType: e.target.value as any,
                      })
                    }
                    className="w-full border rounded px-3 py-2"
                    disabled={!formData.parentCostCodeId}
                    title="Type of nested input"
                  >
                    <option value="NONE">None</option>
                    <option value="QUANTITY">Quantity Input</option>
                    <option value="DROPDOWN">Dropdown</option>
                    <option value="CUSTOM_PRICE">Custom Price</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    How user will interact with this nested question
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isIncludedInBase}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isIncludedInBase: e.target.checked,
                    })
                  }
                  className="mr-2"
                  title="Included in base"
                  aria-label="Included in base"
                />
                <label className="text-sm font-medium">Included in Base</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.requiresQuantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      requiresQuantity: e.target.checked,
                    })
                  }
                  className="mr-2"
                  title="Requires quantity"
                  aria-label="Requires quantity"
                />
                <label className="text-sm font-medium">Requires Quantity</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isOptional}
                  onChange={(e) =>
                    setFormData({ ...formData, isOptional: e.target.checked })
                  }
                  className="mr-2"
                  title="Optional"
                  aria-label="Optional"
                />
                <label className="text-sm font-medium">Optional</label>
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

              <div className="col-span-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.excludeFromExport ?? false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        excludeFromExport: e.target.checked,
                      })
                    }
                    className="mr-2"
                    title="Branch only - do not export to Buildertrend"
                    aria-label="Branch only"
                  />
                  <label className="text-sm font-medium">
                    Branch only (do not export to Buildertrend)
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-6">
                  Use for questions that only control follow-up questions (e.g. &quot;Relocating Plumbing?&quot;). They appear in the estimator but are not included in the Excel export.
                </p>
              </div>
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

export default CostCodeModal;
