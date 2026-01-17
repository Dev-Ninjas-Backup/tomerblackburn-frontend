'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BathroomType, EstimatorState, Step1Data, Step2Data, Step3Data, UserInfo, AdditionalCost } from '@/types/estimator'
import { BATHROOM_BASE_PRICES } from '@/types/estimator'

interface EstimatorStore extends EstimatorState {
  setBathroomType: (type: BathroomType) => void
  setStep1Data: (data: Partial<Step1Data>) => void
  setStep2Data: (data: Partial<Step2Data>) => void
  setStep3Data: (data: Partial<Step3Data>) => void
  setUserInfo: (data: Partial<UserInfo>) => void
  addCost: (cost: AdditionalCost) => void
  removeCost: (id: string) => void
  calculateTotal: () => void
  resetEstimator: () => void
}

const initialState: EstimatorState = {
  bathroomType: null,
  basePrice: 0,
  step1Data: {
    demolition: { wallTileRemoval: false },
    flooring: { heatedFloor: false },
  },
  step2Data: {
    vanity: { doubleSink: false },
    shower: { showerNiche: false, benchSeat: false, rainShowerHead: false },
    bathtub: {},
  },
  step3Data: {
    lighting: { recessedLights: false },
    fixtures: { towelBars: false },
    walls: { wallTile: false, paint: false },
  },
  userInfo: {
    fullName: '',
    email: '',
    phone: '',
    zipCode: '',
    address: '',
    notes: '',
    photos: [],
    videos: [],
  },
  additionalCosts: [],
  totalPrice: 0,
}

export const useEstimatorStore = create<EstimatorStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setBathroomType: (type) => {
        const basePrice = BATHROOM_BASE_PRICES[type]
        set({ bathroomType: type, basePrice, totalPrice: basePrice })
      },

      setStep1Data: (data) => {
        set((state) => ({
          step1Data: {
            ...state.step1Data,
            demolition: { ...state.step1Data.demolition, ...data.demolition },
            flooring: { ...state.step1Data.flooring, ...data.flooring },
          },
        }))
        get().calculateTotal()
      },

      setStep2Data: (data) => {
        set((state) => ({
          step2Data: {
            ...state.step2Data,
            vanity: { ...state.step2Data.vanity, ...data.vanity },
            shower: { ...state.step2Data.shower, ...data.shower },
            bathtub: { ...state.step2Data.bathtub, ...data.bathtub },
          },
        }))
        get().calculateTotal()
      },

      setStep3Data: (data) => {
        set((state) => ({
          step3Data: {
            ...state.step3Data,
            lighting: { ...state.step3Data.lighting, ...data.lighting },
            fixtures: { ...state.step3Data.fixtures, ...data.fixtures },
            walls: { ...state.step3Data.walls, ...data.walls },
          },
        }))
        get().calculateTotal()
      },

      setUserInfo: (data) => {
        set((state) => ({
          userInfo: { ...state.userInfo, ...data },
        }))
      },

      addCost: (cost) => {
        set((state) => ({
          additionalCosts: [...state.additionalCosts, cost],
        }))
        get().calculateTotal()
      },

      removeCost: (id) => {
        set((state) => ({
          additionalCosts: state.additionalCosts.filter((c) => c.id !== id),
        }))
        get().calculateTotal()
      },

      calculateTotal: () => {
        const state = get()
        const additionalTotal = state.additionalCosts.reduce((sum, cost) => sum + cost.cost, 0)
        set({ totalPrice: state.basePrice + additionalTotal })
      },

      resetEstimator: () => {
        set(initialState)
      },
    }),
    {
      name: 'estimator-storage',
    }
  )
)
