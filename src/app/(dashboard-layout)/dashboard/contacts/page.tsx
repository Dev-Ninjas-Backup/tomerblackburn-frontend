"use client";

import React, { useState } from "react";
import { Bell, CheckCheck, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { ContactsTable } from "./_components/ContactsTable";
import { ViewDetailsModal } from "./_components/ViewDetailsModal";
import {
  useContacts,
  useUnreadCount,
  useMarkAllAsRead,
} from "@/hooks/useContacts";
import { ContactSubmission } from "@/types/contact.types";
import { Button } from "@/components/ui/button";

export default function ContactsPage() {
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");
  const [selectedContact, setSelectedContact] =
    useState<ContactSubmission | null>(null);

  const isReadFilter = filter === "all" ? undefined : filter === "read";
  const { data: contactsData, isLoading } = useContacts(isReadFilter);
  const { data: unreadData } = useUnreadCount();
  const markAllAsRead = useMarkAllAsRead();

  const contacts = contactsData?.data || [];
  const unreadCount = unreadData?.count || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Contacts</h1>
          <p className="text-sm text-gray-600 mt-1">
            {contacts.length} total contacts • {unreadCount} unread
          </p>
        </div>
        <div className="flex items-center gap-3">
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

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b">
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
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-600">Loading contacts...</p>
          </div>
        </div>
      ) : (
        <ContactsTable contacts={contacts} onViewDetails={setSelectedContact} />
      )}

      {/* View Details Modal */}
      <ViewDetailsModal
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
      />
    </motion.div>
  );
}
