import React, { useState, useCallback, useRef, useEffect } from 'react';
import styles from './PremiumSearchBar.module.css';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'recent' | 'trending' | 'suggestion';
}

interface PremiumSearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

const TRENDING_SEARCHES: SearchSuggestion[] = [
  { id: '1', text: 'climate change', type: 'trending' as const },
  { id: '2', text: 'artificial intelligence', type: 'trending' as const },
  { id: '3', text: 'election 2024', type: 'trending' as const },
  { id: '4', text: 'space exploration', type: 'trending' as const },
  { id: '5', text: 'renewable energy', type: 'trending' as const },
];

export const PremiumSearchBar: React.FC<PremiumSearchBarProps> = ({
  onSearch,
  placeholder = 'Search articles, topics, or authors...',
  isLoading = false,
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  const updateSuggestions = useCallback((value: string) => {
    if (!value.trim()) {
      const recentSuggestions: SearchSuggestion[] = recentSearches.slice(0, 3).map((search, index) => ({
        id: `recent-${index}`,
        text: search,
        type: 'recent' as const,
      }));
      setSuggestions([...recentSuggestions, ...TRENDING_SEARCHES.slice(0, 3)]);
      return;
    }

    // Simple suggestion logic - in real app, this would be an API call
    const filteredTrending = TRENDING_SEARCHES.filter(item =>
      item.text.toLowerCase().includes(value.toLowerCase())
    );
    
    const matchingSuggestions: SearchSuggestion[] = [
      ...filteredTrending,
      { id: 'suggestion-1', text: `${value} news`, type: 'suggestion' as const },
      { id: 'suggestion-2', text: `${value} analysis`, type: 'suggestion' as const },
    ].slice(0, 6);

    setSuggestions(matchingSuggestions);
  }, [recentSearches]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    updateSuggestions(value);
    setSelectedIndex(-1);
  }, [updateSuggestions]);

  const handleSubmit = useCallback((searchQuery: string = query) => {
    if (!searchQuery.trim()) return;
    
    // Add to recent searches
    const updatedRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updatedRecent);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
    
    onSearch(searchQuery.trim());
    setShowSuggestions(false);
  }, [query, onSearch, recentSearches]);

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      handleSubmit(suggestions[selectedIndex].text);
    } else {
      handleSubmit();
    }
  }, [handleSubmit, selectedIndex, suggestions]);

  const handleSuggestionClick = useCallback((suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    handleSubmit(suggestion.text);
  }, [handleSubmit]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % suggestions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev <= 0 ? suggestions.length - 1 : prev - 1);
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  }, [showSuggestions, suggestions.length]);

  const handleFocus = useCallback(() => {
    setShowSuggestions(true);
    updateSuggestions(query);
  }, [query, updateSuggestions]);

  const handleBlur = useCallback(() => {
    // Delay hiding suggestions to allow clicks
    setTimeout(() => setShowSuggestions(false), 150);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  }, []);

  const getSuggestionIcon = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'recent': return '🕐';
      case 'trending': return '📈';
      case 'suggestion': return '💡';
      default: return '🔍';
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit} className={`${styles.searchBar} ${isLoading ? styles.loading : ''}`}>
        <div className={styles.searchIcon}>
          <span>🔍</span>
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={styles.input}
          disabled={isLoading}
          autoComplete="off"
        />
        
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className={styles.clearButton}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className={styles.submitButton}
        >
          {isLoading ? (
            <div className={styles.loadingSpinner} />
          ) : (
            <span>→</span>
          )}
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className={styles.suggestions}>
          <div className={styles.suggestionsHeader}>
            {query ? 'Suggestions' : 'Recent & Trending'}
          </div>
          
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              ref={(el) => { suggestionRefs.current[index] = el; }}
              className={`${styles.suggestion} ${
                index === selectedIndex ? styles.selected : ''
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span className={styles.suggestionIcon}>
                {getSuggestionIcon(suggestion.type)}
              </span>
              <span className={styles.suggestionText}>
                {suggestion.text}
              </span>
              {suggestion.type === 'trending' && (
                <span className={styles.trendingBadge}>Trending</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};