'use client'

import { useState } from 'react'
import { useEstimatorStore } from '@/store/estimatorStore'
import { ChevronDown, ChevronUp } from 'lucide-react'

export const FloatingPriceCard = () => {
  const { totalPrice, basePrice, additionalCosts } = useEstimatorStore()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      {/* Desktop - Fixed Right Side */}
      <div className="hidden lg:block fixed top-24 right-6 w-80 bg-[#283878] text-white rounded-2xl shadow-2xl p-6 z-40">
        <h3 className="text-xl font-bold mb-4 text-center">
          Total Estimated Cost
        </h3>
        <div className="text-4xl font-bold mb-2 text-center">
          ${totalPrice.toLocaleString()}
        </div>
        <p className="text-sm text-gray-300 mb-6 text-center">
          Includes materials & estimated labor
        </p>

        <div className="border-t border-white/20 pt-4">
          <h4 className="font-semibold mb-3">Estimate Summary</h4>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Base Price:</span>
              <span className="font-semibold">${basePrice.toLocaleString()}</span>
            </div>

            {additionalCosts.length > 0 && (
              <>
                <div className="text-gray-300 mt-3 mb-2">Additional Items:</div>
                <div className="max-h-40 overflow-y-auto space-y-2 pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/50">
                  {additionalCosts.map((cost, index) => (
                    <div key={`${cost.id}-${index}`} className="flex justify-between text-xs">
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

      {/* Mobile - Bottom Sticky */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#283878] text-white shadow-2xl z-40">
        {/* Collapsed View */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs text-gray-300">Total Estimate</p>
              <p className="text-2xl font-bold">${totalPrice.toLocaleString()}</p>
            </div>
          </div>
          {isExpanded ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
        </button>

        {/* Expanded View */}
        {isExpanded && (
          <div className="border-t border-white/20 px-4 pb-4 max-h-[60vh] overflow-y-auto">
            <div className="pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Base Price:</span>
                <span className="font-semibold">${basePrice.toLocaleString()}</span>
              </div>

              {additionalCosts.length > 0 && (
                <>
                  <div className="text-gray-300 text-sm font-semibold">Additional Items:</div>
                  <div className="space-y-2 pl-2">
                    {additionalCosts.map((cost, index) => (
                      <div key={`${cost.id}-${index}`} className="flex justify-between text-xs">
                        <span className="text-gray-300">{cost.name}:</span>
                        <span className="font-semibold">
                          +${cost.cost.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="border-t border-white/20 pt-3">
                <div className="flex justify-between font-bold">
                  <span>Additions Total:</span>
                  <span>
                    ${additionalCosts.reduce((sum, c) => sum + c.cost, 0).toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-400 pt-2">
                * Final price may vary based on site conditions
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Spacer - Prevents content from being hidden behind sticky footer */}
      <div className="lg:hidden h-20" />
    </>
  )
}
