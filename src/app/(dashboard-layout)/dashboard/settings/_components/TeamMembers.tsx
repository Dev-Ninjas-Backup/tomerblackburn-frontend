'use client'

import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TeamMember {
  id: number
  email: string
  role: string
  isSuperAdmin?: boolean
}

interface TeamMembersProps {
  members: TeamMember[]
  onAddMember: (email: string, role: string) => void
  onRemoveMember: (id: number) => void
}

export const TeamMembers = ({ members, onAddMember, onRemoveMember }: TeamMembersProps) => {
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Admin')

  const handleAdd = () => {
    if (email.trim()) {
      onAddMember(email, role)
      setEmail('')
      setRole('Admin')
      setShowModal(false)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
        <button
          onClick={() => setShowModal(true)}
          className="text-sm text-[#2d4a8f] hover:underline font-medium flex items-center gap-1"
        >
          <Plus size={16} />
          Add Member
        </button>
      </div>

      <div className="space-y-3">
        {members.map((member) => (
          <div key={member.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                {member.email.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{member.email}</p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {member.isSuperAdmin ? (
                <span className="text-sm text-[#2d4a8f] font-medium">SuperAdmin</span>
              ) : (
                <>
                  <span className="text-sm text-gray-700">{member.role}</span>
                  <button
                    onClick={() => onRemoveMember(member.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Member Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Team Member</h3>
              <button onClick={() => setShowModal(false)} aria-label="Close modal">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                  type="email"
                  placeholder="member@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={() => setShowModal(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleAdd} className="flex-1 bg-[#2d4a8f] hover:bg-[#243d75]">
                  Add Member
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
