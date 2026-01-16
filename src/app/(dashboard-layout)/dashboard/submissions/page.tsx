'use client'

import React from 'react'
import { Bell } from 'lucide-react'
import { motion } from 'framer-motion'
import { SubmissionsTable } from '../_components/SubmissionsTable'

export default function SubmissionsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">All Submissions</h1>
        <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="Notifications">
          <Bell size={24} className="text-gray-700" />
        </button>
      </div>

      {/* Table */}
      <SubmissionsTable />
    </motion.div>
  )
}
