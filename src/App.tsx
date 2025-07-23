import { useState, useCallback, useEffect } from 'react';
import { Header, ArticleList } from './components/organisms';
import { SearchBar, ErrorMessage, Pagination } from './components/molecules';
import type { NYTArticle } from './types';
import { articleService, APIError } from './services/api';
import { useDebounce } from './hooks/useDebounce';
import './App.css';

const RESULTS_PER_PAGE = 10;

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<NYTArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const searchArticles = useCallback(async (query: string, page: number) => {
    if (!query.trim()) {
      setArticles([]);
      setTotalResults(0);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await articleService.searchArticles({
        q: query,
        page: page - 1,
      });

      // Validate response structure
      if (!response || !response.response || !Array.isArray(response.response.docs)) {
        throw new Error('Invalid API response structure');
      }

      console.log('Setting articles:', response.response.docs.length, 'articles');
      console.log('First article:', response.response.docs[0]);

      setArticles(response.response.docs);
      setTotalResults(response.response.meta?.hits || 0);
      setHasSearched(true);
    } catch (err) {
      console.error('Search error in App component:', err);
      setArticles([]);
      setTotalResults(0);
      
      if (err instanceof APIError) {
        console.error('APIError:', err.message, err.statusCode, err.originalError);
        setError(err.message);
      } else {
        console.error('Unknown error:', err);
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery) {
      searchArticles(debouncedSearchQuery, currentPage);
    } else {
      setArticles([]);
      setTotalResults(0);
      setHasSearched(false);
    }
  }, [debouncedSearchQuery, currentPage, searchArticles]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleRetry = useCallback(() => {
    searchArticles(searchQuery, currentPage);
  }, [searchQuery, currentPage, searchArticles]);

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <section className="search-section">
          <SearchBar
            onSearch={handleSearch}
            isLoading={isLoading}
            placeholder="Search articles (e.g., technology, politics, climate change)"
          />
        </section>

        <section className="results-section">
          {error ? (
            <ErrorMessage
              message={error}
              onRetry={handleRetry}
            />
          ) : (
            <>
              <ArticleList
                articles={articles}
                isLoading={isLoading}
                hasSearched={hasSearched}
              />
              
              {articles.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalResults={totalResults}
                  resultsPerPage={RESULTS_PER_PAGE}
                  onPageChange={handlePageChange}
                  isLoading={isLoading}
                />
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
