export type LanguageCode = 'en' | 'fr';

/**
 * Extracts the language code from the URL path
 * @returns The language code ('en' or 'fr')
 */
export const getLanguageFromURL = (): LanguageCode => {
  const path = window.location.pathname;
  
  // Extract the first segment of the path
  const segments = path.split('/').filter(segment => segment);
  const firstSegment = segments[0];
  
  // Check if the first segment is a valid language code
  if (firstSegment === 'fr') {
    return 'fr';
  }
  
  // Default to English for all other cases
  return 'en';
};

/**
 * Updates the URL path based on the selected language without reloading the page
 * @param language The language code to set in the URL
 */
export const updateURLLanguage = (language: LanguageCode): void => {
  const currentPath = window.location.pathname;
  const currentSearch = window.location.search;
  
  // Extract path segments
  const segments = currentPath.split('/').filter(segment => segment);
  
  // If first segment is a language code, replace it; otherwise, add language as first segment
  if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'fr')) {
    segments[0] = language;
  } else {
    segments.unshift(language);
  }
  
  // Reconstruct the path
  const newPath = `/${segments.join('/')}`;
  
  // Update the URL without reloading the page
  window.history.pushState({}, '', `${newPath}${currentSearch}`);
  
  console.log(`URL updated to: ${newPath}${currentSearch}`);
}; 