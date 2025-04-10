export interface Feature {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export interface Section {
  id: string;
  title: string;
  subtitle?: string;
  features?: Feature[];
}

export interface LandingPageData {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    image?: string;
  };
  sections: Section[];
} 