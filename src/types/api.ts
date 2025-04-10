export interface PageContent {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    backgroundImage: string;
  };
  banner_menu?: string[];
  services: {
    title: string;
    subtitle?: string;
    items: {
      id: number;
      title: string;
      description: string;
      image: string;
      packageName: string;
    }[];
  };
  calendar: {
    title: string;
    subtitle?: string;
    occupiedDates: string[]; // dates in "YYYY-MM-DD" format
    months: {
      name: string;
      year: number;
    }[];
  };
  map: {
    title: string;
    subtitle?: string;
    locations: {
      id: number;
      name: string;
      coordinates: {
        x: number;
        y: number;
      };
      description: string;
    }[];
  };
  testimonials: {
    title: string;
    items: {
      id: number;
      text: string;
      author: string;
      avatar?: string;
      hashtag: string;
    }[];
  };
  contact: {
    title: string;
    subtitle?: string;
    formLabels: {
      name: string;
      email: string;
      message: string;
      file: string;
      submit: string;
    };
    successMessage: string;
    errorMessage: string;
  };
  footer: {
    address: string;
    phone: string;
    email: string;
    menuItems: {
      id: number;
      text: string;
      url: string;
    }[];
  };
  header: {
    menuItems: {
      id: number;
      text: string;
      url: string;
    }[];
  };
}

export interface ApiResponse {
  data: PageContent;
  success: boolean;
  error?: string;
}
