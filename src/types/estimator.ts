export type BathroomType = 'TP' | 'TPT' | 'TPS' | 'FP'

export interface EstimatorState {
  bathroomType: BathroomType | null
  basePrice: number
  step1Data: Step1Data
  step2Data: Step2Data
  step3Data: Step3Data
  userInfo: UserInfo
  additionalCosts: AdditionalCost[]
  totalPrice: number
}

export interface Step1Data {
  demolition: {
    wallTileRemoval: boolean
    wallTileSqft?: number
  }
  flooring: {
    floorTileSelection?: string
    floorTileQty?: number
    heatedFloor: boolean
  }
}

export interface Step2Data {
  vanity: {
    size?: string
    sizeQty?: number
    style?: string
    styleQty?: number
    countertopMaterial?: string
    countertopQty?: number
    doubleSink: boolean
  }
  shower: {
    showerDoorType?: string
    showerDoorQty?: number
    showerNiche: boolean
    benchSeat: boolean
    rainShowerHead: boolean
  }
  bathtub: {
    tubTypeUpgrade?: string
    tubTypeQty?: number
  }
}

export interface Step3Data {
  lighting: {
    vanityLightUpgrade?: string
    vanityLightQty?: number
    recessedLights: boolean
  }
  fixtures: {
    toiletUpgrade?: string
    toiletQty?: number
    faucetQuality?: string
    faucetQty?: number
    towelBars: boolean
  }
  walls: {
    wallTile: boolean
    paint: boolean
  }
}

export interface UserInfo {
  fullName: string
  email: string
  phone: string
  zipCode: string
  address: string
  notes: string
  photos: File[]
  videos: File[]
}

export interface AdditionalCost {
  id: string
  name: string
  cost: number
}

export const BATHROOM_BASE_PRICES: Record<BathroomType, number> = {
  TP: 4000,
  TPT: 10000,
  TPS: 13000,
  FP: 15000,
}
