// Portfolio Page Types

export interface Project {
  id: string;
  title: string;
  description?: string;
  images: string[];
  category?: string;
  date?: string;
}

export interface PortfolioPageData {
  projects: Project[];
}
