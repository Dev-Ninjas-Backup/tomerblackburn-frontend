'use client'

import React, { useState, useEffect } from 'react'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

interface EmailNotificationsProps {
  notificationEmail?: string
  notifyOnNewSubmission?: boolean
  onUpdate: (data: { notificationEmail?: string; notifyOnNewSubmission?: boolean }) => Promise<void>
  isSaving?: boolean
}

export const EmailNotifications = ({
  notificationEmail: initialEmail = '',
  notifyOnNewSubmission: initialNotify = false,
  onUpdate,
  isSaving,
}: EmailNotificationsProps) => {
  const [email, setEmail] = useState(initialEmail)
  const [notify, setNotify] = useState(initialNotify)

  useEffect(() => {
    setEmail(initialEmail)
    setNotify(initialNotify)
  }, [initialEmail, initialNotify])

  const handleSave = () => {
    onUpdate({ notificationEmail: email || undefined, notifyOnNewSubmission: notify })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Mail size={20} className="text-[#2d4a8f]" />
        <h3 className="text-lg font-semibold text-gray-900">Email Notifications</h3>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Admin Notification Email
          </label>
          <Input
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="max-w-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            This email will receive alerts when new submissions come in.
          </p>
        </div>

        <div className="flex items-center justify-between max-w-sm">
          <div>
            <p className="text-sm font-medium text-gray-700">Notify on new submission</p>
            <p className="text-xs text-gray-500">Send an email when a customer submits an estimate</p>
          </div>
          <Switch
            checked={notify}
            onCheckedChange={setNotify}
            aria-label="Notify on new submission"
          />
        </div>

        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#2d4a8f] hover:bg-[#243a73]"
        >
          {isSaving ? 'Saving…' : 'Save Notification Settings'}
        </Button>
      </div>
    </div>
  )
}
