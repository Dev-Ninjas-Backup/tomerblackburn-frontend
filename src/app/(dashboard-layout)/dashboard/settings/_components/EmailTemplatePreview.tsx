'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Eye, Monitor, Smartphone, Paperclip, CheckCircle2, MessageSquare, Phone } from 'lucide-react'

interface EmailTemplatePreviewProps {
  subject: string
  intro: string
  body: string
  closing: string
  defaultTemplate: {
    subject: string
    intro: string
    body: string
    closing: string
  }
}

const MOCK_DATA = {
  firstName: 'John',
  submissionNumber: 'EST-2026-0842',
  totalAmount: '$48,500.00',
  date: 'September 6, 2026',
  clientEmail: 'john.doe@example.com',
}

export const EmailTemplatePreview = ({
  subject,
  intro,
  body,
  closing,
  defaultTemplate,
}: EmailTemplatePreviewProps) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')

  const effectiveSubject = subject?.trim() || defaultTemplate.subject
  const effectiveIntro = intro?.trim() || defaultTemplate.intro
  const effectiveBody = body?.trim() || defaultTemplate.body
  const effectiveClosing = closing?.trim() || defaultTemplate.closing

  const replacePlaceholders = (text: string) => {
    return text
      .replace(/{firstName}/gi, MOCK_DATA.firstName)
      .replace(/{submissionNumber}/gi, MOCK_DATA.submissionNumber)
      .replace(/{totalAmount}/gi, MOCK_DATA.totalAmount)
      .replace(/{date}/gi, MOCK_DATA.date)
  }

  const renderParagraphs = (rawText: string) => {
    const interpolated = replacePlaceholders(rawText)
    return interpolated
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p, index) => (
        <p key={index} className="text-[#334155] text-[13.5px] sm:text-[14px] leading-relaxed mb-3 last:mb-0">
          {p.split('\n').map((line, lIdx, arr) => (
            <React.Fragment key={lIdx}>
              {line}
              {lIdx < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      ))
  }

  return (
    <div className="flex flex-col bg-gray-100/90 rounded-xl border border-gray-300/80 shadow-xs overflow-hidden">
      {/* Top Preview Control Header */}
      <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <Eye size={14} className="text-blue-400" />
          <span className="font-medium tracking-wide text-gray-200">Live Client Email Preview</span>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-md border border-slate-700">
          <button
            type="button"
            onClick={() => setViewMode('desktop')}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-all ${
              viewMode === 'desktop'
                ? 'bg-[#283878] text-white shadow-xs'
                : 'text-gray-400 hover:text-gray-200'
            }`}
            title="Desktop View"
          >
            <Monitor size={12} />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-all ${
              viewMode === 'mobile'
                ? 'bg-[#283878] text-white shadow-xs'
                : 'text-gray-400 hover:text-gray-200'
            }`}
            title="Mobile View"
          >
            <Smartphone size={12} />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>
      </div>

      {/* Email Client Simulated Metadata Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2.5 text-xs text-gray-600 space-y-1">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-gray-800 shrink-0">Subject:</span>
          <span className="text-[#283878] font-medium truncate">
            {replacePlaceholders(effectiveSubject)}
          </span>
        </div>
        <div className="flex items-center justify-between text-[11px] text-gray-500">
          <span>
            <strong className="text-gray-700">From:</strong> BBurn Builders &lt;estimates@bburnbuilders.com&gt;
          </span>
          <span>
            <strong className="text-gray-700">To:</strong> {MOCK_DATA.clientEmail}
          </span>
        </div>
      </div>

      {/* Rendered Email Container */}
      <div className="p-3 sm:p-4 bg-gray-100 overflow-y-auto max-h-[640px]">
        <div
          className={`mx-auto bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 transition-all duration-300 ${
            viewMode === 'mobile' ? 'max-w-[360px]' : 'max-w-[560px]'
          }`}
        >
          {/* Email Navy Blue Header */}
          <div className="bg-[#283878] px-5 py-4 border-b-2 border-[#d4af37]">
            <div className="flex items-center justify-center gap-3.5">
              <div className="w-10 h-10 bg-white rounded-lg p-1.5 flex items-center justify-center shrink-0 shadow-sm">
                <img
                  src="/logo.png"
                  alt="BBurn Builders"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-left">
                <h1 className="text-white font-extrabold text-[15px] sm:text-[17px] tracking-[1.5px] uppercase leading-tight">
                  BBURN BUILDERS
                </h1>
                <p className="text-[#d4af37] font-semibold text-[9px] sm:text-[9.5px] tracking-[1.2px] uppercase mt-0.5">
                  Premier Custom Remodeling &amp; Construction
                </p>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-[#f8fafc] border-b border-gray-200 px-5 py-2.5 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold uppercase tracking-wider text-[10px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Estimate Received &bull; Under Review</span>
            </div>
            <div className="text-gray-500 text-[11px] font-medium">
              Ref: <strong className="text-[#283878]">#{MOCK_DATA.submissionNumber}</strong>
            </div>
          </div>

          {/* Email Main Content */}
          <div className="p-5 sm:p-6 space-y-4">
            {/* Greeting */}
            <h2 className="text-[#283878] font-bold text-base">
              Hi {MOCK_DATA.firstName},
            </h2>

            {/* Custom/Default Intro */}
            <div>{renderParagraphs(effectiveIntro)}</div>

            {/* Custom/Default Body */}
            <div>{renderParagraphs(effectiveBody)}</div>

            {/* Custom/Default Closing */}
            <div>{renderParagraphs(effectiveClosing)}</div>

            {/* Estimate Overview Card */}
            <div className="rounded-lg border border-gray-200 bg-[#f8fafc] overflow-hidden my-4">
              <div className="bg-gray-100/90 px-3.5 py-2 border-b border-gray-200 flex items-center gap-1.5">
                <span className="text-xs">📋</span>
                <span className="text-[#283878] font-bold text-[11px] uppercase tracking-wider">
                  Project Estimate Overview
                </span>
              </div>
              <div className="p-3.5 space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-gray-500">Estimate Number:</span>
                  <span className="text-[#283878] font-bold">{MOCK_DATA.submissionNumber}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-gray-500">Submission Date:</span>
                  <span className="text-[#283878] font-semibold">{MOCK_DATA.date}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-gray-600 font-medium">Estimated Total:</span>
                  <span className="text-[#283878] font-extrabold text-sm sm:text-base">
                    {MOCK_DATA.totalAmount}
                  </span>
                </div>
              </div>
            </div>

            {/* Executive Process Roadmap */}
            <div className="pt-2">
              <h3 className="text-[#283878] font-extrabold text-xs uppercase tracking-wider border-l-2 border-[#283878] pl-2 mb-3">
                What Happens Next?
              </h3>

              <div className="space-y-2.5">
                {/* Step 1 */}
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 bg-[#283878] text-white rounded text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    01
                  </div>
                  <div>
                    <h4 className="text-[#283878] font-bold text-xs">Scope &amp; Budget Review</h4>
                    <p className="text-gray-500 text-[11px] leading-tight mt-0.5">
                      We analyze your selections, notes, and photos to confirm scope and clarify details.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 bg-[#283878] text-white rounded text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    02
                  </div>
                  <div>
                    <h4 className="text-[#283878] font-bold text-xs">On-Site Walkthrough &amp; Measurements</h4>
                    <p className="text-gray-500 text-[11px] leading-tight mt-0.5">
                      Your Project Manager visits on-site for laser measurements and space evaluation.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 bg-[#283878] text-white rounded text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    03
                  </div>
                  <div>
                    <h4 className="text-[#283878] font-bold text-xs">3D Visual Rendering &amp; Final Build Plan</h4>
                    <p className="text-gray-500 text-[11px] leading-tight mt-0.5">
                      We craft detailed 3D renderings and comprehensive plans for your review and approval.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Attachments Notice */}
            <div className="bg-[#f8fafc] border border-gray-200 border-l-4 border-l-[#283878] rounded-md p-3 flex items-start gap-2 text-xs">
              <Paperclip size={16} className="text-[#283878] shrink-0 mt-0.5" />
              <div>
                <p className="text-[#283878] font-bold text-[11px]">2 Attached Documents:</p>
                <p className="text-gray-600 text-[11px] mt-0.5 leading-snug">
                  1. <strong>{MOCK_DATA.submissionNumber}-estimate.pdf</strong> (Line-item breakdown)<br />
                  2. <strong>BBurn_Builders_Guide.pdf</strong> (Project roadmap &amp; timeline guide)
                </p>
              </div>
            </div>

            {/* Action Buttons Mock */}
            <div className="flex flex-wrap gap-2 pt-1 pb-2 justify-center">
              <div className="bg-[#283878] text-white text-[11px] font-bold px-3 py-1.5 rounded-md flex items-center gap-1 shadow-xs cursor-default">
                <MessageSquare size={12} />
                <span>Reply to this Email</span>
              </div>
              <div className="bg-[#f8fafc] border border-gray-300 text-[#283878] text-[11px] font-bold px-3 py-1.5 rounded-md flex items-center gap-1 cursor-default">
                <Phone size={12} />
                <span>Call 773-403-9950</span>
              </div>
            </div>

            {/* Founder Signature */}
            <div className="border-t border-gray-200 pt-3 text-xs space-y-0.5">
              <p className="text-gray-500 text-[11px]">Best,</p>
              <p className="text-[#283878] font-extrabold text-xs">Tomer Blackburn</p>
              <p className="text-gray-500 text-[11px]">Owner &bull; BBurn Builders</p>
              <p className="text-[#283878] font-medium text-[10px] pt-1">
                @bburnbuilders &bull; 773-403-9950
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-[#f8fafc] border-t border-gray-200 px-4 py-3 text-center text-[10px] text-gray-400 space-y-1">
            <p>
              &copy; 2026 BBurn Builders LLC. Licensed, Bonded &amp; Insured.
            </p>
            <p className="text-[9px] text-gray-400">
              Chicago, IL &bull; bburnbuilders.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
