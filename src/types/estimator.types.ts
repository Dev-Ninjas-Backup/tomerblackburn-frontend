export interface EstimatorPage {
  id: string;
  title: string;
  description: string;
  backgroundImageId: string | null;
  howItWorksTitle: string;
  whyChooseUsTitle: string;
  createdAt: string;
  updatedAt: string;
  backgroundImage?: {
    id: string;
    url: string;
    filename: string;
  };
}

export interface HowItWorksStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface WhyChooseUsFeature {
  id: string;
  title: string;
  description: string;
  iconId: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
  icon?: {
    id: string;
    url: string;
    filename: string;
  } | null;
}

export interface CompleteEstimatorPageData {
  page: EstimatorPage;
  howItWorksSteps: HowItWorksStep[];
  whyChooseUsFeatures: WhyChooseUsFeature[];
}
