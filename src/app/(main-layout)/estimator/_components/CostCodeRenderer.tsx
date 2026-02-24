import React, { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

interface CostCode {
  id: string;
  code: string;
  name: string;
  description?: string;
  clientPrice: number;
  unitType: string;
  questionType: string;
  step: number;
  isIncludedInBase: boolean;
  requiresQuantity: boolean;
  isOptional: boolean;
  isActive: boolean;
  parentCostCodeId?: string;
  showWhenParentValue?: string;
  nestedInputType?: "QUANTITY" | "DROPDOWN" | "CUSTOM_PRICE" | "NONE";
  category?: {
    id: string;
    name: string;
  };
  options?: Array<{
    id: string;
    optionName: string;
    optionValue?: string;
    priceModifier: string;
    isDefault: boolean;
    displayOrder: number;
  }>;
}

interface CostCodeSelection {
  costCodeId: string;
  costCodeName?: string;
  selectedOptionId?: string;
  quantity?: number;
  unitPrice: number;
  isEnabled?: boolean;
  userInputValue?: string;
  notes?: string;
}

interface CostCodeRendererProps {
  costCodes: CostCode[];
  selections: CostCodeSelection[];
  onSelectionChange: (
    costCodeId: string,
    selection: Partial<CostCodeSelection>,
  ) => void;
  onSelectionRemove: (costCodeId: string) => void;
}

const QUESTION_TYPE_COLORS = {
  WHITE: "bg-gray-50",
  BLUE: "bg-blue-50",
  GREEN: "bg-green-50",
  ORANGE: "bg-orange-50",
  YELLOW: "bg-yellow-50",
  RED: "bg-red-50",
  PURPLE: "bg-purple-50",
};

export const CostCodeRenderer: React.FC<CostCodeRendererProps> = ({
  costCodes,
  selections,
  onSelectionChange,
  onSelectionRemove,
}) => {
  const autoAddedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    costCodes.forEach((costCode) => {
      if (
        costCode.questionType === "WHITE" &&
        !costCode.isIncludedInBase &&
        !costCode.parentCostCodeId &&
        !selections.find((s) => s.costCodeId === costCode.id) &&
        !autoAddedRef.current.has(costCode.id)
      ) {
        autoAddedRef.current.add(costCode.id);
        onSelectionChange(costCode.id, {
          costCodeName: costCode.name,
          unitPrice: costCode.clientPrice,
          isEnabled: true,
          quantity: 1,
        });
      }
    });
  }, [costCodes, selections, onSelectionChange]);

  const groupedCostCodes = costCodes
    .filter((cc) => !cc.parentCostCodeId)
    .reduce(
      (acc, costCode) => {
        const categoryName = costCode.category?.name || "Other";
        if (!acc[categoryName]) acc[categoryName] = [];
        acc[categoryName].push(costCode);
        return acc;
      },
      {} as Record<string, CostCode[]>,
    );

  const getSelection = (costCodeId: string) =>
    selections.find((s) => s.costCodeId === costCodeId);

  const getChildQuestions = (parentId: string) =>
    costCodes.filter((cc) => cc.parentCostCodeId === parentId);

  const shouldShowChild = (costCode: CostCode): boolean => {
    if (!costCode.parentCostCodeId) return true;
    const parentSelection = getSelection(costCode.parentCostCodeId);
    if (!parentSelection) return false;
    if (costCode.showWhenParentValue === "true")
      return parentSelection.isEnabled === true;
    if (costCode.showWhenParentValue === "ANY")
      return !!parentSelection.selectedOptionId;
    return parentSelection.selectedOptionId === costCode.showWhenParentValue;
  };

  const handleToggle = (costCode: CostCode, enabled: boolean) => {
    if (enabled) {
      onSelectionChange(costCode.id, {
        costCodeName: costCode.name,
        unitPrice: costCode.clientPrice,
        isEnabled: true,
        quantity: costCode.requiresQuantity ? 1 : undefined,
      });
    } else {
      onSelectionRemove(costCode.id);
      // Remove children when parent is toggled off
      getChildQuestions(costCode.id).forEach((child) =>
        onSelectionRemove(child.id),
      );
    }
  };

  const handleOptionChange = (costCode: CostCode, optionId: string) => {
    const option = costCode.options?.find((o) => o.id === optionId);
    if (option) {
      onSelectionChange(costCode.id, {
        costCodeName: costCode.name,
        selectedOptionId: optionId,
        unitPrice: Number(option.priceModifier),
        isEnabled: true,
      });
    }
  };

  const handleQuantityInput = (
    costCode: CostCode,
    value: string,
    selection: CostCodeSelection | undefined,
  ) => {
    const numValue = Number(value);
    if (!value || numValue <= 0) {
      if (selection) onSelectionRemove(costCode.id);
      return;
    }
    if (!selection) {
      onSelectionChange(costCode.id, {
        costCodeName: costCode.name,
        unitPrice: costCode.clientPrice,
        isEnabled: true,
        userInputValue: value,
        quantity: numValue,
      });
    } else {
      onSelectionChange(costCode.id, {
        userInputValue: value,
        quantity: numValue,
      });
    }
  };

  const formatDescription = (description?: string) => {
    if (!description) return null;
    const lines = description
      .split(/\s*-\s+/)
      .filter((l) => l.trim())
      .map((l) => l.trim());
    if (lines.length <= 1) {
      return <p className="text-xs text-gray-500 mt-1">{description}</p>;
    }
    return (
      <div className="text-xs text-gray-500 space-y-0.5 mt-1">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-1">
            <span className="text-gray-400">•</span>
            <span>{line}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderChildren = (parentId: string) => {
    const children = getChildQuestions(parentId);
    if (!children.length) return null;
    return (
      <div className="mt-3 ml-4 space-y-2 border-l-2 border-gray-200 pl-3">
        {children.map((child) =>
          shouldShowChild(child) ? renderCostCode(child, true) : null,
        )}
      </div>
    );
  };

  const renderCostCode = (costCode: CostCode, isNested = false) => {
    const selection = getSelection(costCode.id);
    const isEnabled = selection?.isEnabled || false;
    const bgColor =
      QUESTION_TYPE_COLORS[
        costCode.questionType as keyof typeof QUESTION_TYPE_COLORS
      ] || "bg-gray-50";
    const sizeClass = isNested ? "p-2.5 rounded-md" : "p-3 rounded-lg mb-2";

    if (costCode.questionType === "RED") return null;

    // WHITE
    if (costCode.questionType === "WHITE") {
      return (
        <div key={costCode.id} className={`${bgColor} ${sizeClass}`}>
          <p
            className={`${isNested ? "text-sm" : "text-sm"} font-medium text-gray-800`}
          >
            {costCode.name}
          </p>
          {formatDescription(costCode.description)}
          {costCode.isIncludedInBase && (
            <p className="text-xs text-green-600 mt-1">
              Included in base price
            </p>
          )}
          {renderChildren(costCode.id)}
        </div>
      );
    }

    // BLUE - Toggle
    if (costCode.questionType === "BLUE") {
      return (
        <div key={costCode.id} className={`${bgColor} ${sizeClass}`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800">
                {costCode.name}
              </p>
              {formatDescription(costCode.description)}
            </div>
            <button
              type="button"
              onClick={() => handleToggle(costCode, !isEnabled)}
              className={`shrink-0 relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                isEnabled ? "bg-[#283878]" : "bg-gray-300"
              }`}
              role="switch"
              aria-checked={isEnabled ? "true" : "false"}
              aria-label={`Toggle ${costCode.name}`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-sm ${isEnabled ? "translate-x-4.5" : "translate-x-0.5"}`}
              />
            </button>
          </div>
          {isEnabled && renderChildren(costCode.id)}
        </div>
      );
    }

    // GREEN / YELLOW - Number input
    if (costCode.questionType === "GREEN" || costCode.questionType === "YELLOW") {
      return (
        <div key={costCode.id} className={`${bgColor} ${sizeClass}`}>
          <p className="text-sm font-medium text-gray-800 mb-1.5">
            {costCode.name}
          </p>
          {formatDescription(costCode.description)}
          <div className="flex items-center gap-2 mt-1.5">
            <Input
              type="number"
              min="1"
              value={selection?.userInputValue || ""}
              onChange={(e) =>
                handleQuantityInput(costCode, e.target.value, selection)
              }
              placeholder="Enter amount"
              className=" w-40 p-5 h-8 text-sm"
            />
            <span className="text-xs text-gray-500">
              {costCode.unitType.replace("PER_", "per ").toLowerCase()}
            </span>
          </div>
          {renderChildren(costCode.id)}
        </div>
      );
    }

    // ORANGE - Dropdown
    if (costCode.questionType === "ORANGE" && costCode.options) {
      return (
        <div key={costCode.id} className={`${bgColor} ${sizeClass}`}>
          <p className="text-sm font-medium text-gray-800 mb-1.5">
            {costCode.name}
          </p>
          {formatDescription(costCode.description)}
          <select
            value={selection?.selectedOptionId || ""}
            onChange={(e) => {
              if (e.target.value) handleOptionChange(costCode, e.target.value);
              else onSelectionRemove(costCode.id);
            }}
            className="w-full rounded border-gray-300 p-1.5 border text-sm mt-1"
            aria-label={`Select ${costCode.name}`}
          >
            <option value="">Select option</option>
            {costCode.options
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((option) => (
                <option key={option.id} value={option.id}>
                  {option.optionName.replace(/_/g, " ")}
                  {Number(option.priceModifier) > 0 &&
                    ` (+$${Number(option.priceModifier).toLocaleString()})`}
                </option>
              ))}
          </select>
          {selection?.selectedOptionId && renderChildren(costCode.id)}
        </div>
      );
    }

    // PURPLE - Calculated
    if (costCode.questionType === "PURPLE") {
      return (
        <div key={costCode.id} className={`${bgColor} ${sizeClass}`}>
          <p className="text-sm font-medium text-gray-800">{costCode.name}</p>
          {formatDescription(costCode.description)}
          <p className="text-xs text-purple-600 mt-1">
            Calculated automatically
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupedCostCodes).map(
        ([categoryName, categoryCostCodes]) => (
          <div key={categoryName} className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {categoryName}
            </h2>
            <div className="space-y-2">
              {categoryCostCodes.map((cc) => renderCostCode(cc))}
            </div>
          </div>
        ),
      )}
    </div>
  );
};
