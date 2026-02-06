import React from "react";
import { Input } from "@/components/ui/input";

interface CostCode {
  id: string;
  code: string;
  name: string;
  description?: string;
  basePrice: number;
  unitType: string;
  questionType: string;
  step: number;
  isIncludedInBase: boolean;
  requiresQuantity: boolean;
  isOptional: boolean;
  isActive: boolean;
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

const QUESTION_TYPE_TEXT_COLORS = {
  WHITE: "text-green-600",
  BLUE: "text-blue-700",
  GREEN: "text-green-700",
  ORANGE: "text-orange-700",
  YELLOW: "text-yellow-700",
  RED: "text-red-700",
  PURPLE: "text-purple-700",
};

export const CostCodeRenderer: React.FC<CostCodeRendererProps> = ({
  costCodes,
  selections,
  onSelectionChange,
  onSelectionRemove,
}) => {
  // Group cost codes by category
  const groupedCostCodes = costCodes.reduce(
    (acc, costCode) => {
      const categoryName = costCode.category?.name || "Other";
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(costCode);
      return acc;
    },
    {} as Record<string, CostCode[]>,
  );

  const getSelection = (costCodeId: string) => {
    return selections.find((s) => s.costCodeId === costCodeId);
  };

  const handleToggle = (costCode: CostCode, enabled: boolean) => {
    if (enabled) {
      onSelectionChange(costCode.id, {
        unitPrice: costCode.basePrice,
        isEnabled: true,
        quantity: costCode.requiresQuantity ? 1 : undefined,
      });
    } else {
      onSelectionRemove(costCode.id);
    }
  };

  const handleQuantityChange = (costCode: CostCode, quantity: number) => {
    const selection = getSelection(costCode.id);
    if (selection) {
      onSelectionChange(costCode.id, { quantity });
    }
  };

  const handleOptionChange = (costCode: CostCode, optionId: string) => {
    const option = costCode.options?.find((o) => o.id === optionId);
    if (option) {
      onSelectionChange(costCode.id, {
        selectedOptionId: optionId,
        unitPrice: Number(option.priceModifier),
        isEnabled: true,
      });
    }
  };

  const handleUserInput = (costCode: CostCode, value: string) => {
    const selection = getSelection(costCode.id);
    if (selection) {
      onSelectionChange(costCode.id, { userInputValue: value });
    }
  };

  const renderCostCode = (costCode: CostCode) => {
    const selection = getSelection(costCode.id);
    const isEnabled = selection?.isEnabled || false;
    const bgColor =
      QUESTION_TYPE_COLORS[
        costCode.questionType as keyof typeof QUESTION_TYPE_COLORS
      ] || "bg-gray-50";
    const textColor =
      QUESTION_TYPE_TEXT_COLORS[
        costCode.questionType as keyof typeof QUESTION_TYPE_TEXT_COLORS
      ] || "text-gray-600";

    // WHITE - Included in base (non-interactive)
    if (costCode.questionType === "WHITE" || costCode.isIncludedInBase) {
      return (
        <div key={costCode.id} className={`${bgColor} rounded-lg p-4 mb-4`}>
          <h3 className="font-semibold text-gray-900 mb-1">{costCode.name}</h3>
          <p className="text-sm text-gray-600">{costCode.description}</p>
          <p className={`text-xs ${textColor} mt-2`}>Included in base price</p>
        </div>
      );
    }

    // BLUE - Yes/No Toggle
    if (costCode.questionType === "BLUE") {
      return (
        <div key={costCode.id} className={`${bgColor} rounded-lg p-4 mb-4`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {costCode.name}
              </h3>
              <p className="text-sm text-gray-600">{costCode.description}</p>
            </div>
            <button
              onClick={() => handleToggle(costCode, !isEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isEnabled ? "bg-[#283878]" : "bg-gray-300"
              }`}
              aria-label={`Toggle ${costCode.name}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          {/* {costCode.basePrice > 0 && (
            <p className={`text-xs ${textColor} mt-2`}>+${costCode.basePrice.toLocaleString()}</p>
          )} */}
        </div>
      );
    }

    // GREEN - Data Input (numbers only)
    if (costCode.questionType === "GREEN") {
      return (
        <div key={costCode.id} className={`${bgColor} rounded-lg p-4 mb-4`}>
          <h3 className="font-semibold text-gray-900 mb-2">{costCode.name}</h3>
          <p className="text-sm text-gray-600 mb-3">{costCode.description}</p>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              value={selection?.userInputValue || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (!selection) {
                  onSelectionChange(costCode.id, {
                    unitPrice: costCode.basePrice,
                    isEnabled: true,
                    userInputValue: value,
                  });
                } else {
                  handleUserInput(costCode, value);
                }
              }}
              placeholder="Enter amount"
              className="w-32"
            />
            <span className="text-sm text-gray-600">
              {costCode.unitType.replace("PER_", "per ").toLowerCase()}
            </span>
          </div>
          {/* {costCode.basePrice > 0 && (
            <p className={`text-xs ${textColor} mt-2`}>
              ${costCode.basePrice.toLocaleString()} {costCode.unitType.replace('PER_', 'per ').toLowerCase()}
            </p>
          )} */}
        </div>
      );
    }

    // ORANGE - Dropdown list
    if (costCode.questionType === "ORANGE" && costCode.options) {
      return (
        <div key={costCode.id} className={`${bgColor} rounded-lg p-4 mb-4`}>
          <h3 className="font-semibold text-gray-900 mb-2">{costCode.name}</h3>
          <p className="text-sm text-gray-600 mb-3">{costCode.description}</p>
          <select
            value={selection?.selectedOptionId || ""}
            onChange={(e) => {
              if (e.target.value) {
                handleOptionChange(costCode, e.target.value);
              } else {
                onSelectionRemove(costCode.id);
              }
            }}
            className="w-full rounded-lg border-gray-300 p-2 border"
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
        </div>
      );
    }

    // YELLOW - Conditional (appears after previous Yes)
    if (costCode.questionType === "YELLOW") {
      // This would need additional logic to check if previous condition is met
      // For now, render as BLUE type
      return renderCostCode({ ...costCode, questionType: "BLUE" });
    }

    // PURPLE - Uses data from previous questions (calculated)
    if (costCode.questionType === "PURPLE") {
      return (
        <div key={costCode.id} className={`${bgColor} rounded-lg p-4 mb-4`}>
          <h3 className="font-semibold text-gray-900 mb-1">{costCode.name}</h3>
          <p className="text-sm text-gray-600">{costCode.description}</p>
          <p className={`text-xs ${textColor} mt-2`}>
            Calculated automatically
          </p>
        </div>
      );
    }

    // RED - Hidden/Inactive (should not be rendered)
    if (costCode.questionType === "RED") {
      return null;
    }

    return null;
  };

  return (
    <div className="space-y-8">
      {Object.entries(groupedCostCodes).map(
        ([categoryName, categoryCostCodes]) => (
          <div
            key={categoryName}
            className="bg-white rounded-2xl p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {categoryName}
            </h2>
            <div className="space-y-4">
              {categoryCostCodes.map(renderCostCode)}
            </div>
          </div>
        ),
      )}
    </div>
  );
};
