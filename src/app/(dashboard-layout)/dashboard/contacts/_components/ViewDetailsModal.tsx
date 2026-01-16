'use client'

import React from 'react'
import { X, User, Mail, MapPin, Calendar } from 'lucide-react'

interface Contact {
  id: number
  name: string
  email: string
  phone: string
  address: string
  date: string
  message?: string
}

interface ViewDetailsModalProps {
  contact: Contact | null
  onClose: () => void
}

export const ViewDetailsModal = ({ contact, onClose }: ViewDetailsModalProps) => {
  if (!contact) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
            aria-label="Close modal"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Name & Phone */}
          <div className="flex items-start gap-3">
            <User size={20} className="text-gray-500 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">{contact.name}</p>
              <p className="text-sm text-gray-600">{contact.phone}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <Mail size={20} className="text-gray-500 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Email</p>
              <p className="text-sm text-gray-600">{contact.email}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3">
            <MapPin size={20} className="text-gray-500 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Address</p>
              <p className="text-sm text-gray-600">{contact.address}</p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-start gap-3">
            <Calendar size={20} className="text-gray-500 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Date</p>
              <p className="text-sm text-gray-600">{contact.date}</p>
            </div>
          </div>

          {/* Scope of Work / Message */}
          {contact.message && (
            <div>
              <p className="font-semibold text-gray-900 mb-2">Scope of Work</p>
              <p className="text-sm text-gray-600 leading-relaxed">{contact.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
