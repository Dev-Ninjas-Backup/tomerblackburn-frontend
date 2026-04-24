import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface BuildingTypeField {
  id: string;
  label: string;
  fieldType: string;
  placeholder?: string;
  isRequired: boolean;
  displayOrder: number;
}

export interface BuildingType {
  id: string;
  name: string;
  price: string;
  isActive: boolean;
  displayOrder: number;
  fields: BuildingTypeField[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBuildingTypeDto {
  name: string;
  price?: number;
  isActive?: boolean;
  displayOrder?: number;
  fields?: Omit<BuildingTypeField, 'id'>[];
}

export interface UpdateBuildingTypeDto {
  name?: string;
  price?: number;
  isActive?: boolean;
  displayOrder?: number;
  fields?: Partial<BuildingTypeField>[];
}

export const buildingTypeService = {
  getActive: async () => {
    return axios.get<{ data: BuildingType[] }>(`${API_URL}/building-types/active`);
  },
  getAll: async (activeOnly?: boolean) => {
    const params = activeOnly !== undefined ? { activeOnly } : {};
    return axios.get<{ data: BuildingType[]; count: number }>(`${API_URL}/building-types`, { params });
  },
  getById: async (id: string) => {
    return axios.get<{ data: BuildingType }>(`${API_URL}/building-types/${id}`);
  },
  create: async (data: CreateBuildingTypeDto) => {
    return axios.post<{ data: BuildingType; message: string }>(`${API_URL}/building-types`, data);
  },
  update: async (id: string, data: UpdateBuildingTypeDto) => {
    return axios.patch<{ data: BuildingType; message: string }>(`${API_URL}/building-types/${id}`, data);
  },
  delete: async (id: string) => {
    return axios.delete<{ message: string }>(`${API_URL}/building-types/${id}`);
  },
};
