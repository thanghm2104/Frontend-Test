import { useParams } from 'react-router-dom';
import { LanguageCode } from '../utils/languageUtils';
import { useEffect } from 'react';
import useLanguage from './useLanguage';

/**
 * Custom hook to get and synchronize the language from URL parameters
 * @returns The current language from the URL
 */
const useRouteLanguage = (): LanguageCode => {
  const { lang } = useParams<{ lang: string }>();
  const { currentLanguage, changeLanguage } = useLanguage();
  
  useEffect(() => {
    // Only update language if the route language differs from current language
    if (lang && (lang === 'en' || lang === 'fr') && lang !== currentLanguage) {
      changeLanguage(lang);
    }
  }, [lang, currentLanguage, changeLanguage]);
  
  return currentLanguage;
};

export default useRouteLanguage; 