// About Page Types

export interface AboutContentData {
  founderName: string;
  founderTitle: string;
  content: string[];
  ctaText: string;
  ctaLink: string;
  image: string;
}

export interface PhilosophyData {
  title: string;
}

export interface AboutPageData {
  philosophy: PhilosophyData;
  aboutContent: AboutContentData;
}
