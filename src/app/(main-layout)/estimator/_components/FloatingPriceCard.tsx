"use client";

import { useState } from "react";
import { useEstimatorStore } from "@/store/estimatorStore";
import { DollarSign, X, ChevronRight, ChevronLeft } from "lucide-react";

export const FloatingPriceCard = () => {
  const { totalPrice, basePrice, step1Selections, step2Selections } =
    useEstimatorStore();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  const additionalCosts = [
    ...step1Selections
      .filter((s) => s.isEnabled && s.unitPrice && Number(s.unitPrice) > 0)
      .map((s) => ({
        id: s.costCodeId,
        name: s.costCodeName || `Step 1 Item`,
        cost: Number(s.unitPrice) * (s.quantity || 1),
      })),
    ...step2Selections
      .filter((s) => s.isEnabled && s.unitPrice && Number(s.unitPrice) > 0)
      .map((s) => ({
        id: s.costCodeId,
        name: s.costCodeName || `Step 2 Item`,
        cost: Number(s.unitPrice) * (s.quantity || 1),
      })),
  ];

  const additionalTotal = additionalCosts.reduce(
    (sum, c) => sum + Number(c.cost),
    0,
  );

  return (
    <>
      {/* Desktop - Fixed Right Side */}
      <div className="hidden lg:block fixed top-48 right-0 z-40">
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
          className="absolute -left-8 top-4 bg-[#283878] text-white p-1.5 rounded-l-lg shadow-lg hover:bg-[#1f2d5c] transition-colors"
          aria-label={isDesktopCollapsed ? "Show price summary" : "Hide price summary"}
          title={isDesktopCollapsed ? "Show price summary" : "Hide price summary"}
        >
          {isDesktopCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* Card Panel */}
        <div
          className={`bg-[#283878] text-white rounded-l-2xl shadow-2xl transition-all duration-300 ease-in-out overflow-hidden ${
            isDesktopCollapsed ? "w-0 opacity-0 pointer-events-none" : "w-80 opacity-100"
          }`}
        >
          <div className="p-6 w-80">
            <h3 className="text-xl font-bold mb-4 text-center">
              Total Estimated Cost
            </h3>
            <div className="text-4xl font-bold mb-2 text-center">
              ${Number(totalPrice).toLocaleString()}
            </div>
            <p className="text-sm text-gray-300 mb-6 text-center">
              Includes materials & estimated labor
            </p>

            <div className="border-t border-white/20 pt-4">
              <h4 className="font-semibold mb-3">Estimate Summary</h4>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Base Price:</span>
                  <span className="font-semibold">
                    ${Number(basePrice).toLocaleString()}
                  </span>
                </div>

                {additionalCosts.length > 0 && (
                  <>
                    <div className="text-gray-300 mt-3 mb-2">Additional Items:</div>
                    <div className="max-h-40 overflow-y-auto space-y-2 pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/50">
                      {additionalCosts.map((cost, index) => (
                        <div
                          key={`${cost.id}-${index}`}
                          className="flex justify-between text-xs"
                        >
                          <span className="text-gray-300">{cost.name}:</span>
                          <span className="font-semibold">
                            +${cost.cost.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className="border-t border-white/20 pt-2 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>Additions Total:</span>
                    <span>
                      $
                      {additionalCosts
                        .reduce((sum, c) => sum + c.cost, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-4">
                * Final price may vary based on site conditions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile - Slide from Right */}
      <div className="lg:hidden">
        {/* Toggle Button - vertically centered */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`fixed bottom-1/2 translate-y-1/2 z-50 bg-[#283878] text-white p-4 rounded-l-xl shadow-lg transition-all duration-300 ${
            isMobileOpen ? "right-80" : "right-0"
          }`}
          aria-label="Toggle price summary"
        >
          {isMobileOpen ? <X size={24} /> : <DollarSign size={24} />}
        </button>

        {/* Overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Sliding Panel */}
        <div
          className={`fixed top-0 right-0 w-80 h-full bg-[#283878] text-white shadow-2xl z-50 transition-transform duration-300 ease-in-out overflow-y-auto ${
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Price Summary</h3>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="text-center mb-6">
              <p className="text-sm text-gray-300 mb-2">Total Estimated Cost</p>
              <div className="text-4xl font-bold">
                ${totalPrice.toLocaleString()}
              </div>
              <p className="text-xs text-gray-300 mt-2">
                Includes materials & estimated labor
              </p>
            </div>

            <div className="border-t border-white/20 pt-4">
              <h4 className="font-semibold mb-3">Estimate Summary</h4>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Base Price:</span>
                  <span className="font-semibold">
                    ${Number(basePrice).toLocaleString()}
                  </span>
                </div>

                {additionalCosts.length > 0 && (
                  <>
                    <div className="text-gray-300 mt-3 mb-2">
                      Additional Items:
                    </div>
                    <div className="space-y-2">
                      {additionalCosts.map((cost, index) => (
                        <div
                          key={`${cost.id}-${index}`}
                          className="flex justify-between text-xs"
                        >
                          <span className="text-gray-300">{cost.name}:</span>
                          <span className="font-semibold">
                            +${cost.cost.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className="border-t border-white/20 pt-2 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>Additions Total:</span>
                    <span>${additionalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-4">
                * Final price may vary based on site conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
