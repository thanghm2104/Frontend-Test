export type LanguageCode = 'en' | 'fr';

/**
 * Extracts the language code from the URL path
 * @returns The language code ('en' or 'fr')
 */
export const getLanguageFromURL = (): LanguageCode => {
  const path = window.location.pathname;
  
  // Extract the first segment of the path
  const segments = path.split('/').filter(segment => segment);
  const firstSegment = segments[0]?.toLowerCase();
  
  // Check if the first segment is a valid language code
  if (firstSegment === 'fr' || firstSegment === 'en') {
    return firstSegment as LanguageCode;
  }
  
  // Default to English for all other cases
  return 'en';
};

/**
 * Gets the current path without the language prefix
 * @returns The path without language code
 */
export const getCurrentPathWithoutLang = (): string => {
  const path = window.location.pathname;
  const segments = path.split('/').filter(segment => segment);
  
  if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'fr')) {
    return '/' + segments.slice(1).join('/');
  }
  
  return path;
};

/**
 * Updates the URL path based on the selected language while preserving the current path
 * @param language The language code to set in the URL
 */
export const updateURLLanguage = (language: LanguageCode): void => {
  const currentPath = getCurrentPathWithoutLang();
  const currentSearch = window.location.search;
  
  // Construct new path with language prefix
  const newPath = `/${language}${currentPath === '/' ? '' : currentPath}`;
  
  // Update the URL without reloading the page
  window.history.pushState({}, '', `${newPath}${currentSearch}`);
  
  console.log(`URL updated to: ${newPath}${currentSearch}`);
}; 