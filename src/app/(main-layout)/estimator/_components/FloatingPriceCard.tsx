'use client'

import { useState } from 'react'
import { useEstimatorStore } from '@/store/estimatorStore'
import { DollarSign, X } from 'lucide-react'

export const FloatingPriceCard = () => {
  const { totalPrice, basePrice, additionalCosts } = useEstimatorStore()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Desktop - Fixed Right Side (Always Visible) */}
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

      {/* Mobile - Slide from Right */}
      <div className="lg:hidden">
        {/* Toggle Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`fixed bottom-24 z-50 bg-[#283878] text-white p-4 rounded-l-xl shadow-lg transition-all duration-300 ${
            isMobileOpen ? 'right-80' : 'right-0'
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
            isMobileOpen ? 'translate-x-0' : 'translate-x-full'
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
                  <span className="font-semibold">${basePrice.toLocaleString()}</span>
                </div>

                {additionalCosts.length > 0 && (
                  <>
                    <div className="text-gray-300 mt-3 mb-2">Additional Items:</div>
                    <div className="space-y-2">
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
                      ${additionalCosts.reduce((sum, c) => sum + c.cost, 0).toLocaleString()}
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
    </>
  )
}
