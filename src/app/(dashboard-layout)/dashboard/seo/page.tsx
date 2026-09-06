'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SearchCheck,
  BarChart3,
  FileText,
  Globe,
  MapPin,
  Wrench,
  RefreshCw,
} from 'lucide-react';
import { useGlobalSeo, useSeoPages } from '@/hooks/useSeo';
import { SeoOverviewTab } from './_components/SeoOverviewTab';
import { SeoPagesTab } from './_components/SeoPagesTab';
import { SeoGlobalTab } from './_components/SeoGlobalTab';
import { SeoSchemaTab } from './_components/SeoSchemaTab';
import { SeoIntegrationsTab } from './_components/SeoIntegrationsTab';
import { Button } from '@/components/ui/button';

type TabKey = 'overview' | 'pages' | 'global' | 'schema' | 'integrations';

export default function SeoManagementPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  const { data: globalSettings, isLoading: isGlobalLoading, refetch: refetchGlobal } = useGlobalSeo();
  const { data: pages, isLoading: isPagesLoading, refetch: refetchPages } = useSeoPages();

  const handleRefresh = () => {
    refetchGlobal();
    refetchPages();
  };

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Overview & Audit', icon: <BarChart3 size={15} /> },
    { key: 'pages', label: 'Page-by-Page SEO', icon: <FileText size={15} /> },
    { key: 'global', label: 'Global Defaults', icon: <Globe size={15} /> },
    { key: 'schema', label: 'Local Business Schema', icon: <MapPin size={15} /> },
    { key: 'integrations', label: 'Webmaster & Analytics', icon: <Wrench size={15} /> },
  ];

  const isLoading = isGlobalLoading || isPagesLoading;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#283878] shadow-xs">
            <SearchCheck size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SEO &amp; Metadata Management</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Control search engine rankings, metadata, rich snippets, and Google indexing rules.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          className="text-xs text-gray-600 hover:text-[#283878] self-start sm:self-auto gap-1.5"
        >
          <RefreshCw size={13} className={isLoading ? 'animate-spin' : ''} />
          Refresh Data
        </Button>
      </div>

      {/* Blue Divider */}
      <div className="h-1 bg-[#283878] rounded-full w-full" />

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-gray-200 overflow-x-auto pb-px">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
                isActive
                  ? 'border-[#283878] text-[#283878] bg-blue-50/50'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeTab === 'overview' && (
          <SeoOverviewTab settings={globalSettings} pages={pages || []} />
        )}

        {activeTab === 'pages' && (
          <SeoPagesTab pages={pages || []} onRefresh={refetchPages} />
        )}

        {activeTab === 'global' && (
          <SeoGlobalTab settings={globalSettings} />
        )}

        {activeTab === 'schema' && (
          <SeoSchemaTab settings={globalSettings} />
        )}

        {activeTab === 'integrations' && (
          <SeoIntegrationsTab settings={globalSettings} />
        )}
      </div>
    </motion.div>
  );
}
