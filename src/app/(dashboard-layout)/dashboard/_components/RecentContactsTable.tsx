'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, Mail, MailOpen, ArrowRight } from 'lucide-react'
import { useContacts, useMarkAsRead } from '@/hooks/useContacts'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { ContactSubmission } from '@/types/contact.types'
import { ViewDetailsModal } from '@/app/(dashboard-layout)/dashboard/contacts/_components/ViewDetailsModal'

export const RecentContactsTable = () => {
  const router = useRouter();
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const { data: contactsData, isLoading } = useContacts(undefined, 1, 5);
  const markAsRead = useMarkAsRead();

  const contacts = contactsData?.data || [];

  const handleViewContact = (contact: ContactSubmission) => {
    if (!contact.isRead) {
      markAsRead.mutate(contact.id);
    }
    setSelectedContact(contact);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.3 }}
    >
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Contacts</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/dashboard/contacts')}
              className="flex items-center gap-2"
            >
              View All
              <ArrowRight size={16} />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">Loading...</td>
                  </tr>
                ) : contacts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">No contacts found</td>
                  </tr>
                ) : (
                  contacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className={`hover:bg-gray-50 ${!contact.isRead ? 'bg-blue-50' : ''}`}
                    >
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
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {contact.city}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {format(new Date(contact.createdAt), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewContact(contact)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View details"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <ViewDetailsModal
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
      />
    </motion.div>
  )
}
