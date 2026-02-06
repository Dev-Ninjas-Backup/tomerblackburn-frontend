export type SubmissionStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';

export interface SubmissionItem {
  id: string;
  submissionId: string;
  costCodeId: string;
  selectedOptionId?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  isEnabled: boolean;
  userInputValue?: string;
  notes?: string;
  itemName?: string;
  itemDescription?: string;
  selectedOptionName?: string;
  costCode?: {
    id: string;
    code: string;
    name: string;
    description?: string;
  };
  selectedOption?: {
    id: string;
    optionName: string;
  };
}

export interface Submission {
  id: string;
  submissionNumber: string;
  serviceId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  projectAddress: string;
  zipCode?: string;
  basePrice: number;
  additionalItemsTotal: number;
  totalAmount: number;
  status: SubmissionStatus;
  projectNotes?: string;
  additionalDetails?: string;
  pdfUrl?: string;
  submittedAt: string;
  updatedAt: string;
  reviewedAt?: string;
  completedAt?: string;
  service?: {
    id: string;
    name: string;
    code: string;
  };
  submissionItems?: SubmissionItem[];
  submissionMedia?: Array<{
    id: string;
    mediaType: 'PHOTO' | 'VIDEO';
    fileInstance: {
      id: string;
      url: string;
      filename: string;
      originalFilename: string;
      mimeType: string;
    };
  }>;
  pdfFile?: {
    id: string;
    url: string;
    filename: string;
  };
}

export interface DashboardStats {
  totalSubmissions: number;
  pendingSubmissions: number;
  processingSubmissions: number;
  completedSubmissions: number;
  totalRevenue: number;
  averageProjectValue: number;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
  count?: number;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
