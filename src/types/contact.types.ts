export interface ContactSubmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  message: string;
  projectStartDate: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  contactMedia?: Array<{
    id: string;
    mediaType: "PHOTO" | "VIDEO";
    fileInstance: {
      id: string;
      url: string;
      filename: string;
      originalFilename: string;
      mimeType: string;
    };
  }>;
}

export interface ContactsResponse {
  message: string;
  data: ContactSubmission[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface UnreadCountResponse {
  message: string;
  count: number;
}
