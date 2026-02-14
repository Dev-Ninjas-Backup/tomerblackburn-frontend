"use client";

import React, { useState, useMemo } from "react";
import { Bell, CheckCheck, Download, Search } from "lucide-react";
import { motion } from "framer-motion";
import { ContactsTable } from "./_components/ContactsTable";
import { ViewDetailsModal } from "./_components/ViewDetailsModal";
import {
  useContacts,
  useAllContacts,
  useUnreadCount,
  useMarkAllAsRead,
  useExportContacts,
} from "@/hooks/useContacts";
import { ContactSubmission } from "@/types/contact.types";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { searchContact } from "@/utils/search";
import { TableSkeleton } from "@/components/shared/TableSkeleton";

export default function ContactsPage() {
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [selectedContact, setSelectedContact] =
    useState<ContactSubmission | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const isReadFilter = filter === "all" ? undefined : filter === "read";

  // Fetch all data when searching, paginated data otherwise
  const { data: allContactsData, isLoading: isLoadingAll } = useAllContacts(
    isReadFilter,
    debouncedSearch.length > 0,
  );
  const { data: paginatedContactsData, isLoading: isLoadingPaginated } =
    useContacts(isReadFilter, page, limit);

  const isSearching = debouncedSearch.length > 0;
  const contactsData = isSearching ? allContactsData : paginatedContactsData;
  const isLoading = isSearching ? isLoadingAll : isLoadingPaginated;

  const { data: unreadData } = useUnreadCount();
  const markAllAsRead = useMarkAllAsRead();
  const exportContacts = useExportContacts();

  const allContacts = contactsData?.data || [];
  const pagination = contactsData?.pagination;
  const unreadCount = unreadData?.count || 0;

  // Filter contacts based on search query
  const filteredContacts = useMemo(() => {
    if (!allContacts) return [];
    if (!debouncedSearch) return allContacts;

    return allContacts.filter((contact) =>
      searchContact(contact, debouncedSearch),
    );
  }, [allContacts, debouncedSearch]);

  const handleExport = () => {
    exportContacts.mutate(isReadFilter);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-6 space-y-6"
    >
      {/* Header */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col gap-4">
          {/* Title and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">All Contacts</h1>
              <p className="text-sm text-gray-600 mt-1">
                {pagination?.total || 0} total contacts • {unreadCount} unread
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleExport}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                disabled={exportContacts.isPending}
              >
                <Download size={16} />
                {exportContacts.isPending ? "Exporting..." : "Export All"}
              </Button>
              {unreadCount > 0 && (
                <Button
                  onClick={() => markAllAsRead.mutate()}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <CheckCheck size={16} />
                  Mark All Read
                </Button>
              )}
              <div className="relative">
                <button
                  className="p-2 hover:bg-gray-100 rounded-full relative"
                  aria-label="Notifications"
                >
                  <Bell size={24} className="text-gray-700" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name, email, phone, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded pl-10 pr-4 py-2 text-sm w-full"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b bg-white p-4 rounded-t-lg shadow">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 font-medium transition-colors ${
            filter === "all"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 font-medium transition-colors ${
            filter === "unread"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setFilter("read")}
          className={`px-4 py-2 font-medium transition-colors ${
            filter === "read"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Read
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <TableSkeleton rows={10} columns={7} />
      ) : (
        <ContactsTable
          contacts={filteredContacts}
          onViewDetails={setSelectedContact}
          pagination={pagination}
          page={page}
          limit={limit}
          onPageChange={setPage}
          onLimitChange={setLimit}
        />
      )}

      {/* View Details Modal */}
      <ViewDetailsModal
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
      />
    </motion.div>
  );
}
