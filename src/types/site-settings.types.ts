export interface SiteSettings {
  id: string;
  siteTitle: string;
  siteDescription?: string;
  logoImageId?: string;
  logoImage?: {
    id: string;
    filename: string;
    url: string;
    mimeType: string;
  };
  guidePdfId?: string;
  guidePdf?: {
    id: string;
    filename: string;
    originalFilename?: string;
    url: string;
    mimeType: string;
  };
  contactNumber?: string;
  contactEmail?: string;
  location?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  ctaBannerText?: string;
  ctaBannerEnabled?: boolean;
  notificationEmail?: string;
  notifyOnNewSubmission?: boolean;
  maintenanceMode?: boolean;
  estimateEmailSubject?: string;
  estimateEmailIntro?: string;
  estimateEmailBody?: string;
  estimateEmailClosing?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSiteSettingsDto {
  siteTitle: string;
  siteDescription?: string;
  logoImageId?: string;
  guidePdfId?: string;
  contactNumber?: string;
  contactEmail?: string;
  location?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  ctaBannerText?: string;
  ctaBannerEnabled?: boolean;
  notificationEmail?: string;
  notifyOnNewSubmission?: boolean;
  maintenanceMode?: boolean;
  estimateEmailSubject?: string;
  estimateEmailIntro?: string;
  estimateEmailBody?: string;
  estimateEmailClosing?: string;
}

export interface UpdateSiteSettingsDto extends Partial<CreateSiteSettingsDto> {}

