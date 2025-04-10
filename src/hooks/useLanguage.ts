import { useLanguageContext } from '../context/LanguageContext';

type LanguageCode = 'en' | 'fr';

const useLanguage = () => {
  const { 
    currentLanguage, 
    changeLanguage: contextChangeLanguage, 
    pageContent, 
    isLoading, 
    error 
  } = useLanguageContext();

  const changeLanguage = (languageCode: LanguageCode) => {
    contextChangeLanguage(languageCode);
  };

  return {
    currentLanguage,
    changeLanguage,
    isEnglish: currentLanguage === 'en',
    isFrench: currentLanguage === 'fr',
    pageContent,
    isLoading,
    error
  };
};

export default useLanguage; 