import { format, parseISO } from 'date-fns';

export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMM d, yyyy');
  } catch {
    return dateString;
  }
};

export const getAuthorNames = (byline: { original: string }): string => {
  if (!byline || !byline.original) return 'Unknown Author';
  
  return byline.original.replace(/^By\s+/i, '');
};

export const getThumbnailUrl = (multimedia?: { thumbnail?: { url: string }; default?: { url: string } }): string | null => {
  if (!multimedia) return null;
  
  // Prefer thumbnail, fallback to default
  const imageUrl = multimedia.thumbnail?.url || multimedia.default?.url;
  
  if (imageUrl) {
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    return `https://www.nytimes.com/${imageUrl}`;
  }
  
  return null;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  return truncated + '...';
};