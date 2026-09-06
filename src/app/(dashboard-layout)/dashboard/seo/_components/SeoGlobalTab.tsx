'use client';

import React, { useState, useEffect } from 'react';
import { SeoSettings, UpdateSeoSettingsDto } from '@/types/seo.types';
import { useUpdateGlobalSeo } from '@/hooks/useSeo';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Globe, Save, Info, ShieldAlert } from 'lucide-react';

interface SeoGlobalTabProps {
  settings?: SeoSettings;
}

export const SeoGlobalTab = ({ settings }: SeoGlobalTabProps) => {
  const updateMutation = useUpdateGlobalSeo();

  const [formData, setFormData] = useState<UpdateSeoSettingsDto>({
    siteName: settings?.siteName || 'BBurn Builders',
    titleTemplate: settings?.titleTemplate || '%s | BBurn Builders',
    defaultTitle: settings?.defaultTitle || '',
    defaultDescription: settings?.defaultDescription || '',
    defaultKeywords: settings?.defaultKeywords || '',
    siteUrl: settings?.siteUrl || 'https://bburnbuilders.com',
    canonicalUrl: settings?.canonicalUrl || 'https://bburnbuilders.com',
    twitterHandle: settings?.twitterHandle || '@bburnbuilders',
    ogImageUrl: settings?.ogImageUrl || '',
    robotsIndex: settings?.robotsIndex ?? true,
    robotsFollow: settings?.robotsFollow ?? true,
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        siteName: settings.siteName || 'BBurn Builders',
        titleTemplate: settings.titleTemplate || '%s | BBurn Builders',
        defaultTitle: settings.defaultTitle || '',
        defaultDescription: settings.defaultDescription || '',
        defaultKeywords: settings.defaultKeywords || '',
        siteUrl: settings.siteUrl || 'https://bburnbuilders.com',
        canonicalUrl: settings.canonicalUrl || 'https://bburnbuilders.com',
        twitterHandle: settings.twitterHandle || '@bburnbuilders',
        ogImageUrl: settings.ogImageUrl || '',
        robotsIndex: settings.robotsIndex ?? true,
        robotsFollow: settings.robotsFollow ?? true,
      });
    }
  }, [settings]);

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <Globe size={20} className="text-[#283878]" />
            <h3 className="text-base font-bold text-gray-900">Global SEO &amp; Brand Defaults</h3>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            These master fallback values apply across all pages that do not have custom overrides.
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={updateMutation.isPending}
          className="bg-[#283878] hover:bg-[#1f2d5c] text-white font-semibold text-xs px-5 shadow-xs"
        >
          <Save size={14} className="mr-1.5" />
          {updateMutation.isPending ? 'Saving…' : 'Save Global Settings'}
        </Button>
      </div>

      <div className="space-y-5">
        {/* Site Name & Title Template */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Website Brand Name*
            </label>
            <Input
              type="text"
              value={formData.siteName || ''}
              onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
              className="text-xs font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Title Pattern Template (Next.js)
            </label>
            <Input
              type="text"
              placeholder="%s | BBurn Builders"
              value={formData.titleTemplate || ''}
              onChange={(e) => setFormData({ ...formData, titleTemplate: e.target.value })}
              className="text-xs font-mono"
            />
            <p className="text-[11px] text-gray-500 mt-1">
              <code>%s</code> is automatically replaced by each page title.
            </p>
          </div>
        </div>

        {/* Master Default Title */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Master Default SEO Title Tag*
          </label>
          <Input
            type="text"
            value={formData.defaultTitle || ''}
            onChange={(e) => setFormData({ ...formData, defaultTitle: e.target.value })}
            className="text-sm font-medium"
          />
        </div>

        {/* Master Default Description */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Master Default Meta Description*
          </label>
          <Textarea
            rows={3}
            value={formData.defaultDescription || ''}
            onChange={(e) => setFormData({ ...formData, defaultDescription: e.target.value })}
            className="text-xs leading-relaxed"
          />
        </div>

        {/* Master Keywords */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Master Target Keywords
          </label>
          <Input
            type="text"
            value={formData.defaultKeywords || ''}
            onChange={(e) => setFormData({ ...formData, defaultKeywords: e.target.value })}
            className="text-xs"
          />
        </div>

        {/* Canonical Site URL & Social Handle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Production Canonical URL*
            </label>
            <Input
              type="url"
              value={formData.siteUrl || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  siteUrl: e.target.value,
                  canonicalUrl: e.target.value,
                })
              }
              className="text-xs font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Twitter / X Profile Handle
            </label>
            <Input
              type="text"
              placeholder="@bburnbuilders"
              value={formData.twitterHandle || ''}
              onChange={(e) => setFormData({ ...formData, twitterHandle: e.target.value })}
              className="text-xs font-mono"
            />
          </div>
        </div>

        {/* Default OpenGraph Image URL */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Default Social Share (OpenGraph) Image URL
          </label>
          <Input
            type="text"
            placeholder="https://bburnbuilders.com/logo.png"
            value={formData.ogImageUrl || ''}
            onChange={(e) => setFormData({ ...formData, ogImageUrl: e.target.value })}
            className="text-xs font-mono"
          />
          <p className="text-[11px] text-gray-500 mt-1">
            Displays on Facebook, LinkedIn, iMessage, and Twitter when someone shares any page of your website.
          </p>
        </div>

        {/* Global Search Visibility Toggle */}
        <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldAlert size={18} className="text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-amber-900">
                Site-Wide Search Engine Indexing (Robots Meta)
              </p>
              <p className="text-[11px] text-amber-700 mt-0.5 leading-relaxed">
                When enabled, Google and other search engines are instructed to crawl and index your entire website. Turn off only during staging or private maintenance.
              </p>
            </div>
          </div>
          <Switch
            checked={formData.robotsIndex ?? true}
            onCheckedChange={(val) => setFormData({ ...formData, robotsIndex: val })}
          />
        </div>
      </div>
    </div>
  );
};
