export interface Tip {
  id: string;
  position: number;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTipDto {
  position: number;
  message: string;
}

export interface UpdateTipDto {
  position?: number;
  message?: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}
