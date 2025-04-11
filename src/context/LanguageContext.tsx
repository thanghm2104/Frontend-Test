import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { fetchPageContent } from '../api/content';
import { PageContent } from '../types/api';
import { useTranslation } from 'react-i18next';
import { getLanguageFromURL, updateURLLanguage, LanguageCode } from '../utils/languageUtils';

interface LanguageContextProps {
  currentLanguage: LanguageCode;
  changeLanguage: (lang: LanguageCode) => void;
  pageContent: PageContent | null;
  isLoading: boolean;
  error: string | null;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => getLanguageFromURL());
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize language based on URL when component mounts
  useEffect(() => {
    const urlLanguage = getLanguageFromURL();
    console.log('Initializing language from URL:', urlLanguage);
    
    // Ensure i18n and state are in sync
    if (i18n.language !== urlLanguage) {
      i18n.changeLanguage(urlLanguage);
    }
    
    // Ensure URL and state are in sync
    if (currentLanguage !== urlLanguage) {
      setCurrentLanguage(urlLanguage);
    }
  }, []); // Only run on mount

  // Listen for URL changes (like back button)
  useEffect(() => {
    const handleLocationChange = () => {
      const urlLanguage = getLanguageFromURL();
      if (urlLanguage !== currentLanguage) {
        setCurrentLanguage(urlLanguage);
        i18n.changeLanguage(urlLanguage);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [currentLanguage, i18n, setCurrentLanguage]);

  const changeLanguage = (lang: LanguageCode) => {
    if (lang === currentLanguage) {
      console.log(`Language already set to ${lang}, skipping change`);
      return;
    }
    
    console.log(`Changing language from ${currentLanguage} to ${lang}`);
    // First update i18n
    i18n.changeLanguage(lang);
    // Then update URL with new language
    updateURLLanguage(lang);
    // Finally update the state to trigger re-renders
    setCurrentLanguage(lang);
  };

  useEffect(() => {
    const loadContent = async () => {
      console.log(`Loading content for language: ${currentLanguage}`);
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetchPageContent(currentLanguage);
        console.log(`Content fetch response:`, response.success ? 'Success' : 'Failed');
        if (response.success) {
          setPageContent(response.data);
          console.log('Page content updated successfully');
        } else {
          setError(response.error || 'Failed to load content');
          console.error('API Error:', response.error);
        }
      } catch (err) {
        setError('Failed to fetch content');
        console.error('Fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContent();
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        changeLanguage, 
        pageContent, 
        isLoading, 
        error 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
}; 