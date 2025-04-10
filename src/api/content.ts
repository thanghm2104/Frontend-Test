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
  email?: string;
}

interface ApiData {
  banner_title?: string[];
  head_menu?: string[];
  bloc_1?: {
    title?: string;
    subtitle?: string;
    cases?: ApiItem[];
  };
  bloc_5?: {
    title?: string;
    reviews?: ApiReview[];
  };
  footer?: {
    address?: ApiFooterAddress;
    links?: ApiLink[];
  };
  banner_menu?: string[];
}

// Function to transform the API response to match our application's data structure
function transformApiResponse(apiData: ApiData): PageContent {
  return {
    hero: {
      title: Array.isArray(apiData.banner_title) ? apiData.banner_title.join(' - ') : 'Welcome',
      subtitle: 'Discover our services',
      ctaText: 'Explore Now',
      backgroundImage: '/images/hero-bg.jpg'
    },
    banner_menu: apiData.banner_menu || [],
    services: {
      title: apiData.bloc_1?.title || 'Our Services',
      subtitle: apiData.bloc_1?.subtitle || '',
      items: (apiData.bloc_1?.cases || []).map((item: ApiItem, index: number) => ({
        id: index + 1,
        title: item.category || '',
        description: item.description || '',
        image: '/images/service-placeholder.jpg',
        packageName: item.tagline || ''
      }))
    },
    testimonials: {
      title: apiData.bloc_5?.title || 'What Our Clients Say',
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
    // Add other sections as needed
    calendar: {
      title: 'Calendar',
      months: [],
      occupiedDates: []
    },
    map: {
      title: 'Find Us',
      locations: []
    },
    contact: {
      title: 'Contact Us',
      formLabels: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        file: 'File',
        submit: 'Submit'
      },
      successMessage: 'Message sent successfully',
      errorMessage: 'Error sending message'
    },
    footer: {
      address: apiData.footer?.address?.name || '',
      phone: apiData.footer?.address?.phone || '',
      email: apiData.footer?.address?.email || '',
      menuItems: (apiData.footer?.links || []).map((link: ApiLink, index: number) => ({
        id: index + 1,
        text: link.name || '',
        url: link.url || '#'
      }))
    }
  };
} 