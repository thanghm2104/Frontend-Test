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
    i18n.changeLanguage(currentLanguage);
  }, []);

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
  }, [currentLanguage, i18n]);

  const changeLanguage = (lang: LanguageCode) => {
    if (lang === currentLanguage) return;
    
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
    
    // Update URL with new language
    updateURLLanguage(lang);
  };

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetchPageContent(currentLanguage);
        if (response.success) {
          setPageContent(response.data);
        } else {
          setError(response.error || 'Failed to load content');
        }
      } catch (err) {
        setError('Failed to fetch content');
        console.error(err);
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