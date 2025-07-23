import React, { useState, useCallback } from 'react';
import { Input, Button } from '../atoms';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search for articles...',
  isLoading = false,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        onSearch(query.trim());
      }
    },
    [query, onSearch]
  );

  const handleClear = useCallback(() => {
    setQuery('');
    onSearch('');
  }, [onSearch]);

  return (
    <form onSubmit={handleSubmit} className={`${styles.searchBar} ${isLoading ? styles.loading : ''}`}>
      <div className={styles.inputWrapper}>
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          fullWidth
          seamless
          disabled={isLoading}
          icon="🔍"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <Button type="submit" disabled={isLoading || !query.trim()}>
        Search
      </Button>
    </form>
  );
};