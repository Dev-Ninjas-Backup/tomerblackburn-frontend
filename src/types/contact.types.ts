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
}

export interface ContactsResponse {
  message: string;
  count: number;
  data: ContactSubmission[];
}

export interface UnreadCountResponse {
  message: string;
  count: number;
}
