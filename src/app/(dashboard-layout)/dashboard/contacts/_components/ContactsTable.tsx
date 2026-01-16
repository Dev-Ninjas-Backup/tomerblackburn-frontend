'use client'

import React, { useState } from 'react'
import { MoreVertical, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface Contact {
  id: number
  name: string
  email: string
  phone: string
  address: string
  date: string
}

interface ContactsTableProps {
  contacts: Contact[]
  onViewDetails: (contact: Contact) => void
  onDelete: (id: number) => void
}

export const ContactsTable = ({ contacts, onViewDetails, onDelete }: ContactsTableProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery) ||
    contact.id.toString().includes(searchQuery)
  )

  const totalPages = Math.ceil(filteredContacts.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedContacts = filteredContacts.slice(startIndex, startIndex + rowsPerPage)

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <Input
          placeholder="Search by name, email, phone and id"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
          {filteredContacts.length} results
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Id</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{contact.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{contact.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{contact.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{contact.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{contact.address}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{contact.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === contact.id ? null : contact.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                        aria-label="Contact options"
                      >
                        <MoreVertical size={16} className="text-gray-500" />
                      </button>
                      {openMenuId === contact.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setOpenMenuId(null)}
                          />
                          <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                            <button
                              onClick={() => {
                                onViewDetails(contact)
                                setOpenMenuId(null)
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => {
                                setOpenMenuId(null)
                                if (confirm(`Delete contact "${contact.name}"?`)) {
                                  onDelete(contact.id)
                                }
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Rows per page</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value))
                setCurrentPage(1)
              }}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="First page"
              >
                «
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                ‹
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                ›
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Last page"
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
