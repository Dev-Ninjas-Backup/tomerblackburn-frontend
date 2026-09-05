"use client";

import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchableSelect } from "@/components/ui/searchable-select";
import CostCodeImageManager from "./CostCodeImageManager";
import { costCodeService } from "@/services/cost-code.service";
import { uploadService } from "@/services/upload.service";
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
  const queryClient = useQueryClient();
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
      basePrice?: number;
      clientPrice?: number;
      priceModifier: number;
      displayOrder: number;
      isDefault: boolean;
    }>
  >([]);

  // Track deleted option IDs for update mode
  const [deletedOptionIds, setDeletedOptionIds] = useState<string[]>([]);

  // Image state
  const [pendingImages, setPendingImages] = useState<{ file: File; preview: string }[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<CreateCostCodeDto>({
    categoryId: "",
    code: "",
    name: "",
    elies: "",
    tips: [],
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
    if (!isOpen) return;

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
        elies: data.elies || "",
        tips: data.tips || [],
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
          data.options.map((opt: any) => {
            const bPrice =
              opt.basePrice !== undefined && opt.basePrice !== null
                ? Number(opt.basePrice)
                : 0;
            const cPrice =
              opt.clientPrice !== undefined && opt.clientPrice !== null
                ? Number(opt.clientPrice)
                : Number(opt.priceModifier) || 0;
            return {
              id: opt.id,
              optionName: opt.optionName,
              basePrice: bPrice,
              clientPrice: cPrice,
              priceModifier: cPrice,
              displayOrder: opt.displayOrder,
              isDefault: opt.isDefault,
            };
          }),
        );
      } else {
        setOptions([]);
      }
      setDeletedOptionIds([]);
      setPendingImages([]);
      setDeletedImageIds([]);
    } else if (mode === "create") {
      setFormData({
        categoryId: "",
        serviceId: "",
        code: "",
        name: "",
        elies: "",
        tips: [],
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
      setPendingImages([]);
      setDeletedImageIds([]);
    }
  }, [isOpen, mode, data, allServiceCategories]);

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

    setIsSubmitting(true);
    const submitData = { ...formData };
    if (!submitData.serviceId) delete submitData.serviceId;
    if (!submitData.parentCostCodeId) delete submitData.parentCostCodeId;
    if (!submitData.showWhenParentValue) delete submitData.showWhenParentValue;

    try {
      if (mode === "create") {
        const result = await createMutation.mutateAsync(submitData);
        const newCostCodeId = result.data.data.id;

        if (formData.questionType === "ORANGE" && options.length > 0) {
          await bulkCreateOptions.mutateAsync({
            costCodeId: newCostCodeId,
            options: options.map((opt) => ({
              optionName: opt.optionName,
              basePrice: opt.basePrice ?? 0,
              clientPrice: opt.clientPrice ?? opt.priceModifier ?? 0,
              priceModifier: opt.clientPrice ?? opt.priceModifier ?? 0,
              displayOrder: opt.displayOrder,
              isDefault: opt.isDefault,
            })),
          });
        }

        // Upload pending images
        for (const pending of pendingImages) {
          const uploaded = await uploadService.uploadSingle(pending.file);
          await costCodeService.addImage(newCostCodeId, uploaded.id);
        }
      } else {
        await updateMutation.mutateAsync({ id: data.id, data: submitData });

        if (formData.questionType === "ORANGE") {
          for (const optionId of deletedOptionIds) {
            await deleteOption.mutateAsync(optionId);
          }
          for (const option of options) {
            if (option.id) {
              await updateOption.mutateAsync({
                id: option.id,
                data: {
                  optionName: option.optionName,
                  basePrice: option.basePrice ?? 0,
                  clientPrice: option.clientPrice ?? option.priceModifier ?? 0,
                  priceModifier: option.clientPrice ?? option.priceModifier ?? 0,
                  displayOrder: option.displayOrder,
                  isDefault: option.isDefault,
                },
              });
            } else {
              await createOption.mutateAsync({
                costCodeId: data.id,
                optionName: option.optionName,
                basePrice: option.basePrice ?? 0,
                clientPrice: option.clientPrice ?? option.priceModifier ?? 0,
                priceModifier: option.clientPrice ?? option.priceModifier ?? 0,
                displayOrder: option.displayOrder,
                isDefault: option.isDefault,
              });
            }
          }
        }

        // Handle images in edit mode
        for (const imageId of deletedImageIds) {
          await costCodeService.removeImage(data.id, imageId);
        }
        for (const pending of pendingImages) {
          const uploaded = await uploadService.uploadSingle(pending.file);
          await costCodeService.addImage(data.id, uploaded.id);
        }
      }
      queryClient.invalidateQueries({ queryKey: ["cost-codes"] });
      onClose();
    } catch (error) {
      console.error("Failed to save cost code:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Bi-directional price handlers for ORANGE options
  const handleOptionBasePriceChange = (index: number, basePriceVal: number) => {
    const markup = formData.markup || 0;
    const clientPriceVal =
      Math.round((basePriceVal + (basePriceVal * markup) / 100) * 100) / 100;

    const newOptions = [...options];
    newOptions[index] = {
      ...newOptions[index],
      basePrice: basePriceVal,
      clientPrice: clientPriceVal,
      priceModifier: clientPriceVal,
    };
    setOptions(newOptions);
  };

  const handleOptionClientPriceChange = (
    index: number,
    clientPriceVal: number,
  ) => {
    const markup = formData.markup || 0;
    const basePriceVal =
      markup > -100
        ? Math.round((clientPriceVal / (1 + markup / 100)) * 100) / 100
        : clientPriceVal;

    const newOptions = [...options];
    newOptions[index] = {
      ...newOptions[index],
      basePrice: basePriceVal,
      clientPrice: clientPriceVal,
      priceModifier: clientPriceVal,
    };
    setOptions(newOptions);
  };

  // Add a single new option
  const handleAddOption = () => {
    const parentBase = Number(formData.basePrice) || 0;
    const parentClient =
      Number(formData.clientPrice) ||
      parentBase + (parentBase * (formData.markup || 0)) / 100;

    setOptions([
      ...options,
      {
        optionName: "",
        basePrice: parentBase,
        clientPrice: parentClient,
        priceModifier: parentClient,
        displayOrder: options.length,
        isDefault: options.length === 0,
      },
    ]);
  };

  // Auto-generate 1-6 tiers based on parent basePrice and markup
  const handleAutoGenerateTiers = () => {
    const parentBase = Number(formData.basePrice) || 0;
    const parentClient =
      Number(formData.clientPrice) ||
      parentBase + (parentBase * (formData.markup || 0)) / 100;

    if (
      options.length > 0 &&
      !window.confirm(
        "Auto-generating 1-6 tiers will replace the current options. Continue?",
      )
    ) {
      return;
    }

    // Track any existing option IDs for deletion if in edit mode
    const idsToDelete = options
      .map((opt) => opt.id)
      .filter(Boolean) as string[];
    if (idsToDelete.length > 0) {
      setDeletedOptionIds((prev) => [...prev, ...idsToDelete]);
    }

    const generatedOptions = [1, 2, 3, 4, 5, 6].map((multiplier, idx) => {
      const bPrice = Math.round(parentBase * multiplier * 100) / 100;
      const cPrice = Math.round(parentClient * multiplier * 100) / 100;
      return {
        optionName: `${multiplier}`,
        basePrice: bPrice,
        clientPrice: cPrice,
        priceModifier: cPrice,
        displayOrder: idx,
        isDefault: idx === 0,
      };
    });

    setOptions(generatedOptions);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-start justify-center bg-black/50 overflow-y-auto p-2 sm:p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl p-4 sm:p-6 my-3 sm:my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {mode === "create" ? "Create" : "Edit"} Cost Code
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Close modal"
            aria-label="Close modal"
            disabled={isSubmitting}
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
                options={
                  projectTypes?.map((pt) => ({
                    value: pt.id,
                    label: pt.name,
                  })) || []
                }
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
                options={
                  serviceCategories?.map((sc) => ({
                    value: sc.id,
                    label: sc.name,
                  })) || []
                }
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
                options={
                  services?.map((s) => ({ value: s.id, label: s.name })) || []
                }
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
                options={
                  categories.map((cat) => ({
                    value: cat.id,
                    label: cat.name,
                  })) || []
                }
                value={formData.categoryId}
                onChange={(value) =>
                  setFormData({ ...formData, categoryId: value })
                }
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
                Name Alias{" "}
                <span className="text-xs text-gray-500">
                  (Used in floating summary for better display)
                </span>
              </label>
              <input
                type="text"
                value={formData.elies || ""}
                onChange={(e) =>
                  setFormData({ ...formData, elies: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="Alternative name for display in summary"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">
                Tips{" "}
                <span className="text-xs text-gray-500">
                  (Helpful hints shown to users during estimation)
                </span>
              </label>
              <div className="space-y-2">
                {(formData.tips || []).map((tip, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={tip}
                      onChange={(e) => {
                        const newTips = [...(formData.tips || [])];
                        newTips[idx] = e.target.value;
                        setFormData({ ...formData, tips: newTips });
                      }}
                      className="flex-1 border rounded px-3 py-2 text-sm"
                      placeholder={`Tip ${idx + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newTips = (formData.tips || []).filter(
                          (_, i) => i !== idx,
                        );
                        setFormData({ ...formData, tips: newTips });
                      }}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Remove tip"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      tips: [...(formData.tips || []), ""],
                    })
                  }
                  className="flex items-center gap-1.5 text-sm text-[#2d4a8f] hover:text-[#243a73] font-medium mt-1"
                >
                  <Plus size={15} /> Add Tip
                </button>
              </div>
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
                rows={5}
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
              <SearchableSelect
                options={[
                  { value: "FIXED", label: "Fixed" },
                  { value: "PER_SQFT", label: "Per Sq Ft" },
                  { value: "PER_LF", label: "Per Linear Foot" },
                  { value: "PER_EACH", label: "Per Each" },
                  { value: "PER_LOT", label: "Per Lot" },
                  { value: "PER_SET", label: "Per Set" },
                  { value: "PER_UPGRADE", label: "Per Upgrade" },
                ]}
                value={formData.unitType || ""}
                onChange={(value) =>
                  setFormData({ ...formData, unitType: value as UnitType })
                }
                placeholder="Select Unit Type"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">
                Question Type
              </label>
              <SearchableSelect
                options={[
                  {
                    value: "WHITE",
                    label: "WHITE",
                    subtitle: "Assumed scope (cannot be changed)",
                  },
                  {
                    value: "BLUE",
                    label: "BLUE",
                    subtitle: "Yes/No Toggle (default: No)",
                  },
                  {
                    value: "GREEN",
                    label: "GREEN",
                    subtitle: "Data Input (numbers only)",
                  },
                  {
                    value: "ORANGE",
                    label: "ORANGE",
                    subtitle: "Dropdown list (preset options)",
                  },
                  {
                    value: "PURPLE",
                    label: "PURPLE",
                    subtitle: "Uses data from previous questions",
                  },
                  {
                    value: "YELLOW",
                    label: "YELLOW",
                    subtitle: "Conditional Yes/No (appears after previous Yes)",
                  },
                  {
                    value: "RED",
                    label: "RED",
                    subtitle: "Inactive/Hidden (placeholder)",
                  },
                ]}
                value={formData.questionType || ""}
                onChange={(value) => {
                  const newType = value as QuestionType;
                  setFormData({ ...formData, questionType: newType });
                  if (newType !== "ORANGE") setOptions([]);
                }}
                placeholder="Select Question Type"
              />
            </div>

            {/* Options Management for ORANGE type */}
            {formData.questionType === "ORANGE" && (
              <div className="col-span-2 border-t pt-4 mt-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2.5 mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 flex-wrap">
                      <span>📋</span> Dropdown Options
                      {formData.markup !== undefined && formData.markup > 0 && (
                        <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                          Markup: {formData.markup}%
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Base costs are exported to Buildertrend. Client prices are auto-calculated from markup.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleAutoGenerateTiers}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-2.5 py-1.5 text-xs rounded-md font-medium flex items-center justify-center gap-1 shadow-xs transition-colors"
                      title="Auto-generate 1-6 tiers with base and client prices"
                    >
                      ⚡ Auto-Generate (1-6)
                    </button>
                    <Button
                      type="button"
                      onClick={handleAddOption}
                      className="bg-[#2D4A8F] hover:bg-[#4064b8] text-white px-3 py-1.5 text-xs flex items-center justify-center rounded-md"
                    >
                      + Add Option
                    </Button>
                  </div>
                </div>

                {options.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    No options added yet. Click <span className="font-semibold text-blue-600">+ Add Option</span> or <span className="font-semibold text-amber-600">⚡ Auto-Generate (1-6)</span> to create choices.
                  </p>
                ) : (
                  <>
                    {/* Mobile Card Layout (< sm): Spacious, touch-friendly, zero clutter */}
                    <div className="sm:hidden space-y-2.5 max-h-72 overflow-y-auto pr-0.5">
                      {options.map((option, index) => (
                        <div
                          key={index}
                          className="bg-gray-50/90 border border-gray-200 rounded-lg p-3 space-y-2.5 shadow-2xs"
                        >
                          {/* Top Row: Option Title + Default Checkbox + Delete */}
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <input
                                type="text"
                                value={option.optionName}
                                onChange={(e) => {
                                  const newOptions = [...options];
                                  newOptions[index].optionName = e.target.value;
                                  setOptions(newOptions);
                                }}
                                placeholder="Option title (e.g. 1 unit)"
                                className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 text-sm bg-white font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                required
                              />
                            </div>
                            <label
                              className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border cursor-pointer select-none transition-colors shrink-0 ${
                                option.isDefault
                                  ? "bg-blue-50 border-blue-300 text-blue-700 font-semibold"
                                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100"
                              }`}
                              title="Set as default option"
                            >
                              <input
                                type="checkbox"
                                checked={option.isDefault}
                                onChange={(e) => {
                                  const newOptions = options.map((opt, i) => ({
                                    ...opt,
                                    isDefault: i === index ? e.target.checked : false,
                                  }));
                                  setOptions(newOptions);
                                }}
                                className="h-3.5 w-3.5 text-blue-600 rounded cursor-pointer"
                              />
                              Default
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                const removedOption = options[index];
                                if (removedOption.id) {
                                  setDeletedOptionIds([
                                    ...deletedOptionIds,
                                    removedOption.id,
                                  ]);
                                }
                                setOptions(options.filter((_, i) => i !== index));
                              }}
                              className="text-red-500 hover:text-red-700 p-1.5 rounded-md hover:bg-red-50 transition-colors shrink-0"
                              title="Remove option"
                            >
                              <X size={17} />
                            </button>
                          </div>

                          {/* Bottom Row: Base Cost and Client Price Side-by-Side */}
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <label className="block text-gray-600 font-medium mb-1">
                                Base Cost ($) <span className="text-[10px] text-gray-400 font-normal">(Builder)</span>
                              </label>
                              <input
                                type="number"
                                value={option.basePrice ?? 0}
                                onChange={(e) =>
                                  handleOptionBasePriceChange(
                                    index,
                                    parseFloat(e.target.value) || 0,
                                  )
                                }
                                placeholder="0.00"
                                className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 text-sm bg-white font-mono text-gray-800 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                step="0.01"
                                min="0"
                              />
                            </div>
                            <div>
                              <label className="block text-emerald-700 font-medium mb-1">
                                Client Price ($) <span className="text-[10px] text-emerald-600 font-normal">({formData.markup || 0}%)</span>
                              </label>
                              <input
                                type="number"
                                value={option.clientPrice ?? 0}
                                onChange={(e) =>
                                  handleOptionClientPriceChange(
                                    index,
                                    parseFloat(e.target.value) || 0,
                                  )
                                }
                                placeholder="0.00"
                                className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 text-sm bg-white font-mono text-emerald-700 font-semibold focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                step="0.01"
                                min="0"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop/Tablet Table Layout (>= sm): Clean columns with guaranteed min-width */}
                    <div className="hidden sm:block border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <div className="overflow-x-auto">
                        <div className="min-w-[540px]">
                          {/* Header */}
                          <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-2.5 border-b border-gray-200">
                            <div className="col-span-4">Option Title / Name *</div>
                            <div className="col-span-3">Base Cost ($) (Builder)</div>
                            <div className="col-span-3">Client Price ($)</div>
                            <div className="col-span-1 text-center">Default</div>
                            <div className="col-span-1 text-right pr-1">Action</div>
                          </div>

                          <div className="space-y-1 p-1.5 max-h-64 overflow-y-auto">
                            {options.map((option, index) => (
                              <div
                                key={index}
                                className="grid grid-cols-12 gap-2 items-center bg-gray-50 hover:bg-blue-50/40 p-2 rounded-md border border-gray-100 transition-colors"
                              >
                                <div className="col-span-4">
                                  <input
                                    type="text"
                                    value={option.optionName}
                                    onChange={(e) => {
                                      const newOptions = [...options];
                                      newOptions[index].optionName = e.target.value;
                                      setOptions(newOptions);
                                    }}
                                    placeholder="e.g. 1 unit, Premium"
                                    className="w-full border border-gray-300 rounded px-2.5 py-1 text-sm bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    required
                                  />
                                </div>
                                <div className="col-span-3">
                                  <input
                                    type="number"
                                    value={option.basePrice ?? 0}
                                    onChange={(e) =>
                                      handleOptionBasePriceChange(
                                        index,
                                        parseFloat(e.target.value) || 0,
                                      )
                                    }
                                    placeholder="0.00"
                                    className="w-full border border-gray-300 rounded px-2.5 py-1 text-sm bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none font-mono text-gray-800"
                                    step="0.01"
                                    min="0"
                                    title="Builder Cost (Base Price)"
                                  />
                                </div>
                                <div className="col-span-3">
                                  <input
                                    type="number"
                                    value={option.clientPrice ?? 0}
                                    onChange={(e) =>
                                      handleOptionClientPriceChange(
                                        index,
                                        parseFloat(e.target.value) || 0,
                                      )
                                    }
                                    placeholder="0.00"
                                    className="w-full border border-gray-300 rounded px-2.5 py-1 text-sm bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none font-mono text-emerald-700 font-medium"
                                    step="0.01"
                                    min="0"
                                    title="Client Price (Shown to user)"
                                  />
                                </div>
                                <div className="col-span-1 flex justify-center">
                                  <input
                                    type="checkbox"
                                    checked={option.isDefault}
                                    onChange={(e) => {
                                      const newOptions = options.map((opt, i) => ({
                                        ...opt,
                                        isDefault: i === index ? e.target.checked : false,
                                      }));
                                      setOptions(newOptions);
                                    }}
                                    className="h-4 w-4 text-blue-600 rounded cursor-pointer"
                                    title="Set as default option"
                                  />
                                </div>
                                <div className="col-span-1 flex justify-end pr-1">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const removedOption = options[index];
                                      if (removedOption.id) {
                                        setDeletedOptionIds([
                                          ...deletedOptionIds,
                                          removedOption.id,
                                        ]);
                                      }
                                      setOptions(options.filter((_, i) => i !== index));
                                    }}
                                    className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                                    title="Remove option"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  💡 <strong>Smart Auto-Calculation:</strong> Changing <em>Base Cost</em> automatically computes <em>Client Price</em> using the cost code's markup ({formData.markup || 0}%). Alternatively, modifying <em>Client Price</em> directly will back-calculate the Base Cost.
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
                  <SearchableSelect
                    options={[
                      { value: "", label: "None (Top-level question)" },
                      ...(allCostCodes?.map((cc) => ({
                        value: cc.id,
                        label: cc.code,
                        subtitle: cc.name,
                      })) || []),
                    ]}
                    value={formData.parentCostCodeId || ""}
                    onChange={(value) =>
                      setFormData({ ...formData, parentCostCodeId: value })
                    }
                    placeholder="None (Top-level question)"
                    disabled={!formData.serviceId}
                  />
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
                  <SearchableSelect
                    options={[
                      { value: "NONE", label: "None" },
                      { value: "QUANTITY", label: "Quantity Input" },
                      { value: "DROPDOWN", label: "Dropdown" },
                      { value: "CUSTOM_PRICE", label: "Custom Price" },
                    ]}
                    value={formData.nestedInputType || "NONE"}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        nestedInputType: value as any,
                      })
                    }
                    placeholder="Select Nested Input Type"
                    disabled={!formData.parentCostCodeId}
                  />
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
                  Use for questions that only control follow-up questions (e.g.
                  &quot;Relocating Plumbing?&quot;). They appear in the
                  estimator but are not included in the Excel export.
                </p>
              </div>
            </div>
          </div>

          {/* Images */}
          <CostCodeImageManager
            existingImages={
              mode === "edit"
                ? (data?.images || []).filter((img: any) => !deletedImageIds.includes(img.id))
                : []
            }
            onDeleteExisting={(imageId) => setDeletedImageIds((prev) => [...prev, imageId])}
            pendingImages={pendingImages}
            onAddPending={(files) =>
              setPendingImages((prev) => [
                ...prev,
                ...files.map((f) => ({ file: f, preview: URL.createObjectURL(f) })),
              ])
            }
            onRemovePending={(index) =>
              setPendingImages((prev) => prev.filter((_, i) => i !== index))
            }
          />

          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#2d4a8f] hover:bg-[#243a73]" disabled={isSubmitting}>
              {isSubmitting
                ? (mode === "create" ? "Creating..." : "Updating...")
                : (mode === "create" ? "Create" : "Update")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CostCodeModal;
