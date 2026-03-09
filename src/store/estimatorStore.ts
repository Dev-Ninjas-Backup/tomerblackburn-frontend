'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CostCodeSelection {
  costCodeId: string
  costCodeName?: string
  selectedOptionId?: string
  quantity?: number
  unitPrice: number
  isEnabled?: boolean
  userInputValue?: string
  notes?: string
}

interface UserInfo {
  fullName: string
  email: string
  phone: string
  zipCode: string
  address: string
  notes: string
  desiredStartDate?: string
  buildingType?: string
  photoIds: string[]
  videoIds: string[]
}

interface EstimatorState {
  // Project hierarchy
  projectTypeId: string | null
  serviceCategoryId: string | null
  serviceId: string | null
  
  // Pricing
  basePrice: number
  totalPrice: number
  
  // Cost code selections
  step1Selections: CostCodeSelection[]
  step2Selections: CostCodeSelection[]
  
  // User information
  userInfo: UserInfo
  
  // Submission
  submissionId: string | null
  submissionNumber: string | null
  pdfUrl: string | null
}

interface EstimatorStore extends EstimatorState {
  // Project selection
  setProjectTypeId: (id: string) => void
  setServiceCategoryId: (id: string) => void
  setServiceId: (id: string, basePrice: number) => void
  
  // Cost code management
  addCostCodeSelection: (step: 1 | 2, selection: CostCodeSelection) => void
  updateCostCodeSelection: (step: 1 | 2, costCodeId: string, updates: Partial<CostCodeSelection>) => void
  removeCostCodeSelection: (step: 1 | 2, costCodeId: string) => void
  
  // User info
  setUserInfo: (data: Partial<UserInfo>) => void
  
  // Submission
  setSubmissionData: (submissionId: string, submissionNumber: string, pdfUrl: string | null) => void
  
  // Calculations
  calculateTotal: () => void
  
  // Reset
  resetEstimator: () => void
}

const initialState: EstimatorState = {
  projectTypeId: null,
  serviceCategoryId: null,
  serviceId: null,
  basePrice: 0,
  totalPrice: 0,
  step1Selections: [],
  step2Selections: [],
  userInfo: {
    fullName: '',
    email: '',
    phone: '',
    zipCode: '',
    address: '',
    notes: '',
    photoIds: [],
    videoIds: [],
  },
  submissionId: null,
  submissionNumber: null,
  pdfUrl: null,
}

export const useEstimatorStore = create<EstimatorStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setProjectTypeId: (id) => {
        set({ 
          projectTypeId: id,
          serviceCategoryId: null,
          serviceId: null,
          basePrice: 0,
          totalPrice: 0,
          step1Selections: [],
          step2Selections: []
        })
      },

      setServiceCategoryId: (id) => {
        set({ 
          serviceCategoryId: id,
          serviceId: null,
          basePrice: 0,
          totalPrice: 0,
          step1Selections: [],
          step2Selections: []
        })
      },

      setServiceId: (id, clientPrice) => {
        set({ 
          serviceId: id,
          basePrice: clientPrice,
          totalPrice: clientPrice,
          step1Selections: [],
          step2Selections: []
        })
      },

      addCostCodeSelection: (step, selection) => {
        const key = step === 1 ? 'step1Selections' : 'step2Selections'
        set((state) => ({
          [key]: [...state[key], selection],
        }))
        get().calculateTotal()
      },

      updateCostCodeSelection: (step, costCodeId, updates) => {
        const key = step === 1 ? 'step1Selections' : 'step2Selections'
        set((state) => ({
          [key]: state[key].map(selection => 
            selection.costCodeId === costCodeId 
              ? { ...selection, ...updates }
              : selection
          ),
        }))
        get().calculateTotal()
      },

      removeCostCodeSelection: (step, costCodeId) => {
        const key = step === 1 ? 'step1Selections' : 'step2Selections'
        set((state) => ({
          [key]: state[key].filter(selection => selection.costCodeId !== costCodeId),
        }))
        get().calculateTotal()
      },

      setUserInfo: (data) => {
        set((state) => ({
          userInfo: { ...state.userInfo, ...data },
        }))
      },

      setSubmissionData: (submissionId, submissionNumber, pdfUrl) => {
        set({ submissionId, submissionNumber, pdfUrl })
      },

      calculateTotal: () => {
        const state = get()
        const step1Total = state.step1Selections.reduce((sum, selection) => {
          if (!selection.isEnabled) return sum
          const quantity = selection.quantity || 1
          return sum + (Number(selection.unitPrice) * quantity)
        }, 0)
        
        const step2Total = state.step2Selections.reduce((sum, selection) => {
          if (!selection.isEnabled) return sum
          const quantity = selection.quantity || 1
          return sum + (Number(selection.unitPrice) * quantity)
        }, 0)
        
        set({ totalPrice: Number(state.basePrice) + step1Total + step2Total })
      },

      resetEstimator: () => {
        set(initialState)
      },
    }),
    {
      name: 'estimator-storage-v2',
    }
  )
)
