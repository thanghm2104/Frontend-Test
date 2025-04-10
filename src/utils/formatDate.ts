/**
 * Format a date into a readable string
 * @param date - Date to format
 * @param locale - Locale to use for formatting (default: 'en-US')
 * @returns Formatted date string
 */
export const formatDate = (date: Date, locale: string = 'en-US'): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

/**
 * Format a date to show how much time has passed (e.g., "2 days ago")
 * @param date - Date to format
 * @returns Relative time string
 */
export const timeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + ' years ago';
  }
  
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months ago';
  }
  
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days ago';
  }
  
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago';
  }
  
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago';
  }
  
  return Math.floor(seconds) + ' seconds ago';
}; 