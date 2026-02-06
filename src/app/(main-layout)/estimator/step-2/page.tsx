'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { FloatingPriceCard } from '../_components/FloatingPriceCard'
import { useEstimatorStore } from '@/store/estimatorStore'
import { useCostCodes } from '@/hooks/useCostManagement'
import { CostCodeRenderer } from '../_components/CostCodeRenderer'

export default function Step2Page() {
  const router = useRouter()
  const { 
    serviceId, 
    step2Selections,
    addCostCodeSelection,
    updateCostCodeSelection,
    removeCostCodeSelection
  } = useEstimatorStore()
  
  // Fetch cost codes for step 2
  const { data: costCodes, isLoading } = useCostCodes({
    serviceId: serviceId || undefined,
    includeOptions: true,
    includeCategory: true
  })

  // Filter cost codes for step 2
  const step2CostCodes = costCodes?.filter(code => code.step === 2) || []

  useEffect(() => {
    if (!serviceId) {
      router.push('/estimator/choose-service')
    }
  }, [serviceId, router])

  const handleNext = () => {
    router.push('/estimator/preview')
  }

  const handleBack = () => {
    router.push('/estimator/step-1')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#283878] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cost codes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <FloatingPriceCard />
      
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-600">Completed ✓</span>
            <span className="text-sm font-medium text-[#283878]">Step 2: Finishes</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#283878] h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Render cost codes by category */}
          {step2CostCodes.length > 0 ? (
            <CostCodeRenderer
              costCodes={step2CostCodes as any}
              selections={step2Selections}
              onSelectionChange={(costCodeId, selection) => {
                const existing = step2Selections.find(s => s.costCodeId === costCodeId)
                if (existing) {
                  updateCostCodeSelection(2, costCodeId, selection)
                } else {
                  addCostCodeSelection(2, { costCodeId, unitPrice: selection.unitPrice || 0, ...selection })
                }
              }}
              onSelectionRemove={(costCodeId) => {
                removeCostCodeSelection(2, costCodeId)
              }}
            />
          ) : (
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <p className="text-gray-500">No cost codes available for this step.</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 py-6 text-lg rounded-full"
            >
              ← Back
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1 bg-[#283878] hover:bg-[#1f2d5c] text-white py-6 text-lg rounded-full"
            >
              Continue to Preview →
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
