// Estimator Page Types

export interface EstimatorPage {
  id: string;
  title: string;
  description: string;
  backgroundImageId?: string;
  backgroundImage?: {
    id: string;
    url: string;
  };
  howItWorksTitle: string;
  whyChooseUsTitle: string;
  createdAt: string;
  updatedAt: string;
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
  iconId?: string;
  icon?: {
    id: string;
    url: string;
  };
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CompleteEstimatorPageData {
  page: EstimatorPage;
  howItWorksSteps: HowItWorksStep[];
  whyChooseUsFeatures: WhyChooseUsFeature[];
}
