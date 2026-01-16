'use client'

import React, { useState } from 'react'
import { Camera } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface CompanyProfileProps {
  companyName: string
  email: string
  phone: string
  location: string
  logo: string
  onUpdate: (data: { companyName: string; email: string; phone: string; location: string }) => void
}

export const CompanyProfile = ({ companyName, email, phone, location, logo, onUpdate }: CompanyProfileProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ companyName, email, phone, location })

  const handleSave = () => {
    onUpdate(formData)
    setIsEditing(false)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
              <img src={logo} alt={companyName} className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Camera size={14} className="text-white" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{formData.companyName}</h2>
            <p className="text-sm text-gray-600">{formData.email}</p>
          </div>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="bg-[#2d4a8f] hover:bg-[#243d75]">
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={() => setIsEditing(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-[#2d4a8f] hover:bg-[#243d75]">
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name <span className="text-red-500">*</span>
          </label>
          {isEditing ? (
            <Input
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            />
          ) : (
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50" disabled>
              <option>{formData.companyName}</option>
            </select>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <Input
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={!isEditing}
            className={!isEditing ? 'bg-gray-50' : ''}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <Input
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={!isEditing}
            className={!isEditing ? 'bg-gray-50' : ''}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <Input
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            disabled={!isEditing}
            className={!isEditing ? 'bg-gray-50' : ''}
          />
        </div>
      </div>
    </div>
  )
}
