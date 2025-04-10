export type LanguageCode = 'en' | 'fr';

/**
 * Extracts the language code from the URL path
 * @returns The language code ('en' or 'fr')
 */
export const getLanguageFromURL = (): LanguageCode => {
  const path = window.location.pathname;
  
  // Check if path starts with /fr
  if (path.startsWith('/fr')) {
    return 'fr';
  }
  
  // Default to English
  return 'en';
};

/**
 * Updates the URL path based on the selected language without reloading the page
 * @param language The language code to set in the URL
 */
export const updateURLLanguage = (language: LanguageCode): void => {
  const currentPath = window.location.pathname;
  const currentSearch = window.location.search;
  
  // Remove any language prefix from current path
  let newPath = currentPath.replace(/^\/(en|fr)/, '');
  if (newPath === '') newPath = '/';
  
  // Add new language prefix
  const newURL = `/${language}${newPath === '/' ? '' : newPath}${currentSearch}`;
  
  // Update the URL without reloading the page
  window.history.pushState({}, '', newURL);
}; 