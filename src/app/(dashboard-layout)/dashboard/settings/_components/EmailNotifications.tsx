'use client'

import React, { useState, useEffect } from 'react'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Mail, Sparkles, RotateCcw, Info, Send, FileText } from 'lucide-react'

import { EmailTemplatePreview } from './EmailTemplatePreview'

const DEFAULT_TEMPLATE = {
  subject: 'Your Estimate Has Been Received — Next Steps',
  intro: `Thank you for taking the time to complete your estimate! We've received your submission and our team is currently reviewing the details.`,
  body: `This estimate is designed to provide a strong starting point based on our experience and the information you've shared, including your selections, notes, and any photos or videos. In many cases, we're able to confirm scope and budget with just a few follow-up questions. If anything needs further clarification, we'll let you know and can coordinate a walkthrough to ensure everything is fully accounted for.

Once we're aligned on scope and budget, we'll schedule a time for your project manager to meet with you on-site to take detailed measurements and walk through the project together. From there, we'll develop a clear plan along with a visual rendering so you can review and approve everything before construction begins.`,
  closing: `In the meantime, feel free to reply with any additional details you'd like us to consider.

We look forward to connecting with you soon.`,
}

interface EmailNotificationsProps {
  notificationEmail?: string
  notifyOnNewSubmission?: boolean
  estimateEmailSubject?: string
  estimateEmailIntro?: string
  estimateEmailBody?: string
  estimateEmailClosing?: string
  onUpdate: (data: {
    notificationEmail?: string
    notifyOnNewSubmission?: boolean
    estimateEmailSubject?: string
    estimateEmailIntro?: string
    estimateEmailBody?: string
    estimateEmailClosing?: string
  }) => Promise<void>
  isSaving?: boolean
}

