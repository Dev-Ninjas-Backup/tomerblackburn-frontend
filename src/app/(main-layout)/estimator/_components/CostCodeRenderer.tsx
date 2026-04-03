import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Lightbulb, X as XIcon } from "lucide-react";
import { motion } from "framer-motion";

interface CostCode {
  id: string;
  code: string;
  name: string;
  elies?: string;
  tips?: string[];
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
  category?: { id: string; name: string };
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

const TipsPopover: React.FC<{ tips: string[]; label: string }> = ({
  tips,
  label,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Tips for ${label}`}
        className={`relative flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200 ${
          open
            ? "bg-[#283878] text-white shadow-lg shadow-[#283878]/40 scale-110"
            : "bg-[#283878]/10 text-[#283878] hover:bg-[#283878]/20 hover:scale-110"
        }`}
      >
        <Lightbulb className="w-3.5 h-3.5" />
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping bg-[#283878]/20 pointer-events-none" />
        )}
      </button>
      <div
        className={`absolute left-0 top-8 z-50 w-64 transition-all duration-250 origin-top-left ${open ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
      >
        <div className="bg-white rounded-xl overflow-hidden shadow-2xl shadow-[#283878]/15 border border-[#283878]/12">
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#283878]">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <Lightbulb className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-semibold text-white tracking-wide">
                Pro Tips
              </span>
              <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded-full font-medium">
                {tips.length}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
              aria-label="Close tips"
            >
              <XIcon className="w-3 h-3 text-white" />
            </button>
          </div>
          <ul className="px-3.5 py-3 space-y-2.5">
            {tips.map((tip, i) => (
              <li key={i} className="flex gap-2.5 items-start">
                <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-[#283878] text-white text-[9px] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-xs text-gray-600 leading-relaxed">
                  {tip}
                </span>
              </li>
            ))}
          </ul>
          <div className="h-0.5 bg-linear-to-r from-[#283878] via-[#4064b8] to-transparent" />
        </div>
      </div>
    </div>
  );
};

const AnimatedChildren: React.FC<{
  show: boolean;
  children: React.ReactNode;
}> = ({ show, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">(0);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new ResizeObserver(() => {
      setHeight(el.scrollHeight);
    });
    observer.observe(el);
    setHeight(el.scrollHeight);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{
        height: show ? height : 0,
        opacity: show ? 1 : 0,
      }}
      onAnimationComplete={() => {
        if (show) setHeight("auto");
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ overflow: "hidden" }}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
};

const UpgradeLabel = ({ isIncludedInBase }: { isIncludedInBase: boolean }) => (
  <p
    className={`text-xs mt-1 ${isIncludedInBase ? "text-green-600 font-medium" : "text-[#283878]"}`}
  >
    {isIncludedInBase ? "✦ Included in Base Price" : "✦ Additional Upgrade"}
  </p>
);

const Toggle = ({
  isEnabled,
  onToggle,
  label,
}: {
  isEnabled: boolean;
  onToggle: () => void;
  label: string;
}) => (
  <button
    type="button"
    onClick={onToggle}
    className={`shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#283878] focus:ring-offset-2 ${isEnabled ? "bg-[#283878]" : "bg-gray-300"}`}
    role="switch"
    aria-checked={isEnabled ? "true" : "false"}
    aria-label={`Toggle ${label}`}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${isEnabled ? "translate-x-5" : "translate-x-0.5"}`}
    />
  </button>
);

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
        !selections.find((s) => s.costCodeId === costCode.id) &&
        !autoAddedRef.current.has(costCode.id)
      ) {
        if (
          costCode.questionType === "WHITE" &&
          !costCode.isIncludedInBase &&
          !costCode.parentCostCodeId
        ) {
          autoAddedRef.current.add(costCode.id);
          onSelectionChange(costCode.id, {
            costCodeName: costCode.elies || costCode.name,
            unitPrice: costCode.clientPrice,
            isEnabled: true,
            quantity: 1,
          });
        }
        // PURPLE: auto-add with parent's quantity
        if (costCode.questionType === "PURPLE" && costCode.parentCostCodeId) {
          const parentSelection = selections.find(
            (s) => s.costCodeId === costCode.parentCostCodeId,
          );
          const inheritedQty = parentSelection?.quantity ?? 1;
          if (parentSelection) {
            autoAddedRef.current.add(costCode.id);
            onSelectionChange(costCode.id, {
              costCodeName: costCode.elies || costCode.name,
              unitPrice: costCode.clientPrice,
              isEnabled: true,
              quantity: inheritedQty,
            });
          }
        }
      }
      // PURPLE: sync quantity if parent changed
      if (costCode.questionType === "PURPLE" && costCode.parentCostCodeId) {
        const existing = selections.find((s) => s.costCodeId === costCode.id);
        const parentSelection = selections.find(
          (s) => s.costCodeId === costCode.parentCostCodeId,
        );
        if (
          existing &&
          parentSelection &&
          existing.quantity !== parentSelection.quantity
        ) {
          onSelectionChange(costCode.id, {
            quantity: parentSelection.quantity,
          });
        }
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
      return !!parentSelection.quantity || !!parentSelection.selectedOptionId;
    return parentSelection.selectedOptionId === costCode.showWhenParentValue;
  };

  const handleToggle = (costCode: CostCode, enabled: boolean) => {
    if (enabled) {
      onSelectionChange(costCode.id, {
        costCodeName: costCode.elies || costCode.name,
        unitPrice: costCode.clientPrice,
        isEnabled: true,
        quantity: costCode.requiresQuantity ? 1 : undefined,
      });
    } else {
      onSelectionRemove(costCode.id);
      getChildQuestions(costCode.id).forEach((child) =>
        onSelectionRemove(child.id),
      );
    }
  };

  const handleOptionChange = (costCode: CostCode, optionId: string) => {
    const option = costCode.options?.find((o) => o.id === optionId);
    if (option) {
      onSelectionChange(costCode.id, {
        costCodeName: costCode.elies || costCode.name,
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
        costCodeName: costCode.elies || costCode.name,
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
    if (lines.length <= 1)
      return <p className="text-xs text-gray-500 mt-1">{description}</p>;
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

  const renderChildren = (parentId: string, show: boolean) => {
    const children = getChildQuestions(parentId);
    if (!children.length) return null;
    return (
      <AnimatedChildren show={show}>
        <div className="mt-3 space-y-2">
          {children.map((child) =>
            shouldShowChild(child) ? renderCostCode(child, true) : null,
          )}
        </div>
      </AnimatedChildren>
    );
  };

  const renderCostCode = (costCode: CostCode, isNested = false) => {
    const selection = getSelection(costCode.id);
    const isEnabled = selection?.isEnabled || false;
    const bgColor = costCode.isIncludedInBase ? "bg-green-50" : "bg-blue-50";
    const titleColor = costCode.isIncludedInBase
      ? "text-green-700"
      : "text-gray-800";
    const sizeClass = isNested
      ? "p-3 rounded-lg border-l-4 border-[#283878] bg-white/80 ml-2"
      : "p-3 rounded-lg mb-2";

    if (costCode.questionType === "RED") return null;

    if (costCode.questionType === "WHITE") {
      return (
        <div key={costCode.id} className={`${bgColor} ${sizeClass}`}>
          <div className="flex items-start gap-1.5">
            <p className="text-sm font-semibold ${titleColor}">
              {costCode.name}
            </p>
            {costCode.tips && costCode.tips.length > 0 && (
              <TipsPopover tips={costCode.tips} label={costCode.name} />
            )}
          </div>
          {formatDescription(costCode.description)}
          <UpgradeLabel isIncludedInBase={costCode.isIncludedInBase} />
          {renderChildren(costCode.id, true)}
        </div>
      );
    }

    if (costCode.questionType === "BLUE") {
      return (
        <div key={costCode.id} className={`${bgColor} ${sizeClass}`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-1.5">
                <p className="text-sm font-semibold ${titleColor}">
                  {costCode.name}
                </p>
                {costCode.tips && costCode.tips.length > 0 && (
                  <TipsPopover tips={costCode.tips} label={costCode.name} />
                )}
              </div>
              {formatDescription(costCode.description)}
              <UpgradeLabel isIncludedInBase={costCode.isIncludedInBase} />
            </div>
            <Toggle
              isEnabled={isEnabled}
              onToggle={() => handleToggle(costCode, !isEnabled)}
              label={costCode.name}
            />
          </div>
          {renderChildren(costCode.id, isEnabled)}
        </div>
      );
    }

    if (costCode.questionType === "YELLOW") {
      return (
        <div key={costCode.id} className={`${bgColor} ${sizeClass}`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-1.5">
                <p className="text-sm font-semibold ${titleColor}">
                  {costCode.name}
                </p>
                {costCode.tips && costCode.tips.length > 0 && (
                  <TipsPopover tips={costCode.tips} label={costCode.name} />
                )}
              </div>
              {formatDescription(costCode.description)}
              <UpgradeLabel isIncludedInBase={costCode.isIncludedInBase} />
            </div>
            <Toggle
              isEnabled={isEnabled}
              onToggle={() => handleToggle(costCode, !isEnabled)}
              label={costCode.name}
            />
          </div>
          {renderChildren(costCode.id, isEnabled)}
        </div>
      );
    }

    if (costCode.questionType === "GREEN") {
      return (
        <div key={costCode.id} className={`${bgColor} ${sizeClass}`}>
          <div className="flex items-start gap-1.5 mb-1.5">
            <p className="text-sm font-semibold ${titleColor}">
              {costCode.name}
            </p>
            {costCode.tips && costCode.tips.length > 0 && (
              <TipsPopover tips={costCode.tips} label={costCode.name} />
            )}
          </div>
          {formatDescription(costCode.description)}
          <UpgradeLabel isIncludedInBase={costCode.isIncludedInBase} />
          <div className="flex items-center gap-2 mt-1.5">
            <Input
              type="number"
              min="1"
              value={selection?.userInputValue || ""}
              onChange={(e) =>
                handleQuantityInput(costCode, e.target.value, selection)
              }
              placeholder="Enter value"
              className="w-full sm:w-40 p-5 h-10 text-sm border-[#283878]/40 focus:border-[#283878] focus:ring-[#283878]"
            />
            <span className="text-xs text-gray-500">
              {costCode.unitType.replace("PER_", "per ").toLowerCase()}
            </span>
          </div>
          {renderChildren(costCode.id, !!selection?.userInputValue)}
        </div>
      );
    }

    if (costCode.questionType === "ORANGE" && costCode.options) {
      return (
        <div key={costCode.id} className={`${bgColor} ${sizeClass}`}>
          <div className="flex items-start gap-1.5 mb-1.5">
            <p className="text-sm font-semibold ${titleColor}">
              {costCode.name}
            </p>
            {costCode.tips && costCode.tips.length > 0 && (
              <TipsPopover tips={costCode.tips} label={costCode.name} />
            )}
          </div>
          {formatDescription(costCode.description)}
          <UpgradeLabel isIncludedInBase={costCode.isIncludedInBase} />
          <select
            value={selection?.selectedOptionId || ""}
            onChange={(e) => {
              if (e.target.value) handleOptionChange(costCode, e.target.value);
              else onSelectionRemove(costCode.id);
            }}
            className="w-full rounded-lg border border-[#283878]/40 focus:border-[#283878] focus:ring-1 focus:ring-[#283878] p-2.5 text-sm mt-1 min-h-11 outline-none"
            aria-label={`Select ${costCode.name}`}
          >
            <option value="">Select option</option>
            {costCode.options
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((option) => (
                <option key={option.id} value={option.id}>
                  {option.optionName.replace(/_/g, " ")}
                </option>
              ))}
          </select>
          {renderChildren(costCode.id, !!selection?.selectedOptionId)}
        </div>
      );
    }

    if (costCode.questionType === "PURPLE") {
      return (
        <div key={costCode.id} className={`${bgColor} ${sizeClass}`}>
          <div className="flex items-start gap-1.5">
            <p className="text-sm font-semibold ${titleColor}">
              {costCode.name}
            </p>
            {costCode.tips && costCode.tips.length > 0 && (
              <TipsPopover tips={costCode.tips} label={costCode.name} />
            )}
          </div>
          {formatDescription(costCode.description)}
          <UpgradeLabel isIncludedInBase={costCode.isIncludedInBase} />
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
