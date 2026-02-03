export type SubmissionStatus = 'PENDING' | 'REVIEWED' | 'APPROVED' | 'REJECTED' | 'COMPLETED';

export interface SubmissionItem {
  id: string;
  submissionId: string;
  costCodeId: string;
  selectedOptionId?: string;
  quantity: number;
  unitPrice: number;
  isEnabled: boolean;
  userInputValue?: string;
  notes?: string;
  costCode?: {
    id: string;
    code: string;
    name: string;
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
  pdfFileId?: string;
  createdAt: string;
  updatedAt: string;
  service?: {
    id: string;
    name: string;
    code: string;
  };
  items?: SubmissionItem[];
  pdfFile?: {
    id: string;
    url: string;
    filename: string;
  };
}

export interface DashboardStats {
  totalSubmissions: number;
  pendingSubmissions: number;
  reviewedSubmissions: number;
  approvedSubmissions: number;
  totalRevenue: number;
  averageProjectValue: number;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
  count?: number;
}
