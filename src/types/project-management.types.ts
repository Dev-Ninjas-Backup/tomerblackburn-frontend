// Project Type
export interface ProjectType {
  id: string;
  name: string;
  description?: string;
  imageId?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  serviceCategories?: ServiceCategory[];
  image?: {
    id: string;
    url: string;
    filename: string;
  };
}

export interface CreateProjectTypeDto {
  name: string;
  description?: string;
  imageId?: string;
  displayOrder?: number;
  isActive?: boolean;
}

export interface UpdateProjectTypeDto extends Partial<CreateProjectTypeDto> {}

// Service Category
export interface ServiceCategory {
  id: string;
  projectTypeId: string;
  name: string;
  description?: string;
  imageId?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  projectType?: ProjectType;
  services?: Service[];
  image?: {
    id: string;
    url: string;
    filename: string;
  };
}

export interface CreateServiceCategoryDto {
  projectTypeId: string;
  name: string;
  description?: string;
  imageId?: string;
  displayOrder?: number;
  isActive?: boolean;
}

export interface UpdateServiceCategoryDto extends Partial<CreateServiceCategoryDto> {}

// Service
export interface Service {
  id: string;
  serviceCategoryId: string;
  code: string;
  name: string;
  shortDescription?: string;
  fullDescription?: string;
  basePrice: number;
  markup?: number;
  clientPrice: number;
  imageFileId?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  serviceCategory?: ServiceCategory;
  imageFile?: {
    id: string;
    url: string;
    filename: string;
  };
  image?: {
    id: string;
    url: string;
    filename: string;
  };
}

export interface CreateServiceDto {
  serviceCategoryId: string;
  code: string;
  name: string;
  shortDescription?: string;
  fullDescription?: string;
  basePrice: number;
  displayOrder?: number;
  isActive?: boolean;
}

export interface UpdateServiceDto extends Partial<CreateServiceDto> {}

// API Response Types
export interface ApiResponse<T> {
  message: string;
  data: T;
  count?: number;
}
