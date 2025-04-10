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
    // Check if we have a valid language parameter from the route
    if (lang && (lang === 'en' || lang === 'fr')) {
      // Only update language if different from current
      if (lang !== currentLanguage) {
        console.log(`Changing language from ${currentLanguage} to ${lang} based on route`);
        changeLanguage(lang);
      }
    } else {
      console.warn(`Invalid language parameter in URL: ${lang}`);
    }
  }, [lang, currentLanguage, changeLanguage]);
  
  return currentLanguage;
};

export default useRouteLanguage; 