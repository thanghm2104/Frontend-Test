import { ApiResponse } from '../types/api';
import { mockApiResponseEn, mockApiResponseFr } from './mockData';

const API_BASE_URL = 'https://api.test.soa-dev.net/api/v1';
const USE_MOCK_DATA = true; // Set to false to use real API

export async function fetchPageContent(language: 'en' | 'fr'): Promise<ApiResponse> {
  if (USE_MOCK_DATA) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return language === 'en' ? mockApiResponseEn : mockApiResponseFr;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/pages?lang=${language}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data as ApiResponse;
  } catch (error) {
    console.error('Error fetching page content:', error);
    throw error;
  }
} 