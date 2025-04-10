import { ApiResponse, PageContent } from '../types/api';
import { mockApiResponseEn, mockApiResponseFr } from './mockData';

const API_BASE_URL = 'https://api.test.soa-dev.net/api/v1';
const USE_MOCK_DATA = false; // Set to false to use real API

export async function fetchPageContent(language: 'en' | 'fr'): Promise<ApiResponse> {
  console.log(`API: Fetching content for language: ${language}`);
  
  if (USE_MOCK_DATA) {
    // Simulate API delay
    console.log('API: Using mock data');
    await new Promise(resolve => setTimeout(resolve, 800));
    return language === 'en' ? mockApiResponseEn : mockApiResponseFr;
  }

  try {
    console.log(`API: Sending request to ${API_BASE_URL}/pages?lang=${language}`);
    const response = await fetch(`${API_BASE_URL}/pages?lang=${language}`);
    
    if (!response.ok) {
      console.error(`API: Request failed with status ${response.status}`);
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API: Response received', data);
    
    // Transform API response to match our expected format
    if (Array.isArray(data) && data.length > 0) {
      const pageData = data[0]; // Get the first item from the array
      
      // Map the API response to our PageContent structure
      const transformedData: PageContent = transformApiResponse(pageData);
      console.log('API: Data transformed successfully');
      
      return {
        data: transformedData,
        success: true
      };
    }
    
    console.error('API: Invalid response format', data);
    throw new Error('Invalid API response format');
  } catch (error) {
    console.error('API: Error fetching page content:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: null as unknown as PageContent
    };
  }
}

// Define types for the API response structure
interface ApiItem {
  category?: string;
  tagline?: string;
  description?: string;
  cta?: string;
}

interface ApiReview {
  author?: string;
  review?: string;
  date?: string;
}

interface ApiLink {
  name?: string;
  url?: string;
}

interface ApiFooterAddress {
  name?: string;
  phone?: string;
  location?: string;
}

interface Coordinates {
  latitude?: string;
  longitude?: string;
}

interface CartePoint {
  name: string;
  website: string;
  address: string;
  phone: string | string[];
  free_call?: string;
  fax?: string;
  email?: string;
  coordinates?: Coordinates;
  activities: string[];
  marker_information: string[];
}

interface ApiPicto {
  title: string;
  description: string;
}

interface ApiData {
  id?: string;
  language?: string;
  banner_title?: string[];
  head_menu?: string[];
  banner_menu?: string[];
  
  bloc_1?: {
    title?: string;
    subtitle?: string;
    cases?: ApiItem[];
  };
  
  bloc_2?: {
    title?: string;
    cases?: string[];
  };
  
  bloc_2_2?: {
    title?: string;
    btn_1?: string[];
    btn_2?: string[];
    btn_3?: string;
    btn_4?: string[];
    btn_5?: string;
    btn_6?: string;
  };
  
  bloc_3?: {
    title?: string;
    more_info?: string;
    cases?: ApiItem[];
  };
  
  carte_point?: CartePoint[];
  
  bloc_4?: {
    title?: string;
    subtitle?: string;
    text_title?: string;
    text?: string;
    pictos?: ApiPicto[];
  };
  
  bloc_5?: {
    title?: string;
    text?: string;
    reviews?: ApiReview[];
    footer?: string;
  };
  
  bloc_6?: {
    title?: string;
    subtitle?: string;
    text?: string;
    button?: string;
  };
  
  footer?: {
    address?: ApiFooterAddress;
    links?: ApiLink[];
  };
}

// Function to transform the API response to match our application's data structure
function transformApiResponse(apiData: ApiData): PageContent {
  // Get descriptions for activity items from bloc_1
  const activityDescriptions = new Map<string, string>();
  apiData.bloc_1?.cases?.forEach(item => {
    if (item.category && item.description) {
      activityDescriptions.set(item.category, item.description);
    }
  });

  // Get tags for activity items from bloc_1
  const activityTags = new Map<string, string>();
  apiData.bloc_1?.cases?.forEach(item => {
    if (item.category && item.tagline) {
      activityTags.set(item.category, item.tagline);
    }
  });

  return {
    // Pass through raw API data
    banner_title: apiData.banner_title,
    head_menu: apiData.head_menu,
    banner_menu: apiData.banner_menu,
    bloc_1: apiData.bloc_1,
    bloc_2: apiData.bloc_2,
    bloc_2_2: apiData.bloc_2_2,
    bloc_3: apiData.bloc_3,
    carte_point: apiData.carte_point,
    bloc_4: apiData.bloc_4,
    bloc_5: apiData.bloc_5,
    bloc_6: apiData.bloc_6,
    footer: apiData.footer,
    
    // Processed sections
    hero: {
      title: Array.isArray(apiData.banner_title) ? apiData.banner_title.join(' - ') : 'Welcome',
      subtitle: 'Discover culinary excellence',
      ctaText: 'Explore Now',
      backgroundImage: '/images/hero-bg.jpg'
    },
    
    services: {
      title: apiData.bloc_1?.title || 'Discover Culinary Art',
      subtitle: apiData.bloc_1?.subtitle || '',
      items: (apiData.bloc_1?.cases || []).map((item: ApiItem, index: number) => ({
        id: index + 1,
        title: item.category || '',
        description: item.description || '',
        image: `/public/images/service${index + 1}.png`,
        packageName: item.tagline || '',
        cta: item.cta || 'Learn More'
      }))
    },
    
    adventure: {
      title: apiData.bloc_1?.title || 'Discover Culinary Art with CookMaster',
      subtitle: apiData.bloc_1?.subtitle || 'Explore unique experiences to learn, taste, and share',
      items: (apiData.bloc_1?.cases || []).map((item: ApiItem, index: number) => ({
        id: index + 1,
        title: item.category || '',
        description: item.description || '',
        image: `/public/images/adventure${index + 1}.png`,
        tag: item.tagline || '',
        link: `/${apiData.language}/${(item.category || '').toLowerCase().replace(/\s+/g, '-')}`
      }))
    },
    
    testimonials: {
      title: apiData.bloc_5?.title || 'Share Your Creations',
      items: (apiData.bloc_5?.reviews || []).map((review: ApiReview, index: number) => ({
        id: index + 1,
        text: review.review || '',
        author: review.author || '',
        avatar: '',
        hashtag: '#cookmaster'
      }))
    },
    
    header: {
      menuItems: (apiData.head_menu || []).map((item: string, index: number) => ({
        id: index + 1,
        text: item,
        url: '/' + item.toLowerCase().replace(/\s+/g, '-')
      }))
    },
    
    // Default sections that might need to be populated from API later
    calendar: {
      title: 'Calendar',
      months: [],
      occupiedDates: []
    },
    
    map: {
      title: 'Find Us',
      subtitle: 'Our Locations',
      locations: (apiData.carte_point || []).map((point, index) => ({
        id: index + 1,
        name: point.name,
        coordinates: {
          x: parseFloat(point.coordinates?.longitude || '0'),
          y: parseFloat(point.coordinates?.latitude || '0')
        },
        description: point.address
      }))
    },
    
    contact: {
      title: apiData.bloc_2_2?.title || 'Contact Us',
      subtitle: 'Get in touch with us',
      formLabels: {
        name: apiData.bloc_2_2?.btn_1?.[0] || 'Name',
        email: apiData.bloc_2_2?.btn_2?.[0] || 'Email',
        message: apiData.bloc_2_2?.btn_3 || 'Message',
        file: apiData.bloc_2_2?.btn_4?.[0] || 'File',
        submit: apiData.bloc_2_2?.btn_6 || 'Send'
      },
      successMessage: 'Your message has been sent successfully!',
      errorMessage: 'There was an error sending your message. Please try again.'
    }
  };
} 