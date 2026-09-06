'use client';

import React, { useState, useEffect } from 'react';
import { SeoSettings, UpdateSeoSettingsDto } from '@/types/seo.types';
import { useUpdateGlobalSeo } from '@/hooks/useSeo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Wrench, Save, ExternalLink, Activity, FileCode } from 'lucide-react';

interface SeoIntegrationsTabProps {
  settings?: SeoSettings;
}

export const SeoIntegrationsTab = ({ settings }: SeoIntegrationsTabProps) => {
  const updateMutation = useUpdateGlobalSeo();

  const [formData, setFormData] = useState<UpdateSeoSettingsDto>({
    googleSiteVerification: settings?.googleSiteVerification || '',
    bingSiteVerification: settings?.bingSiteVerification || '',
    googleAnalyticsId: settings?.googleAnalyticsId || '',
    googleTagManagerId: settings?.googleTagManagerId || '',
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        googleSiteVerification: settings.googleSiteVerification || '',
        bingSiteVerification: settings.bingSiteVerification || '',
        googleAnalyticsId: settings.googleAnalyticsId || '',
        googleTagManagerId: settings.googleTagManagerId || '',
      });
    }
  }, [settings]);

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      {/* Verification & Analytics Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <Wrench size={20} className="text-[#283878]" />
              <h3 className="text-base font-bold text-gray-900">Webmaster &amp; Analytics Integrations</h3>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Connect Google Search Console, Bing Webmaster, GA4, and Google Tag Manager.
            </p>
          </div>
          <Button
            onClick={handleSave}
            disabled={updateMutation.isPending}
            className="bg-[#283878] hover:bg-[#1f2d5c] text-white font-semibold text-xs px-5 shadow-xs"
          >
            <Save size={14} className="mr-1.5" />
            {updateMutation.isPending ? 'Saving…' : 'Save Integrations'}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          {/* Google Search Console */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <label className="block font-bold text-gray-800">
              Google Search Console Verification Code
            </label>
            <Input
              type="text"
              placeholder="e.g. 4v9hQ8B1_xR3wK0..."
              value={formData.googleSiteVerification || ''}
              onChange={(e) => setFormData({ ...formData, googleSiteVerification: e.target.value })}
              className="text-xs font-mono bg-white"
            />
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Find this in Search Console &gt; Settings &gt; Ownership verification &gt; HTML tag.
            </p>
          </div>

          {/* Bing Webmaster */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <label className="block font-bold text-gray-800">
              Bing Webmaster Verification Code
            </label>
            <Input
              type="text"
              placeholder="e.g. 7A1F2B3C4D5E..."
              value={formData.bingSiteVerification || ''}
              onChange={(e) => setFormData({ ...formData, bingSiteVerification: e.target.value })}
              className="text-xs font-mono bg-white"
            />
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Allows verifying site ownership in Bing Webmaster Tools without editing DNS records.
            </p>
          </div>

          {/* Google Analytics 4 */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <label className="block font-bold text-gray-800">
              Google Analytics 4 (GA4) Measurement ID
            </label>
            <Input
              type="text"
              placeholder="G-XXXXXXXXXX"
              value={formData.googleAnalyticsId || ''}
              onChange={(e) => setFormData({ ...formData, googleAnalyticsId: e.target.value })}
              className="text-xs font-mono bg-white"
            />
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Injects Google Analytics gtag.js script to track visitors, conversions, and estimator engagement.
            </p>
          </div>

          {/* Google Tag Manager */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
            <label className="block font-bold text-gray-800">
              Google Tag Manager (GTM) Container ID
            </label>
            <Input
              type="text"
              placeholder="GTM-XXXXXXX"
              value={formData.googleTagManagerId || ''}
              onChange={(e) => setFormData({ ...formData, googleTagManagerId: e.target.value })}
              className="text-xs font-mono bg-white"
            />
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Deploy marketing tags, Meta Pixel, and conversion trackers through Google Tag Manager.
            </p>
          </div>
        </div>
      </div>

      {/* Direct Diagnostics & Live File Links */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
        <h4 className="text-sm font-bold text-gray-900 pb-2 border-b border-gray-100 flex items-center gap-2">
          <FileCode size={16} className="text-[#283878]" />
          Live Search Engine Endpoints &amp; Diagnostic Tools
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 hover:border-[#283878] hover:bg-blue-50/50 transition-all text-gray-800 group"
          >
            <div>
              <p className="font-bold group-hover:text-[#283878]">Live XML Sitemap</p>
              <p className="text-[11px] text-gray-500 font-mono">/sitemap.xml</p>
            </div>
            <ExternalLink size={14} className="text-gray-400 group-hover:text-[#283878]" />
          </a>

          <a
            href="/robots.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 hover:border-[#283878] hover:bg-blue-50/50 transition-all text-gray-800 group"
          >
            <div>
              <p className="font-bold group-hover:text-[#283878]">Live Robots.txt</p>
              <p className="text-[11px] text-gray-500 font-mono">/robots.txt</p>
            </div>
            <ExternalLink size={14} className="text-gray-400 group-hover:text-[#283878]" />
          </a>

          <a
            href="https://search.google.com/test/rich-results"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 hover:border-emerald-600 hover:bg-emerald-50/50 transition-all text-gray-800 group"
          >
            <div>
              <p className="font-bold group-hover:text-emerald-700">Google Rich Results Test</p>
              <p className="text-[11px] text-gray-500">Validate Schema.org</p>
            </div>
            <ExternalLink size={14} className="text-gray-400 group-hover:text-emerald-700" />
          </a>
        </div>
      </div>
    </div>
  );
};
