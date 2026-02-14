import api from "@/lib/api";
import { ContactSubmission, ContactsResponse, UnreadCountResponse } from "@/types/contact.types";

export interface ContactFormData {
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
}

export const contactService = {
  // Public - Submit contact form
  submitContactForm: async (data: ContactFormData) => {
    const response = await api.post<{ message: string; data: any }>(
      "/contact-us",
      {
        ...data,
        projectStartDate: new Date(data.projectStartDate).toISOString(),
      }
    );
    return response.data;
  },

  // Dashboard - Get all contacts
  getAllContacts: async (isRead?: boolean, page: number = 1, limit: number = 10) => {
    const params: any = { page, limit };
    if (isRead !== undefined) {
      params.isRead = isRead.toString();
    }
    const response = await api.get<ContactsResponse>("/contact-us", { params });
    return response.data;
  },

  // Dashboard - Get all contacts without pagination (for search)
  getAllContactsWithoutPagination: async (isRead?: boolean) => {
    const params: any = { page: 1, limit: 100 };
    if (isRead !== undefined) {
      params.isRead = isRead.toString();
    }
    const response = await api.get<ContactsResponse>("/contact-us", { params });
    return response.data;
  },

  // Dashboard - Get unread count
  getUnreadCount: async () => {
    const response = await api.get<UnreadCountResponse>("/contact-us/unread-count");
    return response.data;
  },

  // Dashboard - Get single contact
  getContactById: async (id: string) => {
    const response = await api.get<{ message: string; data: ContactSubmission }>(
      `/contact-us/${id}`
    );
    return response.data;
  },

  // Dashboard - Mark as read
  markAsRead: async (id: string) => {
    const response = await api.patch<{ message: string }>(
      `/contact-us/${id}/mark-read`
    );
    return response.data;
  },

  // Dashboard - Mark as unread
  markAsUnread: async (id: string) => {
    const response = await api.patch<{ message: string }>(
      `/contact-us/${id}/mark-unread`
    );
    return response.data;
  },

  // Dashboard - Mark all as read
  markAllAsRead: async () => {
    const response = await api.post<{ message: string }>("/contact-us/mark-all-read");
    return response.data;
  },

  // Dashboard - Delete contact
  deleteContact: async (id: string) => {
    const response = await api.delete<{ message: string }>(`/contact-us/${id}`);
    return response.data;
  },

  // Dashboard - Export all contacts to Excel
  exportContacts: async (isRead?: boolean) => {
    const params = isRead !== undefined ? { isRead: isRead.toString() } : {};
    const response = await api.get("/contact-us/export", {
      params,
      responseType: "blob",
    });
    return response.data;
  },

  // Dashboard - Export contacts by IDs
  exportContactsByIds: async (ids: string[]) => {
    const response = await api.post("/contact-us/export", { ids }, {
      responseType: "blob",
    });
    return response.data;
  },
};
