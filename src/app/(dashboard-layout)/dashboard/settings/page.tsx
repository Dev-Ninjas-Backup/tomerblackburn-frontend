'use client'

import React, { useState } from 'react'
import { Bell } from 'lucide-react'
import { motion } from 'framer-motion'
import { CompanyProfile } from './_components/CompanyProfile'
import { EmailNotifications } from './_components/EmailNotifications'
import { TeamMembers } from './_components/TeamMembers'

export default function SettingsPage() {
  const [companyData, setCompanyData] = useState({
    companyName: 'BBurn Builders LLC',
    email: 'info@bburnbuilders.com',
    phone: '(773) 555-0100',
    location: 'BBurn Builders LLC',
    logo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop'
  })

  const [notifications, setNotifications] = useState({
    newSubmission: true,
    confirmationEmail: true,
    dailySummary: true
  })

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, email: 'admin@buburnbuilders.com', role: 'Super Admin', isSuperAdmin: true },
    { id: 2, email: 'admin@buburnbuilders.com', role: 'Super Admin', isSuperAdmin: false }
  ])

  const handleUpdateCompany = (data: any) => {
    setCompanyData({ ...companyData, ...data })
  }

  const handleAddMember = (email: string, role: string) => {
    const newMember = {
      id: teamMembers.length + 1,
      email,
      role,
      isSuperAdmin: false
    }
    setTeamMembers([...teamMembers, newMember])
  }

  const handleRemoveMember = (id: number) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id))
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
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="Notifications">
          <Bell size={24} className="text-gray-700" />
        </button>
      </div>

      {/* Blue Divider */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="h-1 bg-[#2d4a8f] rounded-full origin-left" 
      />

      {/* Company Profile */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <CompanyProfile
          companyName={companyData.companyName}
          email={companyData.email}
          phone={companyData.phone}
          location={companyData.location}
          logo={companyData.logo}
          onUpdate={handleUpdateCompany}
        />
      </motion.div>

      {/* Email Notifications */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <EmailNotifications
          notifications={notifications}
          onUpdate={setNotifications}
        />
      </motion.div>

      {/* Team Members */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <TeamMembers
          members={teamMembers}
          onAddMember={handleAddMember}
          onRemoveMember={handleRemoveMember}
        />
      </motion.div>
    </motion.div>
  )
}
