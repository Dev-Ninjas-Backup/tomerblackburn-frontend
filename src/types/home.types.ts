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
