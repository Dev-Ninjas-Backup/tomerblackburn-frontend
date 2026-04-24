'use client'

import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'

interface EmailNotificationsProps {
  notifications: {
    newSubmission: boolean
    confirmationEmail: boolean
    dailySummary: boolean
  }
  onUpdate: (notifications: any) => void
}

export const EmailNotifications = ({ notifications, onUpdate }: EmailNotificationsProps) => {
  const handleToggle = (key: string) => {
    onUpdate({ ...notifications, [key]: !notifications[key as keyof typeof notifications] })
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Checkbox
            id="newSubmission"
            checked={notifications.newSubmission}
            onCheckedChange={() => handleToggle('newSubmission')}
          />
          <label htmlFor="newSubmission" className="text-sm text-gray-700 cursor-pointer">
            Send email on new submission
          </label>
        </div>

        <div className="flex items-center gap-3">
          <Checkbox
            id="confirmationEmail"
            checked={notifications.confirmationEmail}
            onCheckedChange={() => handleToggle('confirmationEmail')}
          />
          <label htmlFor="confirmationEmail" className="text-sm text-gray-700 cursor-pointer">
            Send confirmation email to client
          </label>
        </div>

        <div className="flex items-center gap-3">
          <Checkbox
            id="dailySummary"
            checked={notifications.dailySummary}
            onCheckedChange={() => handleToggle('dailySummary')}
          />
          <label htmlFor="dailySummary" className="text-sm text-gray-700 cursor-pointer">
            Daily summary report
          </label>
        </div>
      </div>
    </div>
  )
}
