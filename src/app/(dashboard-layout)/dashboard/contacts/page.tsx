'use client'

import React, { useState } from 'react'
import { Bell } from 'lucide-react'
import { motion } from 'framer-motion'
import { ContactsTable } from './_components/ContactsTable'
import { ViewDetailsModal } from './_components/ViewDetailsModal'

interface Contact {
  id: number
  name: string
  email: string
  phone: string
  address: string
  date: string
  message?: string
}

const dummyContacts: Contact[] = [
  {
    id: 123,
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    phone: '+8801787939177',
    address: '255 Dewan Bari Road-1230',
    date: '12 Feb 2025',
    message: 'I am interested in your bathroom renovation services. Please contact me.'
  },
  {
    id: 124,
    name: 'Jane Smith',
    email: 'jane.smith@gmail.com',
    phone: '+8801787939178',
    address: '123 Main Street-4567',
    date: '13 Feb 2025',
    message: 'Looking for a quote on bathroom remodeling.'
  },
  {
    id: 125,
    name: 'Mike Johnson',
    email: 'mike.j@gmail.com',
    phone: '+8801787939179',
    address: '456 Park Avenue-7890',
    date: '14 Feb 2025',
    message: 'Need consultation for bathroom design.'
  },
  {
    id: 126,
    name: 'Sarah Williams',
    email: 'sarah.w@gmail.com',
    phone: '+8801787939180',
    address: '789 Oak Street-1234',
    date: '15 Feb 2025',
    message: 'Interested in modern bathroom fixtures.'
  },
  {
    id: 127,
    name: 'David Brown',
    email: 'david.brown@gmail.com',
    phone: '+8801787939181',
    address: '321 Elm Road-5678',
    date: '16 Feb 2025',
    message: 'Want to schedule a bathroom inspection.'
  },
]

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(dummyContacts)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  const handleDelete = (id: number) => {
    setContacts(contacts.filter(c => c.id !== id))
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">All Contacts</h1>
        <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="Notifications">
          <Bell size={24} className="text-gray-700" />
        </button>
      </div>

      {/* Table */}
      <ContactsTable
        contacts={contacts}
        onViewDetails={setSelectedContact}
        onDelete={handleDelete}
      />

      {/* View Details Modal */}
      <ViewDetailsModal
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
      />
    </motion.div>
  )
}
