// Cost Code Category
export interface CostCodeCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  stepNumber: number;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  costCodes?: CostCode[];
}

export interface CreateCostCodeCategoryDto {
  name: string;
  slug: string;
  description?: string;
  stepNumber?: number;
  displayOrder?: number;
  isActive?: boolean;
}

export interface UpdateCostCodeCategoryDto extends Partial<CreateCostCodeCategoryDto> {}

// Cost Code
export type QuestionType = 'WHITE' | 'BLUE' | 'GREEN' | 'ORANGE' | 'YELLOW' | 'RED' | 'PURPLE';
export type UnitType = 'FIXED' | 'PER_SQFT' | 'PER_EACH' | 'PER_LOT' | 'PER_SET' | 'PER_UPGRADE';

export interface CostCode {
  id: string;
  categoryId: string;
  serviceId?: string;
  code: string;
  name: string;
  elies?: string;
  tips?: string[];
  description?: string;
  basePrice: number;
  markup: number;
  clientPrice: number;
  unitType: UnitType;
  questionType: QuestionType;
  step: number;
  displayOrder: number;
  isIncludedInBase: boolean;
  requiresQuantity: boolean;
  isOptional: boolean;
  isActive: boolean;
  parentCostCodeId?: string;
  showWhenParentValue?: string;
  nestedInputType?: 'QUANTITY' | 'DROPDOWN' | 'CUSTOM_PRICE' | 'NONE';
  /** If true, question is for branching only: shown in estimator, excluded from Buildertrend/Excel export */
  excludeFromExport?: boolean;
  createdAt: string;
  updatedAt: string;
  category?: CostCodeCategory;
  service?: {
    id: string;
    name: string;
    serviceCategoryId: string;
  };
  options?: CostCodeOption[];
}

export interface CreateCostCodeDto {
  categoryId: string;
  serviceId?: string;
  code: string;
  name: string;
  elies?: string;
  tips?: string[];
  description?: string;
  basePrice: number;
  markup?: number;
  clientPrice?: number;
  unitType?: UnitType;
  questionType?: QuestionType;
  step?: number;
  displayOrder?: number;
  isIncludedInBase?: boolean;
  requiresQuantity?: boolean;
  isOptional?: boolean;
  isActive?: boolean;
  parentCostCodeId?: string;
  showWhenParentValue?: string;
  nestedInputType?: 'QUANTITY' | 'DROPDOWN' | 'CUSTOM_PRICE' | 'NONE';
  excludeFromExport?: boolean;
}

export interface UpdateCostCodeDto extends Partial<CreateCostCodeDto> {}

// Cost Code Option
export interface CostCodeOption {
  id: string;
  costCodeId: string;
  optionName: string;
  optionValue?: string;
  priceModifier: number;
  isDefault: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  costCode?: CostCode;
}

export interface CreateCostCodeOptionDto {
  costCodeId: string;
  optionName: string;
  optionValue?: string;
  priceModifier?: number;
  isDefault?: boolean;
  displayOrder?: number;
}

export interface UpdateCostCodeOptionDto extends Partial<CreateCostCodeOptionDto> {}

// API Response
export interface ApiResponse<T> {
  message: string;
  data: T;
  count?: number;
}
