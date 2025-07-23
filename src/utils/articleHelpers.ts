export const getCategoryInfo = (sectionName?: string) => {
  const section = sectionName?.toLowerCase() || 'general';
  
  const categoryMap: Record<string, { color: string; icon: string; name: string }> = {
    politics: { color: 'var(--color-politics)', icon: '🏛️', name: 'Politics' },
    technology: { color: 'var(--color-technology)', icon: '💻', name: 'Technology' },
    tech: { color: 'var(--color-technology)', icon: '💻', name: 'Technology' },
    business: { color: 'var(--color-business)', icon: '💼', name: 'Business' },
    sports: { color: 'var(--color-sports)', icon: '⚽', name: 'Sports' },
    arts: { color: 'var(--color-arts)', icon: '🎨', name: 'Arts' },
    culture: { color: 'var(--color-arts)', icon: '🎭', name: 'Culture' },
    science: { color: 'var(--color-science)', icon: '🔬', name: 'Science' },
    health: { color: 'var(--color-health)', icon: '🏥', name: 'Health' },
    world: { color: 'var(--color-world)', icon: '🌍', name: 'World' },
    opinion: { color: 'var(--color-secondary)', icon: '💭', name: 'Opinion' },
    style: { color: 'var(--color-arts)', icon: '👗', name: 'Style' },
    travel: { color: 'var(--color-science)', icon: '✈️', name: 'Travel' },
    food: { color: 'var(--color-health)', icon: '🍽️', name: 'Food' },
  };
  
  return categoryMap[section] || { 
    color: 'var(--color-accent)', 
    icon: '📰', 
    name: section.charAt(0).toUpperCase() + section.slice(1) 
  };
};

export const getReadingTime = (content: string = '') => {
  const wordsPerMinute = 200;
  const words = content.split(' ').length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes);
};

export const isNewArticle = (publishedDate: string) => {
  const articleDate = new Date(publishedDate);
  const now = new Date();
  const hoursDiff = Math.abs(now.getTime() - articleDate.getTime()) / 36e5;
  return hoursDiff < 2;
};

export const formatEngagement = (count: number) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

export const getAuthorInitials = (authorName: string) => {
  return authorName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};