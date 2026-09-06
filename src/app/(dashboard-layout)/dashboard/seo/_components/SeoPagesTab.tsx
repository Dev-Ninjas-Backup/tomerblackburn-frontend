'use client';

import React, { useState } from 'react';
import { SeoPage, UpdateSeoPageDto } from '@/types/seo.types';
import { useUpdateSeoPage } from '@/hooks/useSeo';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  FileText,
  Save,
  Check,
  Search,
  ExternalLink,
  Sliders,
  Eye,
  AlertCircle,
} from 'lucide-react';

interface SeoPagesTabProps {
  pages: SeoPage[];
  onRefresh?: () => void;
}

export const SeoPagesTab = ({ pages = [] }: SeoPagesTabProps) => {
  const [selectedPath, setSelectedPath] = useState<string>(pages[0]?.path || '/');
  const selectedPage = pages.find((p) => p.path === selectedPath) || pages[0];

  const updateMutation = useUpdateSeoPage();

  const [formData, setFormData] = useState<UpdateSeoPageDto>({
    pageName: selectedPage?.pageName || '',
    title: selectedPage?.title || '',
    description: selectedPage?.description || '',
    keywords: selectedPage?.keywords || '',
    canonicalUrl: selectedPage?.canonicalUrl || '',
    ogImage: selectedPage?.ogImage || '',
    noIndex: selectedPage?.noIndex || false,
    noFollow: selectedPage?.noFollow || false,
    priority: selectedPage?.priority ?? 0.8,
    changeFreq: selectedPage?.changeFreq || 'weekly',
  });

  const handleSelectPage = (page: SeoPage) => {
    setSelectedPath(page.path);
    setFormData({
      pageName: page.pageName,
      title: page.title,
      description: page.description,
      keywords: page.keywords || '',
      canonicalUrl: page.canonicalUrl || '',
      ogImage: page.ogImage || '',
      noIndex: page.noIndex,
      noFollow: page.noFollow,
      priority: page.priority,
      changeFreq: page.changeFreq,
    });
  };

  const handleSave = () => {
    if (!selectedPage?.id) return;
    updateMutation.mutate({
      id: selectedPage.id,
      data: formData,
    });
  };

  const currentTitle = formData.title || '';
  const currentDesc = formData.description || '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Column: List of Pages */}
      <div className="lg:col-span-4 bg-white rounded-xl border border-gray-200 p-4 shadow-xs space-y-2">
        <div className="px-2 py-1.5 border-b border-gray-100 mb-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Public Website Pages ({pages.length})
          </h4>
        </div>

        <div className="space-y-1">
          {pages.map((page) => {
            const isSelected = page.path === selectedPath;
            return (
              <button
                key={page.id}
                type="button"
                onClick={() => handleSelectPage(page)}
                className={`w-full text-left p-3 rounded-lg text-xs transition-all flex items-center justify-between gap-2 border ${
                  isSelected
                    ? 'bg-blue-50/70 border-[#283878]/30 text-[#283878] font-bold shadow-xs'
                    : 'border-transparent hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-[13px]">{page.pageName}</p>
                  <p className="text-[11px] text-gray-400 font-mono truncate">{page.path}</p>
                </div>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0 ${
                    page.noIndex
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {page.noIndex ? 'No-Index' : 'Indexed'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Page SEO Editor & Live Preview */}
      <div className="lg:col-span-8 space-y-6">
        {/* Editor Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-gray-100 text-[#283878] font-bold">
                  {selectedPath}
                </span>
                <h3 className="text-base font-bold text-gray-900">
                  Editing: {formData.pageName || selectedPage?.pageName}
                </h3>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Customize the title tag, meta description, and crawler rules for this specific URL.
              </p>
            </div>

            <Button
              onClick={handleSave}
              disabled={updateMutation.isPending}
              size="sm"
              className="bg-[#283878] hover:bg-[#1f2d5c] text-white font-semibold text-xs gap-1.5 self-start sm:self-auto shadow-xs"
            >
              <Save size={14} />
              {updateMutation.isPending ? 'Saving…' : 'Save Page SEO'}
            </Button>
          </div>

          {/* Page Display Name & Path */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Internal Page Name
              </label>
              <Input
                type="text"
                value={formData.pageName || ''}
                onChange={(e) => setFormData({ ...formData, pageName: e.target.value })}
                className="text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Canonical URL Override (Optional)
              </label>
              <Input
                type="text"
                placeholder={`https://bburnbuilders.com${selectedPath === '/' ? '' : selectedPath}`}
                value={formData.canonicalUrl || ''}
                onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                className="text-xs"
              />
            </div>
          </div>

          {/* Page Title Tag */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-gray-700">
                SEO Meta Title Tag*
              </label>
              <span
                className={`text-[11px] font-bold ${
                  currentTitle.length >= 50 && currentTitle.length <= 60
                    ? 'text-emerald-600'
                    : currentTitle.length > 60
                    ? 'text-rose-600'
                    : 'text-amber-600'
                }`}
              >
                {currentTitle.length} / 60 characters
              </span>
            </div>
            <Input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="text-sm font-medium"
            />
            <p className="text-[11px] text-gray-500 mt-1">
              Recommended: 50-60 characters. Must clearly highlight target keywords and brand identity.
            </p>
          </div>

          {/* Meta Description */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-gray-700">
                SEO Meta Description*
              </label>
              <span
                className={`text-[11px] font-bold ${
                  currentDesc.length >= 130 && currentDesc.length <= 160
                    ? 'text-emerald-600'
                    : currentDesc.length > 160
                    ? 'text-rose-600'
                    : 'text-amber-600'
                }`}
              >
                {currentDesc.length} / 160 characters
              </span>
            </div>
            <Textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="text-xs leading-relaxed"
            />
            <p className="text-[11px] text-gray-500 mt-1">
              Recommended: 140-160 characters. Provide a compelling pitch to drive clicks from Google search results.
            </p>
          </div>

          {/* Focus Keywords */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Focus Target Keywords (Comma separated)
            </label>
            <Input
              type="text"
              placeholder="remodeling chicago, bathroom renovation, luxury general contractor"
              value={formData.keywords || ''}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              className="text-xs"
            />
          </div>

          {/* Advanced Crawler & Sitemap Options */}
          <div className="p-4 bg-gray-50/70 border border-gray-200 rounded-xl space-y-4">
            <h5 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders size={14} className="text-[#283878]" />
              Crawler Directives &amp; Sitemap Settings
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-gray-200">
                <div>
                  <p className="font-semibold text-gray-800">No-Index Directive</p>
                  <p className="text-[11px] text-gray-500">Hide page from Google search results</p>
                </div>
                <Switch
                  checked={formData.noIndex || false}
                  onCheckedChange={(val) => setFormData({ ...formData, noIndex: val })}
                />
              </div>

              <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-gray-200">
                <div>
                  <p className="font-semibold text-gray-800">No-Follow Directive</p>
                  <p className="text-[11px] text-gray-500">Instruct bots not to follow links</p>
                </div>
                <Switch
                  checked={formData.noFollow || false}
                  onCheckedChange={(val) => setFormData({ ...formData, noFollow: val })}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Sitemap Priority (0.1 - 1.0)
                </label>
                <select
                  value={formData.priority ?? 0.8}
                  onChange={(e) => setFormData({ ...formData, priority: parseFloat(e.target.value) })}
                  className="w-full border border-gray-300 rounded-md p-1.5 text-xs bg-white"
                >
                  <option value={1.0}>1.0 (Highest - Homepage)</option>
                  <option value={0.9}>0.9 (Very High - Core Estimator)</option>
                  <option value={0.8}>0.8 (High - Portfolio &amp; Services)</option>
                  <option value={0.7}>0.7 (Standard - About &amp; Contact)</option>
                  <option value={0.5}>0.5 (Medium)</option>
                  <option value={0.3}>0.3 (Low - Legal &amp; Policies)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Sitemap Change Frequency
                </label>
                <select
                  value={formData.changeFreq || 'weekly'}
                  onChange={(e) => setFormData({ ...formData, changeFreq: e.target.value })}
                  className="w-full border border-gray-300 rounded-md p-1.5 text-xs bg-white"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Google Result Simulation for Selected Page */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">
            <Eye size={14} className="text-[#283878]" />
            Live Search Result Preview for {selectedPath}
          </div>

          <div className="bg-[#f8fafc] border border-gray-200 rounded-xl p-4 space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-white border border-gray-200 flex items-center justify-center p-0.5">
                <img src="/logo.png" alt="favicon" className="w-full h-full object-contain" />
              </div>
              <span className="text-[12px] text-gray-800">
                bburnbuilders.com{selectedPath === '/' ? '' : selectedPath}
              </span>
            </div>
            <h4 className="text-[17px] text-[#1a0dab] font-medium leading-snug">
              {currentTitle || 'Untitled Page — BBurn Builders'}
            </h4>
            <p className="text-[13px] text-[#4d5156] leading-relaxed">
              {currentDesc || 'No meta description configured for this page yet.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
