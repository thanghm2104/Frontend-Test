import { useTranslation } from 'react-i18next';

type LanguageCode = 'en' | 'fr';

const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (languageCode: LanguageCode) => {
    i18n.changeLanguage(languageCode);
  };

  const currentLanguage = i18n.language as LanguageCode;

  return {
    currentLanguage,
    changeLanguage,
    isEnglish: currentLanguage === 'en',
    isFrench: currentLanguage === 'fr',
  };
};

export default useLanguage; 