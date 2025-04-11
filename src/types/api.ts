export interface PageContent {
  // Banner/Hero section
  banner_title?: string[];
  head_menu?: string[];
  banner_menu?: string[];
  
  // Hero section (processed from banner_title)
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    backgroundImage: string;
  };
  
  // Bloc 1 - Services/Culinary Art
  bloc_1?: {
    title?: string;
    subtitle?: string;
    cases?: {
      category?: string;
      tagline?: string;
      description?: string;
      cta?: string;
    }[];
  };
  
  // Services (processed from bloc_1)
  services: {
    title: string;
    subtitle?: string;
    items: {
      id: number;
      title: string;
      description: string;
      image: string;
      packageName: string;
      cta?: string;
    }[];
  };
  
  // Bloc 2 - Activities list
  bloc_2?: {
    title?: string;
    cases?: string[];
  };
  
  // Adventure section (also processed from bloc_1)
  adventure?: {
    title: string;
    subtitle?: string;
    items: {
      id: number;
      title: string;
      description: string;
      image: string;
      tag: string;
      link: string;
      cta?: string;
    }[];
  };
  
  // Bloc 2_2 - Contact form
  bloc_2_2?: {
    title?: string;
    btn_1?: string[];
    btn_2?: string[];
    btn_3?: string;
    btn_4?: string[];
    btn_5?: string;
    btn_6?: string;
  };
  
  // Bloc 3 - Explore more
  bloc_3?: {
    title?: string;
    more_info?: string;
    cases?: {
      category?: string;
      tagline?: string;
      description?: string;
    }[];
  };
  
  // Carte points - Map locations
  carte_point?: {
    name: string;
    website: string;
    address: string;
    phone: string | string[];
    free_call?: string;
    fax?: string;
    email?: string;
    coordinates?: {
      latitude?: string;
      longitude?: string;
    };
    activities: string[];
    marker_information: string[];
  }[];
  
  // Bloc 4 - About section
  bloc_4?: {
    title?: string;
    subtitle?: string;
    text_title?: string;
    text?: string;
    pictos?: {
      title?: string;
      description?: string;
    }[];
  };
  
  // Bloc 5 - Testimonials
  bloc_5?: {
    title?: string;
    text?: string;
    reviews?: {
      author?: string;
      review?: string;
      date?: string;
    }[];
    footer?: string;
  };
  
  // Testimonials (processed from bloc_5)
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
  
  // Bloc 6 - CTA section
  bloc_6?: {
    title?: string;
    subtitle?: string;
    text?: string;
    button?: string;
  };
  
  // Calendar section
  calendar: {
    title: string;
    subtitle?: string;
    occupiedDates: string[];
    months: {
      name: string;
      year: number;
    }[];
  };
  
  // Map section
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
  
  // Contact section
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
  
  // Footer
  footer?: {
    address?: {
      name?: string;
      phone?: string;
      location?: string;
    };
    links?: {
      name?: string;
      url?: string;
    }[];
  };
  
  // Header (processed from head_menu)
  header: {
    menuItems: {
      id: number;
      text: string;
      url: string;
    }[];
  };
  
  carousel: {
    title: string;
    viewMore: string;
    slides: Array<{
      id: number;
      image: string;
      caseTitle: string;
      title: string;
      text: string;
    }>;
  };
}

export interface ApiResponse {
  data: PageContent;
  success: boolean;
  error?: string;
}
