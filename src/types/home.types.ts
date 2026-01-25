// Home Page Types

export interface HeroData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
}

export interface MissionData {
  title: string;
  description: string;
  highlightText: string;
  ctaText: string;
  ctaLink: string;
}

export interface Service {
  title: string;
  description: string;
  image: string;
}

export interface ServicesData {
  title: string;
  services: Service[];
}

export interface SubscribeData {
  title: string;
  description: string;
  ctaText: string;
}

export interface HomePageData {
  hero: HeroData;
  mission: MissionData;
  services: ServicesData;
  subscribe: SubscribeData;
}

// Admin Dashboard Types
export interface HomePage {
  id: string;
  title: string;
  subTitle: string;
  homeBackgroundImageId?: string;
  homeBackgroundImage?: {
    id: string;
    url: string;
  };
  ourMissionTitle: string;
  ourMissionSubTitle: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceStandsOut {
  id: string;
  title: string;
  description: string;
  imageId?: string;
  image?: {
    id: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CompleteHomePageData {
  homePage: HomePage;
  services: ServiceStandsOut[];
}
