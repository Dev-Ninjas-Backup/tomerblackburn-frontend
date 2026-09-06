'use client';

import React, { useState, useEffect } from 'react';
import { SeoSettings, UpdateSeoSettingsDto } from '@/types/seo.types';
import { useUpdateGlobalSeo } from '@/hooks/useSeo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Save, Code, CheckCircle2, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface SeoSchemaTabProps {
  settings?: SeoSettings;
}

export const SeoSchemaTab = ({ settings }: SeoSchemaTabProps) => {
  const updateMutation = useUpdateGlobalSeo();

  const [formData, setFormData] = useState<UpdateSeoSettingsDto>({
    businessType: settings?.businessType || 'GeneralContractor',
    businessPhone: settings?.businessPhone || '773-403-9950',
    businessEmail: settings?.businessEmail || 'estimates@bburnbuilders.com',
    businessStreetAddress: settings?.businessStreetAddress || 'Chicago, IL',
    businessCity: settings?.businessCity || 'Chicago',
    businessState: settings?.businessState || 'IL',
    businessPostalCode: settings?.businessPostalCode || '60601',
    businessCountry: settings?.businessCountry || 'US',
    priceRange: settings?.priceRange || '$$$',
    openingHours: settings?.openingHours || 'Mo-Sa 08:00-18:00',
    geoLatitude: settings?.geoLatitude ?? 41.8781,
    geoLongitude: settings?.geoLongitude ?? -87.6298,
    serviceAreas: settings?.serviceAreas || 'Chicago, Naperville, Evanston, Oak Park, Schaumburg',
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        businessType: settings.businessType || 'GeneralContractor',
        businessPhone: settings.businessPhone || '773-403-9950',
        businessEmail: settings.businessEmail || 'estimates@bburnbuilders.com',
        businessStreetAddress: settings.businessStreetAddress || 'Chicago, IL',
        businessCity: settings.businessCity || 'Chicago',
        businessState: settings.businessState || 'IL',
        businessPostalCode: settings.businessPostalCode || '60601',
        businessCountry: settings.businessCountry || 'US',
        priceRange: settings.priceRange || '$$$',
        openingHours: settings.openingHours || 'Mo-Sa 08:00-18:00',
        geoLatitude: settings.geoLatitude ?? 41.8781,
        geoLongitude: settings.geoLongitude ?? -87.6298,
        serviceAreas: settings.serviceAreas || 'Chicago, Naperville, Evanston, Oak Park, Schaumburg',
      });
    }
  }, [settings]);

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': formData.businessType || 'GeneralContractor',
    name: settings?.siteName || 'BBurn Builders',
    description: settings?.defaultDescription || "Chicago's premier residential remodeling and construction company.",
    url: settings?.siteUrl || 'https://bburnbuilders.com',
    telephone: formData.businessPhone,
    email: formData.businessEmail,
    priceRange: formData.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: formData.businessStreetAddress,
      addressLocality: formData.businessCity,
      addressRegion: formData.businessState,
      postalCode: formData.businessPostalCode,
      addressCountry: formData.businessCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: formData.geoLatitude,
      longitude: formData.geoLongitude,
    },
    openingHours: formData.openingHours,
    areaServed: formData.serviceAreas?.split(',').map((s) => s.trim()),
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(JSON.stringify(schemaJson, null, 2));
    toast.success('JSON-LD code copied to clipboard');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-[#283878]" />
              <h3 className="text-base font-bold text-gray-900">
                Local Business Structured Data (Schema.org / JSON-LD)
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Generates Google Rich Snippets for local searches like &quot;bathroom remodel Chicago&quot; and Google Maps business profiles.
            </p>
          </div>
          <Button
            onClick={handleSave}
            disabled={updateMutation.isPending}
            className="bg-[#283878] hover:bg-[#1f2d5c] text-white font-semibold text-xs px-5 shadow-xs"
          >
            <Save size={14} className="mr-1.5" />
            {updateMutation.isPending ? 'Saving…' : 'Save Schema Data'}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Business Type</label>
            <select
              value={formData.businessType || 'GeneralContractor'}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
            >
              <option value="GeneralContractor">GeneralContractor (Recommended)</option>
              <option value="HomeAndConstructionBusiness">HomeAndConstructionBusiness</option>
              <option value="LocalBusiness">LocalBusiness</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Business Phone*</label>
            <Input
              type="text"
              value={formData.businessPhone || ''}
              onChange={(e) => setFormData({ ...formData, businessPhone: e.target.value })}
              className="text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Business Email*</label>
            <Input
              type="email"
              value={formData.businessEmail || ''}
              onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
              className="text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Street Address</label>
            <Input
              type="text"
              value={formData.businessStreetAddress || ''}
              onChange={(e) => setFormData({ ...formData, businessStreetAddress: e.target.value })}
              className="text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">City*</label>
            <Input
              type="text"
              value={formData.businessCity || ''}
              onChange={(e) => setFormData({ ...formData, businessCity: e.target.value })}
              className="text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">State / Region*</label>
            <Input
              type="text"
              value={formData.businessState || ''}
              onChange={(e) => setFormData({ ...formData, businessState: e.target.value })}
              className="text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Postal Code</label>
            <Input
              type="text"
              value={formData.businessPostalCode || ''}
              onChange={(e) => setFormData({ ...formData, businessPostalCode: e.target.value })}
              className="text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Price Range</label>
            <Input
              type="text"
              placeholder="$$$"
              value={formData.priceRange || ''}
              onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
              className="text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Opening Hours</label>
            <Input
              type="text"
              placeholder="Mo-Sa 08:00-18:00"
              value={formData.openingHours || ''}
              onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
              className="text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Latitude (GPS)</label>
            <Input
              type="number"
              step="0.0001"
              value={formData.geoLatitude ?? 41.8781}
              onChange={(e) => setFormData({ ...formData, geoLatitude: parseFloat(e.target.value) })}
              className="text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Longitude (GPS)</label>
            <Input
              type="number"
              step="0.0001"
              value={formData.geoLongitude ?? -87.6298}
              onChange={(e) => setFormData({ ...formData, geoLongitude: parseFloat(e.target.value) })}
              className="text-xs"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <label className="block font-semibold text-gray-700 mb-1">Service Areas</label>
            <Input
              type="text"
              placeholder="Chicago, Naperville, Evanston"
              value={formData.serviceAreas || ''}
              onChange={(e) => setFormData({ ...formData, serviceAreas: e.target.value })}
              className="text-xs"
            />
          </div>
        </div>
      </div>

      {/* Real-time Generated JSON-LD Code Card */}
      <div className="bg-slate-900 rounded-xl p-5 text-white shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code size={16} className="text-blue-400" />
            <span className="text-xs font-bold text-gray-200 uppercase tracking-wider">
              Automated JSON-LD Output Injected in Head
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[11px] font-semibold flex items-center gap-1">
              <CheckCircle2 size={12} /> Google Valid
            </span>
            <button
              type="button"
              onClick={handleCopyCode}
              className="p-1.5 hover:bg-slate-800 rounded text-gray-400 hover:text-white transition-colors text-xs flex items-center gap-1"
              title="Copy JSON-LD"
            >
              <Copy size={13} />
              <span className="text-[11px]">Copy</span>
            </button>
          </div>
        </div>

        <pre className="text-[11.5px] font-mono text-emerald-300 bg-slate-950 p-4 rounded-lg overflow-x-auto leading-relaxed border border-slate-800">
          {JSON.stringify(schemaJson, null, 2)}
        </pre>
      </div>
    </div>
  );
};
