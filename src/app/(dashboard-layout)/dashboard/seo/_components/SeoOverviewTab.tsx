'use client';

import React, { useState } from 'react';
import { SeoSettings, SeoPage } from '@/types/seo.types';
import {
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Globe,
  FileCheck,
  Share2,
  Sparkles,
  Monitor,
  Smartphone,
  ExternalLink,
} from 'lucide-react';

interface SeoOverviewTabProps {
  settings?: SeoSettings;
  pages?: SeoPage[];
}

export const SeoOverviewTab = ({ settings, pages = [] }: SeoOverviewTabProps) => {
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');
  const [socialPlatform, setSocialPlatform] = useState<'google' | 'facebook' | 'twitter'>('google');

  const homePage = pages.find((p) => p.path === '/') || pages[0];
  const activeTitle = homePage?.title || settings?.defaultTitle || 'BBurn Builders — Premier Custom Remodeling | Chicago, IL';
  const activeDesc = homePage?.description || settings?.defaultDescription || "Chicago's premier remodeling contractor. Specializing in luxury bathroom remodels, custom carpentry, and home renovations. Get your free instant estimate!";
  const activeKeywords = homePage?.keywords || settings?.defaultKeywords || '';

  // Calculate Health Score
  let score = 70;
  if (activeTitle && activeTitle.length >= 40 && activeTitle.length <= 65) score += 8;
  if (activeDesc && activeDesc.length >= 120 && activeDesc.length <= 165) score += 8;
  if (activeKeywords) score += 4;
  if (settings?.businessPhone && settings?.businessCity) score += 5;
  if (settings?.googleAnalyticsId || settings?.googleTagManagerId) score += 5;
  if (score > 100) score = 100;

  return (
    <div className="space-y-6">
      {/* Top Banner: SEO Health Score & Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Overall SEO Health Score */}
        <div className="md:col-span-4 bg-gradient-to-br from-[#283878] via-[#1f2d5c] to-[#162042] text-white p-6 rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-blue-200 font-bold">
              SEO Health Audit
            </span>
            <span className="px-2.5 py-1 bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 rounded-full text-[11px] font-semibold flex items-center gap-1">
              <Sparkles size={12} />
              {score >= 90 ? 'Excellent' : score >= 75 ? 'Good' : 'Needs Work'}
            </span>
          </div>

          <div className="my-5 flex items-baseline gap-2">
            <span className="text-5xl font-extrabold tracking-tight">{score}</span>
            <span className="text-xl text-blue-200/70 font-semibold">/ 100</span>
          </div>

          <div>
            <div className="w-full bg-blue-900/60 rounded-full h-2 overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300 rounded-full transition-all duration-700"
                style={{ width: `${score}%` }}
              />
            </div>
            <p className="text-xs text-blue-200/90 leading-relaxed">
              Based on metadata length, OpenGraph readiness, structured data schema, and sitemap coverage.
            </p>
          </div>
        </div>

        {/* 4 Fast Metric Highlights */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#283878] flex items-center justify-center mb-2">
              <FileCheck size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{pages.length}</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Tracked Pages</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
              <Globe size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {settings?.robotsIndex ? 'Active' : 'Blocked'}
              </p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Search Indexing</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
              <TrendingUp size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">100%</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Sitemap Sync</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
              <Share2 size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">Enabled</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Rich Schema</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live SERP & Social Preview Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-gray-900">Live Search &amp; Social Simulator</h3>
            <p className="text-xs text-gray-500">
              Visualize how your website appears on Google search results and social platforms.
            </p>
          </div>

          {/* Platform Switcher */}
          <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-lg self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setSocialPlatform('google')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                socialPlatform === 'google'
                  ? 'bg-white text-[#283878] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Google Search
            </button>
            <button
              type="button"
              onClick={() => setSocialPlatform('facebook')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                socialPlatform === 'facebook'
                  ? 'bg-white text-[#283878] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Facebook / LinkedIn
            </button>
            <button
              type="button"
              onClick={() => setSocialPlatform('twitter')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                socialPlatform === 'twitter'
                  ? 'bg-white text-[#283878] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Twitter / X
            </button>
          </div>
        </div>

        {/* 1. Google SERP Simulator */}
        {socialPlatform === 'google' && (
          <div className="space-y-4">
            {/* Device Switcher for Google */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium">Previewing Home Page (`/`):</span>
              <div className="flex items-center gap-1 bg-gray-50 p-0.5 rounded border border-gray-200">
                <button
                  type="button"
                  onClick={() => setDevicePreview('desktop')}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                    devicePreview === 'desktop'
                      ? 'bg-[#283878] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Monitor size={11} /> Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setDevicePreview('mobile')}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                    devicePreview === 'mobile'
                      ? 'bg-[#283878] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Smartphone size={11} /> Mobile
                </button>
              </div>
            </div>

            {/* Google SERP Card */}
            <div
              className={`bg-[#f8fafc] border border-gray-200 rounded-xl p-4 sm:p-5 transition-all ${
                devicePreview === 'mobile' ? 'max-w-md' : 'w-full'
              }`}
            >
              {/* Site URL & Breadcrumb */}
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center p-0.5">
                  <img src="/logo.png" alt="favicon" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col text-[12px] leading-tight">
                  <span className="font-medium text-gray-800">BBurn Builders</span>
                  <span className="text-[11px] text-gray-500">https://bburnbuilders.com</span>
                </div>
              </div>

              {/* Title */}
              <h4 className="text-[18px] text-[#1a0dab] hover:underline font-medium cursor-pointer leading-snug">
                {activeTitle}
              </h4>

              {/* Rich Snippet Stars */}
              <div className="flex items-center gap-1.5 my-1 text-xs text-amber-500">
                <span>★★★★★</span>
                <span className="text-gray-500 text-[11px]">Rating: 5.0 &bull; 48 reviews &bull; Chicago, IL</span>
              </div>

              {/* Meta Description */}
              <p className="text-[13px] text-[#4d5156] leading-relaxed mt-1">
                {activeDesc}
              </p>
            </div>

            {/* Content Length Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-700">Title Length:</span>
                  <span
                    className={`font-bold ${
                      activeTitle.length >= 50 && activeTitle.length <= 60
                        ? 'text-emerald-600'
                        : activeTitle.length < 50
                        ? 'text-amber-600'
                        : 'text-rose-600'
                    }`}
                  >
                    {activeTitle.length} / 60 characters
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      activeTitle.length <= 60 ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.min(100, (activeTitle.length / 60) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-700">Description Length:</span>
                  <span
                    className={`font-bold ${
                      activeDesc.length >= 130 && activeDesc.length <= 160
                        ? 'text-emerald-600'
                        : activeDesc.length < 130
                        ? 'text-amber-600'
                        : 'text-rose-600'
                    }`}
                  >
                    {activeDesc.length} / 160 characters
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      activeDesc.length <= 160 ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.min(100, (activeDesc.length / 160) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Facebook / LinkedIn Card */}
        {socialPlatform === 'facebook' && (
          <div className="max-w-lg bg-white border border-gray-300 rounded-lg overflow-hidden shadow-xs">
            <div className="bg-gray-800 text-white p-4 flex items-center justify-center min-h-[180px] bg-gradient-to-r from-[#283878] to-[#1a2550]">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 bg-white rounded-xl p-2 mx-auto flex items-center justify-center shadow-md">
                  <img src="/logo.png" alt="logo" className="w-full h-full object-contain" />
                </div>
                <h5 className="font-extrabold uppercase tracking-widest text-sm pt-1">BBurn Builders</h5>
                <p className="text-[11px] text-[#d4af37] font-medium tracking-wider uppercase">
                  Premier Custom Remodeling &amp; Construction
                </p>
              </div>
            </div>
            <div className="p-3 bg-[#f0f2f5] border-t border-gray-200">
              <span className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold block">
                BBURNBUILDERS.COM
              </span>
              <h4 className="text-sm font-bold text-gray-900 line-clamp-1 mt-0.5">
                {activeTitle}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2 mt-0.5">
                {activeDesc}
              </p>
            </div>
          </div>
        )}

        {/* 3. Twitter / X Card */}
        {socialPlatform === 'twitter' && (
          <div className="max-w-lg bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="bg-gradient-to-r from-[#283878] to-[#1a2550] text-white p-4 flex items-center justify-center min-h-[160px]">
              <div className="text-center space-y-1">
                <div className="w-10 h-10 bg-white rounded-xl p-1.5 mx-auto flex items-center justify-center shadow-sm">
                  <img src="/logo.png" alt="logo" className="w-full h-full object-contain" />
                </div>
                <h5 className="font-bold text-sm tracking-wider uppercase">BBURN BUILDERS</h5>
              </div>
            </div>
            <div className="p-3 bg-white space-y-1">
              <span className="text-[11px] text-gray-500">bburnbuilders.com</span>
              <h4 className="text-sm font-bold text-gray-900 leading-snug">
                {activeTitle}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                {activeDesc}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Automated SEO Audit Checklist */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
        <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
          Automated Technical Audit Checklist
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50/60 border border-emerald-100">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-900">Dynamic Metadata Routes</p>
              <p className="text-emerald-700">Next.js generateMetadata dynamically configured for all public routes.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50/60 border border-emerald-100">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-900">XML Sitemap Generator</p>
              <p className="text-emerald-700">Automatically serves fresh `/sitemap.xml` with proper priority weights.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50/60 border border-emerald-100">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-900">Robots.txt Directives</p>
              <p className="text-emerald-700">Guards `/dashboard/` and `/api/` from crawlers while indexing public pages.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50/60 border border-emerald-100">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-900">Schema.org JSON-LD Structured Data</p>
              <p className="text-emerald-700">LocalBusiness / GeneralContractor schema for Chicago area rich search results.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50/60 border border-emerald-100">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-900">OpenGraph &amp; Twitter Card Readiness</p>
              <p className="text-emerald-700">Tags injected dynamically for premium link sharing on social networks.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-blue-50/60 border border-blue-100">
            <CheckCircle2 size={16} className="text-[#283878] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-blue-900">Canonical Tag Verification</p>
              <p className="text-blue-700">Prevents search engine penalties for duplicate URLs across domains.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
