export interface SeoSettings {
  id: string;
  siteName: string;
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string;
  siteUrl: string;
  ogImageUrl?: string | null;
  twitterHandle?: string | null;
  robotsIndex: boolean;
  robotsFollow: boolean;
  googleSiteVerification?: string | null;
  bingSiteVerification?: string | null;
  googleAnalyticsId?: string | null;
  googleTagManagerId?: string | null;
  canonicalUrl?: string | null;

  // LocalBusiness Schema.org
  businessType: string;
  businessPhone: string;
  businessEmail: string;
  businessStreetAddress?: string | null;
  businessCity: string;
  businessState: string;
  businessPostalCode?: string | null;
  businessCountry: string;
  priceRange: string;
  openingHours: string;
  geoLatitude?: number | null;
  geoLongitude?: number | null;
  serviceAreas?: string | null;

  createdAt: string;
  updatedAt: string;
}

export type UpdateSeoSettingsDto = Partial<
  Omit<SeoSettings, 'id' | 'createdAt' | 'updatedAt'>
>;

export interface SeoPage {
  id: string;
  path: string;
  pageName: string;
  title: string;
  description: string;
  keywords?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  canonicalUrl?: string | null;
  noIndex: boolean;
  noFollow: boolean;
  priority: number;
  changeFreq: string;
  structuredDataJson?: string | null;

  createdAt: string;
  updatedAt: string;
}

export type UpdateSeoPageDto = Partial<
  Omit<SeoPage, 'id' | 'path' | 'createdAt' | 'updatedAt'>
>;

export interface SeoBundle {
  global: SeoSettings;
  pages: SeoPage[];
}
