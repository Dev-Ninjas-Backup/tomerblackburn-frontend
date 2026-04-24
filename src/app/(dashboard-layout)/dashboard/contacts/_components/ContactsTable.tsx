"use client";

import React, { useState } from "react";
import { Mail, MailOpen, Trash2, Eye, FileSpreadsheet, Paperclip } from "lucide-react";
import { ContactSubmission } from "@/types/contact.types";
import {
  useMarkAsRead,
  useMarkAsUnread,
  useDeleteContact,
  useExportContactsByIds,
} from "@/hooks/useContacts";
import { format } from "date-fns";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { MediaGalleryModal } from "@/components/dashboard/MediaGalleryModal";

interface ContactsTableProps {
  contacts: ContactSubmission[];
  onViewDetails: (contact: ContactSubmission) => void;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export const ContactsTable = ({
  contacts,
  onViewDetails,
  pagination,
  page,
  limit,
  onPageChange,
  onLimitChange,
}: ContactsTableProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    contactId: string;
    contactName: string;
  }>({ isOpen: false, contactId: "", contactName: "" });
  const [mediaModal, setMediaModal] = useState<ContactSubmission | null>(null);

  const markAsRead = useMarkAsRead();
  const markAsUnread = useMarkAsUnread();
  const deleteContact = useDeleteContact();
  const exportByIds = useExportContactsByIds();

  const handleViewDetails = (contact: ContactSubmission) => {
    if (!contact.isRead) {
      markAsRead.mutate(contact.id);
    }
    onViewDetails(contact);
  };

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteModal({ isOpen: true, contactId: id, contactName: name });
  };

  const handleDeleteConfirm = () => {
    deleteContact.mutate(deleteModal.contactId, {
      onSuccess: () => {
        setDeleteModal({ isOpen: false, contactId: "", contactName: "" });
      },
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === contacts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(contacts.map((c) => c.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleExportSelected = () => {
    if (selectedIds.length > 0) {
      exportByIds.mutate(selectedIds);
    }
  };

  const handleExportSingle = (id: string) => {
    exportByIds.mutate([id]);
  };

  return (
    <div className="space-y-4">
      {/* Export Selected Button */}
      {selectedIds.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={handleExportSelected}
            disabled={exportByIds.isPending}
            className="flex items-center gap-2 px-4 py-2 bg-[#2D4A8F] text-white rounded-lg hover:bg-[#1E3A70] disabled:opacity-50"
            title="Export selected"
          >
            <FileSpreadsheet size={16} />
            Export ({selectedIds.length})
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === contacts.length &&
                      contacts.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300"
                    aria-label="Select all"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Media
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  City
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className={`hover:bg-gray-50 ${!contact.isRead ? "bg-blue-50" : ""}`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(contact.id)}
                      onChange={() => toggleSelect(contact.id)}
                      className="w-4 h-4 rounded border-gray-300"
                      aria-label="Select contact"
                    />
                  </td>
                  <td className="px-6 py-4">
                    {contact.isRead ? (
                      <MailOpen size={18} className="text-gray-400" />
                    ) : (
                      <Mail size={18} className="text-blue-600" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {contact.firstName} {contact.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {contact.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {contact.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {contact.contactMedia && contact.contactMedia.length > 0 ? (
                      <button
                        onClick={() => setMediaModal(contact)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-900"
                        title="View media files"
                      >
                        <Paperclip size={16} />
                        <span className="text-xs">
                          {contact.contactMedia.length}
                        </span>
                      </button>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {contact.city}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {format(new Date(contact.createdAt), "MMM dd, yyyy")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleExportSingle(contact.id)}
                        className="p-1.5 hover:bg-green-50 rounded transition-colors"
                        title="Export"
                        disabled={exportByIds.isPending}
                      >
                        <FileSpreadsheet size={16} className="text-green-600" />
                      </button>
                      <button
                        onClick={() => handleViewDetails(contact)}
                        className="p-1.5 hover:bg-blue-50 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} className="text-blue-600" />
                      </button>
                      {contact.isRead ? (
                        <button
                          onClick={() => markAsUnread.mutate(contact.id)}
                          className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                          title="Mark as Unread"
                        >
                          <Mail size={16} className="text-gray-600" />
                        </button>
                      ) : (
                        <button
                          onClick={() => markAsRead.mutate(contact.id)}
                          className="p-1.5 hover:bg-green-50 rounded transition-colors"
                          title="Mark as Read"
                        >
                          <MailOpen size={16} className="text-green-600" />
                        </button>
                      )}
                      <button
                        onClick={() =>
                          handleDeleteClick(
                            contact.id,
                            `${contact.firstName} ${contact.lastName}`,
                          )
                        }
                        className="p-1.5 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6 py-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Rows per page</span>
              <select
                value={limit}
                onChange={(e) => {
                  onLimitChange(Number(e.target.value));
                  onPageChange(1);
                }}
                className="border border-gray-300 rounded px-3 py-1.5 pr-8 text-sm"
                aria-label="Rows per page"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
              <span className="text-sm text-gray-700 text-center">
                Page {pagination.page} of {pagination.totalPages || 1} (
                {pagination.total} total)
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => onPageChange(1)}
                  disabled={!pagination.hasPreviousPage}
                  className="px-3 py-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  aria-label="First page"
                >
                  «
                </button>
                <button
                  onClick={() => onPageChange(page - 1)}
                  disabled={!pagination.hasPreviousPage}
                  className="px-3 py-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  aria-label="Previous page"
                >
                  ‹
                </button>
                <button
                  onClick={() => onPageChange(page + 1)}
                  disabled={!pagination.hasNextPage}
                  className="px-3 py-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  aria-label="Next page"
                >
                  ›
                </button>
                <button
                  onClick={() => onPageChange(pagination.totalPages)}
                  disabled={!pagination.hasNextPage}
                  className="px-3 py-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  aria-label="Last page"
                >
                  »
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({ isOpen: false, contactId: "", contactName: "" })
        }
        onConfirm={handleDeleteConfirm}
        contactName={deleteModal.contactName}
        isDeleting={deleteContact.isPending}
      />

      {/* Media Gallery Modal */}
      {mediaModal && (
        <MediaGalleryModal
          isOpen={!!mediaModal}
          onClose={() => setMediaModal(null)}
          media={mediaModal.contactMedia || []}
          submissionNumber={`${mediaModal.firstName} ${mediaModal.lastName}`}
        />
      )}
    </div>
  );
};