export const EmailNotifications = ({
  notificationEmail: initialEmail = '',
  notifyOnNewSubmission: initialNotify = false,
  estimateEmailSubject: initialSubject = '',
  estimateEmailIntro: initialIntro = '',
  estimateEmailBody: initialBody = '',
  estimateEmailClosing: initialClosing = '',
  onUpdate,
  isSaving,
}: EmailNotificationsProps) => {
  const [email, setEmail] = useState(initialEmail)
  const [notify, setNotify] = useState(initialNotify)
  const [subject, setSubject] = useState(initialSubject)
  const [intro, setIntro] = useState(initialIntro)
  const [body, setBody] = useState(initialBody)
  const [closing, setClosing] = useState(initialClosing)

  useEffect(() => {
    setEmail(initialEmail)
    setNotify(initialNotify)
    setSubject(initialSubject)
    setIntro(initialIntro)
    setBody(initialBody)
    setClosing(initialClosing)
  }, [
    initialEmail,
    initialNotify,
    initialSubject,
    initialIntro,
    initialBody,
    initialClosing,
  ])

  const handleResetToDefault = () => {
    setSubject(DEFAULT_TEMPLATE.subject)
    setIntro(DEFAULT_TEMPLATE.intro)
    setBody(DEFAULT_TEMPLATE.body)
    setClosing(DEFAULT_TEMPLATE.closing)
  }

  const handleSave = () => {
    onUpdate({
      notificationEmail: email || undefined,
      notifyOnNewSubmission: notify,
      estimateEmailSubject: subject || undefined,
      estimateEmailIntro: intro || undefined,
      estimateEmailBody: body || undefined,
      estimateEmailClosing: closing || undefined,
    })
  }

  return (
    <div className="space-y-6">
      {/* 1. Admin Notifications Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Mail size={20} className="text-[#283878]" />
          <h3 className="text-lg font-semibold text-gray-900">Admin Email Notifications</h3>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admin Notification Email
            </label>
            <Input
              type="email"
              placeholder="admin@bburnbuilders.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="max-w-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              New project estimate submission alerts will be delivered to this address.
            </p>
          </div>

          <div className="flex items-center justify-between max-w-md p-3 bg-gray-50 rounded-lg border border-gray-200/80">
            <div>
              <p className="text-sm font-medium text-gray-800">Notify on new submission</p>
              <p className="text-xs text-gray-500">Send an instant alert email when a customer submits an estimate</p>
            </div>
            <Switch
              checked={notify}
              onCheckedChange={setNotify}
              aria-label="Notify on new submission"
            />
          </div>
        </div>
      </div>

      {/* 2. Client Confirmation Email Customization Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Send size={20} className="text-[#283878]" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Client Auto-Reply Email Template</h3>
              <p className="text-xs text-gray-500">
                Customize the wording on the left, and check the real-time interactive preview on the right.
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleResetToDefault}
            className="text-xs text-gray-600 hover:text-[#283878] self-start sm:self-auto"
          >
            <RotateCcw size={14} className="mr-1.5" />
            Load Approved Default Copy
          </Button>
        </div>

        {/* 2-Column Split Layout: Left Form Controls, Right Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-5">
            {/* Dynamic Tags Helper Banner */}
            <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-lg flex items-start gap-2.5 text-xs text-blue-900">
              <Info size={16} className="text-[#283878] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-[#283878]">Available Dynamic Placeholder Tags:</p>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  <span className="bg-white border border-blue-200 px-2 py-0.5 rounded-md font-mono text-[11px] text-gray-700">
                    {'{firstName}'}
                  </span>
                  <span className="bg-white border border-blue-200 px-2 py-0.5 rounded-md font-mono text-[11px] text-gray-700">
                    {'{submissionNumber}'}
                  </span>
                  <span className="bg-white border border-blue-200 px-2 py-0.5 rounded-md font-mono text-[11px] text-gray-700">
                    {'{totalAmount}'}
                  </span>
                  <span className="bg-white border border-blue-200 px-2 py-0.5 rounded-md font-mono text-[11px] text-gray-700">
                    {'{date}'}
                  </span>
                </div>
                <p className="text-gray-500 pt-1">
                  Leave any field blank to automatically use the company&apos;s approved master wording.
                </p>
              </div>
            </div>

            {/* Email Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Subject Line
              </label>
              <Input
                type="text"
                placeholder={DEFAULT_TEMPLATE.subject}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Default: <em>Your Estimate Has Been Received — Next Steps</em>
              </p>
            </div>

            {/* Intro Paragraph */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opening / Greeting Message
              </label>
              <Textarea
                rows={3}
                placeholder={DEFAULT_TEMPLATE.intro}
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                className="w-full text-sm leading-relaxed"
              />
              <p className="text-xs text-gray-500 mt-1">
                Appears directly below &ldquo;Hi {'{firstName}'},&rdquo;.
              </p>
            </div>

            {/* Main Body Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Process &amp; Scope Details (Separate paragraphs with double Enter)
              </label>
              <Textarea
                rows={6}
                placeholder={DEFAULT_TEMPLATE.body}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full text-sm leading-relaxed"
              />
              <p className="text-xs text-gray-500 mt-1">
                Explains the review process, walkthrough coordination, laser measurements, and 3D visual plan.
              </p>
            </div>

            {/* Closing Paragraph */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Closing Message (Before Signature)
              </label>
              <Textarea
                rows={3}
                placeholder={DEFAULT_TEMPLATE.closing}
                value={closing}
                onChange={(e) => setClosing(e.target.value)}
                className="w-full text-sm leading-relaxed"
              />
            </div>

            {/* Left Column Action & Notice */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <FileText size={14} className="text-gray-400 shrink-0" />
                <span>The luxury layout, logo, estimate card, and PDF attachments remain 100% unbreakable.</span>
              </div>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-[#283878] hover:bg-[#1f2d5c] text-white px-6 font-semibold shrink-0"
              >
                {isSaving ? 'Saving Changes…' : 'Save Email Settings'}
              </Button>
            </div>
          </div>

          {/* Right Column: Live Email Preview (Sticky on desktop) */}
          <div className="lg:col-span-6 xl:col-span-6 lg:sticky lg:top-6">
            <EmailTemplatePreview
              subject={subject}
              intro={intro}
              body={body}
              closing={closing}
              defaultTemplate={DEFAULT_TEMPLATE}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
