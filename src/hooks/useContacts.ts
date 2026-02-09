import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contactService } from "@/services/contact.service";
import { toast } from "sonner";
import { ContactSubmission } from "@/types/contact.types";

export const useContacts = (isRead?: boolean, page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["contacts", isRead, page, limit],
    queryFn: () => contactService.getAllContacts(isRead, page, limit),
  });
};

export const useUnreadCount = () => {
  return useQuery({
    queryKey: ["unreadCount"],
    queryFn: contactService.getUnreadCount,
  });
};

export const useContactById = (id: string) => {
  return useQuery({
    queryKey: ["contact", id],
    queryFn: () => contactService.getContactById(id),
    enabled: !!id,
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contactService.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
      toast.success("Marked as read");
    },
    onError: () => {
      toast.error("Failed to mark as read");
    },
  });
};

export const useMarkAsUnread = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contactService.markAsUnread,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
      toast.success("Marked as unread");
    },
    onError: () => {
      toast.error("Failed to mark as unread");
    },
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contactService.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
      toast.success("All marked as read");
    },
    onError: () => {
      toast.error("Failed to mark all as read");
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contactService.deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
      toast.success("Contact deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete contact");
    },
  });
};

export const useExportContacts = () => {
  return useMutation({
    mutationFn: contactService.exportContacts,
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `contact-submissions-${new Date().toISOString().split("T")[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Contacts exported successfully");
    },
    onError: () => {
      toast.error("Failed to export contacts");
    },
  });
};

export const useExportContactsByIds = () => {
  return useMutation({
    mutationFn: contactService.exportContactsByIds,
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `contact-submissions-${new Date().toISOString().split("T")[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Contacts exported successfully");
    },
    onError: () => {
      toast.error("Failed to export contacts");
    },
  });
};
